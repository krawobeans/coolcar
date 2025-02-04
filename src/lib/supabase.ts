import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  image?: string;
  position?: string;
}

export async function getReviews() {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .order('date', { ascending: false });

  if (error) throw error;
  return data as Review[];
}

export async function addReview(review: Omit<Review, 'id' | 'date'>) {
  const { data, error } = await supabase
    .from('reviews')
    .insert([
      {
        ...review,
        date: new Date().toISOString()
      }
    ])
    .select()
    .single();

  if (error) throw error;
  return data as Review;
}

export async function getTopRatedReviews(limit: number) {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .order('rating', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data as Review[];
} 