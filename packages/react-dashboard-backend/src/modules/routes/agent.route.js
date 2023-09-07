const express = require("express");
const { GetIdFromSupaBase, GetAllFromSupaBase } = require("../helpers/getdata");
const { Validator } = require("../helpers/validator");
const { PutIntoSupaBase } = require("../helpers/postdata");
const { UpdateIntoSupaBase } = require("../helpers/patchdata");
const { DeleteIDFromSupaBase } = require("../helpers/deletedata");
const Table = "agents";

const router = express.Router();

router.get("/id/:id", async (req, res) => {
  try {
    const params = req.params;
    if (!params?.id) throw (error.message = "Id is missing");
    const { data, error } = await GetIdFromSupaBase(Table, params.id);
    if (error) {
      throw (error.message = "Internal server error");
    }
    console.log("GET request received:", req.url);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const { data, error } = await GetAllFromSupaBase(Table);
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
    if (validate) {
      const id = 9999999999999 - Date.now();
      body.id = id;
      const { data, error } = await PutIntoSupaBase(Table, body);
      console.log(data);
      if (error) {
        throw error;
      }
      console.log("GET request received:", req.url);
      res.status(200).json({ message: "Created Successfully" });
    } else {
      console.log("Error:Invalid Payload");
      res.status(500).json({ error: "Invalid Payload" });
    }
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/update/:id", async (req, res) => {
  try {
    const params = req.params;
    if (!params?.id) throw (error.message = "Id is missing");
    let body = req.body;
    const validate = Validator(body, Table);
    if (!validate) throw (error.message = "Invalid Payload");
    delete body.id;
    const { data, error } = await UpdateIntoSupaBase(Table, params?.id, body);
    if (error) {
      throw (error.message = "Internal server error");
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
    if (!params?.id) throw (error.message = "Id is missing");
    const { data, error } = await DeleteIDFromSupaBase(Table, params?.id);
    if (error) {
      throw (error.message = "Internal server error");
    }
    console.log("GET request received:", req.url);
    res.status(200).json({ message: "Deleted Succesfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
