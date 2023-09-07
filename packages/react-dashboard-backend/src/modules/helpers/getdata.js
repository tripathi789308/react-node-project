const supabase = require("../../supabase");

const GetIdFromSupaBase = async (table, id, filterAttributes = "*") => {
  return await supabase.from(table).select(filterAttributes).eq("id", id);
};

const GetAllFromSupaBase = async (table, filterAttributes = "*") => {
  return await supabase.from(table).select(filterAttributes);
};

const GetCustomersUsingAgentIdFromSupaBase = async (
  table,
  primaryKey,
  foriegnKey,
  filterAttributes = "*"
) => {
  return await supabase
    .from(table)
    .select(`${filterAttributes}`)
    .eq(foriegnKey, Number(primaryKey));
};

module.exports = {
  GetIdFromSupaBase,
  GetAllFromSupaBase,
  GetCustomersUsingAgentIdFromSupaBase,
};
