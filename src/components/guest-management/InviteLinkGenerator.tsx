'use client'

import { useState } from 'react'
import { Check, Copy, Link as LinkIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'

type InviteSide = 'trai' | 'gai'

const SIDE_LABEL: Record<InviteSide, string> = {
  trai: 'Nhà trai',
  gai: 'Nhà gái',
}

export function InviteLinkGenerator() {
  const [name, setName] = useState('')
  const [side, setSide] = useState<InviteSide>('trai')
  const [link, setLink] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  function handleGenerate(e: React.FormEvent) {
    e.preventDefault()
    const trimmedName = name.trim()
    if (!trimmedName) return

    const url = new URL(`/nha-${side}`, window.location.origin)
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

        <div className="w-full sm:w-44">
          <label htmlFor="invite-side" className="mb-1 block text-xs font-medium text-zinc-400">
            Khách mời của
          </label>
          <Select
            id="invite-side"
            value={side}
            onChange={(e) => setSide(e.target.value as InviteSide)}
          >
            <option value="trai">Nhà trai</option>
            <option value="gai">Nhà gái</option>
          </Select>
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
