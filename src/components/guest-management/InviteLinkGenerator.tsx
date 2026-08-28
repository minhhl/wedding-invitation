'use client'

import { useState } from 'react'
import { Check, Copy, Link as LinkIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type InviteSide = 'trai' | 'gai'

const SIDE_LABEL: Record<InviteSide, string> = {
  trai: 'Nhà trai',
  gai: 'Nhà gái',
}

const SIDE_OPTIONS: InviteSide[] = ['trai', 'gai']

// next/image's basePath auto-prefixing doesn't apply to plain URLs, so it's
// added by hand here too (see the same note in src/lib/decor.ts) — needed so
// the generated link is correct under the GitHub Pages static export
// (served from /wedding-invitation).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

export function InviteLinkGenerator() {
  const [name, setName] = useState('')
  const [side, setSide] = useState<InviteSide>('trai')
  const [link, setLink] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  function handleGenerate(e: React.FormEvent) {
    e.preventDefault()
    const trimmedName = name.trim()
    if (!trimmedName) return

    const url = new URL(`${basePath}/nha-${side}`, window.location.origin)
    url.searchParams.set('name', trimmedName)
    setLink(url.toString())
    setCopied(false)
  }

  async function handleCopy() {
    if (!link) return
    await navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 sm:p-5">
      <h2 className="mb-1 text-base font-semibold text-zinc-50">Tạo link mời</h2>
      <p className="mb-4 text-sm text-zinc-400">
        Nhập tên khách mời và chọn bên mời để tạo link thiệp mời riêng cho khách đó.
      </p>

      <form onSubmit={handleGenerate} className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label htmlFor="invite-name" className="mb-1 block text-xs font-medium text-zinc-400">
            Tên khách mời
          </label>
          <Input
            id="invite-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="VD: Anh Chị Ba"
          />
        </div>

        <div>
          <span className="mb-1 block text-xs font-medium text-zinc-400">Khách mời của</span>
          <div className="flex h-9 items-center gap-4">
            {SIDE_OPTIONS.map((option) => (
              <label key={option} className="flex items-center gap-1.5 text-sm text-zinc-200">
                <input
                  type="radio"
                  name="invite-side"
                  checked={side === option}
                  onChange={() => setSide(option)}
                  className="h-4 w-4 accent-emerald-600"
                />
                {SIDE_LABEL[option]}
              </label>
            ))}
          </div>
        </div>

        <Button type="submit" disabled={!name.trim()}>
          <LinkIcon className="h-4 w-4" />
          Tạo link
        </Button>
      </form>

      {link && (
        <div className="mt-4 flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2">
          <span className="shrink-0 rounded-full bg-zinc-800 px-2 py-0.5 text-xs font-medium text-zinc-300">
            {SIDE_LABEL[side]}
          </span>
          <input
            readOnly
            value={link}
            onFocus={(e) => e.target.select()}
            className="flex-1 truncate bg-transparent text-sm text-zinc-200 outline-none"
          />
          <Button type="button" variant="secondary" size="sm" onClick={handleCopy}>
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? 'Đã chép' : 'Sao chép'}
          </Button>
        </div>
      )}
    </div>
  )
}
