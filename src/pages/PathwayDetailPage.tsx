import { useParams, Link } from 'react-router-dom'
import { pathways } from '@/data/pathways'
import { programs } from '@/data/programs'
import { schools } from '@/data/schools'
import { PATHWAY_CATEGORY_LABELS } from '@/types'
import { ProgramCard } from '@/components/ProgramCard'

export function PathwayDetailPage() {
  const { id } = useParams()
  const pathway = pathways.find((p) => p.id === id)

  if (!pathway) {
    return (
      <div className="section">
        <div className="container empty-state">
          <h3>Pathway not found</h3>
          <p>
            <Link to="/pathways">← Back to all pathways</Link>
          </p>
        </div>
      </div>
    )
  }

  const relatedPrograms = programs.filter(
    (p) => p.pathwayId === pathway.id && p.year === 2026,
  )
  const targetSchoolData = pathway.targetSchools
    .map((sid) => schools.find((s) => s.id === sid))
    .filter(Boolean)

  return (
    <div className="page-enter">
      <section className="detail-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/pathways">Pathways</Link>
            <span>/</span>
            <span>{pathway.name}</span>
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: 8 }}>
            {pathway.name}
          </h1>
          <p style={{ opacity: 0.8, fontSize: '1.1rem', maxWidth: 640 }}>
            {pathway.description}
          </p>
          <div className="tags" style={{ marginTop: 16 }}>
            <span className="tag tag-primary">
              {PATHWAY_CATEGORY_LABELS[pathway.category]}
            </span>
            {pathway.eligibility.beforeGaokao && (
              <span className="tag tag-success">Apply Before Gaokao</span>
            )}
            {pathway.eligibility.afterGaokao && (
              <span className="tag tag-primary">Apply After Gaokao</span>
            )}
            {pathway.eligibility.freshGraduateOnly && (
              <span className="tag tag-warning">Fresh Graduate Only</span>
            )}
          </div>
        </div>
      </section>

      <section className="detail-content">
        <div className="container">
          <div className="detail-grid">
            <div>
              <div className="detail-section">
                <h2>Overview</h2>
                <p>{pathway.detailedDescription}</p>
              </div>

              <div className="detail-section">
                <h2>Advantages</h2>
                <ul className="detail-list">
                  {pathway.advantages.map((adv, i) => (
                    <li key={i}>{adv}</li>
                  ))}
                </ul>
              </div>

              <div className="detail-section">
                <h2>Eligibility Requirements</h2>
                <ul className="detail-list">
                  {pathway.eligibility.requirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>

              {relatedPrograms.length > 0 && (
                <div className="detail-section">
                  <h2>2026 Programs ({relatedPrograms.length})</h2>
                  <div className="program-list">
                    {relatedPrograms.map((program) => (
                      <ProgramCard key={program.id} program={program} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="detail-sidebar">
              <div className="sidebar-card">
                <h3>Key Information</h3>
                <div className="info-row">
                  <span className="info-label">Category</span>
                  <span className="info-value">
                    {PATHWAY_CATEGORY_LABELS[pathway.category]}
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-label">Before Gaokao</span>
                  <span className="info-value">
                    {pathway.eligibility.beforeGaokao ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-label">After Gaokao</span>
                  <span className="info-value">
                    {pathway.eligibility.afterGaokao ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-label">Fresh Grad Only</span>
                  <span className="info-value">
                    {pathway.eligibility.freshGraduateOnly ? 'Yes' : 'No'}
                  </span>
                </div>
                {pathway.successRate && (
                  <div className="info-row">
                    <span className="info-label">Success Rate</span>
                    <span className="info-value">{pathway.successRate}</span>
                  </div>
                )}
              </div>

              <div className="sidebar-card">
                <h3>Timeline</h3>
                <p
                  style={{
                    fontSize: '0.9rem',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.7,
                  }}
                >
                  {pathway.timeline}
                </p>
              </div>

              {targetSchoolData.length > 0 && (
                <div className="sidebar-card">
                  <h3>Target Schools</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {targetSchoolData.map((school) =>
                      school ? (
                        <div
                          key={school.id}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '6px 0',
                            fontSize: '0.9rem',
                          }}
                        >
                          <span style={{ fontWeight: 500 }}>{school.name}</span>
                          {school.qsRanking && (
                            <span
                              className={`qs-badge ${
                                school.qsRanking <= 50
                                  ? 'top50'
                                  : school.qsRanking <= 100
                                    ? 'top100'
                                    : 'top200'
                              }`}
                            >
                              QS #{school.qsRanking}
                            </span>
                          )}
                        </div>
                      ) : null,
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
