import type { Program } from '@/types'
import { schools } from '@/data/schools'

interface ProgramCardProps {
  program: Program
}

function formatTuition(amount: number, currency: string): string {
  const formatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 })
  return `${currency} ${formatter.format(amount)}/yr`
}

function getQsBadgeClass(ranking?: number): string {
  if (!ranking) return ''
  if (ranking <= 50) return 'top50'
  if (ranking <= 100) return 'top100'
  return 'top200'
}

function formatLocation(program: Program): string {
  if (program.location === 'domestic') return 'Domestic'
  if (program.location === 'overseas') return 'Overseas'
  if (program.domesticYears && program.overseasYears) {
    return `${program.domesticYears}yr Domestic + ${program.overseasYears}yr Overseas`
  }
  return 'Domestic + Overseas'
}

export function ProgramCard({ program }: ProgramCardProps) {
  const school = schools.find((s) => s.id === program.schoolId)

  return (
    <div className="program-card">
      <div>
        <div className="program-name">{program.name}</div>
        <div className="program-school">
          {school?.name} {school?.nameEn && `(${school.nameEn})`}
        </div>
      </div>
      <div className="program-meta">
        <strong>{program.format}</strong>
        <br />
        {formatLocation(program)}
      </div>
      <div className="program-meta">
        <strong>{formatTuition(program.tuitionPerYear, program.tuitionCurrency)}</strong>
        <br />
        {program.subjectType === 'both' ? 'Arts & Science' : program.subjectType === 'science' ? 'Science' : 'Arts'}
      </div>
      <div className="program-meta">
        {program.qsRanking && (
          <span className={`qs-badge ${getQsBadgeClass(program.qsRanking)}`}>
            QS #{program.qsRanking}
          </span>
        )}
        {program.enrollmentQuota && (
          <div style={{ marginTop: 4 }}>
            Quota: {program.enrollmentQuota}
          </div>
        )}
      </div>
      <div className="tags" style={{ justifyContent: 'flex-end' }}>
        {program.beforeGaokao && <span className="tag tag-success">Pre-Gaokao</span>}
        {program.afterGaokao && <span className="tag tag-primary">Post-Gaokao</span>}
      </div>
    </div>
  )
}
