import { Suspense } from 'react'
import type { Metadata } from 'next'
import { RsvpRequestsPage } from '@/components/rsvp-admin/RsvpRequestsPage'

export const metadata: Metadata = {
  title: 'RSVP Requests',
  description: 'Duyệt yêu cầu RSVP trước khi tạo hồ sơ khách mời chính thức.',
}

export default function Page() {
  return (
    <Suspense>
      <RsvpRequestsPage />
    </Suspense>
  )
}
