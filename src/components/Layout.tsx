import { useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'

const NAV_ITEMS = [
  { path: '/', label: 'Home' },
  { path: '/pathways', label: 'Pathways' },
  { path: '/programs', label: 'Programs' },
  { path: '/schools', label: 'Schools' },
  { path: '/news', label: 'News' },
]

export function Layout() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <header className="header">
        <div className="container header-inner">
          <Link to="/" className="header-logo">
            <svg viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="url(#logo-gradient)" />
              <path d="M16 6L8 12v8l8 6 8-6v-8L16 6z" fill="white" fillOpacity="0.9" />
              <path d="M16 14v8M12 16h8" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <defs>
                <linearGradient id="logo-gradient" x1="0" y1="0" x2="32" y2="32">
                  <stop stopColor="#3b82f6" />
                  <stop offset="1" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
            UniVerse
          </Link>

          <nav className="header-nav">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={location.pathname === item.path ? 'active' : ''}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {mobileOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <nav className="mobile-nav">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={location.pathname === item.path ? 'active' : ''}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="header-logo" style={{ color: 'white' }}>
                <svg viewBox="0 0 32 32" fill="none" width="28" height="28">
                  <rect width="32" height="32" rx="8" fill="url(#logo-gradient-footer)" />
                  <path d="M16 6L8 12v8l8 6 8-6v-8L16 6z" fill="white" fillOpacity="0.9" />
                  <path d="M16 14v8M12 16h8" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <defs>
                    <linearGradient id="logo-gradient-footer" x1="0" y1="0" x2="32" y2="32">
                      <stop stopColor="#3b82f6" />
                      <stop offset="1" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
                UniVerse
              </div>
              <p>
                Bridging the information gap in Chinese higher education admissions. 
                Helping 95%+ of families discover diverse pathways to top universities.
              </p>
            </div>
            <div className="footer-section">
              <h4>Pathways</h4>
              <Link to="/pathways">All Pathways</Link>
              <Link to="/programs">Programs</Link>
              <Link to="/schools">Schools</Link>
            </div>
            <div className="footer-section">
              <h4>Resources</h4>
              <Link to="/news">News & Updates</Link>
              <Link to="/pathways">Pathway Guide</Link>
            </div>
            <div className="footer-section">
              <h4>About</h4>
              <Link to="/">About UniVerse</Link>
              <Link to="/">Contact</Link>
            </div>
          </div>
          <div className="footer-bottom">
            © {new Date().getFullYear()} UniVerse. All rights reserved. Data for reference only.
          </div>
        </div>
      </footer>
    </>
  )
}
