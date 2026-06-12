# rag-tutor-landing-page

This is a [Next.js](https://nextjs.org) project bootstrapped with [v0](https://v0.app).

## Built with v0

This repository is linked to a [v0](https://v0.app) project. You can continue developing by visiting the link below -- start new chats to make changes, and v0 will push commits directly to this repo. Every merge to `main` will automatically deploy.

[Continue working on v0 →](https://v0.app/chat/projects/prj_ruhkNgcEfMjvldEqXy1uF0HMY4Wx)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Recent security and quality updates

- Removed the hardcoded Google Apps Script signup webhook URL.
- `/api/signup` now requires `GOOGLE_SHEETS_WEBHOOK_URL` and returns `503` when it is not configured.
- Removed raw personal information and webhook response-body logging from signup handling.
- Added a required privacy collection/use consent checkbox to the signup form.
- Restored the TypeScript production-build gate by removing `ignoreBuildErrors`.
- Added Next ESLint configuration and dependencies so `pnpm lint` runs as a real quality gate.

Validation run:

- `corepack pnpm lint`
- `corepack pnpm exec tsc --noEmit`
- `corepack pnpm build`
- Local `/api/signup` checks for missing webhook config, missing name, and invalid phone number.

## Learn More

To learn more, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [v0 Documentation](https://v0.app/docs) - learn about v0 and how to use it.
