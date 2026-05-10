// Utility to load blog posts from markdown files
export async function loadBlogPosts() {
    try {
        // Try to fetch blog data from a JSON file if available
        const response = await fetch('/api/blog-posts.json')
        if (response.ok) {
            return await response.json()
        }
    } catch (error) {
        console.log('Blog posts JSON not found, using default data')
    }

    // Fallback: return default blog posts
    return [
        {
            id: '20260510',
            title: 'Lucius is bullying me.',
            date: 'May 10, 2026',
            description: 'A personal reflection on challenges.',
            content: 'Lucius is bullying me.',
            path: '/blog/20260510.md'
        }
    ]
}

// Utility to load projects
export async function loadProjects() {
    try {
        // Try to fetch projects data from a JSON file if available
        const response = await fetch('/api/projects.json')
        if (response.ok) {
            return await response.json()
        }
    } catch (error) {
        console.log('Projects JSON not found, using default data')
    }

    // Fallback: return default projects
    return [
        {
            id: 'QuestAnalytics',
            title: 'QuestAnalytics',
            description: 'A compelling visual design project showcasing brand identity and creative direction.',
            path: '/projects/QuestAnalytics'
        },
        {
            id: 'Project1',
            title: 'Project One',
            description: 'An innovative digital experience combining user-centered design with brand storytelling.',
            path: '/projects/Project1'
        },
        {
            id: 'Project2',
            title: 'Project Two',
            description: 'Strategic design solution that elevated brand presence across multiple platforms.',
            path: '/projects/Project2'
        }
    ]
}

