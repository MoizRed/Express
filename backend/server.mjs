import express from "express";
import dotenv from "dotenv";
import Log from "../Log.mjs";
import fs from "fs";
const DATA = JSON.parse(fs.readFileSync("./database/products.json", "utf8"));

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
app.use(express.static("public/home"));

app.listen(process.env.PORT, () => {
  Log(`listening on port http://${process.env.IP}:${process.env.PORT}`);
});

//routes for ALL PRODUCTS
app.get("/products", (req, res) => {
  // res.json(products);

  res.sendFile("products.html", { root: "./public/products" });
});

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "./public/home" });
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
//param
app.get("/products/:IDs" , (req,res) =>{

  const param = req.params.IDs
  const ok = param.replace(":","")
  res.send(products[ok-1])
})



app.get("/about" , (req , res) =>{

  res.sendFile("./public/misc/about.html" , { root: "./" })
 
})

app.post("/products", (req , res  )=>{

  console.log("triggred post")
  console.log(req.body)
  const { id , name , price } = req.body
  const newproduct = { id , name , price }
  products.push(newproduct)
  res.status(201)
  console.log("product added")
  console.log(products)
  //save to database
  fs.readFile("./database/products.json" , "utf-8", (err , data)=>{
    
    if(data){
      console.log(data)

      const database = JSON.parse(data)
      const prods = database.products
      prods.push(newproduct)
      console.log(typeof prods , prods)
      const newdb = JSON.stringify({products : prods})
      fs.writeFile("./database/products.json" , newdb , (err, data)=>{

        if(err){
          console.log(err)
        }else{

          console.log("sucess i guess?")

        }

      })


    }
  
})
})
