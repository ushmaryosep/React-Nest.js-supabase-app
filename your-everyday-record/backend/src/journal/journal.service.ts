import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-client';

@Injectable()
export class JournalService {
  private supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  );

  async create(entry: any) {
    const { data, error } = await this.supabase
      .from('journal_entries')
      .insert([entry]);
    if (error) throw error;
    return data;
  }
}