import { GuestSide, GuestStatus } from '@/types/guest'

export type SideFilter = 'Tất cả' | GuestSide
export type StatusFilter = 'Mọi trạng thái' | GuestStatus

export const QUICK_TABS = ['Tất cả', 'Nhà trai', 'Nhà gái', 'Sẽ đến', 'Chưa phản hồi'] as const
export type QuickTab = (typeof QUICK_TABS)[number]
