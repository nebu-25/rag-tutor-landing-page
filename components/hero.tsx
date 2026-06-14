import {
  BookOpenCheck,
  CheckCircle2,
  FileText,
  ListChecks,
  Sparkles,
} from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

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
            자료로{' '}
            <span className="underline decoration-accent decoration-4 underline-offset-[6px]">
              시험
            </span>
            을 보는 것으로
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            PDF·강의자료·논문을 업로드하면 AI 튜터가 핵심 개념을 정리하고,
            예상 문제를 출제하며, 당신의 약점을 짚어 줍니다. 읽기만 하는 학습은
            이제 끝입니다.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#signup"
              className={cn(
                buttonVariants({
                  size: 'lg',
                  className: 'rounded-full px-7 text-base',
                }),
              )}
            >
              베타 신청하기
            </a>
            <a
              href="#how"
              className={cn(
                buttonVariants({
                  size: 'lg',
                  variant: 'outline',
                  className:
                    'rounded-full border-foreground/20 bg-transparent px-7 text-base',
                }),
              )}
            >
              작동 방식 보기
            </a>
          </div>

          <p className="mt-5 text-sm text-muted-foreground">
            지금 신청하면 정식 출시 전 베타 우선 초대 + 무료 문제집 PDF 제공
          </p>
        </div>

        {/* Right: app preview */}
        <div className="relative">
          <div className="absolute -inset-4 -z-10 rounded-2xl bg-accent/10 blur-2xl" />
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-xl shadow-foreground/5">
            <div className="flex items-center justify-between border-b border-border bg-background/70 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-destructive/70" />
                <span className="size-2.5 rounded-full bg-accent" />
                <span className="size-2.5 rounded-full bg-primary/40" />
              </div>
              <span className="rounded-full bg-accent/15 px-2.5 py-1 text-[11px] font-medium text-accent-foreground">
                학습 세션 진행 중
              </span>
            </div>

            <div className="grid gap-4 p-4 sm:grid-cols-[0.8fr_1.2fr]">
              <div className="space-y-3">
                <div className="rounded-lg border border-border bg-background p-3">
                  <div className="flex items-center gap-2">
                    <FileText className="size-4 text-accent" />
                    <span className="font-mono text-[11px] text-muted-foreground">
                      경제학원론_3장.pdf
                    </span>
                  </div>
                  <div className="mt-3 space-y-2">
                    <div className="h-1.5 rounded-full bg-secondary">
                      <div className="h-full w-[86%] rounded-full bg-accent" />
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      24쪽 분석 완료 · 출처 18개 추출
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border border-border bg-secondary/50 p-3">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Sparkles className="size-4 text-accent" />
                    핵심 개념 지도
                  </div>
                  <div className="mt-3 grid gap-2 text-xs">
                    {['한계효용', '수요곡선', '소비자 선택'].map((item) => (
                      <div
                        key={item}
                        className="rounded-md border border-border bg-card px-2.5 py-2"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="rounded-lg border border-border bg-background p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <ListChecks className="size-4 text-accent" />
                      예상 문제 12개 생성
                    </div>
                    <span className="text-[11px] text-muted-foreground">
                      객관식 · 서술형
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed">
                    한계효용 체감의 법칙이 수요곡선의 형태에 미치는 영향은?
                  </p>
                  <div className="mt-3 grid gap-2">
                    {['우상향', '우하향', '수직선'].map((opt, i) => (
                      <div
                        key={opt}
                        className={cn(
                          'rounded-md border px-3 py-2 text-sm',
                          i === 1
                            ? 'border-accent bg-accent/10 font-medium'
                            : 'border-border',
                        )}
                      >
                        {i + 1}. {opt}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg border border-border bg-card p-3">
                    <div className="flex items-center gap-2 text-xs font-medium text-accent-foreground">
                      <CheckCircle2 className="size-3.5 text-accent" />
                      자동 채점
                    </div>
                    <p className="mt-2 font-serif text-3xl font-semibold">
                      83점
                    </p>
                    <p className="text-xs text-muted-foreground">
                      약점: 수요 탄력성
                    </p>
                  </div>
                  <div className="rounded-lg border border-border bg-card p-3">
                    <div className="flex items-center gap-2 text-xs font-medium text-accent-foreground">
                      <BookOpenCheck className="size-3.5 text-accent" />
                      출처 해설
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      p.42 문단을 근거로 정답과 오답 이유를 함께 설명합니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
