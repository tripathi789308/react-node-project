const supabase = require("../../supabase");

const PutIntoSupaBase = async (table, input) => {
  return await supabase.from(table).insert([input]).select();
};

module.exports = {
  PutIntoSupaBase,
};
