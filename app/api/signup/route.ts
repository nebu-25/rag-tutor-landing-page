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

    const webhook =
      process.env.GOOGLE_SHEETS_WEBHOOK_URL ??
      'https://script.google.com/macros/s/AKfycbzMsq0pnzq6dtP9eKI8w66u03fPMnrqYL8r3zFkTp6yteAHclVKSEcI22kJnSfrtLIRIA/exec'

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

    // 진단용: Apps Script가 실제로 무엇을 반환하는지 확인합니다.
    // (로그인 HTML이 오면 권한 문제, 빈 값/에러 JSON이면 파싱 문제)
    const responseText = await res.text()
    console.log('[signup] webhook status:', res.status)
    console.log('[signup] webhook body:', responseText.slice(0, 500))

    if (!res.ok) {
      return NextResponse.json(
        { ok: false, error: '신청 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.' },
        { status: 502 },
      )
    }

    // Apps Script가 JSON({ok:true})을 반환하면 그 값으로 성공 여부를 확정합니다.
    let scriptOk = true
    try {
      const parsed = JSON.parse(responseText)
      if (parsed && typeof parsed.ok === 'boolean') scriptOk = parsed.ok
    } catch {
      // JSON이 아니면(로그인 페이지 등) 본문에 'google' 로그인 흔적이 있는지로 판단
      if (/<html|sign in|login/i.test(responseText)) scriptOk = false
    }

    if (!scriptOk) {
      console.log('[signup] Apps Script가 성공을 확인하지 않음')
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
