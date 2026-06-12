import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        {/* Left: copy */}
        <div className="flex flex-col items-start">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/15 px-3 py-1 text-xs font-medium text-accent-foreground">
            <span className="size-1.5 rounded-full bg-accent" />
            선착순 50명 · 자사 문제집 무료 배포
          </span>

          <h1 className="mt-6 text-balance font-serif text-4xl font-semibold leading-[1.12] tracking-tight md:text-5xl lg:text-6xl">
            자료를 <span className="text-accent">읽는</span> 것에서
            <br />
            자료로 <span className="underline decoration-accent decoration-4 underline-offset-[6px]">시험</span>을 보는 것으로
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            PDF·강의자료·논문을 업로드하면 AI 튜터가 핵심 개념을 정리하고,
            예상 문제를 출제하며, 당신의 약점을 짚어 줍니다. 읽기만 하는 학습은
            이제 끝입니다.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-full px-7 text-base">
              <a href="#signup">무료 문제집 받기</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-foreground/20 bg-transparent px-7 text-base"
            >
              <a href="#how">작동 방식 보기</a>
            </Button>
          </div>

          <p className="mt-5 text-sm text-muted-foreground">
            지금 신청하면 정식 출시 전 베타 우선 초대 + 문제집 PDF 제공
          </p>
        </div>

        {/* Right: mock study card */}
        <div className="relative">
          <div className="absolute -inset-4 -z-10 rounded-3xl bg-accent/10 blur-2xl" />
          <div className="rounded-2xl border border-border bg-card p-5 shadow-xl shadow-foreground/5">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-accent" />
                <span className="font-mono text-xs text-muted-foreground">
                  자료기반_경제학원론_3장.pdf
                </span>
              </div>
              <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground">
                출제 완료
              </span>
            </div>

            <div className="space-y-3 py-4">
              <div className="rounded-lg bg-secondary/70 p-3">
                <p className="text-xs font-medium text-muted-foreground">
                  예상 문제 1 · 객관식
                </p>
                <p className="mt-1 text-sm leading-relaxed">
                  한계효용 체감의 법칙이 수요곡선의 형태에 미치는 영향으로 가장
                  적절한 것은?
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {[
                  '① 우상향하는 곡선을 만든다',
                  '② 우하향하는 곡선을 만든다',
                  '③ 수직선 형태가 된다',
                ].map((opt, i) => (
                  <div
                    key={opt}
                    className={`rounded-md border px-3 py-2 text-sm ${
                      i === 1
                        ? 'border-accent bg-accent/10 font-medium'
                        : 'border-border'
                    }`}
                  >
                    {opt}
                  </div>
                ))}
              </div>

              <div className="rounded-lg border border-border bg-background p-3">
                <p className="text-xs font-medium text-accent-foreground">
                  AI 해설
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  소비량이 늘수록 한계효용이 감소하므로 동일 재화의 추가
                  지불의사가 줄어듭니다. → 정답 ②
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
