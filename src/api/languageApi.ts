import { Language } from '../models/Language';
import { supabase } from './supabaseClient';

class LanguageApi {
  async getLanguages(): Promise<Language[]> {
    const { data, error } = await supabase.from('languages').select();

    if (!data || error) {
      throw error;
    }

    return data;
  }
}

export const languageApi = new LanguageApi();
