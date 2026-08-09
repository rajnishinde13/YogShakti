-- Add source metadata and image metadata to Asana.
--
-- Every column here is NULLABLE, which makes this the safest kind of
-- migration there is:
--
--   * Existing rows need no backfill — they simply get NULL.
--   * No widen / fill / tighten dance, unlike the `slug`, `breathing` and
--     `duration` columns in earlier migrations, which were required.
--   * Nothing is dropped, renamed or retyped, so no data can be lost.
--
-- The columns are optional by intent, not just by convenience. Historical
-- attribution is unknown for many poses, and a NULL that renders as nothing
-- is far better than a placeholder that reads as fact.

-- ---------------------------------------------------------------------------
-- Tradition and sources
-- ---------------------------------------------------------------------------
ALTER TABLE "Asana" ADD COLUMN "sanskritName"    TEXT;
ALTER TABLE "Asana" ADD COLUMN "devanagari"      TEXT;
ALTER TABLE "Asana" ADD COLUMN "transliteration" TEXT;
ALTER TABLE "Asana" ADD COLUMN "tradition"       TEXT;
ALTER TABLE "Asana" ADD COLUMN "sourceText"      TEXT;

-- Chapter and verse are TEXT rather than INTEGER on purpose. Classical texts
-- are cited in all sorts of ways — "1", "II", "2.a", "28-29" — and a numeric
-- column could hold none of those.
ALTER TABLE "Asana" ADD COLUMN "sourceChapter" TEXT;
ALTER TABLE "Asana" ADD COLUMN "sourceVerse"   TEXT;

ALTER TABLE "Asana" ADD COLUMN "historicalNotes" TEXT;

-- ---------------------------------------------------------------------------
-- Image metadata
--
-- Note what is NOT here: any bytea or blob column. Only the address of an
-- image is stored. Image binaries belong in object storage or a CDN — putting
-- them in table rows bloats the database, slows every backup, and makes
-- ordinary queries drag megabytes around for no reason.
-- ---------------------------------------------------------------------------
ALTER TABLE "Asana" ADD COLUMN "imageAlt"     TEXT;
ALTER TABLE "Asana" ADD COLUMN "imageSource"  TEXT;
ALTER TABLE "Asana" ADD COLUMN "imageLicense" TEXT;
