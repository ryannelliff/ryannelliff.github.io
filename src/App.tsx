import { useState, useEffect, type ReactNode } from 'react'
import Layout from './layout/Layout'
import Homepage from './pages/Homepage'
import Blog from './pages/Blog'
import Projects from './pages/Projects'
import About from './pages/About'

function App() {
  const [currentPage, setCurrentPage] = useState('/')

  // Handle browser navigation
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname
      setCurrentPage(path)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // Handle navigation links
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as Element | null
      const link = target?.closest('a[href]') as HTMLAnchorElement | null
      if (link && link.getAttribute('href')?.startsWith('/')) {
        e.preventDefault()
        const href = link.getAttribute('href')
        if (href) {
          setCurrentPage(href)
          window.history.pushState({}, '', href)
        }
      }
    }

    document.addEventListener('click', handleLinkClick)
    return () => document.removeEventListener('click', handleLinkClick)
  }, [])

  const renderPage = (): ReactNode => {
    switch (currentPage) {
      case '/blog':
        return <Blog />
      case '/projects':
        return <Projects />
      case '/about':
        return <About />
      case '/':
      default:
        return <Homepage />
    }
  }

  return (
    <Layout>
      {renderPage()}
    </Layout>
  )
}

export default App
