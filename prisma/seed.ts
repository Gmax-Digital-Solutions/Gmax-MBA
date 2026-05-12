import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const db = new PrismaClient()

async function main() {
  console.log('🌱  Seeding database...')

  // Demo users
  const users = [
    { name: 'Alex Johnson', email: 'alex@example.com', password: 'password123', role: 'founder', company: 'LaunchStack', bio: 'Building dev tools for solo founders. On a mission to ship 12 products in 12 months.' },
    { name: 'Priya Krishnan', email: 'priya@example.com', password: 'password123', role: 'engineer', company: 'Self-employed', bio: 'Full-stack engineer turned indie hacker. Learning how to stop building and start selling.' },
    { name: 'Marcus Williams', email: 'marcus@example.com', password: 'password123', role: 'builder', company: 'Buildwise', bio: 'Side-project addict. Phase 2 of the program completely changed how I think about marketing.' },
    { name: 'Sara Chen', email: 'sara@example.com', password: 'password123', role: 'designer', company: 'PixelPilot', bio: 'Product designer learning the business side. The strategy module is gold.' },
    { name: 'James Okonkwo', email: 'james@example.com', password: 'password123', role: 'founder', company: 'Gmax Digital Solutions', bio: 'Founder of Gmax Digital Solutions. Built this program to share what I know.', twitter: '@jamesokonkwo' },
  ]

  for (const u of users) {
    const existing = await db.user.findUnique({ where: { email: u.email } })
    if (!existing) {
      await db.user.create({ data: { ...u, password: await bcrypt.hash(u.password, 12) } })
      console.log(`  ✓ Created user: ${u.name}`)
    } else {
      console.log(`  – Skipped (exists): ${u.name}`)
    }
  }

  console.log('✅  Seed complete!')
}

main().catch(e => { console.error(e); process.exit(1) }).finally(() => db.$disconnect())
