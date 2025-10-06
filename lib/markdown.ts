import matter from "gray-matter"
import type { BlogPost, BlogPostMetadata } from "./types"
import { fetchMarkdownFiles, fetchMarkdownFileContent } from "./posts"

/**
 * Parse Markdown content with frontmatter
 */
function parseMarkdown(content: string, slug: string): BlogPost {
  const { data, content: markdownContent } = matter(content)

  return {
    slug: data.slug || slug,
    title: data.title || "Untitled",
    date: data.date || new Date().toISOString().split("T")[0],
    tags: data.tags || [],
    coverImage: data.coverImage || "/placeholder.svg?height=400&width=800",
    excerpt: data.excerpt || "",
    content: markdownContent,
  }
}

/**
 * Fetch all blog posts from local
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  const files = await fetchMarkdownFiles()

  const posts = await Promise.all(
    files.map(async (file) => {
      const content = await fetchMarkdownFileContent(file.path)
      const slug = file.name.replace(/\.md$/, "")
      return parseMarkdown(content, slug)
    }),
  )

  // Sort by date (newest first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

/**
 * Fetch a single blog post by slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const filename = `${slug}.md`
    const content = await fetchMarkdownFileContent(filename)
    return parseMarkdown(content, slug)
  } catch (error) {
    console.error(`Post not found: ${slug}`, error)
    return null
  }
}

/**
 * Get all posts metadata (without content)
 */
export function getPostsMetadata(posts: BlogPost[]): BlogPostMetadata[] {
  return posts.map(({ content, ...metadata }) => metadata)
}

/**
 * Filter posts by tag
 */
export function filterPostsByTag(posts: BlogPost[], tag: string): BlogPost[] {
  return posts.filter((post) => post.tags.some((t) => t.toLowerCase() === tag.toLowerCase()))
}

/**
 * Paginate posts
 */
export function paginatePosts<T>(posts: T[], page = 1, perPage = 10): { data: T[]; pagination: any } {
  const total = posts.length
  const totalPages = Math.ceil(total / perPage)
  const start = (page - 1) * perPage
  const end = start + perPage

  return {
    data: posts.slice(start, end),
    pagination: {
      page,
      perPage,
      total,
      totalPages,
    },
  }
}
