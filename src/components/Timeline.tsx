import { useState, useEffect, useRef } from 'react'

interface TimelineItem {
  period: string
  role: string
  company: string
  description: string
  stats: Array<{ label: string; value: string }>
}

const timelineData: TimelineItem[] = [
  {
    period: '2024 - 至今',
    role: '高级视觉设计师',
    company: '某科技公司',
    description: '负责品牌视觉升级与AI设计工具研发，探索AIGC在设计流程中的应用',
    stats: [
      { label: '完成项目', value: '50+' },
      { label: '品牌升级', value: '12+' },
      { label: 'AI设计工具', value: '3' },
    ],
  },
  {
    period: '2022 - 2024',
    role: '品牌设计师',
    company: '创意Agency',
    description: '服务国内外知名品牌，专注数字化品牌设计与体验优化',
    stats: [
      { label: '服务客户', value: '30+' },
      { label: '获奖项目', value: '5' },
      { label: '完成项目', value: '80+' },
    ],
  },
  {
    period: '2020 - 2022',
    role: 'UI/UX设计师',
    company: '互联网创业公司',
    description: '从0到1搭建产品设计体系，参与多个产品的用户体验设计',
    stats: [
      { label: '产品设计', value: '10+' },
      { label: '用户增长', value: '200%' },
      { label: '设计系统', value: '2' },
    ],
  },
]

export default function Timeline() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 bg-dark-900"
    >
      <div className="max-w-[1700px] mx-auto px-8 lg:px-16">
        {/* Section header */}
        <div className={`mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-accent-cyan text-sm tracking-[0.3em] mb-4">ABOUT ME</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
            设计历程
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Avatar and info */}
          <div className={`lg:col-span-4 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="sticky top-32">
              {/* Avatar */}
              <div className="relative mb-8">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-dark-700 border border-white/5">
                  <div className="w-full h-full bg-gradient-to-br from-accent-purple/20 to-accent-cyan/20 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-dark-600 border-2 border-accent-cyan/30 flex items-center justify-center">
                      <span className="text-5xl font-display font-bold text-white/40">JD</span>
                    </div>
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 border border-accent-cyan/20 rounded-xl -z-10" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-accent-purple/10 to-transparent rounded-xl -z-10" />
              </div>

              {/* Basic info */}
              <div className="space-y-4">
                <div>
                  <p className="text-white/40 text-sm mb-1">设计师</p>
                  <p className="text-white text-xl font-medium">你的名字</p>
                </div>
                <div>
                  <p className="text-white/40 text-sm mb-1">坐标</p>
                  <p className="text-white">中国 · 上海</p>
                </div>
                <div>
                  <p className="text-white/40 text-sm mb-1">领域</p>
                  <p className="text-white">视觉设计 / AI设计 / 品牌设计</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Timeline */}
          <div className={`lg:col-span-8 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            {/* Timeline navigation */}
            <div className="flex gap-2 mb-12">
              {timelineData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    index === activeIndex
                      ? 'w-12 bg-gradient-to-r from-accent-cyan to-accent-purple'
                      : 'w-6 bg-white/10 hover:bg-white/20'
                  }`}
                />
              ))}
            </div>

            {/* Timeline content */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-accent-cyan via-accent-purple to-transparent" />

              {/* Active item */}
              <div className="pl-8">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-accent-cyan/10 text-accent-cyan text-xs rounded-full">
                    {timelineData[activeIndex].period}
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                  {timelineData[activeIndex].role}
                </h3>

                <p className="text-accent-purple mb-6">
                  {timelineData[activeIndex].company}
                </p>

                <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-2xl">
                  {timelineData[activeIndex].description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6">
                  {timelineData[activeIndex].stats.map((stat, index) => (
                    <div
                      key={index}
                      className="p-6 bg-dark-700/50 rounded-xl border border-white/5 hover:border-accent-cyan/20 transition-colors"
                    >
                      <p className="text-3xl md:text-4xl font-display font-bold gradient-text mb-2">
                        {stat.value}
                      </p>
                      <p className="text-white/40 text-sm">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Timeline dots */}
            <div className="flex gap-4 mt-8 pl-8">
              {timelineData.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`text-left transition-all duration-300 ${
                    index === activeIndex ? 'opacity-100' : 'opacity-40 hover:opacity-70'
                  }`}
                >
                  <span className="block text-xs text-white/40 mb-1">{item.period}</span>
                  <span className="block text-sm text-white">{item.role}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
