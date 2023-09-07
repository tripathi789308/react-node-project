const express = require("express");
const agentRoute = require("./agent.route");
const customerRoute = require("./customer.route");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/agent",
    route: agentRoute,
  },
  {
    path: "/customer",
    route: customerRoute,
  },
];
defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
