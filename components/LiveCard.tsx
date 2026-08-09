import Image from "next/image"
import type { YoutubeItem } from "@/app/lib/types"
import { getLatestLives } from "@/app/lib/youtubeData"
import { decode } from "he"

export async function LiveCard() {
  const lives = await getLatestLives()

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
      {lives.map((live: YoutubeItem) => {
        const id = live.id.videoId
        const title = decode(live.snippet.title)
        const date = live.snippet.publishedAt

        return (
          <div key={id} className="h-full">
            <a
              href={`https://www.youtube.com/watch?v=${id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col h-full bg-dark-800 border border-dark-600 hover:border-gold-600 transition-colors duration-300">
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden bg-dark-700">
                <Image
                  src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Play overlay */}
                <div className="absolute inset-0 bg-dark-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-gold-400">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-serif text-lg text-stone-100 font-light leading-snug mb-2 group-hover:text-gold-300 transition-colors duration-200 line-clamp-2">
                  {title}
                </h3>
                <p className="text-stone-600 text-xs tracking-widest uppercase font-light mt-auto">{date}</p>
              </div>
            </a>
          </div>
        )
      })}
    </div>
  )
}
