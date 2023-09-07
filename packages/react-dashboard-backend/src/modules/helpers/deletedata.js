const supabase = require("../../supabase");

const DeleteIDFromSupaBase = async (table, id) => {
  return await supabase.from(table).delete().eq("id", id);
};

module.exports = {
  DeleteIDFromSupaBase,
};
