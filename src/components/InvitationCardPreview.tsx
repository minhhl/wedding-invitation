'use client'

import { Download } from 'lucide-react'
import { InvitationCard, type InvitationSide } from '@/components/InvitationCard'

/**
 * Wraps InvitationCard with a "Xuất PDF" button — used by the invite-links
 * card-only preview route. Exports via the browser's native print engine
 * (window.print() + @media print), not html2canvas: html2canvas reimplements
 * CSS rendering in JS and has known bugs losing nested content (images,
 * text) on complex layouts like this one — verified against this exact
 * page, where it silently dropped almost everything except one background
 * image no matter which element was targeted. Printing uses the browser's
 * real rendering pipeline, so nothing is lost; the only cost is the user
 * picking "Save as PDF" in the print dialog instead of an instant download.
 */
export function InvitationCardPreview({ side }: { side: InvitationSide }) {
  return (
    <div>
      <style>{`
        @media print {
          @page { margin: 0; }
          body { margin: 0; }
        }
      `}</style>
      <InvitationCard side={side} />
      <div className="flex flex-col items-center gap-2 bg-white py-6 print:hidden">
        <button
          type="button"
          onClick={() => window.print()}
          className="btn-champagne inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em]"
        >
          <Download size={16} />
          Xuất PDF
        </button>
        <p className="max-w-xs text-center text-xs text-text/50">
          Chọn &quot;Lưu dưới dạng PDF&quot; (Save as PDF) trong hộp thoại in.
        </p>
      </div>
    </div>
  )
}
