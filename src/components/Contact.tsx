import { useEffect, useRef, useState, type FormEvent } from 'react'

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [showContactModal, setShowContactModal] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const contactInfo = {
    wechat: { name: '微信', id: 'herenyuan003', label: '微信号' },
    qq: { name: 'QQ', id: '195679899', label: 'QQ号' }
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen bg-dark-900 flex items-center justify-center overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-purple/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-cyan/10 rounded-full blur-[120px]" />
        
        {/* Grid */}
        <div className="absolute inset-0 grid-bg opacity-30" />
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div
          className="fixed inset-0 bg-dark-900/80 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setShowContactModal(null)}
        >
          <div
            className="bg-dark-700 rounded-2xl p-8 w-full max-w-sm mx-4 border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div
                className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  showContactModal === 'wechat' ? 'bg-green-500/20' : 'bg-sky-500/20'
                }`}
              >
                {showContactModal === 'wechat' ? (
                  <svg className="w-9 h-9 text-green-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.49-1.858 5.87.882 2.423 3.688 4.202 6.978 4.202.692 0 1.361-.062 1.998-.184a.649.649 0 0 1 .55.08l1.46.836a.265.265 0 0 0 .127.041.246.246 0 0 0 .224-.243c0-.056-.027-.11-.04-.165-.02-.085-.197-.725-.327-1.193a.5.5 0 0 1 .17-.569c1.454-1.123 2.408-2.785 2.408-4.64 0-3.315-3.371-6.055-7.532-6.117zm-2.53 2.368c.538 0 .974.445.974.995a.986.986 0 0 1-.974.995.986.986 0 0 1-.974-.995c0-.55.436-.995.974-.995zm4.86 0c.538 0 .974.445.974.995a.986.986 0 0 1-.974.995.986.986 0 0 1-.974-.995c0-.55.436-.995.974-.995z"/>
                  </svg>
                ) : (
                  <svg className="w-9 h-9 text-sky-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.003 2c-2.195 0-5.33 1.393-5.33 6.123 0 .892.115 1.858.342 2.671-.59.53-1.535 1.507-1.858 2.773-.42 1.632.026 3.088.933 3.708.373.254.758.424 1.13.424.226 0 .464-.045.71-.143l.445-.177c-.034.34-.046.68-.046 1.023 0 2.288 1.586 4.314 3.78 5.452l-.542 1.767c-.063.207.052.428.26.482.145.038.303-.012.412-.136l1.98-2.207 1.962 2.207c.11.124.273.174.418.136.208-.054.323-.275.26-.482l-.542-1.767c2.195-1.138 3.781-3.164 3.781-5.452 0-.343-.013-.683-.046-1.023l.445.177c.246.098.484.143.71.143.372 0 .757-.17 1.13-.424.907-.62 1.353-2.076.933-3.708-.323-1.266-1.268-2.243-1.858-2.773.227-.813.342-1.779.342-2.671C17.334 3.393 14.198 2 12.003 2zm-2.344 7.18c.52 0 .87.343.87.875 0 .532-.35.875-.87.875s-.869-.343-.869-.875c0-.532.349-.875.869-.875zm4.687 0c.52 0 .869.343.869.875 0 .532-.349.875-.869.875s-.87-.343-.87-.875c0-.532.35-.875.87-.875zM9.06 14.703c.557 0 1.208.204 1.208.654 0 .45-.651.654-1.208.654-.557 0-1.208-.204-1.208-.654s.651-.654 1.208-.654zm5.88 0c.557 0 1.208.204 1.208.654 0 .45-.651.654-1.208.654-.557 0-1.208-.204-1.208-.654s.651-.654 1.208-.654z"/>
                  </svg>
                )}
              </div>

              <h3 className="text-xl font-display font-bold text-white mb-2">
                添加{contactInfo[showContactModal as keyof typeof contactInfo].name}好友
              </h3>
              <p className="text-white/40 text-sm mb-5">
                复制以下{contactInfo[showContactModal as keyof typeof contactInfo].label}，打开{contactInfo[showContactModal as keyof typeof contactInfo].name}APP搜索添加
              </p>

              <div className="bg-dark-800 rounded-xl p-4 border border-white/10 mb-5">
                <p className="text-white/50 text-xs mb-1">
                  {contactInfo[showContactModal as keyof typeof contactInfo].label}
                </p>
                <p className="text-accent-cyan font-mono text-lg font-medium">
                  {contactInfo[showContactModal as keyof typeof contactInfo].id}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowContactModal(null)}
                  className="flex-1 py-3 bg-white/5 rounded-xl text-white/60 hover:bg-white/10 transition-colors text-sm"
                >
                  取消
                </button>
                <button
                  onClick={() => handleCopy(contactInfo[showContactModal as keyof typeof contactInfo].id)}
                  className={`flex-1 py-3 rounded-xl text-white text-sm font-medium transition-all ${
                    copied
                      ? 'bg-green-500'
                      : showContactModal === 'wechat'
                      ? 'bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90'
                      : 'bg-gradient-to-r from-sky-500 to-sky-600 hover:opacity-90'
                  }`}
                >
                  {copied ? '✓ 已复制' : '复制'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 max-w-[1700px] mx-auto px-8 lg:px-16 py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Content */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <p className="text-accent-cyan text-sm tracking-[0.3em] mb-4">GET IN TOUCH</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
              让我们
              <br />
              <span className="gradient-text">一起创造</span>
            </h2>
            {/* Futuristic Tech Banner */}
            <div className="relative w-full max-w-2xl h-40 overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              {/* Dynamic gradient background layers */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan/20 via-transparent to-accent-purple/20 animate-gradient-shift" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent" />
              </div>

              {/* Animated perspective grid */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 perspective-grid animate-perspective-move" />
              </div>

              {/* Flowing light streaks */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-cyan/60 to-transparent animate-streak-1" />
                <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-purple/50 to-transparent animate-streak-2" />
                <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-cyan/40 to-transparent animate-streak-3" />
              </div>

              {/* Data/particle stream */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 rounded-full bg-accent-cyan/60 animate-particle"
                    style={{
                      left: `${5 + i * 4.5}%`,
                      bottom: '-4px',
                      height: `${2 + Math.random() * 3}px`,
                      animationDelay: `${i * 0.15}s`,
                      animationDuration: `${2.5 + Math.random() * 2}s`
                    }}
                  />
                ))}
              </div>

              {/* Glowing orbs */}
              <div className="absolute top-6 left-10 w-16 h-16 bg-accent-cyan/20 rounded-full blur-2xl animate-orb-pulse" />
              <div className="absolute bottom-8 right-20 w-20 h-20 bg-accent-purple/20 rounded-full blur-3xl animate-orb-pulse-delay" />
              <div className="absolute top-10 right-40 w-8 h-8 bg-accent-cyan/15 rounded-full blur-xl animate-orb-pulse" />

              {/* Hex/dot pattern overlay */}
              <div className="absolute inset-0 dot-pattern opacity-20" />

              {/* Vertical side bars */}
              <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-accent-cyan/50 to-transparent" />
              <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-accent-purple/50 to-transparent" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-accent-cyan/40 via-transparent to-accent-purple/40" />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-accent-purple/40 via-transparent to-accent-cyan/40" />

              {/* Corner brackets */}
              <div className="absolute top-3 left-3 w-4 h-4 border-l-2 border-t-2 border-accent-cyan/60" />
              <div className="absolute top-3 right-3 w-4 h-4 border-r-2 border-t-2 border-accent-cyan/60" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-l-2 border-b-2 border-accent-purple/60" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-r-2 border-b-2 border-accent-purple/60" />

              {/* Decorative scanlines */}
              <div className="absolute inset-0 scanlines opacity-10" />

              {/* Small circuit dots */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={`cd-${i}`}
                  className="absolute w-1.5 h-1.5 rounded-full bg-accent-cyan/50 animate-dot-pulse"
                  style={{
                    left: `${10 + i * 11}%`,
                    top: `${i % 2 === 0 ? 20 : 75}%`,
                    animationDelay: `${i * 0.3}s`
                  }}
                />
              ))}

              {/* Waveform indicator bottom */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-end gap-0.5 h-6">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={`bar-${i}`}
                    className="w-0.5 bg-gradient-to-t from-accent-cyan/30 to-accent-purple/60 rounded-t animate-wave"
                    style={{
                      animationDelay: `${i * 0.05}s`,
                      animationDuration: `${0.8 + Math.random() * 0.5}s`
                    }}
                  />
                ))}
              </div>

              {/* Text content */}
              <div className="relative z-20 flex flex-col items-center justify-center h-full px-6">
                <h3 className="font-display text-xl md:text-2xl font-bold text-white tracking-wide drop-shadow-[0_2px_8px_rgba(0,212,255,0.4)] text-center whitespace-nowrap">
                  勇敢接受挑战，追求卓越
                </h3>
                <div className="mt-2 flex items-center gap-2">
                  <div className="w-6 h-px bg-gradient-to-r from-transparent to-accent-cyan/50" />
                  <span className="text-white/50 text-[10px] tracking-wide">Embrace challenges with courage and strive for excellence</span>
                  <div className="w-6 h-px bg-gradient-to-l from-transparent to-accent-purple/50" />
                </div>
              </div>

              {/* Top-right tag */}
              <div className="absolute top-4 right-6 flex items-center gap-2 z-30">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-white/40 text-[10px] tracking-widest">ACTIVE</span>
              </div>
            </div>

            {/* Contact info */}
            <div className="space-y-6 mt-12">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-dark-700 flex items-center justify-center border border-white/5">
                  <svg className="w-5 h-5 text-accent-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white/40 text-sm">邮箱</p>
                  <p className="text-white">andrew.he@parkwaypantai.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-dark-700 flex items-center justify-center border border-white/5">
                  <svg className="w-5 h-5 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white/40 text-sm">坐标</p>
                  <p className="text-white">中国 · 上海</p>
                </div>
              </div>

              {/* Social links - WeChat & QQ */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowContactModal('wechat')}
                  className="px-4 py-2 bg-dark-700 rounded-lg border border-white/5 text-white/70 text-sm hover:border-green-400/50 hover:text-green-400 transition-all duration-300 flex items-center gap-2 group"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.49-1.858 5.87.882 2.423 3.688 4.202 6.978 4.202.692 0 1.361-.062 1.998-.184a.649.649 0 0 1 .55.08l1.46.836a.265.265 0 0 0 .127.041.246.246 0 0 0 .224-.243c0-.056-.027-.11-.04-.165-.02-.085-.197-.725-.327-1.193a.5.5 0 0 1 .17-.569c1.454-1.123 2.408-2.785 2.408-4.64 0-3.315-3.371-6.055-7.532-6.117zm-2.53 2.368c.538 0 .974.445.974.995a.986.986 0 0 1-.974.995.986.986 0 0 1-.974-.995c0-.55.436-.995.974-.995zm4.86 0c.538 0 .974.445.974.995a.986.986 0 0 1-.974.995.986.986 0 0 1-.974-.995c0-.55.436-.995.974-.995z"/>
                  </svg>
                  微信
                </button>
                <button
                  onClick={() => setShowContactModal('qq')}
                  className="px-4 py-2 bg-dark-700 rounded-lg border border-white/5 text-white/70 text-sm hover:border-sky-400/50 hover:text-sky-400 transition-all duration-300 flex items-center gap-2 group"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.003 2c-2.195 0-5.33 1.393-5.33 6.123 0 .892.115 1.858.342 2.671-.59.53-1.535 1.507-1.858 2.773-.42 1.632.026 3.088.933 3.708.373.254.758.424 1.13.424.226 0 .464-.045.71-.143l.445-.177c-.034.34-.046.68-.046 1.023 0 2.288 1.586 4.314 3.78 5.452l-.542 1.767c-.063.207.052.428.26.482.145.038.303-.012.412-.136l1.98-2.207 1.962 2.207c.11.124.273.174.418.136.208-.054.323-.275.26-.482l-.542-1.767c2.195-1.138 3.781-3.164 3.781-5.452 0-.343-.013-.683-.046-1.023l.445.177c.246.098.484.143.71.143.372 0 .757-.17 1.13-.424.907-.62 1.353-2.076.933-3.708-.323-1.266-1.268-2.243-1.858-2.773.227-.813.342-1.779.342-2.671C17.334 3.393 14.198 2 12.003 2zm-2.344 7.18c.52 0 .87.343.87.875 0 .532-.35.875-.87.875s-.869-.343-.869-.875c0-.532.349-.875.869-.875zm4.687 0c.52 0 .869.343.869.875 0 .532-.349.875-.869.875s-.87-.343-.87-.875c0-.532.35-.875.87-.875zM9.06 14.703c.557 0 1.208.204 1.208.654 0 .45-.651.654-1.208.654-.557 0-1.208-.204-1.208-.654s.651-.654 1.208-.654zm5.88 0c.557 0 1.208.204 1.208.654 0 .45-.651.654-1.208.654-.557 0-1.208-.204-1.208-.654s.651-.654 1.208-.654z"/>
                  </svg>
                  QQ
                </button>
              </div>
            </div>
          </div>

          {/* Right: Contact form */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white/40 text-sm mb-2">你的名字</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-5 py-4 bg-dark-700/50 rounded-xl border border-white/5 text-white placeholder-white/20 focus:border-accent-cyan/50 focus:outline-none transition-colors duration-300"
                  placeholder="请输入你的名字"
                />
              </div>

              <div>
                <label className="block text-white/40 text-sm mb-2">邮箱地址</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-5 py-4 bg-dark-700/50 rounded-xl border border-white/5 text-white placeholder-white/20 focus:border-accent-cyan/50 focus:outline-none transition-colors duration-300"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-white/40 text-sm mb-2">想聊点什么</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-5 py-4 bg-dark-700/50 rounded-xl border border-white/5 text-white placeholder-white/20 focus:border-accent-cyan/50 focus:outline-none transition-colors duration-300 resize-none"
                  placeholder="告诉我你的想法或项目..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-accent-cyan to-accent-purple text-white text-sm tracking-wider rounded-xl hover:opacity-90 transition-opacity duration-300"
              >
                发送消息
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className={`mt-32 pt-8 border-t border-white/5 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="font-display text-lg font-bold tracking-wider">
              <span className="gradient-text">DESIGN WEEKLY REPORT</span>
            </div>
            <p className="text-white/30 text-sm">
              © 2024 All rights reserved. Designed with passion.
            </p>
            <div className="flex items-center gap-2 text-white/30 text-sm">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Available for freelance
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
