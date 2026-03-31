import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { pathways } from '@/data/pathways'
import { PathwayCard } from '@/components/PathwayCard'
import { useI18n } from '@/i18n'
import type { PathwayCategory } from '@/types'

const ALL_CATEGORIES: PathwayCategory[] = [
  'special_admission',
  'art_sports',
  'international',
  'policy',
  'competition',
  'other',
]

export function PathwaysPage() {
  const { lang, categoryLabel } = useI18n()
  const zh = lang === 'zh'
  const [searchParams, setSearchParams] = useSearchParams()
  const initialCategory = searchParams.get('category') as PathwayCategory | null
  const [selectedCategory, setSelectedCategory] = useState<PathwayCategory | 'all'>(initialCategory || 'all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPathways = useMemo(() => {
    return pathways.filter((p) => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        return (
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
        )
      }
      return true
    })
  }, [selectedCategory, searchQuery])

  const handleCategoryChange = (cat: PathwayCategory | 'all') => {
    setSelectedCategory(cat)
    if (cat === 'all') {
      setSearchParams({})
    } else {
      setSearchParams({ category: cat })
    }
  }

  return (
    <div className="page-enter">
      <section className="detail-hero">
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: 8 }}>
            {zh ? '升学路径' : 'Admission Pathways'}
          </h1>
          <p style={{ opacity: 0.8, fontSize: '1.1rem', maxWidth: 600 }}>
            {zh
              ? '探索高考之外的 22+ 条升学路径'
              : 'Explore 22+ alternative routes to top universities beyond Gaokao'}
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
                  placeholder={zh ? '搜索升学路径...' : 'Search pathways...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="filter-group" style={{ minWidth: 200 }}>
                <label className="filter-label">{zh ? '类别' : 'Category'}</label>
                <select
                  className="filter-select"
                  value={selectedCategory}
                  onChange={(e) =>
                    handleCategoryChange(e.target.value as PathwayCategory | 'all')
                  }
                >
                  <option value="all">{zh ? '全部类别' : 'All Categories'}</option>
                  {ALL_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {categoryLabel(cat)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {filteredPathways.length === 0 ? (
            <div className="empty-state">
              <h3>{zh ? '未找到路径' : 'No pathways found'}</h3>
              <p>{zh ? '请调整搜索词或筛选条件' : 'Try adjusting your search or filter criteria'}</p>
            </div>
          ) : (
            <div className="grid grid-3">
              {filteredPathways.map((pathway) => (
                <PathwayCard key={pathway.id} pathway={pathway} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
