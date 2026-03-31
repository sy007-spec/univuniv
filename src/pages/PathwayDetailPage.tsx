import { useParams, Link } from 'react-router-dom'
import { pathways } from '@/data/pathways'
import { programs } from '@/data/programs'
import { schools } from '@/data/schools'
import { ProgramCard } from '@/components/ProgramCard'
import { useI18n } from '@/i18n'

export function PathwayDetailPage() {
  const { lang, categoryLabel } = useI18n()
  const zh = lang === 'zh'
  const { id } = useParams()
  const pathway = pathways.find((p) => p.id === id)

  if (!pathway) {
    return (
      <div className="section">
        <div className="container empty-state">
          <h3>{zh ? '未找到该路径' : 'Pathway not found'}</h3>
          <p>
            <Link to="/pathways">{zh ? '← 返回路径列表' : '← Back to all pathways'}</Link>
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
            <Link to="/pathways">{zh ? '升学路径' : 'Pathways'}</Link>
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
              {categoryLabel(pathway.category)}
            </span>
            {pathway.eligibility.beforeGaokao && (
              <span className="tag tag-success">{zh ? '高考前可申报' : 'Apply Before Gaokao'}</span>
            )}
            {pathway.eligibility.afterGaokao && (
              <span className="tag tag-primary">{zh ? '高考后可申报' : 'Apply After Gaokao'}</span>
            )}
            {pathway.eligibility.freshGraduateOnly && (
              <span className="tag tag-warning">{zh ? '仅限应届生' : 'Fresh Graduate Only'}</span>
            )}
          </div>
        </div>
      </section>

      <section className="detail-content">
        <div className="container">
          <div className="detail-grid">
            <div>
              <div className="detail-section">
                <h2>{zh ? '路径概览' : 'Overview'}</h2>
                <p>{pathway.detailedDescription}</p>
              </div>

              <div className="detail-section">
                <h2>{zh ? '优势' : 'Advantages'}</h2>
                <ul className="detail-list">
                  {pathway.advantages.map((adv, i) => (
                    <li key={i}>{adv}</li>
                  ))}
                </ul>
              </div>

              <div className="detail-section">
                <h2>{zh ? '报考条件' : 'Eligibility Requirements'}</h2>
                <ul className="detail-list">
                  {pathway.eligibility.requirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>

              {relatedPrograms.length > 0 && (
                <div className="detail-section">
                  <h2>{zh ? `2026 项目（${relatedPrograms.length}）` : `2026 Programs (${relatedPrograms.length})`}</h2>
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
                <h3>{zh ? '关键信息' : 'Key Information'}</h3>
                <div className="info-row">
                  <span className="info-label">{zh ? '类别' : 'Category'}</span>
                  <span className="info-value">
                    {categoryLabel(pathway.category)}
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-label">{zh ? '高考前' : 'Before Gaokao'}</span>
                  <span className="info-value">
                    {pathway.eligibility.beforeGaokao ? (zh ? '是' : 'Yes') : (zh ? '否' : 'No')}
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-label">{zh ? '高考后' : 'After Gaokao'}</span>
                  <span className="info-value">
                    {pathway.eligibility.afterGaokao ? (zh ? '是' : 'Yes') : (zh ? '否' : 'No')}
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-label">{zh ? '仅应届生' : 'Fresh Grad Only'}</span>
                  <span className="info-value">
                    {pathway.eligibility.freshGraduateOnly ? (zh ? '是' : 'Yes') : (zh ? '否' : 'No')}
                  </span>
                </div>
                {pathway.successRate && (
                  <div className="info-row">
                    <span className="info-label">{zh ? '成功率' : 'Success Rate'}</span>
                    <span className="info-value">{pathway.successRate}</span>
                  </div>
                )}
              </div>

              <div className="sidebar-card">
                <h3>{zh ? '时间线' : 'Timeline'}</h3>
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
                  <h3>{zh ? '目标院校' : 'Target Schools'}</h3>
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
