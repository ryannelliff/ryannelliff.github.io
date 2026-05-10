import { useState, useEffect } from 'react'
import { loadProjects } from '../utils/dataLoader'

export default function Projects() {
    const [projects, setProjects] = useState([])
    const [projectIndex, setProjectIndex] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchProjects() {
            try {
                const data = await loadProjects()
                setProjects(data)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching projects:', error)
                setLoading(false)
            }
        }

        fetchProjects()
    }, [])

    const handleProjectPrev = () => {
        setProjectIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1))
    }

    const handleProjectNext = () => {
        setProjectIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1))
    }

    if (loading) {
        return (
            <section className="bg-white py-16 px-6">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-black mb-8">Projects</h2>
                    <p className="text-black">Loading projects...</p>
                </div>
            </section>
        )
    }

    return (
        <section className="bg-white py-16 px-6">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold text-black mb-2">All Projects</h2>
                <div className="flex items-center gap-6 mt-8">
                    {/* Left Arrow */}
                    <button
                        onClick={handleProjectPrev}
                        className="btn btn-circle btn-outline border-black text-black hover:bg-primary hover:border-primary hover:text-white"
                        aria-label="Previous project"
                    >
                        ←
                    </button>

                    {/* Project Cards */}
                    <div className="flex-1 grid grid-cols-2 gap-6">
                        {[0, 1].map((offset) => {
                            const idx = (projectIndex + offset) % projects.length
                            const project = projects[idx]
                            return (
                                <div key={project.id} className="border-2 border-black p-6 bg-white hover:bg-gray-50 transition">
                                    <h3 className="text-xl font-bold text-black mb-2">{project.title}</h3>
                                    <p className="text-black text-sm">{project.description}</p>
                                    {project.path && (
                                        <a href={project.path} className="inline-block mt-4 text-primary hover:underline text-sm font-medium">
                                            View Project →
                                        </a>
                                    )}
                                </div>
                            )
                        })}
                    </div>

                    {/* Right Arrow */}
                    <button
                        onClick={handleProjectNext}
                        className="btn btn-circle btn-outline border-black text-black hover:bg-primary hover:border-primary hover:text-white"
                        aria-label="Next project"
                    >
                        →
                    </button>
                </div>
            </div>
        </section>
    )
}
