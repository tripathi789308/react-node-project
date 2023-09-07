const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./modules/routes/index");
const supabase = require("./supabase");
const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json());

app.use("/v1", routes);

app.use((req, res, next) => {
  next(new ApiError(404, "Not found"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
