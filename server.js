const express = require("express");
const path = require("path");
const cors = require("cors");
const superagent = require("superagent");
const { DateTime } = require("luxon");
const port = process.env.PORT || 3001;
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, "./build")));

app.get("/api/get-cryptocurrency-listing", async (req, res) => {
  const { startFrom } = req.query;
  try {
    const data = await superagent
      .get(
        `${process.env.COIN_MARKET_CAP_API_URI}/v1/cryptocurrency/listings/latest`
      )
      .query({ start: startFrom })
      .query({ limit: 20 })
      .set("X-CMC_PRO_API_KEY", `${process.env.COIN_MARKET_CAP_API_KEY}`)
      .set("Accept", "application/json")
      .set("Accept-Encoding", "deflate, gzip");
    if (data.status === 200) {
      const dataToSend = data.body.data;
      res.status(200).json(dataToSend);
    } else {
      res
        .status(500)
        .json({ mes: "Could not retrieve data", err: data.statusCode });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ mes: "Something went wrong(", err: err });
  }
});

app.get("/api/get-cryptocurrency-by-symbol", async (req, res) => {
  const { symbol } = req.query;
  try {
    const data = await superagent
      .get(
        `${process.env.COIN_MARKET_CAP_API_URI}/v1/cryptocurrency/quotes/latest`
      )
      .query({ symbol })
      .set("X-CMC_PRO_API_KEY", `${process.env.COIN_MARKET_CAP_API_KEY}`)
      .set("Accept", "application/json")
      .set("Accept-Encoding", "deflate, gzip");
    if (data.status === 200) {
      const dataToSend = data.body.data;
      res.status(200).json(dataToSend);
    } else {
      res
        .status(500)
        .json({ mes: "Could not retrieve data", err: data.statusCode });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ mes: "Something went wrong(", err: err });
  }
});

app.get("/api/get-cryptocurrency-historic-data", async (req, res) => {
  const { period, symbol } = req.query;
  try {
    const coinsList = await superagent
      .get(`${process.env.CRYPTOCURRENCY_CHART_URI}/api/coin/list`)
      .set("Key", `${process.env.CRYPTOCURRENCY_CHART_API_KEY}`)
      .set("Secret", `${process.env.CRYPTOCURRENCY_CHART_API_SECRET_KEY}`)
      .set("Accept", "application/json");
    let coinID;
    if (coinsList.status === 200) {
      const coin = coinsList.body.coins.find((coin) => coin.symbol === symbol);
      coinID = coin.id;
    }
    if (coinID) {
      const currentDate = new Date().toISOString().split("T")[0];
      const previousDate = DateTime.fromISO(currentDate)
        .plus({ days: -period })
        .toISODate();
      const coinHistoricData = await superagent
        .get(
          `${process.env.CRYPTOCURRENCY_CHART_URI}/api/coin/history/${coinID}/${previousDate}/${currentDate}/marketCap/USD`
        )
        .set("Key", `${process.env.CRYPTOCURRENCY_CHART_API_KEY}`)
        .set("Secret", `${process.env.CRYPTOCURRENCY_CHART_API_SECRET_KEY}`)
        .set("Accept", "application/json");
      if (coinHistoricData.status === 200) {
        const dataToSend = coinHistoricData.body.data;
        res.status(200).json(dataToSend);
      } else {
        res.status(500).json({ mes: "Could not retrieve data" });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ mes: "Something went wrong(", err: err });
  }
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./build", "index.html"));
});

app.listen(port, function () {
  console.log(`Server is running on port: ${port}`);
});
