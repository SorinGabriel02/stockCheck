// use node cli to manipulate stocks from the nodeJS console
console.log(`If you want to use functionality from NodeJS instead,
stop this server and run:
--> node cli info <-- to see a list of available commands \n`);

const express = require("express");
const morgan = require("morgan");

const stockRoutes = require("./routes/stockRoutes");

const app = express();

const port = 5000;

app.use(morgan("dev"));
app.use(express.json());

app.use("/api", stockRoutes);

app.listen(port, () => console.log(`App listening on port ${port}`));
