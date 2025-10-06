import { type NextRequest, NextResponse } from "next/server"
import { getAllPosts, getPostsMetadata, filterPostsByTag, paginatePosts } from "@/lib/markdown"

export const revalidate = 3600 // Revalidate every hour (ISR)

/**
 * GET /api/posts
 * Query params:
 * - tag: Filter by tag
 * - page: Page number (default: 1)
 * - perPage: Items per page (default: 10)
 * - includeContent: Include full content (default: false)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const tag = searchParams.get("tag")
    const page = Number.parseInt(searchParams.get("page") || "1", 10)
    const perPage = Number.parseInt(searchParams.get("perPage") || "10", 10)
    const includeContent = searchParams.get("includeContent") === "true"

    // Fetch all posts
    let posts = await getAllPosts()

    // Filter by tag if provided
    if (tag) {
      posts = filterPostsByTag(posts, tag)
    }

    // Get metadata only (exclude content) unless requested
    const postsData = includeContent ? posts : getPostsMetadata(posts)

    // Paginate results
    const result = paginatePosts(postsData, page, perPage)

    return NextResponse.json(result, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    })
  } catch (error) {
    console.error("Error fetching posts:", error)
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 })
  }
}
