import { useState, useEffect } from 'react'
import { loadProjects, type ProjectData } from '../utils/dataLoader'
import QuestAnalytics from '../../projects/QuestAnalytics/Project'
import Project1 from '../../projects/Project1/Project'
import Project2 from '../../projects/Project2/Project'

const componentMap: Record<string, React.ComponentType> = {
    QuestAnalytics,
    Project1,
    Project2,
}

export default function Projects() {
    const [projects, setProjects] = useState<ProjectData[]>([])
    const [selectedProject, setSelectedProject] = useState<string | null>(null)
    const [ProjectComponent, setProjectComponent] = useState<React.ComponentType | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchProjects(): Promise<void> {
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

    useEffect(() => {
        if (!selectedProject) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setProjectComponent(null)
            return
        }
        const Component = componentMap[selectedProject]
        if (Component) {
            setProjectComponent(() => Component)
        } else {
            console.error('Project component not found:', selectedProject)
            setProjectComponent(null)
        }
    }, [selectedProject])

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

    if (ProjectComponent) {
        return (
            <div>
                <button
                    onClick={() => setSelectedProject(null)}
                    className="fixed top-4 left-4 z-10 btn btn-outline border-black text-black hover:bg-primary hover:border-primary hover:text-white"
                    aria-label="Back to projects"
                >
                    ← Back to Projects
                </button>
                <ProjectComponent />
            </div>
        )
    }

    return (
        <section className="bg-white py-16 px-6">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold text-black mb-8">All Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="border-2 border-black p-6 bg-white hover:bg-gray-50 transition cursor-pointer"
                            onClick={() => setSelectedProject(project.id)}
                        >
                            <h3 className="text-xl font-bold text-black mb-2">{project.title}</h3>
                            <p className="text-black text-sm">{project.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
