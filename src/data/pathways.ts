import type { Pathway } from '@/types'

export const pathways: Pathway[] = [
  {
    id: 'qiangji',
    name: '强基计划',
    category: 'special_admission',
    description: '针对基础学科拔尖人才的招生计划，36所双一流A类高校参与，高考成绩占85%+校测占15%。',
    detailedDescription: `强基计划是教育部于2020年推出的招生改革计划，旨在选拔培养有志于服务国家重大战略需求且综合素质优秀或基础学科拔尖的学生。

主要特点：
- 36所双一流A类高校参与招生
- 聚焦数学、物理、化学、生物、历史、哲学、古文字学等基础学科
- 高考成绩占比不低于85%，校测占比不超过15%
- 本硕博衔接培养模式
- 单独编班，导师制培养

适合人群：高考成绩优异且对基础学科有浓厚兴趣的学生`,
    eligibility: {
      freshGraduateOnly: false,
      beforeGaokao: true,
      afterGaokao: false,
      requirements: [
        'High academic performance (typically top 1-5% in province)',
        'Strong interest in fundamental disciplines',
        'Take the Gaokao exam',
        'Pass university assessment (written exam + interview)',
      ],
    },
    advantages: [
      'Access to top 36 universities in China',
      'Integrated Bachelor-Master-PhD pathway',
      'Elite mentorship programs',
      'Lower score thresholds than regular admission',
    ],
    targetSchools: ['peking', 'tsinghua', 'fudan', 'sjtu', 'zju', 'ustc', 'nju', 'whu', 'hit'],
    successRate: '~5-15% acceptance rate per university',
    timeline: 'April registration → June Gaokao → Late June university assessment → July admission',
    tags: ['985', '211', 'Double First Class', 'Fundamental Disciplines'],
  },
  {
    id: 'comprehensive-eval',
    name: '综合评价招生',
    category: 'special_admission',
    description: '基于高考成绩、高中学业水平考试和综合素质评价的多元录取机制。',
    detailedDescription: `综合评价招生是一种多元化录取模式，不完全以高考分数作为唯一录取依据。

主要特点：
- 高考成绩一般占60%左右
- 高中学业水平考试占10%左右  
- 高校综合测试占30%左右
- 各省实施范围不同，部分院校面向全国招生
- 适合综合素质优异但高考发挥可能不稳定的学生

参与院校包括北大博雅计划、清华领军计划、以及上海纽约大学、南方科技大学等创新型大学。`,
    eligibility: {
      freshGraduateOnly: true,
      beforeGaokao: true,
      afterGaokao: false,
      requirements: [
        'Strong overall academic record',
        'Good grades in Xueye Shuiping exam',
        'Evidence of comprehensive qualities (awards, activities)',
        'Usually province-specific eligibility',
      ],
    },
    advantages: [
      'Multiple evaluation criteria, not just Gaokao score',
      'Opportunity for students with diverse talents',
      'Potential score reduction of 20-60 points',
      'Wide range of participating universities',
    ],
    targetSchools: ['peking', 'tsinghua', 'fudan', 'sjtu', 'zju', 'sustc', 'shnyu'],
    successRate: '~10-20% acceptance rate',
    timeline: 'March-April registration → June Gaokao → Late June assessment → July admission',
    tags: ['Holistic Review', 'Multi-criteria', 'Score Reduction'],
  },
  {
    id: 'xiaoyu-baosong',
    name: '小语种保送',
    category: 'special_admission',
    description: '全国16所具有推荐保送生资格的外国语中学学生可直接保送至大学。',
    detailedDescription: `小语种保送是指全国16所具有推荐保送生资格的外国语中学（如南京外国语学校、济南外国语学校等），其优秀学生可直接保送至大学外语类专业或其他专业。

主要特点：
- 无需参加高考，直接保送
- 限于16所指定外国语中学的学生
- 保送专业以外语类为主，部分可选其他专业
- 高三上学期即可确定录取结果
- 竞争主要在校内推荐环节

典型成功案例：济南外国语学校学生保送北京大学。`,
    eligibility: {
      freshGraduateOnly: true,
      beforeGaokao: true,
      afterGaokao: false,
      requirements: [
        'Must be enrolled in one of 16 designated foreign language schools',
        'Top academic ranking within the school',
        'Strong foreign language proficiency',
        'School recommendation required',
      ],
    },
    advantages: [
      'Skip Gaokao entirely',
      'Early admission (before senior year ends)',
      'Access to top universities (Peking, Tsinghua, etc.)',
      'Less pressure compared to Gaokao preparation',
    ],
    targetSchools: ['peking', 'tsinghua', 'fudan', 'sjtu', 'beiwai', 'shangwai'],
    successRate: '~80-95% for recommended students',
    timeline: 'September school recommendation → November-December university test → January admission',
    tags: ['No Gaokao', 'Language', 'Guaranteed Admission'],
  },
  {
    id: 'art-special',
    name: '艺术特长生/高水平艺术团',
    category: 'art_sports',
    description: '具有艺术特长的学生通过艺术专项测试获得降分录取优惠。',
    detailedDescription: `高水平艺术团招生面向具有艺术特长的普通文理科考生，通过大学组织的艺术专项测试后可获得降分录取优惠。

注意：这与艺术类专业招生不同，学生入学后就读非艺术类专业，但需参加学校艺术团活动。

主要特点：
- 学生入学后就读普通专业（非艺术类）
- 通过艺术特长获得20-60分降分优惠
- 需要有长期艺术训练背景
- 部分学校要求等级证书（如器乐十级）`,
    eligibility: {
      freshGraduateOnly: true,
      beforeGaokao: true,
      afterGaokao: false,
      requirements: [
        'Demonstrated art/music talent (instruments, vocals, dance, drama)',
        'Relevant certificates (e.g., Grade 10 in instrument)',
        'Pass university art assessment',
        'Meet minimum Gaokao score requirement',
      ],
    },
    advantages: [
      'Score reduction of 20-60 points',
      'Study non-art majors at top universities',
      'Leverage existing artistic skills',
    ],
    targetSchools: ['peking', 'tsinghua', 'zju', 'sjtu', 'hit'],
    successRate: '~15-30% acceptance rate',
    timeline: 'October registration → January art test → June Gaokao → July admission',
    tags: ['Arts', 'Score Reduction', 'Non-art Major'],
  },
  {
    id: 'sports-special',
    name: '体育特长生/高水平运动队',
    category: 'art_sports',
    description: '具有体育特长的学生通过运动水平测试获得特殊录取机会。',
    detailedDescription: `高水平运动队招生面向具有体育特长的学生，通过专项体育测试后可获得降分录取或单独招生资格。

主要特点：
- 需要二级及以上运动员证书
- 部分优秀运动员可单招（不需要高考成绩）
- 一般运动员需达到二本线或二本线的65%
- 参加大学组织的体育专项测试`,
    eligibility: {
      freshGraduateOnly: false,
      beforeGaokao: true,
      afterGaokao: false,
      requirements: [
        'National Level 2 (or above) athlete certification',
        'Pass university sports assessment',
        'Meet minimum academic requirements',
      ],
    },
    advantages: [
      'Significant score reduction',
      'Some elite athletes exempt from Gaokao',
      'Study non-sports majors possible',
    ],
    targetSchools: ['peking', 'tsinghua', 'zju', 'whu', 'hit'],
    successRate: '~10-25% acceptance rate',
    timeline: 'January registration → March sports test → June Gaokao → July admission',
    tags: ['Sports', 'Athletes', 'Score Reduction'],
  },
  {
    id: 'hk-macau',
    name: '港澳通道',
    category: 'international',
    description: '通过港澳地区高校的独立招生或联合招生途径升学，含港八大、澳门大学等。',
    detailedDescription: `港澳通道包含多种升学方式：

1. 港澳高校独立招生：香港大学、香港科技大学等可直接申请
2. 港澳台联考：面向港澳台学生的专门考试
3. DSE考试：香港中学文凭考试，内地生也可参加
4. 港澳院校内地招生计划

主要特点：
- 可与高考同时申请，互不影响
- 部分港校QS排名世界前50
- 全英文教学环境
- 国际化视野和就业优势`,
    eligibility: {
      freshGraduateOnly: false,
      beforeGaokao: true,
      afterGaokao: true,
      requirements: [
        'Gaokao score (for most HK universities)',
        'English proficiency',
        'Application materials (personal statement, etc.)',
        'Some universities require interviews',
      ],
    },
    advantages: [
      'Apply alongside Gaokao — no conflict',
      'World-ranked universities (HKU, HKUST, CUHK in QS Top 50)',
      'International education environment',
      'Strong career prospects in Greater China',
    ],
    targetSchools: ['hku', 'hkust', 'cuhk', 'cityu', 'polyu', 'umac'],
    successRate: '~5-15% for top HK universities',
    timeline: 'October-January application → June Gaokao → June-July interviews → July admission',
    tags: ['Hong Kong', 'Macau', 'International', 'English Teaching'],
  },
  {
    id: 'sino-foreign',
    name: '中外合作办学',
    category: 'international',
    description: '国内高校与国外名校联合办学，包括4+0、2+2、3+1等多种学制。',
    detailedDescription: `中外合作办学是国内高校与国外大学合作举办的教育项目，学生可以获得双方学位。

常见模式：
- 4+0：四年全在国内，获中外双学位
- 2+2：两年国内+两年国外
- 3+1：三年国内+一年国外
- 1+3：一年国内+三年国外

主要特点：
- 高考成绩低于同校普通专业20-80分即可录取
- 部分项目不需要高考成绩（自主招生）
- 学费较高但低于纯出国留学
- 获得海外名校学位
- 享受留学生归国优惠政策`,
    eligibility: {
      freshGraduateOnly: false,
      beforeGaokao: false,
      afterGaokao: true,
      requirements: [
        'Gaokao score (varies by program)',
        'English proficiency (some require IELTS/TOEFL)',
        'Financial capability for higher tuition',
      ],
    },
    advantages: [
      'Lower Gaokao score requirements',
      'Dual degree from Chinese and foreign universities',
      'International education without full overseas costs',
      'Returnee benefits upon graduation',
    ],
    targetSchools: ['sjtu', 'zju', 'whu', 'xjtu'],
    successRate: '~20-40% acceptance rate',
    timeline: 'Varies by program — typically June-August application after Gaokao',
    tags: ['Dual Degree', 'International', 'Lower Score', 'Flexible Format'],
  },
  {
    id: 'competition',
    name: '学科竞赛保送/降分',
    category: 'competition',
    description: '在数学、物理、化学、生物、信息学五大学科竞赛中获奖的学生可获保送或降分。',
    detailedDescription: `全国中学生学科奥林匹克竞赛（数学、物理、化学、生物、信息学）获奖者可获得特殊录取机会。

保送资格：
- 国际奥赛金银牌：直接保送清北
- 国家集训队成员：保送清北或其他985

降分录取：
- 省级一等奖：强基计划破格入围
- 全国决赛金银铜牌：获得清北等校的降分优惠

竞赛培养通常需要从初中甚至小学开始长期投入。`,
    eligibility: {
      freshGraduateOnly: true,
      beforeGaokao: true,
      afterGaokao: false,
      requirements: [
        'Provincial first prize or above in Math/Physics/Chemistry/Biology/Informatics Olympiad',
        'For guaranteed admission: National team member or international medal',
        'Strong academic foundation in the competition subject',
      ],
    },
    advantages: [
      'Guaranteed admission to top universities for national team members',
      'Significant score reduction for provincial winners',
      'Demonstrates exceptional academic ability',
    ],
    targetSchools: ['peking', 'tsinghua', 'ustc', 'fudan', 'zju'],
    successRate: 'National team: ~100%; Provincial first prize: varies',
    timeline: 'Year-round training → September-November provincial competition → Winter national finals',
    tags: ['Olympiad', 'Science Competition', 'Guaranteed Admission'],
  },
  {
    id: 'military-police',
    name: '军校/公安院校',
    category: 'policy',
    description: '报考军事院校和公安院校，提前批录取，免学费且有补贴。',
    detailedDescription: `军事院校和公安院校在高考提前批次录取，录取分数通常低于同级别普通高校。

主要特点：
- 提前批录取，不影响后续普通批次
- 免学费、免住宿费
- 每月有生活补贴
- 毕业包分配工作
- 需通过政审、体检、体能测试

适合身体素质好、有志于国防和公安事业的学生。`,
    eligibility: {
      freshGraduateOnly: true,
      beforeGaokao: false,
      afterGaokao: true,
      requirements: [
        'Fresh graduate status',
        'Pass political review',
        'Pass physical examination',
        'Pass fitness test',
        'Meet Gaokao score requirements (early batch)',
      ],
    },
    advantages: [
      'Early batch admission (does not affect regular admission)',
      'Free tuition and accommodation',
      'Monthly living stipend',
      'Guaranteed employment after graduation',
    ],
    targetSchools: [],
    successRate: '~15-30% acceptance rate',
    timeline: 'June Gaokao → June-July political review & physical exam → July early batch admission',
    tags: ['Military', 'Police', 'Free Tuition', 'Early Batch'],
  },
  {
    id: 'national-special',
    name: '国家专项/高校专项/地方专项',
    category: 'policy',
    description: '面向农村和贫困地区学生的专项招生计划，降分录取进入重点大学。',
    detailedDescription: `三大专项计划是国家为促进教育公平设立的招生渠道：

1. 国家专项计划：面向贫困地区定向招生，年招生约6万人
2. 高校专项计划（农村学生单独招生）：面向农村学生，约95所高校参与
3. 地方专项计划：地方重点高校面向本省农村学生招生

录取分数通常比正常批次低20-60分。`,
    eligibility: {
      freshGraduateOnly: false,
      beforeGaokao: true,
      afterGaokao: true,
      requirements: [
        'Rural hukou or designated poverty area registration',
        '3+ years of local high school enrollment',
        'Parents with local hukou',
        'Meet Gaokao score requirements',
      ],
    },
    advantages: [
      'Score reduction of 20-60 points',
      'Access to 985/211 universities',
      'Promotes educational equity',
      'Large enrollment quotas (~60,000 per year nationally)',
    ],
    targetSchools: ['peking', 'tsinghua', 'fudan', 'sjtu', 'zju', 'whu'],
    successRate: 'Varies by region and program',
    timeline: 'April-May registration → June Gaokao → July special batch admission',
    tags: ['Rural Students', 'Poverty Areas', 'Score Reduction', 'Equity'],
  },
  {
    id: 'overseas-direct',
    name: '海外直申',
    category: 'international',
    description: '直接申请海外大学，不需要或仅参考高考成绩，可申请QS前100名校。',
    detailedDescription: `直接申请海外大学是越来越多中国学生选择的路径。

主要方向：
- 美国：SAT/ACT + 活动背景
- 英国：A-Level/IB + UCAS申请
- 澳洲：高考成绩直申（多所大学承认高考）
- 加拿大：高中成绩 + 语言成绩
- 新加坡：高考成绩或A-Level

特点：
- 部分海外名校承认中国高考成绩
- 可与国内升学同时进行
- 需要语言成绩（雅思/托福）
- QS前100名校选择丰富`,
    eligibility: {
      freshGraduateOnly: false,
      beforeGaokao: true,
      afterGaokao: true,
      requirements: [
        'IELTS 6.5+ or TOEFL 90+',
        'Gaokao score (for universities accepting it)',
        'Or: A-Level / IB / SAT scores',
        'Application materials (personal statement, references)',
      ],
    },
    advantages: [
      'Wide choice of world-ranked universities',
      'Can apply alongside domestic pathways',
      'Diverse educational experiences',
      'International career opportunities',
    ],
    targetSchools: [],
    successRate: 'Varies widely by university and preparation',
    timeline: 'Year-round application cycles (varies by country)',
    tags: ['Overseas', 'International', 'QS Top 100', 'Flexible'],
  },
  {
    id: 'dse',
    name: 'DSE港澳台华侨联考',
    category: 'international',
    description: '面向港澳台侨学生的联合招收考试，考试难度低于高考，可报考内地300+所高校。',
    detailedDescription: `港澳台华侨联考全称"中华人民共和国普通高等学校联合招收华侨港澳台学生入学考试"。

主要特点：
- 考试科目少（文科/理科各5门）
- 考试难度低于高考
- 可报考内地超过300所高校
- 录取分数远低于高考
- 400分即可上一本，300分上二本

适合持有港澳台身份或华侨身份的学生。`,
    eligibility: {
      freshGraduateOnly: false,
      beforeGaokao: true,
      afterGaokao: false,
      requirements: [
        'Hong Kong/Macau/Taiwan ID or overseas Chinese status',
        'High school diploma or equivalent',
        'Register for the joint examination',
      ],
    },
    advantages: [
      'Lower exam difficulty than Gaokao',
      'Much lower score requirements (400 for first-tier)',
      'Access to 300+ mainland universities',
      'Less competitive than regular Gaokao',
    ],
    targetSchools: ['peking', 'tsinghua', 'fudan', 'sjtu', 'zju'],
    successRate: '~60-80% for students with adequate preparation',
    timeline: 'March registration → May exam → June-July admission',
    tags: ['HK/Macau/Taiwan', 'Overseas Chinese', 'Lower Difficulty'],
  },
]
