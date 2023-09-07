const agents = {
  id: Number,
  email: String,
  mobile: String,
  created_at: String,
  address: String,
  name: String,
};

const customers = {
  id: true,
  email: true,
  mobile: true,
  created_at: true,
  address: true,
  name: true,
  agent_id: true,
};

const validate = (input, struct) => {
  for (const key in input) {
    if (!struct[key]) {
      return false;
    }
  }
  return true;
};

const Validator = (input, table) => {
  switch (table) {
    case "agents":
      console.log(input);
      return validate(input, agents);
    case "customers":
      return validate(input, customers);
  }
};

module.exports = {
  Validator,
};
