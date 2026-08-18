'use client'

import { useRef, useState } from 'react'
import { Plus, Trash2, Download, Upload, FileSpreadsheet, ChevronDown, LayoutGrid } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { Guest } from '@/types/guest'
import {
  exportConfirmedGuests,
  exportGuestsBySide,
  exportGuestsToExcel,
  exportSummaryReport,
  exportUnrespondedGuests,
  importGuestsFromExcelFile,
} from '@/lib/guestExcel'

interface ActionsBarProps {
  guests: Guest[]
  onAddGuest: () => void
  onClearAll: () => void
  onAutoAssignTables: () => void
  onImport: (drafts: Awaited<ReturnType<typeof importGuestsFromExcelFile>>) => void
}

export function ActionsBar({
  guests,
  onAddGuest,
  onClearAll,
  onAutoAssignTables,
  onImport,
}: ActionsBarProps) {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [exportMenuOpen, setExportMenuOpen] = useState(false)
  const [importError, setImportError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function handleFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    try {
      setImportError(null)
      const drafts = await importGuestsFromExcelFile(file)
      if (drafts.length === 0) {
        setImportError('Không tìm thấy dữ liệu khách hợp lệ trong file.')
        return
      }
      onImport(drafts)
    } catch {
      setImportError('Không đọc được file Excel. Vui lòng kiểm tra định dạng.')
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={onAddGuest}>
          <Plus className="h-4 w-4" />
          Thêm khách
        </Button>

        <Button variant="destructive" onClick={() => setConfirmOpen(true)}>
          <Trash2 className="h-4 w-4" />
          Xóa hết
        </Button>

        <Button variant="secondary" onClick={onAutoAssignTables}>
          <LayoutGrid className="h-4 w-4" />
          Phân bàn tự động
        </Button>

        <div className="ml-auto flex flex-wrap items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls"
            className="hidden"
            onChange={handleFileSelected}
          />
          <Button variant="secondary" onClick={() => fileInputRef.current?.click()}>
            <Upload className="h-4 w-4" />
            Tải file Excel
          </Button>

          <Button variant="secondary" onClick={() => exportGuestsToExcel(guests)}>
            <Download className="h-4 w-4" />
            Lưu Excel
          </Button>

          <div className="relative">
            <Button variant="outline" onClick={() => setExportMenuOpen((v) => !v)}>
              <FileSpreadsheet className="h-4 w-4" />
              Xuất báo cáo
              <ChevronDown className="h-3.5 w-3.5" />
            </Button>

            {exportMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setExportMenuOpen(false)}
                />
                <div className="absolute right-0 z-20 mt-1 w-56 rounded-lg border border-zinc-700 bg-zinc-900 p-1 shadow-xl">
                  {[
                    {
                      label: 'Danh sách Nhà trai',
                      action: () => exportGuestsBySide(guests, 'Nhà trai'),
                    },
                    {
                      label: 'Danh sách Nhà gái',
                      action: () => exportGuestsBySide(guests, 'Nhà gái'),
                    },
                    { label: 'Danh sách Sẽ đến', action: () => exportConfirmedGuests(guests) },
                    {
                      label: 'Danh sách Chưa phản hồi',
                      action: () => exportUnrespondedGuests(guests),
                    },
                    { label: 'Báo cáo tổng hợp', action: () => exportSummaryReport(guests) },
                  ].map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => {
                        item.action()
                        setExportMenuOpen(false)
                      }}
                      className={cn(
                        'w-full rounded-md px-3 py-2 text-left text-sm text-zinc-200 transition-colors hover:bg-zinc-800'
                      )}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {importError && <p className="text-sm text-red-400">{importError}</p>}

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xóa toàn bộ danh sách khách?</DialogTitle>
            <DialogDescription>
              Hành động này sẽ xóa toàn bộ {guests.length} khách mời hiện có và không thể hoàn
              tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setConfirmOpen(false)}>
              Hủy
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                onClearAll()
                setConfirmOpen(false)
              }}
            >
              Xóa hết
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
