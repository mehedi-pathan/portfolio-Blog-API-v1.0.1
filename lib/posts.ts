import fs from "fs/promises"
import path from "path"

const POSTS_DIRECTORY = path.join(process.cwd(), "content/posts")

export interface LocalFile {
  name: string
  path: string
}

/**
 * Fetch all Markdown files from the local content/posts directory
 */
export async function fetchMarkdownFiles(): Promise<LocalFile[]> {
  try {
    // Ensure directory exists
    await fs.mkdir(POSTS_DIRECTORY, { recursive: true })

    const files = await fs.readdir(POSTS_DIRECTORY)

    // Filter only .md files
    return files
      .filter((file) => file.endsWith(".md"))
      .map((file) => ({
        name: file,
        path: path.join(POSTS_DIRECTORY, file),
      }))
  } catch (error) {
    console.error("Error fetching Markdown files:", error)
    throw new Error("Failed to fetch blog posts from local directory")
  }
}

/**
 * Fetch a single Markdown file content by filename
 */
export async function fetchMarkdownFileContent(filename: string): Promise<string> {
  try {
    const filePath = path.join(POSTS_DIRECTORY, path.basename(filename))
    console.log("Fetching Markdown file:", filename, "from", POSTS_DIRECTORY)
    const content = await fs.readFile(filePath, "utf-8")
    return content
  } catch (error) {
    console.error(`Error fetching file ${filename}:`, error)
    throw new Error(`Failed to fetch blog post: ${filename}`)
  }
}
