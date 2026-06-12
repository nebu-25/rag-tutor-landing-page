import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const nav = [
  { label: '기능', href: '#features' },
  { label: '작동 방식', href: '#how' },
  { label: '비교', href: '#compare' },
  { label: '무료 배포', href: '#signup' },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="#" className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <svg
              viewBox="0 0 24 24"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 6.5A2.5 2.5 0 0 1 5.5 4H11v16H5.5A2.5 2.5 0 0 1 3 17.5z" />
              <path d="M21 6.5A2.5 2.5 0 0 0 18.5 4H13v16h5.5a2.5 2.5 0 0 0 2.5-2.5z" />
            </svg>
          </span>
          <span className="font-serif text-lg font-semibold tracking-tight">
            RAG Tutor
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#signup"
          className={cn(
            buttonVariants({ size: 'sm', className: 'rounded-full' }),
          )}
        >
          무료 문제집 신청
        </a>
      </div>
    </header>
  )
}
