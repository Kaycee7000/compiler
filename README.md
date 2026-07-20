# Compiler — Portloo Frontend

Astro + React frontend for Portloo — students upload a resume, get a live one-page portfolio generated for them, and can sign in to manage/upgrade it. Deployed on Cloudflare Pages at **otilof.com**.

## Stack
Astro 5 (server output) · React 19 · Tailwind · Supabase (auth) · Stripe (billing) · Sentry

## Setup
```bash
npm install
npm run dev       # localhost:4321
```

## Build & deploy
```bash
npm run build
```
Deployed via Cloudflare Pages (`wrangler.jsonc`). Custom domain is attached in the Cloudflare dashboard.
