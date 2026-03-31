import { useState, useMemo } from 'react'
import { schools } from '@/data/schools'
import { programs } from '@/data/programs'
import { SchoolCard } from '@/components/SchoolCard'
import { useI18n } from '@/i18n'
import type { SchoolType } from '@/types'

const SCHOOL_TYPES: SchoolType[] = [
  'comprehensive',
  'science_tech',
  'normal',
  'language',
  'art',
  'medical',
  'hk_macau',
  'overseas',
]

export function SchoolsPage() {
  const { lang, schoolTypeLabel } = useI18n()
  const zh = lang === 'zh'
  const [searchQuery, setSearchQuery] = useState('')
  const [schoolType, setSchoolType] = useState<SchoolType | 'all'>('all')
  const [tierFilter, setTierFilter] = useState<'all' | 'c9' | '985' | '211' | 'dfc'>('all')
  const [qsFilter, setQsFilter] = useState<number>(0)

  const filteredSchools = useMemo(() => {
    return schools.filter((s) => {
      if (schoolType !== 'all' && s.type !== schoolType) return false
      if (tierFilter === 'c9' && !s.isC9) return false
      if (tierFilter === '985' && !s.is985) return false
      if (tierFilter === '211' && !s.is211) return false
      if (tierFilter === 'dfc' && !s.isDoubleFirstClass) return false
      if (qsFilter && (!s.qsRanking || s.qsRanking > qsFilter)) return false

      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        return (
          s.name.toLowerCase().includes(q) ||
          s.nameEn?.toLowerCase().includes(q) ||
          s.city.toLowerCase().includes(q) ||
          s.province.toLowerCase().includes(q)
        )
      }
      return true
    })
  }, [searchQuery, schoolType, tierFilter, qsFilter])

  const getProgramCount = (schoolId: string) =>
    programs.filter((p) => p.schoolId === schoolId && p.year === 2026).length

  return (
    <div className="page-enter">
      <section className="detail-hero">
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: 8 }}>
            {zh ? '院校库' : 'Schools'}
          </h1>
          <p style={{ opacity: 0.8, fontSize: '1.1rem', maxWidth: 600 }}>
            {zh ? '按类型、层级、QS 排名等筛选院校' : 'Browse universities by type, tier, QS ranking, and more'}
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
                  placeholder={zh ? '学校名称、城市...' : 'School name, city...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="filter-group" style={{ minWidth: 160 }}>
                <label className="filter-label">{zh ? '类型' : 'Type'}</label>
                <select
                  className="filter-select"
                  value={schoolType}
                  onChange={(e) =>
                    setSchoolType(e.target.value as SchoolType | 'all')
                  }
                >
                  <option value="all">{zh ? '全部类型' : 'All Types'}</option>
                  {SCHOOL_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {schoolTypeLabel(t)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="filter-group" style={{ minWidth: 140 }}>
                <label className="filter-label">Tier</label>
                <select
                  className="filter-select"
                  value={tierFilter}
                  onChange={(e) =>
                    setTierFilter(
                      e.target.value as 'all' | 'c9' | '985' | '211' | 'dfc',
                    )
                  }
                >
                  <option value="all">All Tiers</option>
                  <option value="c9">C9</option>
                  <option value="985">985</option>
                  <option value="211">211</option>
                  <option value="dfc">Double First Class</option>
                </select>
              </div>
              <div className="filter-group" style={{ minWidth: 150 }}>
                <label className="filter-label">QS Ranking</label>
                <select
                  className="filter-select"
                  value={qsFilter}
                  onChange={(e) => setQsFilter(Number(e.target.value))}
                >
                  <option value="0">No Limit</option>
                  <option value="50">Top 50</option>
                  <option value="100">Top 100</option>
                  <option value="200">Top 200</option>
                  <option value="500">Top 500</option>
                </select>
              </div>
            </div>
          </div>

          <div
            style={{
              marginBottom: 16,
              fontSize: '0.9rem',
              color: 'var(--color-text-secondary)',
            }}
          >
            {zh ? '共找到' : 'Showing'} <strong>{filteredSchools.length}</strong> {zh ? '所学校' : `school${filteredSchools.length !== 1 ? 's' : ''}`}
          </div>

          {filteredSchools.length === 0 ? (
            <div className="empty-state">
              <h3>{zh ? '未找到院校' : 'No schools found'}</h3>
              <p>{zh ? '请调整搜索词或筛选条件' : 'Try adjusting your search or filter criteria'}</p>
            </div>
          ) : (
            <div className="grid grid-3">
              {filteredSchools.map((school) => (
                <div key={school.id}>
                  <SchoolCard school={school} />
                  <div
                    style={{
                      textAlign: 'center',
                      fontSize: '0.8rem',
                      color: 'var(--color-text-muted)',
                      marginTop: 8,
                    }}
                  >
                    {getProgramCount(school.id)} {zh ? '个活跃项目（2026）' : `active program${getProgramCount(school.id) !== 1 ? 's' : ''} in 2026`}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
