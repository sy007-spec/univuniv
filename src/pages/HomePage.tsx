import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { pathways } from '@/data/pathways'
import { programs } from '@/data/programs'
import { schools } from '@/data/schools'
import { newsItems } from '@/data/news'
import { PathwayCard } from '@/components/PathwayCard'
import { useI18n } from '@/i18n'
import type { PathwayCategory } from '@/types'

const CATEGORIES: PathwayCategory[] = [
  'special_admission',
  'art_sports',
  'international',
  'policy',
  'competition',
]

export function HomePage() {
  const { lang, categoryLabel } = useI18n()
  const zh = lang === 'zh'
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/programs?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const uniqueSchoolCount = new Set(programs.map((p) => p.schoolId)).size
  const currentYearPrograms = programs.filter((p) => p.year === 2026)

  return (
    <div className="page-enter">
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>
              {zh ? (
                <>发现通往名校的 <span className="gradient-text">22+ 条路径</span></>
              ) : (
                <>Discover <span className="gradient-text">22+ Pathways</span> to China's Top Universities</>
              )}
            </h1>
            <p>
              {zh
                ? '95% 家长以为高考是唯一道路。实际上，名校中有大量学生通过多元升学路径录取。我们帮助你快速看清每一种机会。'
                : '95% of parents think Gaokao is the only way. We help you discover every alternative opportunity.'}
            </p>

            <form onSubmit={handleSearch} className="search-box">
              <span className="search-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </span>
              <input
                type="text"
                placeholder={zh ? '搜索路径、学校、项目...' : 'Search pathways, schools, programs...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>

            <div className="hero-stats">
              <div className="hero-stat">
                <div className="hero-stat-number">{pathways.length}+</div>
                <div className="hero-stat-label">{zh ? '升学路径' : 'Pathways'}</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-number">{schools.length}</div>
                <div className="hero-stat-label">{zh ? '学校' : 'Schools'}</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-number">{currentYearPrograms.length}</div>
                <div className="hero-stat-label">{zh ? '2026项目' : '2026 Programs'}</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-number">{uniqueSchoolCount}</div>
                <div className="hero-stat-label">{zh ? '院校数量' : 'Universities'}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Quick Nav */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{zh ? '按类别浏览' : 'Explore by Category'}</h2>
            <p className="section-subtitle">
              {zh ? '高考之外，还有更多升学通道' : 'Beyond Gaokao — discover the full spectrum of admission pathways'}
            </p>
          </div>
          <div className="grid grid-3" style={{ gap: 12 }}>
            {CATEGORIES.map((cat) => {
              const count = pathways.filter((p) => p.category === cat).length
              return (
                <Link
                  key={cat}
                  to={`/pathways?category=${cat}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    className="card"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 16,
                      padding: '16px 20px',
                    }}
                  >
                    <div className={`category-icon ${cat}`}>
                      {cat === 'special_admission' && '🎯'}
                      {cat === 'art_sports' && '🎨'}
                      {cat === 'international' && '🌍'}
                      {cat === 'policy' && '📋'}
                      {cat === 'competition' && '🏆'}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>
                        {categoryLabel(cat)}
                      </div>
                      <div
                        style={{
                          fontSize: '0.8rem',
                          color: 'var(--color-text-muted)',
                        }}
                      >
                        {zh ? `${count} 条路径` : `${count} pathway${count !== 1 ? 's' : ''}`}
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Pathways */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{zh ? '热门路径' : 'Featured Pathways'}</h2>
            <p className="section-subtitle">
              {zh ? '2026 年高关注度多元升学路线' : 'Most popular alternative admission routes for 2026'}
            </p>
          </div>
          <div className="grid grid-3">
            {pathways.slice(0, 6).map((pathway) => (
              <PathwayCard key={pathway.id} pathway={pathway} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <Link to="/pathways" className="btn btn-outline">
              {zh ? '查看全部路径' : 'View All Pathways →'}
            </Link>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="section" style={{ background: 'var(--color-bg-card)' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{zh ? '最新动态' : 'Latest Updates'}</h2>
            <p className="section-subtitle">
              {zh ? '及时了解最新政策与录取资讯' : 'Stay informed with the latest admission news and policy changes'}
            </p>
          </div>
          <div className="grid grid-2">
            {newsItems.slice(0, 4).map((item) => (
              <div key={item.id} className="news-item" style={{ padding: '0 0 20px' }}>
                <div className="news-date">
                  {new Date(item.date).toLocaleDateString(zh ? 'zh-CN' : 'en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                  {' · '}
                  <span className="tag tag-neutral" style={{ marginLeft: 4 }}>
                    {item.category}
                  </span>
                </div>
                <div className="news-title">{item.title}</div>
                <div className="news-summary">{item.summary}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <Link to="/news" className="btn btn-outline">
              {zh ? '查看全部资讯' : 'All News →'}
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="section"
        style={{
          background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <div className="container">
          <h2
            style={{
              fontSize: '2.25rem',
              fontWeight: 800,
              marginBottom: 12,
              letterSpacing: '-0.02em',
            }}
          >
            {zh ? '不要让信息差限制孩子的未来' : "Don't Let Information Gaps Limit Your Child's Future"}
          </h2>
          <p
            style={{
              fontSize: '1.1rem',
              opacity: 0.85,
              maxWidth: 600,
              margin: '0 auto 32px',
            }}
          >
            {zh ? '现在开始探索多元升学路径，按年份、学校、QS、学费等维度精准筛选。' : 'Start exploring alternative pathways today.'}
          </p>
          <div className="btn-group" style={{ justifyContent: 'center' }}>
            <Link to="/programs" className="btn btn-lg" style={{ background: 'white', color: 'var(--color-primary)' }}>
              {zh ? '浏览项目' : 'Browse Programs'}
            </Link>
            <Link to="/pathways" className="btn btn-lg btn-secondary">
              {zh ? '探索路径' : 'Explore Pathways'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
