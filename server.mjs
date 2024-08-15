import express from "express";
import dotenv from "dotenv";
import Log from "./Log.mjs";

//routes        /produts
//routes params  products/:id
//query params  products?id=1


dotenv.config();
const app = express();

 
app.use(express.json())

const products = [
  {
    id: 1,
    name: "shoes",  //false
    price: "1000",
  },
  {
    id: 2,
    name: "t-shirt", //false 
    price: "2000",
  },
  {
    id: 3,
    name: "jeans",  
    price: "4000",
  },
];

app.listen(process.env.PORT, () => {
  Log(`listening on port http://${process.env.IP}:${process.env.PORT}`);
});


//routes for ALL PRODUCTS
app.get("/products" , (req,res)=>{

  res.json(products)


})


app.get("/" , (req  , res) =>{

  res.sendFile("index.html" , {root : "./"})


})



// query param to get Specific Product based on the query search
app.get("/products/search"  , (req , res)=>{

  const query = req.query
  const name  = req.query.name
  console.log(name)

  const found = products.find( I => I.name == name) //iretates until it returns true
  !found? res.status(404).send("not found") : res.json(found) 
  console.log(found)
})


//routes params to get SPECIFIC PRODUCT FROM THE OBJECT

app.get("/products/:productID" , (req, res)=>{

const IDparam = req.params.productID
  console.log(IDparam)
if (IDparam > products.length || IDparam < 0){

  res.send("OVERFLOW")

}else{
  res.json(products[IDparam])}
})

