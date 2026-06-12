import { type NextRequest, NextResponse } from 'next/server'

// 신청 정보를 Google 스프레드시트로 전송합니다.
// Google Apps Script 웹앱 URL을 GOOGLE_SHEETS_WEBHOOK_URL 환경변수로 설정하세요.
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
      // 웹훅이 아직 연결되지 않은 경우에도 폼이 동작하도록 로그만 남깁니다.
      console.log('[v0] GOOGLE_SHEETS_WEBHOOK_URL 미설정 - 신청 데이터:', {
        name,
        phone,
        school,
      })
      return NextResponse.json({
        ok: true,
        pending: true,
        message:
          '신청이 접수되었습니다. (스프레드시트 연동 대기 중 - 관리자에게 GOOGLE_SHEETS_WEBHOOK_URL 설정을 요청하세요.)',
      })
    }

    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        phone,
        school,
        submittedAt: new Date().toISOString(),
      }),
    })

    if (!res.ok) {
      console.log('[v0] 스프레드시트 전송 실패:', res.status)
      return NextResponse.json(
        { ok: false, error: '신청 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.' },
        { status: 502 },
      )
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.log('[v0] /api/signup 오류:', (err as Error).message)
    return NextResponse.json(
      { ok: false, error: '서버 오류가 발생했습니다.' },
      { status: 500 },
    )
  }
}
