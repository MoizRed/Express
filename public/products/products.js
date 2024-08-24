//simple client side



//ACTUALLY WE NEEED TO FETCH DATA because its a client side file
//fetch using sync await and pass it then render it

const Btn = document.getElementById("btn");
const divlist = document.getElementById("list");
const pname = document.getElementById("pname")
const price = document.getElementById("pprice")
const select = document.getElementById("select")
const submit = document.getElementById("submit")



let products
let count = 1;


const fetchproducts = await async function () {
  const dat = await fetch("/api/products");
  const DATA = await dat.json();
  if (!DATA) {
    console.log("no data");
  }else{
    console.log(" fetch successed");}
  products = DATA;
  return await DATA;
};

Btn.addEventListener("click", () => {
  console.log("clicked");

  async function render() {
    await fetchproducts();

    console.log(products);


if (count == 1) {
    const ul = document.createElement("ul");

    divlist.appendChild(ul);

    for (let i = 0; i < products.length; i++) {

      const li = document.createElement("li");

      li.textContent = products[i].name;
      
      ul.appendChild(li);
    }
    count = 0;
  }
  
 
  for (let i = 0; i < products.length; i++) {
    select.innerHTML += `<option>${products[i].name}</option>`;
  }
  

  }

  render();




});

select.addEventListener("click" ,()=>{

  const value = select.value
  const product = products.find(id=>id.name  == value)
  console.log(product)
  const id  = product.id 
  console.log(product.id)
  console.log(select.value)





})



async function getselected(){

  const value = select.value
  const product = products.find(id=>id.name  == value)
  const id  = product.id 

  const param = await fetch(`/products/${id}`)
  const res = await param.json()


    return res

}


const selectbtn = document.getElementById("selectbtn")

selectbtn.addEventListener("click",()=>{
  
  console.log("clicked selector")  


  async function waitingfordata(){
  const selected = await getselected()
  
  console.log("selected" , selected) //debug

    pname.innerHTML = selected.name
    price.innerHTML = selected.price

  }
//render

waitingfordata()

})

// forms handling

const inputid = document.getElementById("prod_id")

const inputname = document.getElementById("prod_name")

const inputprice = document.getElementById("prod_price")


//we construct an object from each value of the input form then we send it using the fetch , post method to the data base.

//take the values from the form on click event
//consruct an object
//send it using fetch 

submit.addEventListener("click",()=>{

  postprod()

})



const postprod= function(){

  fetch('/products', {
    method: 'POST',
    body: JSON.stringify({id : 6, name : "newpost" , price : 3909}),
    headers: {
      'Content-Type': 'application/json'
    } 
  })
}


