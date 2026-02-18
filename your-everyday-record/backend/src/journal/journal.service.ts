import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-client';

@Injectable()
export class JournalService {
  // Pulls from the Vercel Environment Variables you already set up
  private supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  );

  async getAll() {
    const { data } = await this.supabase.from('journal_entries').select('*').order('created_at', { ascending: false });
    return data;
  }

  async create(payload) {
    const { data, error } = await this.supabase.from('journal_entries').insert([payload]);
    if (error) throw error;
    return data;
  }
}