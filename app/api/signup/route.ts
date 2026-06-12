import { type NextRequest, NextResponse } from 'next/server'

// 신청 정보를 Google 스프레드시트로 전송합니다.
// Google Apps Script 웹앱 URL을 GOOGLE_SHEETS_WEBHOOK_URL 환경변수로 설정하세요.
const GENERIC_SIGNUP_ERROR =
  '신청 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const name = String(body?.name ?? '').trim()
    const phone = String(body?.phone ?? '').trim()
    const school = String(body?.school ?? '').trim()

    // 전화번호 검증: 숫자/하이픈/공백 허용, 숫자 9~11자리
    const digits = phone.replace(/\D/g, '')
    if (!name) {
      return NextResponse.json(
        { ok: false, error: '이름을 입력해 주세요.' },
        { status: 400 },
      )
    }
    if (digits.length < 9 || digits.length > 11) {
      return NextResponse.json(
        { ok: false, error: '올바른 전화번호를 입력해 주세요.' },
        { status: 400 },
      )
    }

    const webhook = process.env.GOOGLE_SHEETS_WEBHOOK_URL

    if (!webhook) {
      console.error('[signup] GOOGLE_SHEETS_WEBHOOK_URL is not configured')
      return NextResponse.json(
        {
          ok: false,
          error:
            '신청 접수 설정이 완료되지 않았습니다. 관리자에게 문의해 주세요.',
        },
        { status: 503 },
      )
    }

    let res: Response
    try {
      res = await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          school,
          submittedAt: new Date().toISOString(),
        }),
      })
    } catch {
      console.error('[signup] webhook request failed', {
        code: 'WEBHOOK_FETCH_ERROR',
      })
      return NextResponse.json(
        { ok: false, error: GENERIC_SIGNUP_ERROR },
        { status: 502 },
      )
    }

    const responseText = await res.text()

    if (!res.ok) {
      console.error('[signup] webhook request failed', {
        status: res.status,
        code: 'WEBHOOK_HTTP_ERROR',
      })
      return NextResponse.json(
        { ok: false, error: GENERIC_SIGNUP_ERROR },
        { status: 502 },
      )
    }

    let parsed: unknown
    try {
      parsed = JSON.parse(responseText)
    } catch {
      console.error('[signup] webhook returned invalid JSON', {
        status: res.status,
        code: 'WEBHOOK_INVALID_JSON',
      })
      return NextResponse.json(
        { ok: false, error: GENERIC_SIGNUP_ERROR },
        { status: 502 },
      )
    }

    if (
      !parsed ||
      typeof parsed !== 'object' ||
      !('ok' in parsed) ||
      parsed.ok !== true
    ) {
      console.error('[signup] webhook did not confirm success', {
        status: res.status,
        code: 'WEBHOOK_NOT_OK',
      })
      return NextResponse.json(
        { ok: false, error: GENERIC_SIGNUP_ERROR },
        { status: 502 },
      )
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[signup] unexpected error', { code: 'UNEXPECTED_ERROR' })
    return NextResponse.json(
      { ok: false, error: '서버 오류가 발생했습니다.' },
      { status: 500 },
    )
  }
}
