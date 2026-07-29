# ZuriAgency.co.ke — Production Readiness Todo List

## Color Scheme Change
- [x] Update globals.css: blue (#0B1D3A primary) + gold (#D4AF37 accent) palette
- [ ] Update all components to use new CSS variable names
- [ ] Replace Kenyan flag stripe with gold/navy gradient

## Pages to Create
### Public
- [ ] `/` — Landing page (refactored with blue/gold)
- [ ] `/login` — Sign in
- [ ] `/register` — Sign up with M-Pesa payment
- [ ] `/ref/[code]` — Referral landing tracker
- [ ] `/terms` — Terms & Conditions
- [ ] `/privacy` — Privacy Policy
- [ ] `/refund` — Refund Policy

### Member Dashboard (`/dashboard/*`)
- [ ] `/dashboard` — Overview (earnings, referrals, recent activity)
- [ ] `/dashboard/earnings` — Transaction history & payout requests
- [ ] `/dashboard/team` — Downline tree view
- [ ] `/dashboard/referrals` — Referral link, share tools, track referrals
- [ ] `/dashboard/settings` — Profile, M-Pesa number, password change

### Admin (`/admin/*`)
- [ ] `/admin` — Overview (stats, recent signups, pending payouts)
- [ ] `/admin/users` — User management (list, search, suspend)
- [ ] `/admin/transactions` — All transactions (filter, search)
- [ ] `/admin/payouts` — Payout approval/release
- [ ] `/admin/settings` — Platform settings (commission rates, etc.)

## Backend / API
- [ ] Update Prisma schema (User, Referral, Commission, Transaction, Payout, Settings)
- [ ] Configure next-auth (credentials + M-Pesa phone verification)
- [ ] API: `/api/auth/[...nextauth]`
- [ ] API: `/api/register` — User registration with M-Pesa STK push
- [ ] API: `/api/referral/link` — Generate/refresh referral link
- [ ] API: `/api/referral/track` — Track referral click/join
- [ ] API: `/api/earnings` — Get earnings data
- [ ] API: `/api/transactions` — List user transactions
- [ ] API: `/api/payout/request` — Request payout
- [ ] API: `/api/admin/*` — Admin CRUD endpoints
- [ ] M-Pesa: Daraja API service (STK Push, query, callbacks)
- [ ] Commission engine (calculate 35% direct + 15% override)

## Production Safety
- [ ] Remove `ignoreBuildErrors: true` from next.config.ts
- [ ] Set `reactStrictMode: true`
- [ ] Set `noImplicitAny: true` in tsconfig
- [ ] Add `.env.example` with all required vars
- [ ] Create proper `robots.txt` and `sitemap.xml`
- [ ] Add JSON-LD structured data
- [ ] Replace all placeholder phone numbers

## Assets
- [ ] Add hero image (or use gradient placeholder)
- [ ] Add testimonial avatar placeholders
- [ ] Add M-Pesa proof screenshots (or remove references)
- [ ] Verify all images load correctly
