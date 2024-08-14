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

// route params :id 

app.get("/products/:id", (req, res) => {
const paramid = req.params.id
 if(isNaN(paramid)){
    res.send("params must me a number")
    Log( "type of params : " , typeof paramid , ' >> ' , req.params.id)
}else{

  res.json(products[paramid])

}



})


//query params https://localhost:3000/person?name=john&age=30


app.get("/products" , (req,res) =>{

 Log(req.query)
 const {name} = req.query // decustruct the name from the query object and assign it to a variable so we can work with it 

 const found = products.find(target  => target.name == name)
if(!found){res.send(`sorry ${name} not found`)}else{
  res.send(found)}


})

//focus on the find(call back fuction)