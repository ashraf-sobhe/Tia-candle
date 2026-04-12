import Image from 'next/image'

const reasons = [
  {
    title: 'جودة مضمونة',
    desc: 'كل شمعة بنختارها بعناية من أفضل المواد الطبيعية عشان تضمن تجربة لا تُنسى.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    title: 'شحن سريع',
    desc: 'طلبك يوصلك في أسرع وقت وبتغليف أنيق يخليه هدية جاهزة من أول لحظة.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3" />
        <rect x="9" y="11" width="14" height="10" rx="2" />
        <circle cx="12" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
      </svg>
    ),
  },
  {
    title: 'خدمة عملاء متميزة',
    desc: 'فريقنا دايماً موجود يساعدك ويجاوب على أي سؤال في أي وقت.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)' }} dir="rtl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        <div className="text-center mb-16">
          <h1 className="text-3xl font-black tracking-widest uppercase" style={{ color: 'var(--color-text)' }}>
            <span style={{ color: 'var(--color-text-muted)', fontWeight: 300 }}>من </span>نحن
            <span className="inline-block w-12 h-px align-middle mr-3" style={{ backgroundColor: 'var(--color-text)' }} />
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-stretch mb-16">

          <div className="w-full lg:w-5/12 shrink-0">
            <div className="relative w-full h-80 lg:h-full min-h-72 overflow-hidden rounded-sm">
              <Image
                src="/hero2.png"
                alt="شموع فواحة"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center space-y-6 text-base leading-relaxed">
            <p style={{ color: 'var(--color-text-muted)' }}>
              وُلدت فكرة متجرنا من حبنا الحقيقي لعطر الشموع وقدرتها على تحويل أي مكان إلى أجواء دافئة وهادئة. بدأنا برحلة بسيطة — إننا نوصّل لكل بيت لحظة سكينة حقيقية.
            </p>
            <p style={{ color: 'var(--color-text-muted)' }}>
              كل شمعة في متجرنا مصنوعة بحب من شمع الصويا الطبيعي وزيوت عطرية مختارة، عشان تعيش تجربة فريدة مع كل إضاءة.
            </p>

            <div
              className="p-6 rounded-sm mt-2"
              style={{ backgroundColor: 'var(--color-surface)', borderRight: '3px solid var(--color-primary)' }}
            >
              <h2 className="text-base font-bold mb-2" style={{ color: 'var(--color-text)' }}>رسالتنا</h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                رسالتنا إننا نقدملك منتجات تلمس الحواس وتضيف لمسة جمال لحياتك اليومية، بجودة عالية وبسعر يناسبك.
              </p>
            </div>
          </div>
        </div>

        <div className="my-16 flex items-center gap-4">
          <div className="flex-1 h-px" style={{ backgroundColor: 'var(--color-border)' }} />
          <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--color-text-muted)' }}>لماذا نحن</span>
          <div className="flex-1 h-px" style={{ backgroundColor: 'var(--color-border)' }} />
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-black tracking-widest uppercase mb-10" style={{ color: 'var(--color-text)' }}>
            <span style={{ color: 'var(--color-text-muted)', fontWeight: 300 }}>ليه </span>تختارنا
            <span className="inline-block w-12 h-px align-middle mr-3" style={{ backgroundColor: 'var(--color-text)' }} />
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: 'var(--color-border)' }}>
            {reasons.map((r) => (
              <div
                key={r.title}
                className="p-10 space-y-4"
                style={{ backgroundColor: 'var(--color-background)' }}
              >
                <div style={{ color: 'var(--color-primary)' }}>
                  {r.icon}
                </div>
                <h3 className="font-bold text-base" style={{ color: 'var(--color-text)' }}>{r.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  )
}