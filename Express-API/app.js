const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
dotenv.config();
const db = require("./config/db");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set(db());

// cors origin --> allow only that website that mention into origin group , ex. backend only res when localhost 3005 send requst , other then give cores error
// localhost 3005 --> req --> accept --> give responce
// localhost 3006 --> req --> cors error --> don't give responce in origin  you mention frontend url (development ,production both)
app.use(cors({ origin: "http://localhost:3002", credentials: true }));

PORT = process.env.PORT;

// temp route --> backend we don't create a home route . After Testing  / Deployment  Remove  Home route

app.get("/", (req, res) => {
  res.status(401).json({ message: "Access denined !!" });
});

app.listen(PORT, () => {
  console.log(`server is Running on PORT ${PORT}`);
});
