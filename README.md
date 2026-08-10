# SATCORP

The SATCORP web ecosystem   six establishments that each look like a different
company, tied together by six fingerprints and one red thread.

| Path | What it is |
|---|---|
| [`satcorp-web/`](satcorp-web) | The Next.js application. **This is the deployable.** |
| [`BUILD-PLAN.md`](BUILD-PLAN.md) | Full creative and technical direction. |
| `assets/blender/` | Source `.blend` files behind the 3D worlds. |

Working notes, conventions and the architecture live in
[`satcorp-web/README.md`](satcorp-web/README.md).

---

## Deploying to Vercel

The application is in a subdirectory, so the Vercel project needs one setting
that is not the default:

- **Settings → General → Root Directory:** `satcorp-web`

`satcorp-web/vercel.json` then pins the framework, build command, install
command and output directory. It is committed deliberately: this repository
replaced a Vite site, and a Vercel project carries the previous build settings
across a repository change. Values in `vercel.json` take precedence over the
dashboard, so a stale `vite build` override cannot break the deployment.

Any override still set under **Settings → Build and Deployment** should be
cleared regardless, so the two places do not disagree about what this project
is.

### Environment variables

Set these under **Settings → Environment Variables**. They are not optional.

| Variable | Required | What it does |
|---|---|---|
| `DISCORD_WEBHOOK_URL` | **Yes** | Delivers each engagement brief to the ops channel. |
| `RESEND_API_KEY` | Optional | Email delivery, alongside Discord. |
| `INTAKE_TO_EMAIL` | With Resend | Where the email goes. |
| `INTAKE_FROM_EMAIL` | Optional | Must be a domain verified with Resend. |

**At least one transport must be configured in production.** On a serverless
platform the filesystem is ephemeral, so the JSON record the intake pipeline
writes cannot be relied on as the record. With no transport configured, the
brief form refuses the submission and says so, rather than showing a wax seal
over a message that went nowhere. See `satcorp-web/app/actions/intake.ts`.

---

## Legal

`/terms` and `/privacy` are generated from `satcorp-web/lib/legal.ts`, which is
the single source of truth for the trading entity, the contact address, the
governing law and the revision date. Change a fact there, not in the prose.
