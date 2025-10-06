import Link from "next/link"

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
      <div className="text-center">
        <h1 className="mb-4 text-5xl font-bold">Blog API</h1>
        <p className="mb-8 text-xl text-muted-foreground">Markdown-based blog system with Next.js</p>

        <div className="flex gap-4 justify-center">
          <Link
            href="/blog"
            className="rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            View Blog
          </Link>
          <Link
            href="/api/posts"
            className="rounded-lg border border-border bg-card px-6 py-3 font-semibold transition-colors hover:bg-accent"
          >
            API Docs
          </Link>
        </div>

        <div className="mt-12 rounded-lg border border-border bg-card p-6 text-left">
          <h2 className="mb-4 text-2xl font-semibold">API Endpoints</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <code className="rounded bg-muted px-2 py-1">GET /api/posts</code> - Get all posts
            </li>
            <li>
              <code className="rounded bg-muted px-2 py-1">GET /api/posts?tag=nextjs</code> - Filter by tag
            </li>
            <li>
              <code className="rounded bg-muted px-2 py-1">GET /api/posts?page=2</code> - Pagination
            </li>
            <li>
              <code className="rounded bg-muted px-2 py-1">GET /api/posts/[slug]</code> - Get single post
            </li>
          </ul>
        </div>
      </div>
    </main>
  )
}
