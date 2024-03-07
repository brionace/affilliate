import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/private';

const { SUPABASE_URL, SUPABASE_KEY } = env;

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
