import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { Guest, GuestDraft, GuestImportDraft } from '@/types/guest'
import { assignTables, normalizeGuestTables } from '@/lib/guestTable'
import { sampleGuests } from '@/lib/guestSampleData'

function createId() {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `guest-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export function emptyGuestDraft(): GuestDraft {
  return {
    name: '',
    phone: '',
    side: 'Nhà trai',
    group: 'Họ hàng',
    partySize: 1,
    status: 'Chưa mời',
    note: '',
    source: 'MANUAL',
  }
}

interface GuestStoreState {
  guests: Guest[]
  hasHydrated: boolean
  setHasHydrated: (value: boolean) => void
  addGuest: () => void
  updateGuest: (id: string, patch: Partial<Omit<Guest, 'id'>>) => void
  removeGuest: (id: string) => void
  clearAll: () => void
  setGuests: (guests: Guest[]) => void
  importGuests: (drafts: GuestImportDraft[]) => void
  autoAssignTables: () => void
}

export const useGuestStore = create<GuestStoreState>()(
  persist(
    (set, get) => ({
      guests: normalizeGuestTables(sampleGuests),
      hasHydrated: false,
      setHasHydrated: (value) => set({ hasHydrated: value }),

      addGuest: () => {
        const newGuest: Guest = { id: createId(), table: null, ...emptyGuestDraft() }
        set({ guests: [...get().guests, newGuest] })
      },

      // Editing "status" away from "Sẽ đến" clears the table; editing "table"
      // directly is how a user manually reassigns a confirmed guest's seat —
      // no auto-repack, so this can (intentionally) push a table over capacity.
      updateGuest: (id, patch) => {
        const next = get().guests.map((g) => {
          if (g.id !== id) return g
          const merged = { ...g, ...patch }
          if (merged.status !== 'Sẽ đến') merged.table = null
          return merged
        })
        set({ guests: next })
      },

      removeGuest: (id) => {
        set({ guests: get().guests.filter((g) => g.id !== id) })
      },

      clearAll: () => set({ guests: [] }),

      setGuests: (guests) => set({ guests: normalizeGuestTables(guests) }),

      importGuests: (drafts) => {
        const imported: Guest[] = drafts.map((d) => ({ id: createId(), ...d }))
        set({ guests: normalizeGuestTables(imported) })
      },

      // "Phân bàn tự động": re-packs every "Sẽ đến" guest into sequential
      // tables of 10 seats, overwriting any manual table numbers.
      autoAssignTables: () => {
        set({ guests: assignTables(get().guests) })
      },
    }),
    {
      name: 'guest-management-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ guests: state.guests }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)
