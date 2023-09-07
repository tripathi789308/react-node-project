const { createClient } = require("@supabase/supabase-js");

const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImViY3FzY3dxaGxta3R0dW5pa2toIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQwODU5MjYsImV4cCI6MjAwOTY2MTkyNn0.Qo2inSClFZRvkWBXQ_cdBWzymZgNwAFFg3w1haSGC88";

const supabaseUrl = "https://ebcqscwqhlmkttunikkh.supabase.co";
const supabaseKey = SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
