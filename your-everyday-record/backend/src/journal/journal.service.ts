import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-client';

@Injectable()
export class JournalService {
  private supabase: SupabaseClient;

  constructor() {
    // These use the keys you added in the Vercel UI
    this.supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    );
  }

  async findAll() {
    const { data, error } = await this.supabase
      .from('journal_entries')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  }

  async create(entry: any) {
    const { data, error } = await this.supabase
      .from('journal_entries')
      .insert([entry]);
    if (error) throw error;
    return data;
  }
}