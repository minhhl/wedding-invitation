import 'server-only'
import fs from 'node:fs'
import path from 'node:path'
import { RsvpRequest } from '@/types/rsvp'

const RSVP_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'rsvp-requests.json')

export function readRsvpRequestsFromDisk(): RsvpRequest[] {
  if (!fs.existsSync(RSVP_FILE_PATH)) {
    writeRsvpRequestsToDisk([])
    return []
  }
  try {
    const raw = fs.readFileSync(RSVP_FILE_PATH, 'utf8')
    const data = JSON.parse(raw)
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

export function writeRsvpRequestsToDisk(requests: RsvpRequest[]): void {
  fs.mkdirSync(path.dirname(RSVP_FILE_PATH), { recursive: true })
  fs.writeFileSync(RSVP_FILE_PATH, JSON.stringify(requests, null, 2), 'utf8')
}
