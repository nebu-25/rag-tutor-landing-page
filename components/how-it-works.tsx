const steps = [
  {
    no: '01',
    title: '자료를 업로드하세요',
    desc: '강의 슬라이드, 교재 챕터, 논문 PDF를 드래그 앤 드롭. 여러 파일을 한 번에 올려도 됩니다.',
  },
  {
    no: '02',
    title: 'AI가 핵심을 정리합니다',
    desc: '문맥을 분석해 단원별 요약과 핵심 개념 지도를 만들고, 헷갈리기 쉬운 부분을 표시합니다.',
  },
  {
    no: '03',
    title: '대화하며 깊이 학습하세요',
    desc: '자료에 근거한 Q&A로 모르는 부분을 즉시 해결. 출처가 함께 표시되어 신뢰할 수 있습니다.',
  },
  {
    no: '04',
    title: '시험을 보고 채점받으세요',
    desc: '예상 문제로 실전처럼 풀어 보고, 자동 채점과 해설로 약점을 보완합니다.',
  },
]

export function HowItWorks() {
  return (
    <section id="how" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-accent-foreground">
            작동 방식
          </p>
          <h2 className="mt-3 text-balance font-serif text-3xl font-semibold tracking-tight md:text-4xl">
            4단계로 끝내는 시험 준비
          </h2>
        </div>

        <ol className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2">
          {steps.map((s) => (
            <li key={s.no} className="bg-card p-7">
              <span className="font-mono text-3xl font-semibold text-accent">
                {s.no}
              </span>
              <h3 className="mt-3 font-serif text-xl font-semibold">
                {s.title}
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                {s.desc}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
