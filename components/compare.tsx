import { Check, Minus } from 'lucide-react'

const rows = [
  { label: '자료 기반 Q&A', them: true, us: true },
  { label: '자료 요약 정리', them: true, us: true },
  { label: '예상 문제 자동 출제', them: false, us: true },
  { label: '실전 채점 & 해설', them: false, us: true },
  { label: '약점 분석 리포트', them: false, us: true },
  { label: '한국 시험 형식 최적화', them: false, us: true },
]

export function Compare() {
  return (
    <section id="compare" className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            무엇이 다른가
          </p>
          <h2 className="mt-4 text-balance font-serif text-3xl font-semibold leading-snug tracking-tight md:text-4xl lg:text-[2.75rem]">
            “NotebookLM은 자료를 <span className="text-accent">읽게</span> 해주고,
            <br className="hidden md:block" /> 우리는 그 자료로{' '}
            <span className="text-accent">시험을 보게</span> 합니다.”
          </h2>
          <p className="mt-5 text-pretty leading-relaxed text-primary-foreground/70">
            이해했다는 착각과 진짜 실력 사이의 간극을, 문제를 풀어 보는 경험으로
            메웁니다.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-2xl overflow-hidden rounded-xl border border-primary-foreground/15">
          <div className="grid grid-cols-[1.5fr_1fr_1fr] bg-primary-foreground/5 text-sm font-medium">
            <div className="p-4" />
            <div className="border-l border-primary-foreground/10 p-4 text-center text-primary-foreground/70">
              자료 읽기 도구
            </div>
            <div className="border-l border-primary-foreground/10 bg-accent/15 p-4 text-center font-semibold text-accent">
              RAG Tutor
            </div>
          </div>
          {rows.map((r) => (
            <div
              key={r.label}
              className="grid grid-cols-[1.5fr_1fr_1fr] border-t border-primary-foreground/10 text-sm"
            >
              <div className="p-4">{r.label}</div>
              <div className="flex items-center justify-center border-l border-primary-foreground/10 p-4">
                {r.them ? (
                  <Check className="size-4 text-primary-foreground/50" />
                ) : (
                  <Minus className="size-4 text-primary-foreground/25" />
                )}
              </div>
              <div className="flex items-center justify-center border-l border-primary-foreground/10 bg-accent/10 p-4">
                {r.us ? (
                  <Check className="size-4 text-accent" strokeWidth={2.5} />
                ) : (
                  <Minus className="size-4 text-primary-foreground/25" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
