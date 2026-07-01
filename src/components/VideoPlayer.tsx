'use client'
import { useState } from 'react'

type VideoSource = 'youtube' | 'vimeo' | 'cloudflare' | 'mux'

interface VideoPlayerProps {
  videoId: string
  source: VideoSource
  title?: string
}

export function VideoPlayer({ videoId, source, title }: VideoPlayerProps) {
  const [loaded, setLoaded] = useState(false)

  // youtube-nocookie.com skips setting cookies until the user actually plays the video,
  // which avoids triggering GDPR consent requirements on page load.
  const iframeSrc =
    source === 'youtube'
      ? `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&color=white`
      : source === 'vimeo'
      ? `https://player.vimeo.com/video/${videoId}?color=58f5df&title=0&byline=0`
      : source === 'cloudflare'
      ? `https://iframe.cloudflarestream.com/${videoId}`
      : null

  return (
    <div
      className="overflow-hidden"
      style={{
        backgroundColor: '#1a1618',
        border: '0.5px solid rgba(88,245,223,0.18)',
        borderRadius: '12px',
      }}
    >
      <div className="relative w-full">
        {!loaded && (
          <div className="absolute inset-0 animate-pulse bg-surface-container-high rounded-xl z-10" />
        )}
        {source === 'mux' ? (
          <video
            className="w-full aspect-video rounded-xl"
            controls
            onCanPlay={() => setLoaded(true)}
            title={title}
            style={{ border: 'none', display: 'block' }}
          >
            <source src={`https://stream.mux.com/${videoId}.m3u8`} type="application/x-mpegURL" />
          </video>
        ) : (
          <iframe
            className="w-full aspect-video rounded-xl"
            src={iframeSrc!}
            title={title ?? 'Video'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            onLoad={() => setLoaded(true)}
            style={{ border: 'none', display: 'block' }}
          />
        )}
      </div>
    </div>
  )
}
