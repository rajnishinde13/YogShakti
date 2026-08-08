# 🪷 YogShakti

A **Yoga Asana Search Engine / Knowledge Application**.

YogShakti is not a class-booking site. It is a searchable knowledge base of yoga
asanas — look up a pose by its Sanskrit name, English name or category, and
understand what it actually does for the body.

Built in the open by **[@risingwithrajni](https://github.com/risingwithrajni)**,
one phase at a time.

---

## Current status — Phase 4 ✅

**Phase 1** built the frontend. **Phase 2** added PostgreSQL and Prisma.
**Phase 3** connected them. **Phase 4** added a page per pose.

**What works right now**

- Homepage fetches asanas from PostgreSQL on every request
- Search filters as you type (`useState` + `.filter()`)
- Every card links to a detail page at `/asana/<slug>`
- Unknown slugs return a real HTTP 404 with a friendly page
- Graceful screens for "database unreachable" and "database empty"
- PostgreSQL database `yogshakti` with an `Asana` table
- Prisma schema, two checked-in migrations, a re-runnable seed script

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

## Getting started

**You need:** [Node.js](https://nodejs.org) 18+ and
[PostgreSQL](https://www.postgresql.org/) running locally.

```bash
# 1. install dependencies
npm install

# 2. create the database (Prisma will not create it for you)
createdb yogshakti

# 3. set up your environment file
cp .env.example .env
#    then edit .env and put your real DATABASE_URL in it

# 4. create the table and load the sample data
npx prisma migrate dev
npm run db:seed

# 5. start the development server
npm run dev
```

Then open **[http://localhost:3000](http://localhost:3000)**.

Check the database is working at any time with `npm run db:verify`.

---

## Project structure

```
YogShakti/
├── app/
│   ├── layout.js        # wraps every page — Header, Footer, fonts, <head>
│   ├── page.js          # SERVER component — queries Prisma, passes props down
│   ├── globals.css      # imports Tailwind
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
| `npm run dev`       | Start the dev server on port 3000                |
| `npm run build`     | Build the production bundle                      |
| `npm start`         | Run the production build (after `build`)         |
| `npm run lint`      | Check the code with ESLint                       |
| `npm run db:seed`   | Load the sample asanas into PostgreSQL           |
| `npm run db:verify` | Read the asanas back — proves the DB works       |
| `npm run db:studio` | Open Prisma Studio, a browser UI for your tables |

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
- [ ] **Phase 5** — Move search into SQL: filters by level, category and benefit
- [ ] **Phase 6** — Fill in the "coming soon" fields: steps, breathing, cautions
- [ ] **Phase 7** — Images and illustrations for each pose

---

## Routes

| Address            | File                        | Query                            |
| ------------------ | --------------------------- | -------------------------------- |
| `/`                | `app/page.js`               | `findMany()` — all poses         |
| `/asana/<slug>`    | `app/asana/[slug]/page.js`  | `findUnique()` — one pose        |

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
