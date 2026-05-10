export interface BlogPost {
    id: string
    title: string
    date: string
    description: string
    path: string
}

export interface ProjectData {
    id: string
    title: string
    description: string
    pagePath: string
}

function parseFrontmatter(raw: string): { attrs: Record<string, string>; content: string } {
    const fmMatch = raw.match(/^---\s*([\s\S]*?)\s*---\s*([\s\S]*)$/)
    const attrs: Record<string, string> = {}
    let content = raw
    if (fmMatch) {
        const fm = fmMatch[1]
        content = fmMatch[2].trim()
        fm.split(/\r?\n/).forEach((line) => {
            const idx = line.indexOf(':')
            if (idx > -1) {
                const key = line.slice(0, idx).trim()
                let value = line.slice(idx + 1).trim()
                if ((value.startsWith("\"") && value.endsWith("\"")) || (value.startsWith("'") && value.endsWith("'"))) {
                    value = value.slice(1, -1)
                }
                attrs[key] = value
            }
        })
    }
    return { attrs, content }
}

// Load blog posts by scanning the local `blog/` folder and reading frontmatter
export async function loadBlogPosts(): Promise<BlogPost[]> {
    // import all markdown files under the project's blog folder as raw strings
    const modules = import.meta.glob('../../blog/*.md?raw', { eager: true }) as Record<string, string>
    const posts: BlogPost[] = Object.keys(modules).map((filePath) => {
        const raw = modules[filePath]
        const { attrs } = parseFrontmatter(raw)
        const fileName = filePath.split('/').pop() || ''
        const id = fileName.replace(/\.md$/, '')
        // filename is YYYYMMDD; turn into a readable date where possible
        const date = /^\d{8}$/.test(id)
            ? (() => {
                const y = parseInt(id.slice(0, 4), 10)
                const m = parseInt(id.slice(4, 6), 10) - 1
                const d = parseInt(id.slice(6, 8), 10)
                return new Date(y, m, d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
            })()
            : id

        return {
            id,
            title: attrs.title ?? 'Untitled',
            date,
            description: attrs.description ?? '',
            path: `/blog/${fileName}`,
        }
    })

    // newest first (by filename/date)
    posts.sort((a, b) => b.id.localeCompare(a.id))
    return posts
}

// Load projects by scanning `projects/*/metadata.json` files
export async function loadProjects(): Promise<ProjectData[]> {
    // eager import metadata JSON files
    const modules = import.meta.glob('../../projects/**/metadata.json', { eager: true }) as Record<string, any>
    const projects: ProjectData[] = Object.keys(modules).map((filePath) => {
        const mod = modules[filePath]
        const meta = (mod && (mod.default ?? mod)) || {}
        const parts = filePath.split('/')
        const id = parts[parts.length - 2]
        const rawPagePath = meta.pagePath ?? 'Project.tsx'
        const pagePathNormalized = rawPagePath.startsWith('/') ? rawPagePath.slice(1) : rawPagePath
        const pagePath = `/projects/${id}/${pagePathNormalized}`
        return {
            id,
            title: meta.title ?? id,
            description: meta.description ?? '',
            pagePath,
        }
    })

    // sort alphabetically by title
    projects.sort((a, b) => a.title.localeCompare(b.title))
    return projects
}

