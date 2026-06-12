'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CheckCircle2, Gift } from 'lucide-react'

export function SignupForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle',
  )
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const payload = {
      name: String(data.get('name') ?? ''),
      phone: String(data.get('phone') ?? ''),
      school: String(data.get('school') ?? ''),
    }

    setStatus('loading')
    setMessage('')
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (!res.ok || !json.ok) {
        throw new Error(json.error ?? '신청에 실패했습니다.')
      }
      setStatus('success')
      form.reset()
    } catch (err) {
      setStatus('error')
      setMessage((err as Error).message)
    }
  }

  return (
    <section id="signup" className="border-t border-border bg-secondary/30">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:py-28 lg:grid-cols-2">
        {/* Left: offer copy */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/15 px-3 py-1 text-xs font-medium text-accent-foreground">
            <Gift className="size-3.5" />
            선착순 50명 한정
          </span>
          <h2 className="mt-5 text-balance font-serif text-3xl font-semibold leading-snug tracking-tight md:text-4xl">
            자사 제작 문제집을
            <br />
            무료로 받아 보세요
          </h2>
          <p className="mt-5 max-w-md text-pretty leading-relaxed text-muted-foreground">
            RAG Tutor 팀이 직접 만든 핵심 개념 문제집을 선착순 50분께 무료로
            보내 드립니다. 전화번호만 남기면 신청 완료. 베타 우선 초대도 함께
            드립니다.
          </p>

          <ul className="mt-7 space-y-3">
            {[
              '단원별 핵심 개념 정리 + 예상 문제 PDF',
              '정식 출시 전 베타 우선 초대',
              '신청 순서대로 발송 (마감 시 조기 종료)',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" />
                <span className="leading-relaxed text-muted-foreground">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: form card */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-xl shadow-foreground/5 md:p-8">
          {status === 'success' ? (
            <div className="flex flex-col items-center py-10 text-center">
              <div className="flex size-14 items-center justify-center rounded-full bg-accent/15">
                <CheckCircle2 className="size-7 text-accent" />
              </div>
              <h3 className="mt-5 font-serif text-2xl font-semibold">
                신청이 완료되었습니다
              </h3>
              <p className="mt-2 max-w-sm leading-relaxed text-muted-foreground">
                선착순 50명 내에 드시면 입력하신 번호로 문제집을 보내 드립니다.
                조금만 기다려 주세요!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <h3 className="font-serif text-2xl font-semibold">
                  무료 문제집 신청
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  전화번호로 문제집을 받아 보세요. 1분이면 충분합니다.
                </p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="name">이름</Label>
                <Input
                  id="name"
                  name="name"
                  required
                  placeholder="홍길동"
                  autoComplete="name"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="phone">전화번호</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  inputMode="tel"
                  placeholder="010-1234-5678"
                  autoComplete="tel"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="school">
                  학교 / 전공{' '}
                  <span className="font-normal text-muted-foreground">
                    (선택)
                  </span>
                </Label>
                <Input
                  id="school"
                  name="school"
                  placeholder="예) ○○대학교 경제학과"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={status === 'loading'}
                className="mt-1 w-full rounded-full text-base"
              >
                {status === 'loading' ? '신청 중...' : '무료로 신청하기'}
              </Button>

              {status === 'error' && (
                <p className="text-center text-sm text-destructive" role="alert">
                  {message}
                </p>
              )}

              <p className="text-center text-xs leading-relaxed text-muted-foreground">
                신청 시 이벤트 안내를 위한 연락에 동의하는 것으로 간주됩니다.
                수집된 정보는 문제집 발송 및 베타 안내 목적에만 사용됩니다.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
