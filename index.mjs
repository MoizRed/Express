import express from "express";
import dotenv from "dotenv";
import Log from "./Log.mjs";

dotenv.config();

const products = [
  {
    id: 1,
    name: "product 1",
    price: 10000,
  },
  {
    id: 2,
    name: "product 2",
    price: 20000,
  },
  {
    id: 3,
    name: "product 3",
    price: 30000,
  },
];

const app = express();

app.listen(process.env.PORT, () => {
  Log(`listening on port http://${process.env.IP}:${process.env.PORT}`);
});


app.get("/",(req , res) =>{

    res.send(200)
})
