import express from "express";
import dotenv from "dotenv";
import Log from "./Log.mjs";


dotenv.config();
const app = express();



//middlewres
app.use((req, res, next) => {
  Log(req.method, req.path);
  next();
})
app.use(express.json())
app.use(express.static("public"))  
app.use(express.static("public/home"));




const products = [
  {
    id: 1,
    name: "shoes",  
    price: "1000",
  },
  {
    id: 2,
    name: "t-shirt", 
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

  
  res.sendFile("index.html", {root : "./public"}) 

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

