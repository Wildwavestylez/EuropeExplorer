import { createClient } from '@supabase/supabase-js'

// These are public client credentials. Database access is controlled by Supabase RLS.
const SUPABASE_URL = 'https://ipnkjcpewtdaikiyzktv.supabase.co'
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_BWmRql2mXQvdCwn-7w0wVA_jXncEWXB'

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY)