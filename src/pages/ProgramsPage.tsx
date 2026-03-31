import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { programs } from '@/data/programs'
import { schools } from '@/data/schools'
import { pathways } from '@/data/pathways'
import { ProgramCard } from '@/components/ProgramCard'
import type { ProgramFormat } from '@/types'

const YEARS = [2026, 2025]
const FORMATS: ProgramFormat[] = ['4+0', '2+2', '3+1', '1+3', '4yr', '3yr', '5yr']

export function ProgramsPage() {
  const [searchParams] = useSearchParams()
  const initialQuery = searchParams.get('q') || ''

  const [filters, setFilters] = useState({
    year: 2026,
    schoolId: '',
    pathwayId: '',
    format: '' as ProgramFormat | '',
    location: '' as 'domestic' | 'overseas' | 'both' | '',
    subjectType: '' as 'science' | 'arts' | 'both' | '',
    beforeGaokao: false,
    afterGaokao: false,
    freshGraduateOnly: false,
    maxTuition: 0,
    qsRankingMax: 0,
    is985: false,
    is211: false,
    isC9: false,
    searchQuery: initialQuery,
  })

  const filteredPrograms = useMemo(() => {
    return programs.filter((p) => {
      if (filters.year && p.year !== filters.year) return false
      if (filters.schoolId && p.schoolId !== filters.schoolId) return false
      if (filters.pathwayId && p.pathwayId !== filters.pathwayId) return false
      if (filters.format && p.format !== filters.format) return false
      if (filters.location && p.location !== filters.location) return false
      if (filters.subjectType && p.subjectType !== filters.subjectType) return false
      if (filters.beforeGaokao && !p.beforeGaokao) return false
      if (filters.afterGaokao && !p.afterGaokao) return false
      if (filters.freshGraduateOnly && !p.freshGraduateOnly) return false
      if (filters.qsRankingMax && (!p.qsRanking || p.qsRanking > filters.qsRankingMax))
        return false

      if (filters.maxTuition) {
        let tuitionInCNY = p.tuitionPerYear
        if (p.tuitionCurrency === 'HKD') tuitionInCNY = p.tuitionPerYear * 0.92
        if (p.tuitionCurrency === 'USD') tuitionInCNY = p.tuitionPerYear * 7.2
        if (p.tuitionCurrency === 'GBP') tuitionInCNY = p.tuitionPerYear * 9.1
        if (p.tuitionCurrency === 'EUR') tuitionInCNY = p.tuitionPerYear * 7.8
        if (tuitionInCNY > filters.maxTuition) return false
      }

      if (filters.is985 || filters.is211 || filters.isC9) {
        const school = schools.find((s) => s.id === p.schoolId)
        if (!school) return false
        if (filters.is985 && !school.is985) return false
        if (filters.is211 && !school.is211) return false
        if (filters.isC9 && !school.isC9) return false
      }

      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase()
        const school = schools.find((s) => s.id === p.schoolId)
        const pathway = pathways.find((pw) => pw.id === p.pathwayId)
        return (
          p.name.toLowerCase().includes(q) ||
          school?.name.toLowerCase().includes(q) ||
          school?.nameEn?.toLowerCase().includes(q) ||
          pathway?.name.toLowerCase().includes(q) ||
          p.availableMajors.some((m) => m.toLowerCase().includes(q)) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
        )
      }

      return true
    })
  }, [filters])

  const updateFilter = <K extends keyof typeof filters>(
    key: K,
    value: (typeof filters)[K],
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const resetFilters = () => {
    setFilters({
      year: 2026,
      schoolId: '',
      pathwayId: '',
      format: '',
      location: '',
      subjectType: '',
      beforeGaokao: false,
      afterGaokao: false,
      freshGraduateOnly: false,
      maxTuition: 0,
      qsRankingMax: 0,
      is985: false,
      is211: false,
      isC9: false,
      searchQuery: '',
    })
  }

  return (
    <div className="page-enter">
      <section className="detail-hero">
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: 8 }}>
            Programs
          </h1>
          <p style={{ opacity: 0.8, fontSize: '1.1rem', maxWidth: 600 }}>
            Browse and filter all available admission programs with precise data management by year
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="filter-bar">
            {/* Row 1: Search + Year + Pathway */}
            <div className="filter-row" style={{ marginBottom: 16 }}>
              <div className="filter-group" style={{ minWidth: 240 }}>
                <label className="filter-label">Search</label>
                <input
                  className="filter-input"
                  type="text"
                  placeholder="School, major, program..."
                  value={filters.searchQuery}
                  onChange={(e) => updateFilter('searchQuery', e.target.value)}
                />
              </div>
              <div className="filter-group" style={{ minWidth: 120, flex: 0.5 }}>
                <label className="filter-label">Year</label>
                <select
                  className="filter-select"
                  value={filters.year}
                  onChange={(e) => updateFilter('year', Number(e.target.value))}
                >
                  {YEARS.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
              <div className="filter-group" style={{ minWidth: 160 }}>
                <label className="filter-label">Pathway</label>
                <select
                  className="filter-select"
                  value={filters.pathwayId}
                  onChange={(e) => updateFilter('pathwayId', e.target.value)}
                >
                  <option value="">All Pathways</option>
                  {pathways.map((pw) => (
                    <option key={pw.id} value={pw.id}>
                      {pw.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="filter-group" style={{ minWidth: 160 }}>
                <label className="filter-label">School</label>
                <select
                  className="filter-select"
                  value={filters.schoolId}
                  onChange={(e) => updateFilter('schoolId', e.target.value)}
                >
                  <option value="">All Schools</option>
                  {schools.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 2: Format + Location + Subject + QS + Tuition */}
            <div className="filter-row" style={{ marginBottom: 16 }}>
              <div className="filter-group" style={{ minWidth: 120, flex: 0.5 }}>
                <label className="filter-label">Format</label>
                <select
                  className="filter-select"
                  value={filters.format}
                  onChange={(e) =>
                    updateFilter('format', e.target.value as ProgramFormat | '')
                  }
                >
                  <option value="">All Formats</option>
                  {FORMATS.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>
              <div className="filter-group" style={{ minWidth: 140, flex: 0.5 }}>
                <label className="filter-label">Location</label>
                <select
                  className="filter-select"
                  value={filters.location}
                  onChange={(e) =>
                    updateFilter(
                      'location',
                      e.target.value as 'domestic' | 'overseas' | 'both' | '',
                    )
                  }
                >
                  <option value="">All Locations</option>
                  <option value="domestic">Domestic</option>
                  <option value="overseas">Overseas</option>
                  <option value="both">Both</option>
                </select>
              </div>
              <div className="filter-group" style={{ minWidth: 120, flex: 0.5 }}>
                <label className="filter-label">Subject</label>
                <select
                  className="filter-select"
                  value={filters.subjectType}
                  onChange={(e) =>
                    updateFilter(
                      'subjectType',
                      e.target.value as 'science' | 'arts' | 'both' | '',
                    )
                  }
                >
                  <option value="">All</option>
                  <option value="science">Science</option>
                  <option value="arts">Arts</option>
                  <option value="both">Arts & Science</option>
                </select>
              </div>
              <div className="filter-group" style={{ minWidth: 150, flex: 0.5 }}>
                <label className="filter-label">QS Ranking Max</label>
                <select
                  className="filter-select"
                  value={filters.qsRankingMax}
                  onChange={(e) =>
                    updateFilter('qsRankingMax', Number(e.target.value))
                  }
                >
                  <option value="0">No Limit</option>
                  <option value="50">Top 50</option>
                  <option value="100">Top 100</option>
                  <option value="200">Top 200</option>
                  <option value="500">Top 500</option>
                </select>
              </div>
              <div className="filter-group" style={{ minWidth: 160, flex: 0.5 }}>
                <label className="filter-label">Max Tuition (CNY/yr)</label>
                <select
                  className="filter-select"
                  value={filters.maxTuition}
                  onChange={(e) =>
                    updateFilter('maxTuition', Number(e.target.value))
                  }
                >
                  <option value="0">No Limit</option>
                  <option value="10000">≤ ¥10,000</option>
                  <option value="50000">≤ ¥50,000</option>
                  <option value="100000">≤ ¥100,000</option>
                  <option value="200000">≤ ¥200,000</option>
                </select>
              </div>
            </div>

            {/* Row 3: Checkboxes */}
            <div className="filter-row" style={{ alignItems: 'center' }}>
              <div className="filter-checkbox-group">
                <label className="filter-checkbox">
                  <input
                    type="checkbox"
                    checked={filters.beforeGaokao}
                    onChange={(e) =>
                      updateFilter('beforeGaokao', e.target.checked)
                    }
                  />
                  Before Gaokao
                </label>
                <label className="filter-checkbox">
                  <input
                    type="checkbox"
                    checked={filters.afterGaokao}
                    onChange={(e) =>
                      updateFilter('afterGaokao', e.target.checked)
                    }
                  />
                  After Gaokao
                </label>
                <label className="filter-checkbox">
                  <input
                    type="checkbox"
                    checked={filters.freshGraduateOnly}
                    onChange={(e) =>
                      updateFilter('freshGraduateOnly', e.target.checked)
                    }
                  />
                  Fresh Graduate Only
                </label>
                <label className="filter-checkbox">
                  <input
                    type="checkbox"
                    checked={filters.isC9}
                    onChange={(e) => updateFilter('isC9', e.target.checked)}
                  />
                  C9
                </label>
                <label className="filter-checkbox">
                  <input
                    type="checkbox"
                    checked={filters.is985}
                    onChange={(e) => updateFilter('is985', e.target.checked)}
                  />
                  985
                </label>
                <label className="filter-checkbox">
                  <input
                    type="checkbox"
                    checked={filters.is211}
                    onChange={(e) => updateFilter('is211', e.target.checked)}
                  />
                  211
                </label>
              </div>
              <div className="filter-actions" style={{ marginLeft: 'auto' }}>
                <button className="btn btn-sm btn-outline" onClick={resetFilters}>
                  Reset Filters
                </button>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: 16, fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
            Showing <strong>{filteredPrograms.length}</strong> program{filteredPrograms.length !== 1 ? 's' : ''}
          </div>

          {filteredPrograms.length === 0 ? (
            <div className="empty-state">
              <h3>No programs found</h3>
              <p>Try adjusting your filters to see more results</p>
            </div>
          ) : (
            <div className="program-list">
              {filteredPrograms.map((program) => (
                <ProgramCard key={program.id} program={program} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
