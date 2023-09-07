const express = require("express");
const {
  GetIdFromSupaBase,
  GetCustomersUsingAgentIdFromSupaBase,
} = require("../helpers/getdata");
const { Validator } = require("../helpers/validator");
const { PutIntoSupaBase } = require("../helpers/postdata");
const { UpdateIntoSupaBase } = require("../helpers/patchdata");
const { DeleteIDFromSupaBase } = require("../helpers/deletedata");

const Table = "customers";

const router = express.Router();

router.get("/id/:id", async (req, res) => {
  try {
    const params = req.params;
    if (!params?.id) throw error;
    const { data, error } = await GetIdFromSupaBase(Table, params?.id);
    if (error) {
      throw error;
    }
    console.log("GET request received:", req.url);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("", async (req, res) => {
  try {
    const query = req.query;
    if (!query?.agent_id) throw error;
    const { data, error } = await GetCustomersUsingAgentIdFromSupaBase(
      Table,
      query?.agent_id,
      "agent_id"
    );
    if (error) {
      throw error;
    }
    console.log("GET request received:", req.url);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/create", async (req, res) => {
  try {
    let body = req.body;
    const validate = Validator(body, Table);
    if (!validate) throw error;
    const id = 9999999999999 - Date.now();
    body.id = id;
    const { data, error } = await PutIntoSupaBase(Table, body);
    if (error) {
      throw error;
    }
    console.log("GET request received:", req.url);
    res.status(200).json({ message: "Created Succesfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/update/:id", async (req, res) => {
  try {
    const params = req.params;
    if (!params?.id) throw error;
    let body = req.body;
    const validate = Validator(body, Table);
    if (!validate) throw error;
    delete body.id;
    const { data, error } = await UpdateIntoSupaBase(Table, params?.id, body);
    if (error) {
      throw error;
    }
    console.log("GET request received:", req.url);
    res.status(200).json({ message: "Updated Succesfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/id/:id", async (req, res) => {
  try {
    const params = req.params;
    // let error = null;
    if (!params?.id) throw error;
    const { data, error } = await DeleteIDFromSupaBase(Table, params?.id);
    if (error) {
      throw error;
    }
    console.log("GET request received:", req.url);
    res.status(200).json({ message: "Deleted Succesfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
