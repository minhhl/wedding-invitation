import type { Metadata } from 'next'
import { GuestManagementPage } from '@/components/guest-management/GuestManagementPage'

export const metadata: Metadata = {
  title: 'Quản lý khách mời',
  description: 'Quản lý danh sách khách mời, xác nhận tham dự và phân bàn cho tiệc cưới.',
}

export default function Page() {
  return <GuestManagementPage />
}
