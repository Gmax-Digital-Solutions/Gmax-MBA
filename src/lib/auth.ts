import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GitHubProvider     from 'next-auth/providers/github'
import GoogleProvider     from 'next-auth/providers/google'
import { PrismaAdapter }  from '@next-auth/prisma-adapter'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  pages: {
    signIn:  '/auth/signin',
    error:   '/auth/signin',
    newUser: '/onboarding',
  },
  providers: [
    GitHubProvider({
      clientId:     process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      profile(profile) {
        return {
          id:       profile.id.toString(),
          name:     profile.name || profile.login,
          email:    profile.email,
          image:    profile.avatar_url,
          company:  profile.company || '',
          role:     'builder',
          onboarded: false,
        }
      },
    }),
    GoogleProvider({
      clientId:     process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id:       profile.sub,
          name:     profile.name,
          email:    profile.email,
          image:    profile.picture,
          company:  '',
          role:     'builder',
          onboarded: false,
        }
      },
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email:    { label: 'Email',    type: 'email'    },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        const user = await db.user.findUnique({ where: { email: credentials.email } })
        if (!user || !user.password) return null
        const valid = await bcrypt.compare(credentials.password, user.password)
        if (!valid) return null
        await db.user.update({ where: { id: user.id }, data: { lastSeen: new Date() } })
        return {
          id: user.id,
          email: user.email,
          name: user.name ?? undefined,
          image: user.image ?? undefined,
          role: user.role,
          company: user.company ?? undefined,
        }
      },
    }),
  ],
  events: {
    async createUser({ user }) {
      // Set enrolledAt and defaults for OAuth users
      await db.user.update({
        where: { id: user.id },
        data: {
          enrolledAt: new Date(),
          onboarded:  false,
          role:       'builder',
          password:   '', // OAuth users have no password
        },
      }).catch(() => {}) // ignore if already set
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // For OAuth, ensure user has required fields
      if (account?.provider === 'github' || account?.provider === 'google') {
        const existing = await db.user.findUnique({ where: { id: user.id } })
        if (!existing?.enrolledAt) {
          await db.user.update({
            where: { id: user.id },
            data: { enrolledAt: new Date(), onboarded: false },
          }).catch(() => {})
        }
      }
      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.id      = user.id
        token.role    = (user as any).role
        token.company = (user as any).company
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id              = token.id as string;
        (session.user as any).role    = token.role;
        (session.user as any).company = token.company
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url
      if (url.startsWith('/')) return `${baseUrl}${url}`
      return baseUrl
    },
  },
}
