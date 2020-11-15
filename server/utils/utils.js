const fs = require("fs");

let stocks = [];

function stocksToMemory() {
  try {
    result = fs.readFileSync("input.json", "utf8");
    stocks = JSON.parse(result);
  } catch (err) {
    throw err;
  }
}

function addNewStock(name, price) {
  try {
    name = name.toUpperCase();
    // if stock already exists return an error message
    const stockExists = stocks.some((stock) => stock.name === name);
    if (stockExists) {
      return `Unable to create new stock. '${name}' already exists.`;
    }
    // add new stock to memory
    stocks.push({ name, price });
    // update the .json file
    fs.writeFileSync("input.json", JSON.stringify(stocks), (err) => {
      if (err) throw err;
    });
  } catch (err) {
    throw err;
  }
}

function searchStock(stockName) {
  return stocks.find((stock) => stock.name === stockName.toUpperCase());
}

function filterStocks(price, orderBy) {
  const filteredPrices = stocks.filter((stock) => stock.price >= price);

  return filteredPrices.sort((a, b) => {
    if (orderBy === 1) return a.price - b.price;
    else return b.price - a.price;
  });
}

module.exports = {
  stocksToMemory,
  addNewStock,
  searchStock,
  filterStocks,
};
