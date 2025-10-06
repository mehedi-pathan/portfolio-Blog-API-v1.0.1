import { type NextRequest, NextResponse } from "next/server"
import { getPostBySlug } from "@/lib/markdown"

export const revalidate = 3600 // Revalidate every hour (ISR)

/**
 * GET /api/posts/[slug]
 * Fetch a single blog post by slug
 */
export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params

    if (!slug) {
      return NextResponse.json({ error: "Slug parameter is required" }, { status: 400 })
    }

    const post = await getPostBySlug(slug)

    if (!post) {
      return NextResponse.json({ error: `Blog post not found: ${slug}` }, { status: 404 })
    }

    return NextResponse.json(post, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    })
  } catch (error) {
    console.error("Error fetching post:", error)
    return NextResponse.json({ error: "Failed to fetch blog post" }, { status: 500 })
  }
}
