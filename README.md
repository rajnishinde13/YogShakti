# 🪷 YogShakti

A **Yoga Asana Search Engine / Knowledge Application**.

YogShakti is not a class-booking site. It is a searchable knowledge base of yoga
asanas — look up a pose by its Sanskrit name, English name or category, and
understand what it actually does for the body.

Built in the open by **[@risingwithrajni](https://github.com/risingwithrajni)**,
one phase at a time.

---

## Current status — Phase 1 ✅

Phase 1 is the **frontend foundation**. Everything on screen runs from a static
JavaScript array. There is no database, no login and no API yet — that is
deliberate.

**What works right now**

- Responsive homepage
- Header with YogShakti branding
- Hero section
- Search bar that filters as you type (`useState`)
- 6 asana cards rendered from an array with `.map()`
- Empty state when nothing matches
- Footer

---

## Getting started

**You need:** [Node.js](https://nodejs.org) 18 or newer.

```bash
# 1. install dependencies (only needed the first time)
npm install

# 2. start the development server
npm run dev
```

Then open **[http://localhost:3000](http://localhost:3000)**.

Edit any file in `components/` and save — the page updates in the browser
instantly. No environment variables are required for Phase 1.

---

## Project structure

```
YogShakti/
├── app/
│   ├── layout.js        # wraps every page — Header, Footer, fonts, <head>
│   ├── page.js          # the homepage; owns the search state
│   └── globals.css      # imports Tailwind
│
├── components/          # reusable UI pieces
│   ├── Header.jsx       # top bar + branding
│   ├── Hero.jsx         # headline section
│   ├── SearchBar.jsx    # controlled input (value + onChange props)
│   ├── AsanaCard.jsx    # renders ONE asana
│   ├── AsanaList.jsx    # renders MANY asanas via .map()
│   └── Footer.jsx       # bottom bar
│
├── data/
│   └── asanas.js        # placeholder data (replaced by the DB in Phase 2)
│
├── public/              # static files (images, icons)
├── .env.example         # template for future environment variables
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

| Command         | What it does                              |
| --------------- | ----------------------------------------- |
| `npm run dev`   | Start the dev server on port 3000         |
| `npm run build` | Build the production bundle               |
| `npm start`     | Run the production build (after `build`)  |
| `npm run lint`  | Check the code with ESLint                |

---

## Tech stack

| Layer      | Choice                        |
| ---------- | ----------------------------- |
| Framework  | Next.js (App Router)          |
| Language   | JavaScript (**not** TypeScript) |
| UI         | React function components     |
| Styling    | Tailwind CSS v4               |
| Database   | PostgreSQL + Prisma *(Phase 2)* |

> Tailwind v4 has no `tailwind.config.js`. Configuration lives in
> `app/globals.css` instead.

---

## Roadmap

- [x] **Phase 1** — Frontend foundation: layout, search UI, static asana cards
- [ ] **Phase 2** — PostgreSQL + Prisma; move asanas into the database
- [ ] **Phase 3** — Individual asana detail pages
- [ ] **Phase 4** — Real search: filters by level, category and benefit
- [ ] **Phase 5** — Images and illustrations for each pose

---

## A note on the content

The asana descriptions here are for **learning and general information only**.
They are not medical advice. Talk to a qualified teacher or doctor before
starting a new practice.
