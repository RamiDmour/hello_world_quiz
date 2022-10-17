import { Rating } from '../models/Rating';
import { supabase } from './supabaseClient';

const TABLE_NAME = 'ratings';
class RatingsApi {
  async getRatings(): Promise<Rating[]> {
    const { data, error } = await supabase.from(TABLE_NAME).select();

    if (!data || error) {
      throw error;
    }

    return data;
  }

  async addRating(rating: Rating) {
    const { error } = await supabase.from(TABLE_NAME).insert(rating);
    if (error) {
      throw error;
    }
  }
}

export const ratingsApi = new RatingsApi();
