'use client'

import { Trash2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import {
  Guest,
  GuestGroup,
  GuestSide,
  GuestSource,
  GuestStatus,
  GUEST_GROUPS,
  GUEST_SIDES,
  GUEST_SOURCE_LABELS,
  GUEST_STATUSES,
  MAX_PARTY_SIZE,
} from '@/types/guest'

interface GuestTableProps {
  guests: Guest[]
  totalGuestCount: number
  overloadedTableNumbers: Set<number>
  onUpdate: (id: string, patch: Partial<Omit<Guest, 'id'>>) => void
  onRemove: (id: string) => void
}

const STATUS_STYLES: Record<GuestStatus, string> = {
  'Chưa mời': 'text-zinc-400',
  'Đã mời': 'text-sky-400',
  'Sẽ đến': 'text-emerald-400',
  'Không đến': 'text-red-400',
}

const PARTY_SIZE_TOOLTIP = 'Ví dụ nhập 4 nghĩa là khách này tham dự cùng tổng cộng 4 người.'

const SOURCE_STYLES: Record<GuestSource, string> = {
  MANUAL: 'text-zinc-400 bg-zinc-800',
  IMPORT_EXCEL: 'text-sky-300 bg-sky-500/10',
  RSVP: 'text-violet-300 bg-violet-500/10',
}

function EmptyState({ totalGuestCount }: { totalGuestCount: number }) {
  return (
    <p className="px-4 py-10 text-center text-sm text-zinc-500">
      {totalGuestCount === 0
        ? 'Chưa có khách mời nào. Bấm "Thêm khách" để bắt đầu.'
        : 'Không tìm thấy khách phù hợp với bộ lọc hiện tại.'}
    </p>
  )
}

export function GuestTable({
  guests,
  totalGuestCount,
  overloadedTableNumbers,
  onUpdate,
  onRemove,
}: GuestTableProps) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900">
      {/* Card list on mobile — a wide table forces horizontal scrolling,
          which doesn't read as "app-like"; each guest becomes one editable
          card instead, stacked in a normal vertical scroll. */}
      <div className="flex flex-col gap-3 p-3 md:hidden">
        {guests.length === 0 ? (
          <EmptyState totalGuestCount={totalGuestCount} />
        ) : (
          guests.map((guest) => (
            <GuestCard
              key={guest.id}
              guest={guest}
              isOverloaded={guest.table !== null && overloadedTableNumbers.has(guest.table)}
              onUpdate={onUpdate}
              onRemove={onRemove}
            />
          ))
        )}
      </div>

      {/* Full table from md: up, where there's room to show every column at once. */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[900px] border-collapse text-sm">
          <thead className="sticky top-0 z-10 bg-zinc-900">
            <tr className="border-b border-zinc-800 text-left text-xs font-medium uppercase tracking-wide text-zinc-500">
              <th className="px-4 py-3 min-w-[180px]">Tên khách</th>
              <th className="px-4 py-3 min-w-[140px]">SĐT</th>
              <th className="px-4 py-3 min-w-[120px]">Bên</th>
              <th className="px-4 py-3 min-w-[140px]">Nhóm</th>
              <th className="px-4 py-3 min-w-[90px]">Số người</th>
              <th className="px-4 py-3 min-w-[140px]">Xác nhận</th>
              <th className="px-4 py-3 min-w-[80px]">Bàn</th>
              <th className="px-4 py-3 min-w-[180px]">Ghi chú</th>
              <th className="px-4 py-3 min-w-[110px]">Nguồn</th>
              <th className="px-4 py-3 w-12" />
            </tr>
          </thead>
          <tbody>
            {guests.map((guest) => {
              const isConfirmed = guest.status === 'Sẽ đến'
              const isOverloaded = guest.table !== null && overloadedTableNumbers.has(guest.table)

              return (
                <tr
                  key={guest.id}
                  className={cn(
                    'border-b border-zinc-800/60 last:border-0 hover:bg-zinc-800/40',
                    isOverloaded && 'bg-red-500/10 hover:bg-red-500/15'
                  )}
                >
                  <td className="px-4 py-2">
                    <Input
                      value={guest.name}
                      onChange={(e) => onUpdate(guest.id, { name: e.target.value })}
                      placeholder="Tên khách"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <Input
                      value={guest.phone}
                      onChange={(e) => onUpdate(guest.id, { phone: e.target.value })}
                      placeholder="0900000000"
                      inputMode="tel"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <Select
                      value={guest.side}
                      onChange={(e) => onUpdate(guest.id, { side: e.target.value as GuestSide })}
                    >
                      {GUEST_SIDES.map((side) => (
                        <option key={side} value={side}>
                          {side}
                        </option>
                      ))}
                    </Select>
                  </td>
                  <td className="px-4 py-2">
                    <Select
                      value={guest.group}
                      onChange={(e) => onUpdate(guest.id, { group: e.target.value as GuestGroup })}
                    >
                      {GUEST_GROUPS.map((group) => (
                        <option key={group} value={group}>
                          {group}
                        </option>
                      ))}
                    </Select>
                  </td>
                  <td className="px-4 py-2">
                    <Input
                      type="number"
                      min={1}
                      max={MAX_PARTY_SIZE}
                      value={guest.partySize}
                      title={PARTY_SIZE_TOOLTIP}
                      placeholder="Bao gồm khách chính và người đi cùng"
                      onChange={(e) => {
                        const raw = Number(e.target.value)
                        const clamped = Number.isFinite(raw)
                          ? Math.min(MAX_PARTY_SIZE, Math.max(1, Math.round(raw)))
                          : 1
                        onUpdate(guest.id, { partySize: clamped })
                      }}
                    />
                  </td>
                  <td className="px-4 py-2">
                    <Select
                      value={guest.status}
                      className={cn('font-medium', STATUS_STYLES[guest.status])}
                      onChange={(e) => onUpdate(guest.id, { status: e.target.value as GuestStatus })}
                    >
                      {GUEST_STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </Select>
                  </td>
                  <td className="px-4 py-2">
                    <Input
                      type="number"
                      min={1}
                      disabled={!isConfirmed}
                      value={guest.table ?? ''}
                      placeholder="—"
                      className={cn(isOverloaded && 'border-red-500 text-red-300')}
                      onChange={(e) => {
                        const raw = Number(e.target.value)
                        onUpdate(guest.id, {
                          table: e.target.value === '' || !Number.isFinite(raw) || raw < 1
                            ? null
                            : Math.round(raw),
                        })
                      }}
                    />
                  </td>
                  <td className="px-4 py-2">
                    <Input
                      value={guest.note}
                      onChange={(e) => onUpdate(guest.id, { note: e.target.value })}
                      placeholder="Ghi chú"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={cn(
                        'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium',
                        SOURCE_STYLES[guest.source]
                      )}
                    >
                      {GUEST_SOURCE_LABELS[guest.source]}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      type="button"
                      onClick={() => onRemove(guest.id)}
                      className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-red-500/10 hover:text-red-400"
                      aria-label={`Xóa ${guest.name || 'khách'}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              )
            })}

            {guests.length === 0 && (
              <tr>
                <td colSpan={10}>
                  <EmptyState totalGuestCount={totalGuestCount} />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium text-zinc-500">{label}</span>
      {children}
    </div>
  )
}

function GuestCard({
  guest,
  isOverloaded,
  onUpdate,
  onRemove,
}: {
  guest: Guest
  isOverloaded: boolean
  onUpdate: (id: string, patch: Partial<Omit<Guest, 'id'>>) => void
  onRemove: (id: string) => void
}) {
  const isConfirmed = guest.status === 'Sẽ đến'

  return (
    <div
      className={cn(
        'flex flex-col gap-3 rounded-xl border border-zinc-800 bg-zinc-950/60 p-3',
        isOverloaded && 'border-red-500/50 bg-red-500/5'
      )}
    >
      <div className="flex items-start gap-2">
        <div className="flex-1">
          <Input
            value={guest.name}
            onChange={(e) => onUpdate(guest.id, { name: e.target.value })}
            placeholder="Tên khách"
            className="text-base font-medium"
          />
        </div>
        <span
          className={cn(
            'mt-1.5 inline-flex shrink-0 items-center rounded-full px-2 py-1 text-xs font-medium',
            SOURCE_STYLES[guest.source]
          )}
        >
          {GUEST_SOURCE_LABELS[guest.source]}
        </span>
        <button
          type="button"
          onClick={() => onRemove(guest.id)}
          className="mt-0.5 shrink-0 rounded-lg p-2 text-zinc-500 transition-colors active:bg-red-500/10 active:text-red-400"
          aria-label={`Xóa ${guest.name || 'khách'}`}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <Field label="Số điện thoại">
        <Input
          value={guest.phone}
          onChange={(e) => onUpdate(guest.id, { phone: e.target.value })}
          placeholder="0900000000"
          inputMode="tel"
        />
      </Field>

      <div className="grid grid-cols-2 gap-2">
        <Field label="Bên">
          <Select
            value={guest.side}
            onChange={(e) => onUpdate(guest.id, { side: e.target.value as GuestSide })}
          >
            {GUEST_SIDES.map((side) => (
              <option key={side} value={side}>
                {side}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Nhóm">
          <Select
            value={guest.group}
            onChange={(e) => onUpdate(guest.id, { group: e.target.value as GuestGroup })}
          >
            {GUEST_GROUPS.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <Field label="Xác nhận">
        <Select
          value={guest.status}
          className={cn('font-medium', STATUS_STYLES[guest.status])}
          onChange={(e) => onUpdate(guest.id, { status: e.target.value as GuestStatus })}
        >
          {GUEST_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </Select>
      </Field>

      <div className="grid grid-cols-2 gap-2">
        <Field label="Số người">
          <Input
            type="number"
            min={1}
            max={MAX_PARTY_SIZE}
            value={guest.partySize}
            title={PARTY_SIZE_TOOLTIP}
            onChange={(e) => {
              const raw = Number(e.target.value)
              const clamped = Number.isFinite(raw)
                ? Math.min(MAX_PARTY_SIZE, Math.max(1, Math.round(raw)))
                : 1
              onUpdate(guest.id, { partySize: clamped })
            }}
          />
        </Field>
        <Field label="Bàn">
          <Input
            type="number"
            min={1}
            disabled={!isConfirmed}
            value={guest.table ?? ''}
            placeholder="—"
            className={cn(isOverloaded && 'border-red-500 text-red-300')}
            onChange={(e) => {
              const raw = Number(e.target.value)
              onUpdate(guest.id, {
                table:
                  e.target.value === '' || !Number.isFinite(raw) || raw < 1 ? null : Math.round(raw),
              })
            }}
          />
        </Field>
      </div>

      <Field label="Ghi chú">
        <Input
          value={guest.note}
          onChange={(e) => onUpdate(guest.id, { note: e.target.value })}
          placeholder="Ghi chú"
        />
      </Field>
    </div>
  )
}
