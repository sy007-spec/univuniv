export interface Pathway {
  id: string
  name: string
  category: PathwayCategory
  description: string
  detailedDescription: string
  eligibility: {
    freshGraduateOnly: boolean
    beforeGaokao: boolean
    afterGaokao: boolean
    minAge?: number
    maxAge?: number
    requirements: string[]
  }
  advantages: string[]
  targetSchools: string[]
  successRate?: string
  timeline: string
  tags: string[]
}

export type PathwayCategory =
  | 'special_admission'
  | 'art_sports'
  | 'international'
  | 'policy'
  | 'competition'
  | 'other'

export const PATHWAY_CATEGORY_LABELS: Record<PathwayCategory, string> = {
  special_admission: 'Special Admission',
  art_sports: 'Arts & Sports',
  international: 'International Programs',
  policy: 'Policy-based',
  competition: 'Competition-based',
  other: 'Other',
}

export interface Program {
  id: string
  schoolId: string
  pathwayId: string
  name: string
  year: number
  format: ProgramFormat
  duration: number
  durationUnit: 'years' | 'months'
  location: 'domestic' | 'overseas' | 'both'
  domesticYears?: number
  overseasYears?: number
  tuitionPerYear: number
  tuitionCurrency: 'CNY' | 'USD' | 'GBP' | 'EUR' | 'HKD'
  subjectType: 'science' | 'arts' | 'both'
  availableMajors: string[]
  qsRanking?: number
  beforeGaokao: boolean
  afterGaokao: boolean
  freshGraduateOnly: boolean
  enrollmentQuota?: number
  applicationDeadline?: string
  notes?: string
  tags: string[]
}

export type ProgramFormat = '4+0' | '2+2' | '3+1' | '1+3' | '3yr' | '4yr' | '5yr' | 'other'

export interface School {
  id: string
  name: string
  nameEn?: string
  province: string
  city: string
  type: SchoolType
  is985: boolean
  is211: boolean
  isDoubleFirstClass: boolean
  isC9: boolean
  qsRanking?: number
  logo?: string
  website?: string
  tags: string[]
}

export type SchoolType = 'comprehensive' | 'science_tech' | 'normal' | 'language' | 'art' | 'medical' | 'agriculture' | 'finance' | 'political' | 'military' | 'hk_macau' | 'overseas'

export const SCHOOL_TYPE_LABELS: Record<SchoolType, string> = {
  comprehensive: 'Comprehensive',
  science_tech: 'Science & Tech',
  normal: 'Normal University',
  language: 'Language',
  art: 'Art',
  medical: 'Medical',
  agriculture: 'Agriculture',
  finance: 'Finance',
  political: 'Political Science',
  military: 'Military',
  hk_macau: 'HK/Macau',
  overseas: 'Overseas',
}

export interface NewsItem {
  id: string
  title: string
  summary: string
  date: string
  category: string
  pathwayId?: string
  source?: string
  url?: string
}

export interface FilterState {
  year?: number
  schoolId?: string
  pathwayCategory?: PathwayCategory
  format?: ProgramFormat
  location?: 'domestic' | 'overseas' | 'both'
  subjectType?: 'science' | 'arts' | 'both'
  beforeGaokao?: boolean
  afterGaokao?: boolean
  freshGraduateOnly?: boolean
  maxTuition?: number
  qsRankingMax?: number
  is985?: boolean
  is211?: boolean
  isC9?: boolean
  searchQuery?: string
}

export interface YearData {
  year: number
  programs: Program[]
  stats: {
    totalPrograms: number
    totalSchools: number
    newPathways: number
  }
}
