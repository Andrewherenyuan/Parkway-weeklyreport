import { useState, useEffect, useRef } from 'react'

export default function Hero() {
  const [selectedWeek, setSelectedWeek] = useState('')
  const [showWeekPicker, setShowWeekPicker] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (showWeekPicker) {
      const handler = (e: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
          setShowWeekPicker(false)
        }
      }
      document.addEventListener('mousedown', handler)
      return () => document.removeEventListener('mousedown', handler)
    }
  }, [showWeekPicker])

  const getWeekList = () => {
    const weeks = []
    const today = new Date()
    const dayOfWeek = today.getDay() || 7
    const monday = new Date(today)
    monday.setDate(today.getDate() - dayOfWeek + 1)

    for (let i = 0; i < 8; i++) {
      const startDate = new Date(monday)
      startDate.setDate(monday.getDate() - i * 7)
      const endDate = new Date(startDate)
      endDate.setDate(startDate.getDate() + 6)

      const formatDate = (date: Date) => {
        const month = date.getMonth() + 1
        const day = date.getDate()
        return `${month}月${day}日`
      }

      weeks.push({
        label: `${formatDate(startDate)} - ${formatDate(endDate)}`,
        value: `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}`
      })
    }
    return weeks
  }

  const weeks = getWeekList()

  return (
    <section className="relative h-[75vh] w-full">
      {/* Background video - overflow contained here */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_171521_25968ba2-b594-4b32-aab7-f6b69398a6fa.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Navigation */}
      <nav className="relative z-20 flex items-center justify-start px-8 lg:px-16 py-6">
        <button
          onClick={() => scrollToSection('contact')}
          className="px-6 py-2.5 bg-gradient-to-r from-accent-cyan to-accent-purple text-white text-sm tracking-wide rounded-full hover:opacity-90 transition-all duration-300 shadow-lg shadow-accent-purple/30"
        >
          联系我
        </button>
      </nav>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-start h-full px-8 lg:px-16 pt-8">
        <div className="max-w-3xl">
          <div className="animate-fade-in">
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-light text-white/70 tracking-[0.2em] mb-6">
              周报
            </h2>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-extralight animate-slide-up bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent leading-[1.05] mb-8 tracking-[0.05em] drop-shadow-[0_2px_20px_rgba(255,255,255,0.08)]">
            DESIGN
            <br />
            WEEKLY REPORT
          </h1>
          <div className="relative animate-slide-up" style={{ animationDelay: '0.2s' }} ref={dropdownRef}>
            <button
              onClick={() => setShowWeekPicker(!showWeekPicker)}
              className="px-8 py-4 bg-gradient-to-r from-accent-cyan to-accent-purple text-white font-medium tracking-wider rounded-full hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg shadow-accent-purple/30"
            >
              <span>{selectedWeek ? weeks.find(w => w.value === selectedWeek)?.label : '选择时间段'}</span>
              <svg className={`w-4 h-4 transition-transform ${showWeekPicker ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showWeekPicker && (
              <div className="absolute left-0 top-full mt-3 bg-dark-800/95 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl py-2 min-w-[280px] max-h-[60vh] overflow-y-auto z-50">
                {weeks.map((week) => (
                  <button
                    key={week.value}
                    onClick={() => {
                      setSelectedWeek(week.value)
                      setShowWeekPicker(false)
                    }}
                    className={`w-full px-6 py-3 text-left text-sm hover:bg-white/5 transition-colors flex items-center justify-between ${
                      selectedWeek === week.value ? 'text-amber-400' : 'text-white/70'
                    }`}
                  >
                    <span>{week.label}</span>
                    {selectedWeek === week.value && (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-pulse z-10">
        <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent" />
        <span className="text-white/30 text-xs tracking-widest">SCROLL</span>
      </div>
    </section>
  )
}
