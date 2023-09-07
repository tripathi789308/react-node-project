import React from "react";
import fetch from "../utils/fetch";

let customerDetails = [
  {
    id: "101",
    name: "Customer-67",
    address: "Bengaluru",
    agent_id: 1,
  },
  {
    id: "102",
    name: "Customer-54",
    address: "Bengaluru",
    agent_id: 2,
  },
  {
    id: "103",
    name: "Customer-34",
    address: "Bengaluru",
    agent_id: 3,
  },
  {
    id: "104",
    name: "Customer-64",
    address: "Bengaluru",
    agent_id: 1,
  },
  {
    id: "105",
    name: "Customer-78",
    address: "Bengaluru",
    agent_id: 2,
  },
  {
    id: "106",
    name: "Customer-90",
    address: "Bengaluru",
    agent_id: 3,
  },
  {
    id: "107",
    name: "Customer-89",
    address: "Bengaluru",
    agent_id: 1,
  },
  {
    id: "108",
    name: "Customer-45",
    address: "Bengaluru",
    agent_id: 2,
  },
  {
    id: "109",
    name: "Customer-24",
    address: "Bengaluru",
    agent_id: 3,
  },
  {
    id: "110",
    name: "Customer-20",
    address: "Bengaluru",
    agent_id: 1,
  },
  {
    id: "111",
    name: "Customer-10",
    address: "Bengaluru",
    agent_id: 2,
  },
  {
    id: "112",
    name: "Customer-18",
    address: "Bengaluru",
    agent_id: 3,
  },
  {
    id: "113",
    name: "Customer-16",
    address: "Bengaluru",
    agent_id: 1,
  },
  {
    id: "114",
    name: "Customer-14",
    address: "Bengaluru",
    agent_id: 2,
  },
  {
    id: "115",
    name: "Customer-12",
    address: "Bengaluru",
    agent_id: 3,
  },
];

const getCustomersFromDB = async (id) => {
  return await fetch("GET", `v1/customer?agent_id=${id}`);
};

const getCustomers = (id) => {
  return customerDetails.filter((details) => details.agent_id == id);
};

const updateCustomers = (data, successCallback, failCallback) => {
  if (!data) failCallback("Invalid Data");
  if (data.length === 0) failCallback("Invalid Data");

  if (!data.id) failCallback("Invalid Data");

  let isUpdated = false;

  customerDetails.forEach((value, i) => {
    if (value.id == data.id) {
      isUpdated = true;
      value.address = data.address;
      value.name = data.name;
      value.agent_id = data.agent_id;
    }
  });
  return isUpdated
    ? successCallback("Success")
    : failCallback("Id doesn't exists");
};
const updateCustomersInDB = async (id, data, successCallback, failCallback) => {
  if (!data) failCallback("Invalid Data");
  if (data.length === 0) failCallback("Invalid Data");
  if (!id) failCallback("Invalid ID");
  return await fetch("POST", `v1/customer/update/${id}`, data);
};

const deleteCustomers = (data, successCallback, failCallback) => {
  if (!data) failCallback("Invalid Data");
  if (data.length === 0) failCallback("Invalid Data");

  if (!data.id) failCallback("Invalid Data");

  const index = customerDetails.findIndex((value) => {
    return value.id == data.id;
  });

  if (index === -1) failCallback("Doesn't Exists");

  const newCustomerDetails = customerDetails.filter((_, i) => {
    return i !== index;
  });

  customerDetails = newCustomerDetails;
  successCallback();
};

const deleteCustomersInDB = async (id, successCallback, failCallback) => {
  if (!id) failCallback("Invalid ID");
  return await fetch("DELETE", `v1/customer/id/${id}`);
};

const createCustomerInDB = async (data) => {
  return await fetch("POST", "v1/customer/create", data);
};

export {
  getCustomers,
  updateCustomers,
  deleteCustomers,
  getCustomersFromDB,
  updateCustomersInDB,
  deleteCustomersInDB,
  createCustomerInDB,
};
