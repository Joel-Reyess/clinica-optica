let prescriptionDraft: File | null = null

export interface QuoteRequestDraft {
  name: string
  contact: string
  reason: string
}

let quoteRequestDraft: QuoteRequestDraft | null = null

export function getPrescriptionDraft() {
  return prescriptionDraft
}

export function setPrescriptionDraft(file: File | null) {
  prescriptionDraft = file
}

export function getQuoteRequestDraft() {
  return quoteRequestDraft
}

export function setQuoteRequestDraft(draft: QuoteRequestDraft | null) {
  quoteRequestDraft = draft
}
