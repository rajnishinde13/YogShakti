# 🪷 YogShakti

A **Yoga Asana Search Engine / Knowledge Application**.

YogShakti is not a class-booking site. It is a searchable knowledge base of yoga
asanas — look up a pose by its Sanskrit name, English name or category, and
understand what it actually does for the body.

Built in the open by **[@risingwithrajni](https://github.com/risingwithrajni)**,
one phase at a time.

---

## Current status — Phase 6 ✅

**Phase 1** built the frontend. **Phase 2** added PostgreSQL and Prisma.
**Phase 3** connected them. **Phase 4** added a page per pose.
**Phase 5** made the search real. **Phase 6** filled in the content:
**26 asanas**, each with complete structured detail.

**What works right now**

- 26 asanas in PostgreSQL, every one with full detail content
- Homepage fetches from PostgreSQL on every request
- Real search API at `GET /api/search?q=...`
- Search matches name, English name, category, level, description **and
  benefits** — case-insensitively
- Search runs on Enter or the Search button, not on every keystroke
- Loading, error, empty and results states all handled
- Detail page per pose: steps, breathing, duration, body areas, common
  mistakes, beginner tips, precautions and contraindications
- Unknown slugs return a real HTTP 404 with a friendly page
- Graceful screens for "database unreachable" and "database empty"
- Prisma schema, three checked-in migrations, a re-runnable seed script

### The content model

| Field | Type | Notes |
| --- | --- | --- |
| `slug` | `String @unique` | the URL — `/asana/tadasana` |
| `name` / `englishName` | `String` | Sanskrit and English |
| `level` / `category` | `String` | Beginner or Intermediate; 9 categories |
| `description` | `String @db.Text` | one or two sentences |
| `benefits` | `String[]` | 3–5 items |
| `steps` | `String[]` | 4–8 ordered instructions |
| `bodyAreas` | `String[]` | muscles and joints |
| `commonMistakes` | `String[]` | 2–4 items |
| `beginnerTips` | `String[]` | 2–4 items |
| `precautions` | `String[]` | general safety notes |
| `contraindications` | `String[]` | when to avoid or seek guidance |
| `breathing` | `String @db.Text` | prose — a list would be artificial |
| `duration` | `String` | e.g. "30–60 seconds each side" |
| `imageUrl` | `String?` | **reserved**, null for every pose today |
| `emoji` | `String?` | **unused** — safe to drop in a later migration |

Lists are PostgreSQL `text[]` arrays. `breathing` and `duration` are single
strings because each is one continuous piece of guidance.

### Visuals

There are no emojis in the interface. `components/AsanaVisual.jsx` draws a soft
gradient panel with an abstract three-stroke mark, tinted by category. It is
deliberately not a drawing of the pose — it holds the space until real
photographs exist.

When `imageUrl` has a value, that component shows the image instead. Adding
images later means filling in one column — no code change, no migration.

### Content rules

Anything added to `data/asanas.js` should follow these:

- Benefits describe what a pose **does for the body**, never what it cures.
  "Strengthens the legs" is fine; "cures back pain" is not.
- Contraindications say "avoid" or "seek guidance", never "treats".
- Concise, practical, factual, consistent in tone.
- Nothing in this project is medical advice.

### How data flows

```
PostgreSQL ──▶ Prisma ──▶ app/page.js ──props──▶ AsanaSearch ──▶ AsanaList ──▶ AsanaCard
└──────── server: runs before HTML is sent ─────┘└──────── browser: interactive ────────┘
```

The split matters. `app/page.js` is a **server component** — no `"use client"`,
so it runs only on the server and may use Prisma. `AsanaSearch` is a **client
component** — it has `"use client"` because `useState` only exists in the
browser.

They cannot be the same file. Prisma holds your database credentials, and a
client component's code is downloaded by every visitor.

---

## Local setup

**You need:** [Node.js](https://nodejs.org) 20+ and
[PostgreSQL](https://www.postgresql.org/) running locally.

```bash
# 1. install dependencies
#    (this also runs `prisma generate` via the postinstall script)
npm install

# 2. create the database (Prisma will not create it for you)
createdb yogshakti

# 3. set up your environment file
cp .env.example .env
#    then edit .env and put your real DATABASE_URL in it

# 4. create the tables and load the sample data
npm run db:migrate
npm run db:seed

# 5. start the development server
npm run dev
```

Then open **[http://localhost:3000](http://localhost:3000)**.

Check the database is working at any time with `npm run db:verify`.

---

## Environment variables

| Variable       | Required             | Used by            | What it is                                    |
| -------------- | -------------------- | ------------------ | --------------------------------------------- |
| `DATABASE_URL` | **Yes**              | The app + the CLI  | Connection string. In production, the **pooled** one. |
| `DIRECT_URL`   | Production only      | The Prisma CLI     | **Non-pooled** connection, used for migrations. |

Both are read from the environment only — no connection string is ever
hardcoded in application code. Locally they come from `.env` (git-ignored);
on Vercel they come from the project's Environment Variables settings.

**Why two URLs in production.** Hosted providers give you a pooled and a direct
connection string. The running app needs the **pooled** one, because each
serverless request opens its own connection and the database would otherwise
run out. But `prisma migrate` takes a PostgreSQL advisory lock so two deploys
cannot migrate simultaneously, and transaction-mode poolers do not support
those locks — so migrations need the **direct** one.

Locally there is no pooler. Leave `DIRECT_URL` unset and it falls back to
`DATABASE_URL` automatically (see `prisma.config.mjs`).

---

## Deploying to Vercel

### Production database

Any hosted PostgreSQL works — [Neon](https://neon.tech),
[Supabase](https://supabase.com), Railway, or Vercel Postgres. Nothing in the
app is provider-specific; it is PostgreSQL through Prisma either way.

1. Create a PostgreSQL database with your provider.
2. Copy **both** connection strings — pooled and direct. On Neon the pooled
   host contains `-pooler`; the direct host is the same without it.

### Run the migrations against it

Migrations are **not** run automatically by the build. Run them once from your
machine, pointing at the production database:

```bash
DATABASE_URL="<direct-connection-string>" npm run db:deploy
DATABASE_URL="<direct-connection-string>" npm run db:seed
```

`db:deploy` runs `prisma migrate deploy`, which only applies migrations that
have not run yet. Unlike `migrate dev` it never resets or drops anything, which
is why it is the correct command for a real database.

### Deploy

1. Push to GitHub.
2. Import the repository at [vercel.com/new](https://vercel.com/new). The
   framework is detected automatically — no build settings to change.
3. Add the environment variables **before** the first deploy:
   - `DATABASE_URL` → the **pooled** connection string
   - `DIRECT_URL` → the **direct** connection string
4. Deploy.

### Why `postinstall` matters

```json
"postinstall": "prisma generate"
```

Vercel installs dependencies into a clean `node_modules` on every build.
`@prisma/client` ships **without** a generated client and does not generate one
on install, so without this script the build fails with:

```
Error: Cannot find module '.prisma/client/default'
```

`postinstall` runs after every `npm install`, locally and on Vercel, so the
client is always generated before the build starts.

### If a deploy goes wrong

| Symptom | Cause |
| --- | --- |
| Build fails: `Cannot find module '.prisma/client/default'` | `postinstall` script missing |
| Site loads but shows "Could not reach the database" | `DATABASE_URL` not set in Vercel, or wrong |
| Pages load but every asana list is empty | Migrations ran but the seed did not |
| Migration command hangs and never finishes | Migrating through the pooled URL — use the direct one |

---

## Project structure

```
YogShakti/
├── app/
│   ├── layout.js        # wraps every page — Header, Footer, fonts, <head>
│   ├── page.js          # SERVER component — queries Prisma, passes props down
│   ├── globals.css      # imports Tailwind
│   ├── api/
│   │   └── search/
│   │       └── route.js # GET /api/search?q=... — returns JSON, not HTML
│   └── asana/
│       └── [slug]/      # square brackets = a DYNAMIC route
│           ├── page.js       # one asana, looked up by slug
│           └── not-found.js  # shown when the slug matches nothing
│
├── components/          # reusable UI pieces
│   ├── Header.jsx       # top bar + branding
│   ├── Hero.jsx         # headline section
│   ├── AsanaSearch.jsx  # CLIENT component — owns the search state
│   ├── SearchBar.jsx    # controlled input (value + onChange props)
│   ├── AsanaCard.jsx    # renders ONE asana
│   ├── AsanaList.jsx    # renders MANY asanas via .map()
│   └── Footer.jsx       # bottom bar
│
├── prisma/
│   ├── schema.prisma    # the data model — source of truth for the database
│   ├── migrations/      # generated SQL history, committed to Git
│   ├── seed.js          # loads the sample asanas into PostgreSQL
│   └── verify.js        # reads them back, to prove the connection works
│
├── lib/
│   └── prisma.js        # one shared PrismaClient for the whole project
│
├── data/
│   └── asanas.js        # sample data — now used ONLY by the seed script
│
├── public/              # static files (images, icons)
├── prisma.config.mjs    # Prisma CLI config — loads .env, points at the schema
├── .env                 # real secrets — GIT IGNORED, never commit
├── .env.example         # safe template — committed
└── package.json
```

### Why the search state lives in `page.js`

`SearchBar` does not own the text the user types. `page.js` does, and passes it
down as props:

```
page.js  ──  query, setQuery  ──▶  SearchBar
   │
   └──  filtered results  ──▶  AsanaList  ──▶  AsanaCard (× many)
```

This is called **lifting state up**. It is necessary because *two* components
need to know about the search text — the input that displays it, and the list
that filters by it. Whenever two components need the same value, that value
belongs in their closest shared parent.

---

## Scripts

| Command             | What it does                                     |
| ------------------- | ------------------------------------------------ |
| `npm run dev`        | Start the dev server on port 3000                |
| `npm run build`      | Build the production bundle                      |
| `npm start`          | Run the production build (after `build`)         |
| `npm run lint`       | Check the code with ESLint                       |
| `npm run postinstall`| Generate the Prisma client (runs automatically)  |
| `npm run db:migrate` | **Dev only** — create + apply a migration        |
| `npm run db:deploy`  | **Production** — apply existing migrations only  |
| `npm run db:seed`    | Load the sample asanas into PostgreSQL           |
| `npm run db:verify`  | Read the asanas back — proves the DB works       |
| `npm run db:studio`  | Open Prisma Studio, a browser UI for your tables |

### Prisma commands worth knowing

| Command                       | What it does                                             |
| ----------------------------- | -------------------------------------------------------- |
| `npx prisma migrate dev`      | Create + apply a migration after editing the schema      |
| `npx prisma migrate deploy`   | Apply existing migrations — the safe one for production  |
| `npx prisma generate`         | Rebuild the client after a schema change                 |
| `npx prisma validate`         | Check the schema for errors without touching the DB      |

> `migrate dev` is **development only** — it can drop and recreate tables when
> things drift. Never point it at a production database.

---

## Tech stack

| Layer      | Choice                          |
| ---------- | ------------------------------- |
| Framework  | Next.js 16 (App Router)         |
| Language   | JavaScript (**not** TypeScript) |
| UI         | React function components       |
| Styling    | Tailwind CSS v4                 |
| Database   | PostgreSQL 14                   |
| ORM        | Prisma 7 + `@prisma/adapter-pg` |

### Version gotchas

Both Tailwind and Prisma changed a lot recently, so most tutorials you find
online describe the older versions. The differences that bite:

**Tailwind v4** — there is no `tailwind.config.js`. Configuration lives in
`app/globals.css`.

**Prisma 7** — three changes from v5/v6:

1. **`.env` is not loaded automatically.** `prisma.config.mjs` has to
   `import "dotenv/config"` or `DATABASE_URL` comes back `undefined`.
2. **A driver adapter is required.** The old bundled Rust engine is gone, so
   `new PrismaClient()` on its own throws. You pass `{ adapter }` built from
   `@prisma/adapter-pg`. See `lib/prisma.js`.
3. **The default generator emits TypeScript.** This project sets
   `provider = "prisma-client-js"` in the schema to get plain JavaScript.

**This project is ESM.** `package.json` has `"type": "module"`, so every `.js`
file uses `import`/`export` — the same syntax as the React components, no
`require()` anywhere. One consequence: relative imports in Node scripts need
the file extension (`"../lib/prisma.js"`, not `"../lib/prisma"`).

---

## Roadmap

- [x] **Phase 1** — Frontend foundation: layout, search UI, static asana cards
- [x] **Phase 2** — PostgreSQL + Prisma: schema, migration, seed, verification
- [x] **Phase 3** — Homepage reads asanas from the database
- [x] **Phase 4** — Detail page per pose at `/asana/<slug>`
- [x] **Phase 5** — Real search API backed by PostgreSQL
- [x] **Phase 6** — 26 asanas with complete structured detail content
- [ ] **Phase 7** — Real images: fill the `imageUrl` column
- [ ] **Phase 8** — Filter by category and level alongside text search

### Known limits of the current search

- **Multi-word phrases are matched literally.** `"downward facing"` finds
  nothing, because the stored value is `Downward-Facing Dog` with a hyphen.
  Splitting the query into words is a future improvement.
- **No ranking.** Results come back in `id` order, so a match on the pose name
  is not treated as more important than a match deep in a description.
- **No index on the search.** `ILIKE '%...%'` cannot use a normal B-tree index,
  so PostgreSQL scans every row. Fine for six poses; worth revisiting (with
  `pg_trgm` or full-text search) at a few thousand.

---

## Routes

| Address              | File                        | Query                       |
| -------------------- | --------------------------- | --------------------------- |
| `/`                  | `app/page.js`               | `findMany()` — all poses    |
| `/asana/<slug>`      | `app/asana/[slug]/page.js`  | `findUnique()` — one pose   |
| `/api/search?q=...`  | `app/api/search/route.js`   | `$queryRaw` — ILIKE search  |

### Why the search uses raw SQL

Five of the six searchable fields are ordinary text columns and could have
used Prisma's query builder:

```js
where: { OR: [ { name: { contains: query, mode: "insensitive" } }, ... ] }
```

The sixth, `benefits`, is a PostgreSQL `text[]` array. Prisma's array filters
(`has`, `hasSome`) only test elements for **exact, case-sensitive** equality,
so they cannot find `"balance"` inside the benefit `"Improves balance"`.

`array_to_string(benefits, ' ') ILIKE '%balance%'` flattens the array into one
string so `ILIKE` can scan it. That single requirement is why the endpoint uses
`prisma.$queryRaw` for the whole query instead of the builder.

`$queryRaw` is a **tagged template**, so values are sent to PostgreSQL as
separate parameters — SQL injection is not possible. Building the same string
with `+` would be dangerous.

### findMany() vs findUnique()

| | `findMany()` | `findUnique()` |
| --- | --- | --- |
| Returns | An **array** (`[]` if nothing matches) | **One object**, or `null` |
| `where` accepts | Any column | Only `@unique` / `@id` columns |
| Used by | The homepage | The detail page |

`findUnique()` is restricted to unique columns on purpose — the database can
guarantee at most one row comes back, so Prisma never has to decide which of
several matches to return. That restriction is exactly why `slug` is marked
`@unique` in `schema.prisma`.

---

## A note on the content

The asana descriptions here are for **learning and general information only**.
They are not medical advice. Talk to a qualified teacher or doctor before
starting a new practice.
