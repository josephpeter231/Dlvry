import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ayhmcqlvofaxshhqguvs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5aG1jcWx2b2ZheHNoaHFndXZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc5ODc0MDMsImV4cCI6MjAyMzU2MzQwM30.xv6UqdBc6tR02AG4LcnRgATObdJkXwb4D0B0hSUOr5o';

export const supabase = createClient(supabaseUrl, supabaseKey);
