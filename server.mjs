import express from "express";
import dotenv from "dotenv";
import Log from "./Log.mjs";
import fs from "fs";
const DATA = JSON.parse(fs.readFileSync("products.json", "utf8"));

export const products = DATA.products;

dotenv.config();
const app = express();

//middlewres
app.use((req, res, next) => {
  Log(req.method, req.path);
  next();
});

app.use(express.json());
app.use(express.static("public"));


app.listen(process.env.PORT, () => {
  Log(`listening on port http://${process.env.IP}:${process.env.PORT}`);
});

//routes for ALL PRODUCTS
app.get("/products", (req, res) => {
  // res.json(products);

  res.sendFile("products.html", { root: "./public" });
});

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "./public" });
});

// query param to get Specific Product based on the query search
app.get("/products/search", (req, res) => {
  const query = req.query;
  const name = req.query.name;
  console.log(name);

  const found = products.find((I) => I.name == name); //iretates until it returns true
  !found ? res.status(404).send("not found") : res.json(found);
  console.log(found);
});

//routes params to get SPECIFIC PRODUCT FROM THE OBJECT

app.get("/api/products/:productID", (req, res) => {
  const IDparam = req.params.productID;
  console.log(IDparam);
  if (IDparam > products.length || IDparam < 0) {
    res.send("OVERFLOW");
  } else {
    res.send(products[IDparam]);
  }
});

//send the json file of the products API
app.get("/api/products", (req, res) => {
  // res.json(products);
  
  res.json(products)


});