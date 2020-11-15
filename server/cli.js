const yargs = require("yargs");

const {
  stocksToMemory,
  addNewStock,
  searchStock,
  filterStocks,
} = require("./utils/utils");

// read stocks from the file
stocksToMemory();

const command = yargs.argv._[0];
const stockNameArg = yargs.argv.stockName;
const stockPriceArg = yargs.argv.stockPrice;
const orderByArg = yargs.argv.orderBy;

function runInfo() {
  console.log("Run \n node cli info <-- see available commands \n");
  console.log(
    " node cli find --stockName=STOCK_NAME <-- find a particular stock \n"
  );
  console.log(
    " node cli add --stockName=STOCK_NAME --stockPrice=PRICE <-- add a new a stock \n"
  );
  console.log(
    "See which stocks that are bigger than or equal that a certain price:"
  );
  console.log(
    " node cli filter --stockPrice=PRICE --orderBy=1 <-- see the stocks from low to high. \n"
  );
  console.log(
    " node cli filter --stockPrice=PRICE --orderBy=0 <-- see the stocks from high to low.\n"
  );
}

if (command === "find") {
  if (stockNameArg) {
    console.log(searchStock(stockNameArg));
  } else {
    console.log(
      "You must specify a stock name 'node cli find --stockName=STOCK_NAME'"
    );
  }
} else if (command === "filter") {
  if (typeof stockPriceArg !== "number") {
    return console.log("The price must be a number.");
  }

  if (![0, 1].includes(orderByArg)) {
    return console.log(
      "Missing or invalid orderBy argument. Values can be either 1 or 0"
    );
  }
  console.log(filterStocks(stockPriceArg, orderByArg));
} else if (command === "add") {
  if (typeof stockNameArg === "string" && typeof stockPriceArg === "number") {
    const result = addNewStock(stockNameArg, stockPriceArg);
    if (typeof result == "string") console.log(result);
    else console.log("Success");
  } else {
    console.log(
      "Invalid arguments. Run 'node cli info' for detailed information"
    );
  }
} else if (command === "info" || command === "undefined") {
  runInfo();
} else {
  console.log(`Command '${command}' could not be found...`);
  runInfo();
}
