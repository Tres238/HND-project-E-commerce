# Audiophile — MVP (Treasure)

This is a small MVP React app for the Audiophile Stage 3 assignment.
It demonstrates a pixel-inspired frontend, cart, checkout form with client-side validation, and saving orders to `localStorage`.

## What this repo includes
- React single-page app (Create React App structure)
- Product listing, Add to cart, Checkout, Order confirmation
- Orders saved to localStorage (MVP)
- Example email template (`email_template.html`) for confirmation emails

## How to run locally
1. `npm install`
2. `npm start` — opens dev server at `http://localhost:3000`

## How to deploy (Vercel recommended)
1. Create a GitHub repository and push the files.
2. Go to https://vercel.com/new → Import Git Repository → choose this repo.
3. In Vercel, select **Framework Preset** = *Create React App*.
4. Build & deploy. Vercel will run `npm run build`.

## Next steps (replace MVP with real backend)
- Replace localStorage order saving with Convex:
  - Create Convex project, then in the server API call Convex to save orders.
- Send confirmation emails:
  - Use Resend API or Nodemailer inside a serverless function `pages/api/create-order.js`.
  - Use `RESEND_API_KEY` environment variable.
- Protect real user data (do not store secrets in client-side code).

## Notes for reviewers
- This repo is intentionally an MVP so you can submit quickly.
- When ready, I will help add Convex & Resend code snippets and environment variable instructions.

If you want, I can now:
- Generate the Convex + Resend server API route (sample) — you will add API keys in Vercel.
- Or I can produce the exact files as a ZIP so you can upload them directly to GitHub.
