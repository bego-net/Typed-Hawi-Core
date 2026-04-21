export interface Contact {
  id: number
  name: string
  email: string
  subject: string
  message: string
  reply: string | null
  is_replied: boolean
  created_at: string
}
