// app/api/search/route.js
//
// A ROUTE HANDLER — an API endpoint rather than a page. The folder path
// decides the address, exactly like pages:
//
//   app/api/search/route.js   ->   /api/search
//
// The file must be named route.js, and it exports a function named after the
// HTTP method it answers. Exporting `GET` means this responds to GET requests:
//
//   GET /api/search?q=tadasana
//
// This runs on the SERVER only. It returns JSON, not HTML.

import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

// Always run the query fresh; never serve a cached search result.
export const dynamic = "force-dynamic";

// In SQL's LIKE/ILIKE, "%" means "any run of characters" and "_" means "any
// single character". If a visitor searches for "50%", we want to find the
// literal text "50%", not "50 followed by anything". Putting a backslash in
// front tells PostgreSQL to treat the character literally.
function escapeForLike(text) {
  return text.replace(/[\\%_]/g, (character) => `\\${character}`);
}

export async function GET(request) {
  // request.url is the full address as a string, e.g.
  //   "http://localhost:3000/api/search?q=mountain"
  // The URL class parses it so we can read the part after the "?".
  const { searchParams } = new URL(request.url);

  // searchParams.get("q") reads ?q=... and returns null if it is absent.
  const query = (searchParams.get("q") ?? "").trim();

  // An empty search is not an error — it just has nothing to match.
  if (query === "") {
    return NextResponse.json({ query: "", count: 0, results: [] });
  }

  try {
    // "%mountain%" means "mountain appearing anywhere in the value".
    const pattern = `%${escapeForLike(query)}%`;

    // Raw SQL, for one specific reason: `benefits` is a PostgreSQL text[]
    // array. Prisma's normal filters can only test array elements for exact
    // equality (`has`), so they cannot find "balance" inside the benefit
    // "Improves balance". array_to_string() flattens the array into a single
    // string that ILIKE can scan.
    //
    // Everything else could have been written with the query builder:
    //
    //   prisma.asana.findMany({
    //     where: { OR: [
    //       { name:        { contains: query, mode: "insensitive" } },
    //       { englishName: { contains: query, mode: "insensitive" } },
    //       ...
    //     ]},
    //   })
    //
    // ILIKE is PostgreSQL's case-insensitive LIKE, which is what makes
    // "TADASANA", "Tadasana" and "tadasana" all match.
    //
    // SAFETY: this is a tagged template, not string concatenation. Prisma
    // sends `pattern` to PostgreSQL as a separate parameter, so a visitor
    // typing SQL into the search box cannot alter the query. Building the
    // same string with `+` would be a SQL-injection hole.
    // The SELECT list matches the homepage query in app/page.js exactly, so
    // AsanaCard can render either without caring which one produced the row.
    // The long detail fields are not returned here — they belong to the
    // detail page.
    //
    // The WHERE clause searches six fields. Deliberately NOT searched: steps,
    // precautions, contraindications and the other long-form content. They
    // would match almost any common word ("knee", "breathe") and drown the
    // results that actually matter.
    const results = await prisma.$queryRaw`
      SELECT id, slug, name, "englishName", level, category,
             description, "imageUrl"
      FROM "Asana"
      WHERE name                            ILIKE ${pattern}
         OR "englishName"                   ILIKE ${pattern}
         OR category                        ILIKE ${pattern}
         OR level                           ILIKE ${pattern}
         OR description                     ILIKE ${pattern}
         OR array_to_string(benefits, ' ')  ILIKE ${pattern}
      ORDER BY id ASC
    `;

    // NextResponse.json() converts the JavaScript object into JSON text and
    // sets the Content-Type: application/json header.
    return NextResponse.json({
      query,
      count: results.length,
      results,
    });
  } catch (error) {
    console.error(`Search failed for "${query}":`, error);

    // 500 tells the browser the server broke. The client checks for this.
    // The real error goes to the server log, never to the visitor — error
    // details can leak information about the database.
    return NextResponse.json(
      { error: "Search failed. Please try again." },
      { status: 500 }
    );
  }
}
