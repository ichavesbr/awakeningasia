import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  cacheComponents: true,

  // Experimental configuration to make Typescript 7.0 work
  // TypeScript 7.0.2 does not provide the compiler API required by Next.js
  // Aparently will get fixed in TypeScript 7.1
  experimental: { useTypeScriptCli: true },

  // Necessary for accepting youtube API imagens
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/vi/**",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/vi/**",
      },
    ],
  },
}

export default nextConfig
