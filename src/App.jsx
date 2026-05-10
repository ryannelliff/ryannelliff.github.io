import { useState, useEffect } from 'react'
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
    const handleLinkClick = (e) => {
      const link = e.target.closest('a[href]')
      if (link && link.getAttribute('href').startsWith('/')) {
        e.preventDefault()
        const href = link.getAttribute('href')
        setCurrentPage(href)
        window.history.pushState({}, '', href)
      }
    }

    document.addEventListener('click', handleLinkClick)
    return () => document.removeEventListener('click', handleLinkClick)
  }, [])

  const renderPage = () => {
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
