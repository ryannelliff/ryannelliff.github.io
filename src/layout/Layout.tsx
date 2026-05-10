import type { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-white text-black font-sans flex flex-col">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="navbar px-6 py-4 max-w-6xl mx-auto">
                    <div className="flex-1">
                        <a href="/" className="text-2xl font-bold text-primary hover:text-primary-dark transition">Ryann Elliff</a>
                    </div>
                    <div className="flex-none gap-8">
                        <a href="/blog" className="text-black hover:text-primary font-medium transition">Blog</a>
                        <a href="/projects" className="text-black hover:text-primary font-medium transition">Projects</a>
                        <a href="/about" className="text-black hover:text-primary font-medium transition">About</a>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 py-8 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <p className="text-black text-sm">© 2026 Ryann Elliff. All rights reserved.</p>
                    <div className="flex justify-center gap-6 mt-4">
                        <a href="https://www.linkedin.com/in/ryann-elliff-mba-5b431624a/" className="text-primary hover:text-primary-dark font-medium text-sm transition">LinkedIn</a>
                        <a href="https://www.instagram.com/ryannelliff/" className="text-primary hover:text-primary-dark font-medium text-sm transition">Instagram</a>
                        <a href="mailto:reelliff@gmail.com" className="text-primary hover:text-primary-dark font-medium text-sm transition">Email</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}