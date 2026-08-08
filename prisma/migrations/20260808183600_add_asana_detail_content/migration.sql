-- Add structured detail content to Asana, without disturbing existing rows.
--
-- Two different problems here, solved two different ways.

-- ---------------------------------------------------------------------------
-- 1. ARRAY COLUMNS — no backfill needed.
--
-- Prisma declares scalar lists as nullable at the database level and reads a
-- NULL array as an empty list. Existing rows can therefore be left alone:
-- they read back as [] until the seed fills them in.
-- ---------------------------------------------------------------------------
ALTER TABLE "Asana" ADD COLUMN "steps"             TEXT[];
ALTER TABLE "Asana" ADD COLUMN "bodyAreas"         TEXT[];
ALTER TABLE "Asana" ADD COLUMN "commonMistakes"    TEXT[];
ALTER TABLE "Asana" ADD COLUMN "beginnerTips"      TEXT[];
ALTER TABLE "Asana" ADD COLUMN "precautions"       TEXT[];
ALTER TABLE "Asana" ADD COLUMN "contraindications" TEXT[];

-- ---------------------------------------------------------------------------
-- 2. REQUIRED TEXT COLUMNS — the same widen / fill / tighten dance used for
--    `slug` in the previous migration. A NOT NULL column cannot simply be
--    added to a table that already has rows, because those rows have nothing
--    to put in it.
-- ---------------------------------------------------------------------------

-- Widen: add them as nullable first.
ALTER TABLE "Asana" ADD COLUMN "breathing" TEXT;
ALTER TABLE "Asana" ADD COLUMN "duration"  TEXT;

-- Fill: give existing rows a harmless empty value. The seed replaces these
-- with real guidance immediately afterwards.
UPDATE "Asana" SET "breathing" = '' WHERE "breathing" IS NULL;
UPDATE "Asana" SET "duration"  = '' WHERE "duration"  IS NULL;

-- Tighten: now that no row is empty, the columns can be made required.
ALTER TABLE "Asana" ALTER COLUMN "breathing" SET NOT NULL;
ALTER TABLE "Asana" ALTER COLUMN "duration"  SET NOT NULL;

-- ---------------------------------------------------------------------------
-- 3. VISUALS
-- ---------------------------------------------------------------------------

-- Reserved for a future photograph or illustration. Nullable by design.
ALTER TABLE "Asana" ADD COLUMN "imageUrl" TEXT;

-- emoji is no longer used by the interface. Relaxing NOT NULL means new poses
-- do not have to invent one. Existing values are left untouched — nothing is
-- deleted here, so this migration loses no data.
ALTER TABLE "Asana" ALTER COLUMN "emoji" DROP NOT NULL;
