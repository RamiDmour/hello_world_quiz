import { REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_ANON_KEY } from '@env';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const supabase = createClient(
  REACT_APP_SUPABASE_URL,
  REACT_APP_SUPABASE_ANON_KEY,
  {
    auth: {
      detectSessionInUrl: false,
      storage: AsyncStorage,
    },
  },
);
