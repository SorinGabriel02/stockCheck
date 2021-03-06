const express = require("express");

const {
  stocksToMemory,
  addNewStock,
  searchStock,
  filterStocks,
} = require("../utils/utils");

const router = express.Router();

// add stocks array from input.json to memory
stocksToMemory();

// find stock by it's name
router.get("/find/:stockName", (req, res) => {
  const stockName = req.params.stockName;
  try {
    const stock = searchStock(stockName);
    if (stock) return res.json({ ...stock });
    // stock with this name not found
    res.status(404).json({
      message: `We could not find a stock named ${stockName.toUpperCase()}.`,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
});

// filter and order stocks
router.get("/filter/:price/:order", (req, res) => {
  const priceVal = Number(req.params.price);
  const orderVal = Number(req.params.order);

  try {
    if (typeof priceVal === "number" && [0, 1].includes(orderVal)) {
      const orderedStocks = filterStocks(priceVal, orderVal);
      res.json(orderedStocks);
    } else {
      // invalid data
      res.status(422).json({
        message: "Invalid data. Please check your inputs and try again.",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
});

router.post("/new", (req, res) => {
  try {
    let { name, price } = req.body;
    price = Number(price);
    // validate data send from the front-end
    if (typeof name !== "string" || !name.length || typeof price !== "number") {
      console.log(name, price);
      return res.status(422).json({
        message: "Invalid data. Please check your inputs and try again.",
      });
    }

    const result = addNewStock(name, price);

    if (typeof result === "string") {
      return res.status(409).json({ message: result });
    }
    res.status(201).json({ name, price });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
});

module.exports = router;
