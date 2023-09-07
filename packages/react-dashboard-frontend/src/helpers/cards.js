import React from "react";
import fetch from "../utils/fetch";

const cards = [
  {
    id: "1",
    name: "Shivam",
    address: "Bengaluru",
  },
  {
    id: "2",
    name: "Vikas",
    address: "Delhi",
  },
  {
    id: "3",
    name: "Mihir",
    address: "Bengaluru",
  },
  {
    id: "4",
    name: "Tushar",
    address: "Bengaluru",
  },
];

const getCardsFromDB = async () => {
  return await fetch("GET", "v1/agent/all");
};

const getCards = () => {
  return cards;
};

export { getCards, getCardsFromDB };
