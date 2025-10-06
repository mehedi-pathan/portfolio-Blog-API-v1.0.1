# Next.js Blog API - Netlify Deployment

A production-ready Next.js API for serving Markdown-based blog posts from local files, optimized for Netlify deployment.

## Features

- 📝 Markdown-based blog posts with frontmatter
- 📁 Local file system storage (no external dependencies)
- 🚀 ISR (Incremental Static Regeneration) for optimal performance
- 🏷️ Tag filtering and pagination support
- 📱 Responsive blog UI with dark mode
- 🔒 TypeScript-safe with proper error handling
- ☁️ Netlify-optimized with serverless functions

## Prerequisites

- Node.js 20+
- Netlify account

## Markdown File Structure

Blog posts are stored locally in `content/posts/`:

\`\`\`
your-project/
└── content/
    └── posts/
        ├── my-first-post.md
        ├── nextjs-tutorial.md
        └── typescript-tips.md
\`\`\`

### Frontmatter Format

Each Markdown file must include frontmatter:

\`\`\`markdown
---
title: "My First Blog Post"
date: "2025-01-15"
tags: ["nextjs", "typescript", "web-development"]
coverImage: "/placeholder.svg?height=400&width=800"
excerpt: "A brief description of your blog post"
---

Your blog post content goes here...
\`\`\`

## API Endpoints

### Get All Posts

\`\`\`
GET /api/posts
\`\`\`

Query parameters:
- `tag` - Filter by tag (e.g., `?tag=nextjs`)
- `page` - Page number (default: 1)
- `perPage` - Items per page (default: 10)
- `includeContent` - Include full content (default: false)

Example:
\`\`\`
GET /api/posts?tag=nextjs&page=1&perPage=5
\`\`\`

### Get Single Post

\`\`\`
GET /api/posts/[slug]
\`\`\`

Example:
\`\`\`
GET /api/posts/my-first-post
\`\`\`

## Deployment to Netlify

### Option 1: Deploy via Netlify CLI

\`\`\`bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
\`\`\`

### Option 2: Deploy via Git Integration

1. Push your code to GitHub
2. Go to Netlify dashboard
3. Click "Add new site" → "Import an existing project"
4. Connect your GitHub repository
5. Netlify will auto-detect Next.js and use settings from `netlify.toml`
6. Deploy!

### Option 3: Deploy via Drag & Drop

\`\`\`bash
# Build the project
npm run build

# Drag and drop the .next folder to Netlify
\`\`\`

## Local Development

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev
\`\`\`

Visit `http://localhost:3000` to see your blog.

## Adding New Blog Posts

1. Create a new `.md` file in `content/posts/` directory
2. Add proper frontmatter (see format above)
3. Write your content in Markdown
4. The API will automatically serve the new post

Example:

\`\`\`bash
# Create a new blog post
touch content/posts/my-new-post.md
\`\`\`

Then edit the file:

\`\`\`markdown
---
title: "My New Blog Post"
date: "2025-01-26"
tags: ["tutorial", "nextjs"]
coverImage: "/placeholder.svg?height=400&width=800"
excerpt: "This is my new blog post about Next.js"
---

# My New Blog Post

Content goes here...
\`\`\`

## Caching Strategy

- API routes use ISR with 1-hour revalidation
- Stale-while-revalidate for 24 hours
- Improves performance and reduces server load

## Integrating with Existing Portfolio

To integrate this API with your existing portfolio:

\`\`\`typescript
// In your portfolio page
async function fetchBlogPosts() {
  const response = await fetch('https://your-site.netlify.app/api/posts?perPage=3')
  const data = await response.json()
  return data.data
}

export default async function PortfolioPage() {
  const posts = await fetchBlogPosts()
  
  return (
    <section>
      <h2>Latest Blog Posts</h2>
      {posts.map(post => (
        <article key={post.slug}>
          <h3>{post.title}</h3>
          <p>{post.excerpt}</p>
          <a href={`/blog/${post.slug}`}>Read more</a>
        </article>
      ))}
    </section>
  )
}
\`\`\`

## Sample Blog Posts

The project includes three sample blog posts to help you get started:

1. **Getting Started with Next.js 15** - Introduction to Next.js features
2. **Mastering TypeScript** - Complete TypeScript guide
3. **Building RESTful APIs** - API best practices

Feel free to modify or delete these and add your own content!

## Troubleshooting

### Build Failures

- Ensure `content/posts/` directory exists
- Check that Markdown files have proper frontmatter
- Verify all dependencies are installed

### 404 Errors

- Check that Markdown files exist in `content/posts/`
- Verify frontmatter format is correct
- Ensure slug matches filename (without .md extension)

### Empty Response

- Make sure at least one `.md` file exists in `content/posts/`
- Check file permissions
- Verify frontmatter is properly formatted

## License

MIT
