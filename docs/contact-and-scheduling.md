# Contact and scheduling setup

The portfolio uses Resend for branded email, Cloudflare Turnstile for bot protection, and Cal.com for real calendar availability and bookings. All three offer free plans. A domain you own is required for Resend production sending; domain registration itself is not free. No account or DNS changes are made by installing this code.

## 1. Resend

1. Create a [Resend account](https://resend.com), add a sending domain or subdomain, and publish the DNS records shown in its dashboard. Do not replace the MX records used by your existing inbox. This integration only needs outbound sending.
2. Create a sending API key, restricted to that domain where available.
3. Add these values to `.env.local` for development and your hosting provider’s environment settings for production:

```dotenv
APP_URL=https://your-portfolio-domain.com
RESEND_API_KEY=re_your_key
CONTACT_FROM_EMAIL=contact@your-verified-domain.com
CONTACT_TO_EMAIL=your-existing-inbox@gmail.com
CONTACT_PUBLIC_EMAIL=your-public-contact-address@example.com
CONTACT_REPLY_SECRET=your_64_character_random_hex_secret
```

`CONTACT_FROM_EMAIL` and `CONTACT_TO_EMAIL` are bare email addresses; the display name is supplied by `siteConfig`. The public address is optional and independent of the private notification inbox. `APP_URL` must be the canonical HTTPS origin, never a URL derived from request headers. For local development use `http://localhost:3000`.

Generate a reply secret locally:

```bash
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

Keep the same secret across production instances. Rotating it revokes all existing reply links. Keep credentials out of source control and client environment variables. `.env.local` is ignored by Git.

### How branded correspondence works

- A validated submission sends a branded notification to your inbox and a separate branded acknowledgement to the visitor.
- Open **Reply with branding** in your notification. The private composer previews and sends your response using the same HTML and plain-text template.
- The link is valid for seven days. It is a signed capability restricted to that visitor, so anyone with it can send replies to that visitor. Keep it private and do not forward the notification. The payload is signed, not encrypted. The token is carried in a URL fragment, removed from the address bar on load, and never persisted by the composer.
- Visitor replies go to `CONTACT_TO_EMAIL` via `Reply-To`. Replies sent using Gmail’s ordinary Reply button are controlled by Gmail and **do not automatically receive this website’s template**. For those, configure a branded Gmail signature or continue using the private composer for full template branding. The composer sends a separate email; it does not promise inbox thread continuity.
- The shared template lives in `src/features/contact/email-template.ts`. It escapes all message content and uses inline styles and table layout for email compatibility. Provider click/open tracking should be disabled so the private link is not rewritten through a tracking service.

Resend currently includes [3,000 transactional emails per month, with a 100/day cap](https://resend.com/docs/knowledge-base/account-quotas-and-limits). Each inquiry normally uses two sends; each reply uses one. Provider acceptance does not guarantee inbox delivery. Monitor bounces, complaints, quota, and delivery in Resend. Contact content is retained by the email provider and your inbox, not a portfolio database.

Retries use [Resend idempotency keys](https://resend.com/docs/dashboard/emails/idempotency-keys), retained by Resend for 24 hours. Identical form retries reuse their payload and key. Identical reply text from the same link is deduplicated within that period. This is not permanent exactly-once delivery. If the acknowledgement fails after the owner notification succeeds, the visitor still sees success with an accurate explanation.

## 2. Cloudflare Turnstile

1. Create a free [Turnstile widget](https://developers.cloudflare.com/turnstile/get-started/). Use Managed mode.
2. Allow the hostname used in `APP_URL`. Use separate development and production widgets; add `localhost` to the development widget when testing locally.
3. Configure `TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` in the same environment.

Verification checks the provider’s success flag, hostname, and `contact` action on the server. Expired or consumed tokens require a fresh challenge. The widget resets after every submission attempt. The form stays unavailable when required email or bot-protection configuration is missing; it never simulates a successful real submission.

Turnstile and the hidden honeypot reduce automated abuse; they are not a per-user quota system. For a heavily targeted site, add a durable rate limiter or hosting firewall rule. Do not use an in-memory limiter as though it protects every serverless instance.

## 3. Cal.com

1. Create a [free individual Cal.com account](https://cal.com/pricing).
2. Connect the calendar(s) that should be checked for conflicts and the calendar to receive new events. Connect your preferred video-call provider or choose Cal Video.
3. Set your host timezone to **Africa/Dar_es_Salaam**, then configure your actual working hours, time off, minimum notice, buffers, and booking horizon. The reference images’ hours are design examples, not committed availability.
4. Create **Intro** (30 minutes) and **Working session** (60 minutes). Match the durations and names shown on the site. Configure conferencing, confirmation emails, cancellation, and rescheduling in Cal.com.
5. Copy each public `username/event-slug` into:

```dotenv
CAL_COM_INTRO_PATH=your-username/intro
CAL_COM_WORKING_SESSION_PATH=your-username/working-session
```

The site has a themed conversation selector followed by Cal.com’s official embedded booking flow. Cal.com owns the live dates, slots, timezone conversion, attendee details, conflict checking, and confirmation. It is intentionally not a custom calendar with invented slots. The site does not report success before the provider confirms the booking. A direct calendar link remains available when embedding is blocked. Missing or malformed event paths disable the corresponding meeting card.

Cal.com’s free individual plan supports multiple event types. Provider branding and booking-email customization remain subject to its plan; the Resend contact template does not replace Cal.com’s invitation emails. Account availability rules and connected calendars must be set up in Cal.com itself.

## Verify before launching

```bash
bun run test:contact
bun run build
```

Automated tests mock all network calls. They cover validation, HTML escaping, capability tampering and expiry, recipient binding, bot checks, partial delivery failure, retry idempotency, and event-path validation. They do not send real email or book meetings.

After configuring the accounts:

1. Submit a message using an address you control; confirm receipt in both inboxes and check the mobile and desktop HTML rendering.
2. Open the notification’s private link, preview and send a branded reply, then reply to that email and verify it arrives in the owner inbox.
3. Book a real test appointment with your own address, confirm timezone and calendar placement, then test cancellation and rescheduling. Verify busy calendar events are excluded.
4. Test a blocked Turnstile script and blocked calendar embed; verify fallback contact and direct calendar links are useful.

Restart development after environment changes and redeploy after changing production settings. Legacy `GMAIL`, `GMAIL_FROM`, `PASSWORD`, `PASSWORD2`, and `CALENDLY_BOOKING_URL` are not read by these features; remove unused credentials from your deployment once you have confirmed no other integration needs them.
