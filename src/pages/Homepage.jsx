import { useState, useEffect } from 'react'

export default function Homepage() {
    const [projectIndex, setProjectIndex] = useState(0)
    const [blogIndex, setBlogIndex] = useState(0)
    const [displaySegments, setDisplaySegments] = useState([
        { text: "Hello, I'm Ryann.\n", style: 'light', display: '' },
        { text: "A Kansas City-based designer with a\n", style: 'light', display: '' },
        { text: "mind for ", style: 'light', display: '' },
        { text: "visual storytelling, social media marketing,", style: 'semibold-italic', display: '' },
        { text: " and ", style: 'light', display: '' },
        { text: "brand creation.", style: 'semibold-italic', display: '' },
    ])

    const textSegments = [
        { text: "Hello, I'm Ryann.\n", style: 'light' },
        { text: "A Kansas City-based designer with a mind for \n", style: 'light' },
        { text: "visual storytelling, social media marketing,", style: 'semibold-italic' },
        { text: " and ", style: 'light' },
        { text: "brand creation.", style: 'semibold-italic' },
    ]

    const totalLength = textSegments.reduce((acc, seg) => acc + seg.text.length, 0)

    useEffect(() => {
        let charIndex = 0
        let direction = 'forward'
        const typeSpeed = 50
        const eraseSpeed = 25
        const pauseTime = 10000
        let timeoutId

        const updateDisplay = (index) => {
            let currentChar = 0
            const newSegments = textSegments.map(segment => {
                const segmentLength = segment.text.length
                if (currentChar + segmentLength <= index) {
                    currentChar += segmentLength
                    return { ...segment, display: segment.text }
                } else if (currentChar < index) {
                    const charsToShow = index - currentChar
                    currentChar += segmentLength
                    return { ...segment, display: segment.text.slice(0, charsToShow) }
                } else {
                    return { ...segment, display: '' }
                }
            })
            setDisplaySegments(newSegments)
        }

        const typePhrase = () => {
            if (direction === 'forward') {
                if (charIndex <= totalLength) {
                    updateDisplay(charIndex)
                    charIndex += 1
                    timeoutId = window.setTimeout(typePhrase, typeSpeed)
                } else {
                    direction = 'backward'
                    timeoutId = window.setTimeout(typePhrase, pauseTime)
                }
            } else {
                if (charIndex >= 0) {
                    updateDisplay(charIndex)
                    charIndex -= 1
                    timeoutId = window.setTimeout(typePhrase, eraseSpeed)
                } else {
                    direction = 'forward'
                    charIndex = 0
                    timeoutId = window.setTimeout(typePhrase, pauseTime / 5)
                }
            }
        }

        typePhrase()
        return () => window.clearTimeout(timeoutId)
    }, [])

    const projects = [
        {
            id: 1,
            title: 'Project mine',
            description: 'A compelling visual design project showcasing brand identity and creative direction.'
        },
        {
            id: 2,
            title: 'Project Two',
            description: 'An innovative digital experience combining user-centered design with brand storytelling.'
        },
        {
            id: 3,
            title: 'Project Three',
            description: 'Strategic design solution that elevated brand presence across multiple platforms.'
        }
    ]

    const blogs = [
        {
            id: 1,
            date: 'May 2024',
            title: 'Design Trends',
            description: 'Exploring the latest trends in visual design and creative direction.'
        },
        {
            id: 2,
            date: 'April 2024',
            title: 'Brand Strategy',
            description: 'How to build a cohesive brand identity that resonates with your audience.'
        },
        {
            id: 3,
            date: 'March 2024',
            title: 'Social Media',
            description: 'Creating engaging content for social platforms and digital marketing.'
        }
    ]

    const handleProjectPrev = () => {
        setProjectIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1))
    }

    const handleProjectNext = () => {
        setProjectIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1))
    }

    const handleBlogPrev = () => {
        setBlogIndex((prev) => (prev === 0 ? blogs.length - 1 : prev - 1))
    }

    const handleBlogNext = () => {
        setBlogIndex((prev) => (prev === blogs.length - 1 ? 0 : prev + 1))
    }

    return (
        <>
            {/* Video Section */}
            <section className="bg-white py-12" >
                <div className="relative w-full flex justify-center">
                    <div className="w-full max-h-150 min-h-65 max-w-none bg-gray-200 overflow-hidden relative">
                        <video
                            className="w-full h-full object-cover"
                            autoPlay
                            loop
                            muted
                            playsInline
                        >
                            <source src="/SlimIntro.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                            <div className="text-center px-4">
                                <p className="text-white text-lg md:text-xl font-light whitespace-pre-wrap leading-relaxed">
                                    {displaySegments.map((segment, idx) => {
                                        let classNames = 'text-white font-light'
                                        if (segment.style === 'semibold-italic') {
                                            classNames = 'text-white font-semibold italic'
                                        }
                                        return <span key={idx} className={classNames}>{segment.display}</span>
                                    })}
                                    <span className="inline-block w-1 h-6 bg-white ml-2 animate-pulse" />
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            {/* Featured Projects */}
            < section id="projects" className="bg-white py-16 px-6" >
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-black mb-2">Featured Projects</h2>
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
            </section >

            {/* About Section */}
            < section id="about" className="bg-white py-16 px-6" >
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-3 gap-8">
                        {/* Logo/Icon placeholder */}
                        <div className="flex items-center justify-center">
                            <div className="w-32 h-32 border-4 border-black rounded-full flex items-center justify-center">
                                <span className="text-3xl font-bold text-primary">×</span>
                            </div>
                        </div>

                        {/* About Text */}
                        <div className="col-span-2">
                            <h2 className="text-4xl font-bold text-black mb-6">ABOUT</h2>
                            <div className="border-2 border-black p-8 bg-white">
                                <p className="text-black text-base leading-relaxed">
                                    A Kansas City-based designer with a mind for visual storytelling, social media marketing, and brand creation. With years of experience in design and creative direction, I help brands tell their stories through compelling visuals and strategic design.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            {/* Recent Blog */}
            < section className="bg-white py-16 px-6" >
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-black mb-8">Recent Blog</h2>

                    {/* Blog Date/Description */}
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
                            {[0, 1].map((offset) => {
                                const idx = (blogIndex + offset) % blogs.length
                                const blog = blogs[idx]
                                return (
                                    <div key={blog.id} className="border-2 border-black p-6 bg-white hover:bg-gray-50 transition">
                                        <div className="text-sm font-semibold text-primary mb-2">{blog.date}</div>
                                        <h3 className="text-lg font-bold text-black mb-2">{blog.title}</h3>
                                        <p className="text-black text-sm">{blog.description}</p>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Right Arrow */}
                        <button
                            onClick={handleBlogNext}
                            className="btn btn-circle btn-outline border-black text-black hover:bg-primary hover:border-primary hover:text-white"
                            aria-label="Next blog"
                        >
                            →
                        </button>
                    </div>
                </div>
            </section >
        </>
    )

}

