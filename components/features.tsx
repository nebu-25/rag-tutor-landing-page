import { FileText, MessagesSquare, ListChecks, BookOpenCheck } from 'lucide-react'

const features = [
  {
    icon: FileText,
    title: 'PDF 업로드 & 분석',
    desc: '강의자료, 교재, 논문 PDF를 그대로 올리면 AI가 문맥을 이해하고 학습 가능한 형태로 구조화합니다.',
  },
  {
    icon: MessagesSquare,
    title: '자료 기반 Q&A',
    desc: '업로드한 자료에 근거해 답하는 대화형 튜터. 출처가 명확해 잘못된 정보 없이 깊이 있게 질문할 수 있습니다.',
  },
  {
    icon: ListChecks,
    title: '시험 대비 요약',
    desc: '방대한 자료를 시험에 나올 핵심만 압축. 단원별 요약과 예상 출제 포인트를 자동으로 정리합니다.',
  },
  {
    icon: BookOpenCheck,
    title: '핵심 개념 & 문제 출제',
    desc: '읽기에서 끝나지 않습니다. 자료를 바탕으로 실제 문제를 출제하고 채점·해설까지 제공합니다.',
  },
]

export function Features() {
  return (
    <section id="features" className="border-t border-border bg-secondary/30">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-accent-foreground">
            핵심 기능
          </p>
          <h2 className="mt-3 text-balance font-serif text-3xl font-semibold tracking-tight md:text-4xl">
            업로드하면, 학습이 시작됩니다
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            RAG Tutor는 당신의 자료를 근거로 학습 전 과정을 설계합니다. 읽고,
            묻고, 정리하고, 시험까지 한 곳에서.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-lg hover:shadow-foreground/5"
            >
              <div className="flex size-11 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <f.icon className="size-5" strokeWidth={1.8} />
              </div>
              <h3 className="mt-5 font-serif text-xl font-semibold">
                {f.title}
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
