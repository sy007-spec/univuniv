import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { newsItems } from '@/data/news'
import { pathways } from '@/data/pathways'
import { useI18n } from '@/i18n'

const CATEGORIES = [...new Set(newsItems.map((n) => n.category))]

export function NewsPage() {
  const { lang } = useI18n()
  const zh = lang === 'zh'
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredNews = useMemo(() => {
    return newsItems.filter((item) => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory)
        return false
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        return (
          item.title.toLowerCase().includes(q) ||
          item.summary.toLowerCase().includes(q)
        )
      }
      return true
    })
  }, [selectedCategory, searchQuery])

  return (
    <div className="page-enter">
      <section className="detail-hero">
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: 8 }}>
            {zh ? '资讯更新' : 'News & Updates'}
          </h1>
          <p style={{ opacity: 0.8, fontSize: '1.1rem', maxWidth: 600 }}>
            {zh ? '追踪最新升学政策、项目发布与关键时间节点' : 'Stay updated with policies, launches, and deadlines'}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="filter-bar">
            <div className="filter-row">
              <div className="filter-group" style={{ minWidth: 240 }}>
                <label className="filter-label">{zh ? '搜索' : 'Search'}</label>
                <input
                  className="filter-input"
                  type="text"
                  placeholder={zh ? '搜索资讯...' : 'Search news...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="filter-group" style={{ minWidth: 180 }}>
                <label className="filter-label">{zh ? '类别' : 'Category'}</label>
                <select
                  className="filter-select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">{zh ? '全部类别' : 'All Categories'}</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {filteredNews.length === 0 ? (
            <div className="empty-state">
              <h3>{zh ? '未找到资讯' : 'No news found'}</h3>
              <p>{zh ? '请调整搜索词或筛选条件' : 'Try adjusting your search or filter criteria'}</p>
            </div>
          ) : (
            <div>
              {filteredNews.map((item) => {
                const relatedPathway = pathways.find(
                  (p) => p.id === item.pathwayId,
                )
                return (
                  <div key={item.id} className="news-item">
                    <div className="news-date">
                      {new Date(item.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                      {' · '}
                      <span className="tag tag-neutral">{item.category}</span>
                      {item.source && (
                        <span
                          style={{
                            marginLeft: 8,
                            fontSize: '0.8rem',
                            color: 'var(--color-text-muted)',
                          }}
                        >
                          {zh ? '来源' : 'Source'}: {item.source}
                        </span>
                      )}
                    </div>
                    <div className="news-title">{item.title}</div>
                    <div className="news-summary">{item.summary}</div>
                    {relatedPathway && (
                      <div style={{ marginTop: 8 }}>
                        <Link
                          to={`/pathways/${relatedPathway.id}`}
                          className="btn btn-sm btn-outline"
                        >
                          {zh ? '相关路径' : 'Related'}: {relatedPathway.name} →
                        </Link>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
