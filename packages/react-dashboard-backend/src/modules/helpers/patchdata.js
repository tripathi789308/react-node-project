const supabase = require("../../supabase");

const UpdateIntoSupaBase = async (table, id, input) => {
  return await supabase.from(table).update(input).eq("id", id);
};

module.exports = {
  UpdateIntoSupaBase,
};
