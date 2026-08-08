-- Add a unique `slug` column to a table that already contains rows.
--
-- This cannot be done in one statement. A NOT NULL column added to a table
-- with existing rows has nothing to put in those rows, so PostgreSQL refuses.
-- The fix is to widen first, fill in, then tighten.

-- Step 1: add the column as NULLABLE, so the existing 6 rows are allowed
-- to have no slug for a moment.
ALTER TABLE "Asana" ADD COLUMN "slug" TEXT;

-- Step 2: backfill every existing row.
--   lower()   -> "Tadasana"             becomes "tadasana"
--   replace() -> "Adho Mukha Svanasana" becomes "adho-mukha-svanasana"
UPDATE "Asana" SET "slug" = lower(replace("name", ' ', '-'));

-- Step 3: now that no row is empty, the column can be made required.
ALTER TABLE "Asana" ALTER COLUMN "slug" SET NOT NULL;

-- Step 4: enforce uniqueness. This is also what makes the column usable
-- with Prisma's findUnique(). The index name matches Prisma's convention
-- (<Table>_<column>_key) so Prisma recognises it as the @unique constraint.
CREATE UNIQUE INDEX "Asana_slug_key" ON "Asana"("slug");
