import { useMemo, useState } from 'react'
import { Guest } from '@/types/guest'
import { QuickTab, SideFilter, StatusFilter } from '@/types/guestFilters'

function normalizePhoneQuery(value: string) {
  return value.replace(/[^0-9]/g, '')
}

export function useGuestFilters(guests: Guest[]) {
  const [search, setSearch] = useState('')
  const [sideFilter, setSideFilter] = useState<SideFilter>('Tất cả')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('Mọi trạng thái')
  const [quickTab, setQuickTab] = useState<QuickTab>('Tất cả')

  const filteredGuests = useMemo(() => {
    const query = search.trim().toLowerCase()
    const phoneQuery = normalizePhoneQuery(search)

    return guests.filter((guest) => {
      if (query) {
        const matchesName = guest.name.toLowerCase().includes(query)
        const matchesPhone = phoneQuery.length > 0 && guest.phone.replace(/[^0-9]/g, '').includes(phoneQuery)
        if (!matchesName && !matchesPhone) return false
      }

      if (sideFilter !== 'Tất cả' && guest.side !== sideFilter) return false
      if (statusFilter !== 'Mọi trạng thái' && guest.status !== statusFilter) return false

      switch (quickTab) {
        case 'Nhà trai':
          if (guest.side !== 'Nhà trai') return false
          break
        case 'Nhà gái':
          if (guest.side !== 'Nhà gái') return false
          break
        case 'Sẽ đến':
          if (guest.status !== 'Sẽ đến') return false
          break
        case 'Chưa phản hồi':
          if (guest.status !== 'Chưa mời' && guest.status !== 'Đã mời') return false
          break
        default:
          break
      }

      return true
    })
  }, [guests, search, sideFilter, statusFilter, quickTab])

  return {
    search,
    setSearch,
    sideFilter,
    setSideFilter,
    statusFilter,
    setStatusFilter,
    quickTab,
    setQuickTab,
    filteredGuests,
  }
}
