import { createContext, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { PathwayCategory, SchoolType } from '@/types'

export type Language = 'zh' | 'en'

const CATEGORY_LABELS: Record<Language, Record<PathwayCategory, string>> = {
  zh: {
    special_admission: '特殊招生',
    art_sports: '艺体特长',
    international: '国际项目',
    policy: '政策通道',
    competition: '竞赛通道',
    other: '其他',
  },
  en: {
    special_admission: 'Special Admission',
    art_sports: 'Arts & Sports',
    international: 'International Programs',
    policy: 'Policy-based',
    competition: 'Competition-based',
    other: 'Other',
  },
}

const SCHOOL_TYPE_LABELS: Record<Language, Record<SchoolType, string>> = {
  zh: {
    comprehensive: '综合类',
    science_tech: '理工类',
    normal: '师范类',
    language: '语言类',
    art: '艺术类',
    medical: '医学类',
    agriculture: '农林类',
    finance: '财经类',
    political: '政法类',
    military: '军事类',
    hk_macau: '港澳',
    overseas: '海外',
  },
  en: {
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
  },
}

type I18nValue = {
  lang: Language
  setLang: (lang: Language) => void
  categoryLabel: (category: PathwayCategory) => string
  schoolTypeLabel: (type: SchoolType) => string
}

const I18nContext = createContext<I18nValue | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('univuniv_lang')
    return saved === 'en' ? 'en' : 'zh'
  })

  const value = useMemo<I18nValue>(
    () => ({
      lang,
      setLang: (next) => {
        setLang(next)
        localStorage.setItem('univuniv_lang', next)
      },
      categoryLabel: (category) => CATEGORY_LABELS[lang][category],
      schoolTypeLabel: (type) => SCHOOL_TYPE_LABELS[lang][type],
    }),
    [lang],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
