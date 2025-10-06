import Link from "next/link"
import { getAllPosts, getPostsMetadata } from "@/lib/markdown"

export const revalidate = 3600 // Revalidate every hour

export default async function BlogPage() {
  const posts = await getAllPosts()
  const postsMetadata = getPostsMetadata(posts)

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold">Blog</h1>

        <div className="grid gap-6">
          {postsMetadata.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block rounded-lg border border-border bg-card p-6 transition-colors hover:bg-accent"
            >
              <div className="mb-4 aspect-video overflow-hidden rounded-md bg-muted">
                <img
                  src={post.coverImage || "/placeholder.svg"}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>

              <h2 className="mb-2 text-2xl font-semibold group-hover:text-primary">{post.title}</h2>

              <p className="mb-4 text-muted-foreground">{post.excerpt}</p>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>

                <div className="flex gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
