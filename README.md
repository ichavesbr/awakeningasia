# Awakening Asia

Institutional website for Awakening Asia, a church based in Ueno, Japan.

Complete rebuild of the previous version, which lacked design consistency and media optimization. This new version is a fully redesigned, production-ready website built from scratch with a focus on performance, maintainability, responsive design, and content accessibility.

## Documentation

- **Notion:** https://awakeningasia.notion.site/Awakening-Asia-3bdba216e0b480bc9ce2e077608944ba?pvs=74
---

## 1. Project Overview & Roadmap (概要とロードマップ)

### Objectives & Scope
- **Performance & Standardization:** Standardized typography, color palettes, and layouts; optimized asset delivery to stabilize Core Web Vitals.
- **User Experience:** Restructured information architecture for seamless navigation.
- **Analytics:** Integration of Vercel Analytics and Speed Insights for user geography and traffic monitoring.

### Roadmap
- [x] Access Metrics & Analytics
- [ ] Database Integration
- [ ] Authentication System
- [ ] CMS (microCMS) with Role-Based Access Control (Admin, Pastors, Guests)
- [ ] E-commerce Module

---

## 2. Architecture & Tech Stack (アーキテクチャ・技術スタック)

| Layer / Tool | Technology & Version |
| --- | --- |
| Framework & Backend | Next.js 16 (App Router, API Routes / Server Actions) |
| UI & Styling | React 19 + Tailwind CSS v4 |
| Database & ORM | PostgreSQL (Neon Serverless) + Prisma |
| Validation | Zod v4 |
| Testing | Vitest |
| Language | TypeScript |
| Deployment & Hosting | Vercel (CI/CD Pipelines) |

> **Contingency Plan / Future Scale (Plan B):** Should traffic grow significantly or business requirements demand heavy background processing / complex microservices, the backend can be migrated to **NestJS (TypeScript)** hosted on **AWS (ECS/EC2 + RDS)** managed via Terraform and Docker. Currently deferred as the current e-commerce scope is lightweight.

---

## 3. Pages & Features (ページ構成)

### `/` — Home
- Hero section with animations
- Scroll-triggered `FadeIn` animations via `IntersectionObserver`
- Sections for vision, ministry overview, and call-to-action links

### `/about`
- Modular sections: `VisionSection`, `PastorsSection`, `StatementOfFaith`, `AboutSection`

### `/contact`
- Contact form with client-side Zod validation
- Fields: name, email, subject, message — all with inline error feedback

### `/events`
- Upcoming events listing with date, time, location, venue, and tags

### `/lives`
- Fetches and displays recent YouTube videos and completed livestreams via YouTube Data API v3
- Separate grids for `VideoCard` and `LiveCard`

### `404`
- Custom not-found page

---

## 4. YouTube Integration

Centralized fetch layer at `app/lib/youtube.ts` using YouTube Data API v3:

- `getLatestVideos()` — 8 most recent uploads
- `getLatestLives()` — 4 most recent completed livestreams
- Caching via Next.js `cacheLife("hours")`
- Safe error handling — returns `[]` on any failure

---

## 5. Getting Started & Development (開発ガイド)

### Environment Variables
Create a `.env.local` file based on `env-example`:

```env
API_KEY=key_here
CHANNEL_ID=key_here
```

### Installation & Run
```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Tests
```bash
npm run test
