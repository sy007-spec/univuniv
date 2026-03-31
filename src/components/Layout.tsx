import { useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { useI18n } from '@/i18n'

export function Layout() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const { lang, setLang } = useI18n()
  const zh = lang === 'zh'
  const NAV_ITEMS = [
    { path: '/', label: zh ? '首页' : 'Home' },
    { path: '/pathways', label: zh ? '升学路径' : 'Pathways' },
    { path: '/programs', label: zh ? '项目库' : 'Programs' },
    { path: '/schools', label: zh ? '院校库' : 'Schools' },
    { path: '/news', label: zh ? '资讯' : 'News' },
  ]

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

          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button
              className="btn btn-sm"
              style={{
                color: 'white',
                border: '1px solid rgba(255,255,255,0.35)',
                background: zh ? 'rgba(255,255,255,0.18)' : 'transparent',
              }}
              onClick={() => setLang('zh')}
            >
              中文
            </button>
            <button
              className="btn btn-sm"
              style={{
                color: 'white',
                border: '1px solid rgba(255,255,255,0.35)',
                background: zh ? 'transparent' : 'rgba(255,255,255,0.18)',
              }}
              onClick={() => setLang('en')}
            >
              EN
            </button>

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
                {zh
                  ? '弥合升学信息差，帮助更多家庭看到高考之外的多元升学路径。'
                  : 'Bridging admission information gaps and helping families discover diverse pathways.'}
              </p>
            </div>
            <div className="footer-section">
              <h4>{zh ? '路径' : 'Pathways'}</h4>
              <Link to="/pathways">{zh ? '全部路径' : 'All Pathways'}</Link>
              <Link to="/programs">{zh ? '项目库' : 'Programs'}</Link>
              <Link to="/schools">{zh ? '院校库' : 'Schools'}</Link>
            </div>
            <div className="footer-section">
              <h4>{zh ? '资源' : 'Resources'}</h4>
              <Link to="/news">{zh ? '资讯更新' : 'News & Updates'}</Link>
              <Link to="/pathways">{zh ? '路径指南' : 'Pathway Guide'}</Link>
            </div>
          </div>
          <div className="footer-bottom">
            © {new Date().getFullYear()} UniVerse. {zh ? '数据仅供参考。' : 'Data for reference only.'}
          </div>
        </div>
      </footer>
    </>
  )
}
