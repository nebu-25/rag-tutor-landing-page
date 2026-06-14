'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CheckCircle2, Gift, ShieldCheck } from 'lucide-react'

export function SignupForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle',
  )
  const [message, setMessage] = useState('')
  const [privacyConsent, setPrivacyConsent] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const payload = {
      name: String(data.get('name') ?? ''),
      phone: String(data.get('phone') ?? ''),
      school: String(data.get('school') ?? ''),
    }

    if (data.get('privacyConsent') !== 'on') {
      setStatus('error')
      setMessage('개인정보 수집 및 이용에 동의해 주세요.')
      return
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
      setPrivacyConsent(false)
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

              <div className="flex items-start gap-3 rounded-lg border border-border bg-background/70 p-4">
                <input
                  id="privacyConsent"
                  name="privacyConsent"
                  type="checkbox"
                  required
                  checked={privacyConsent}
                  onChange={(event) =>
                    setPrivacyConsent(event.currentTarget.checked)
                  }
                  className="mt-1 size-4 shrink-0 accent-accent"
                />
                <Label
                  htmlFor="privacyConsent"
                  className="cursor-pointer text-sm font-normal leading-relaxed text-muted-foreground"
                >
                  문제집 발송 및 베타 안내를 위해 이름, 전화번호, 학교/전공
                  정보를 수집하고 이용하는 데 동의합니다.
                </Label>
              </div>

              <div className="rounded-lg border border-accent/25 bg-accent/10 p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-accent-foreground">
                  <ShieldCheck className="size-4 text-accent" />
                  개인정보 안내
                </div>
                <ul className="mt-3 space-y-2 text-xs leading-relaxed text-muted-foreground">
                  <li>수집 목적: 문제집 발송, 베타 초대, 신청자 안내</li>
                  <li>보관 기간: 발송 및 안내 완료 후 최대 6개월</li>
                  <li>제3자 제공 없이 내부 운영 목적으로만 사용</li>
                  <li>삭제 요청 시 확인 후 지체 없이 처리</li>
                </ul>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={status === 'loading' || !privacyConsent}
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
                신청 철회 또는 개인정보 삭제 요청은 안내 문자에 회신해 주세요.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
