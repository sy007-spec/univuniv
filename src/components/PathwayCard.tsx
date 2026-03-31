import { Link } from 'react-router-dom'
import type { Pathway, PathwayCategory } from '@/types'
import { PATHWAY_CATEGORY_LABELS } from '@/types'

const CATEGORY_ICONS: Record<PathwayCategory, string> = {
  special_admission: '🎯',
  art_sports: '🎨',
  international: '🌍',
  policy: '📋',
  competition: '🏆',
  other: '📌',
}

interface PathwayCardProps {
  pathway: Pathway
}

export function PathwayCard({ pathway }: PathwayCardProps) {
  return (
    <Link to={`/pathways/${pathway.id}`} style={{ textDecoration: 'none' }}>
      <div className="card">
        <div className="card-header">
          <div>
            <div className="tags" style={{ marginBottom: 8 }}>
              <span className={`tag tag-primary`}>
                {PATHWAY_CATEGORY_LABELS[pathway.category]}
              </span>
              {pathway.eligibility.freshGraduateOnly && (
                <span className="tag tag-warning">Fresh Graduate Only</span>
              )}
              {pathway.eligibility.beforeGaokao && (
                <span className="tag tag-success">Before Gaokao</span>
              )}
            </div>
            <h3 className="card-title">{pathway.name}</h3>
          </div>
          <div className={`category-icon ${pathway.category}`}>
            {CATEGORY_ICONS[pathway.category]}
          </div>
        </div>
        <p className="card-desc">{pathway.description}</p>
        <div className="tags">
          {pathway.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="tag tag-neutral">{tag}</span>
          ))}
        </div>
      </div>
    </Link>
  )
}
