import { useState, useEffect } from 'react'
import { loadBlogPosts, type BlogPost } from '../utils/dataLoader'

export default function Blog() {
    const [blogs, setBlogs] = useState<BlogPost[]>([])
    const [blogIndex, setBlogIndex] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchBlogs(): Promise<void> {
            try {
                const data = await loadBlogPosts()
                setBlogs(data)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching blog posts:', error)
                setLoading(false)
            }
        }

        fetchBlogs()
    }, [])

    const handleBlogPrev = (): void => {
        setBlogIndex((prev) => (prev === 0 ? blogs.length - 1 : prev - 1))
    }

    const handleBlogNext = (): void => {
        setBlogIndex((prev) => (prev === blogs.length - 1 ? 0 : prev + 1))
    }

    if (loading) {
        return (
            <section className="bg-white py-16 px-6">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-black mb-8">Blog</h2>
                    <p className="text-black">Loading blog posts...</p>
                </div>
            </section>
        )
    }

    return (
        <section className="bg-white py-16 px-6">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold text-black mb-8">Blog Posts</h2>

                {/* Blog Description */}
                <div className="mb-8 p-4 border-l-4 border-primary bg-gray-50">
                    <div className="text-sm font-semibold text-primary mb-2">LATEST POSTS</div>
                    <p className="text-black text-sm">Insights on design, branding, and creative strategy</p>
                </div>

                {/* Blog Carousel */}
                <div className="flex items-center gap-6">
                    {/* Left Arrow */}
                    <button
                        onClick={handleBlogPrev}
                        className="btn btn-circle btn-outline border-black text-black hover:bg-primary hover:border-primary hover:text-white"
                        aria-label="Previous blog"
                    >
                        ←
                    </button>

                    {/* Blog Cards */}
                    <div className="flex-1 grid grid-cols-2 gap-6">
                        {blogs.length > 0 ? (
                            [0, 1].map((offset) => {
                                const idx = (blogIndex + offset) % blogs.length
                                const blog = blogs[idx]
                                return (
                                    <div key={blog.id} className="border-2 border-black p-6 bg-white hover:bg-gray-50 transition">
                                        <div className="text-sm font-semibold text-primary mb-2">{blog.date}</div>
                                        <h3 className="text-lg font-bold text-black mb-2">{blog.title}</h3>
                                        <p className="text-black text-sm">{blog.description}</p>
                                        <a href={`/blog/${blog.id}`} className="inline-block mt-4 text-primary hover:underline text-sm font-medium">
                                            Read More →
                                        </a>
                                    </div>
                                )
                            })
                        ) : (
                            <p className="text-black col-span-2">No blog posts found.</p>
                        )}
                    </div>

                    {/* Right Arrow */}
                    <button
                        onClick={handleBlogNext}
                        className="btn btn-circle btn-outline border-black text-black hover:bg-primary hover:border-primary hover:text-white"
                        aria-label="Next blog"
                        disabled={blogs.length === 0}
                    >
                        →
                    </button>
                </div>
            </div>
        </section>
    )
}
