//simple client side

//ACTUALLY WE NEEED TO FETCH DATA because its a client side file
//fetch using sync await and pass it then render it

const Btn = document.getElementById("btn");
const divlist = document.getElementById("list");

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
  
 

  }

  render();
});


console.log("excuting index.js")
