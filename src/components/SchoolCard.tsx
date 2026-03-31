import type { School } from '@/types'

interface SchoolCardProps {
  school: School
}

function getQsBadgeClass(ranking?: number): string {
  if (!ranking) return ''
  if (ranking <= 50) return 'top50'
  if (ranking <= 100) return 'top100'
  return 'top200'
}

export function SchoolCard({ school }: SchoolCardProps) {
  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h3 className="card-title">{school.name}</h3>
          {school.nameEn && (
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: 2 }}>
              {school.nameEn}
            </div>
          )}
        </div>
        {school.qsRanking && (
          <span className={`qs-badge ${getQsBadgeClass(school.qsRanking)}`}>
            QS #{school.qsRanking}
          </span>
        )}
      </div>
      <div style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: 12 }}>
        {school.city}, {school.province}
      </div>
      <div className="tags">
        {school.isC9 && <span className="tag tag-warning">C9</span>}
        {school.is985 && <span className="tag tag-primary">985</span>}
        {school.is211 && <span className="tag tag-secondary">211</span>}
        {school.isDoubleFirstClass && <span className="tag tag-success">Double First Class</span>}
        {school.tags
          .filter((t) => !['C9', '985', '211', 'Double First Class'].includes(t))
          .slice(0, 3)
          .map((tag) => (
            <span key={tag} className="tag tag-neutral">{tag}</span>
          ))}
      </div>
    </div>
  )
}
