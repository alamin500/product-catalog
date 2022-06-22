const formElm = document.querySelector("form");
const nameInputElm = document.querySelector(".product-name");
const priceInputElm = document.querySelector(".product-price");
const listGroupElm = document.querySelector(".list-group");
const filterElm = document.querySelector("#filter");

// tracking items
let products = [];

formElm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const { nameInput, priceInput } = receiveInputs();

  const isError = validateInput(nameInput, priceInput);
  if (isError) {
    alert("Please provide valid input");
    return;
  }
  const id = products.length;
  products.push({
    id: id,
    name: nameInput,
    price: priceInput
  });
  addItemToUI(id, nameInput, priceInput);
  console.log(products);
  resetInput();
});

filterElm.addEventListener("keyup", (evt) => {
  const filterValue = evt.target.value;
  const filteredArr = products.filter((product) =>
    product.name.includes(filterValue)
  );
  showAllItemToUI(filteredArr);
});

function showAllItemToUI(items) {
  listGroupElm.innerHTML = "";
  items.forEach((item) => {
    const listElm = `<li class="list-group-item item-${item.id} collection-item">
    <strong>${item.name}</strong>- <span class="price">$${item.price}</span>
    <i class="fa fa-trash delete-item float-right"></i>
    </li>`;

    listGroupElm.insertAdjacentHTML("afterbegin", listElm);
  });
}

// delete items
listGroupElm.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("delete-item")) {
    const id = getItemId(evt.target);
    // delet item from ui
    removeItemFromUi(id);

    removeItemFromDataStore(id);
  }
});

function removeItemFromUi(id) {
  document.querySelector(`.item-${id}`).remove();
}

function removeItemFromDataStore(id) {
  console.log(products);
  const productsAfterDelete = products.filter((product) => product.id !== id);
  products = productsAfterDelete;
}

function getItemId(elm) {
  const liElm = elm.parentElement;
  return Number(liElm.classList[1].split("-")[1]);
}

// resetInput
function resetInput() {
  nameInputElm.value = "";
  priceInputElm.value = "";
}

function addItemToUI(id, name, price) {
  const listElm = `<li class="list-group-item item-${id} collection-item">
<strong>${name}</strong>- <span class="price">$${price}</span>
<i class="fa fa-trash delete-item float-right"></i>
</li>`;

  listGroupElm.insertAdjacentHTML("afterbegin", listElm);
}

function validateInput(name, price) {
  let isError = false;
  if (!name || name.length <= 2) {
    isError = true;
  }
  if (!price || Number(price) <= 0) {
    isError = true;
  }
  return isError;
}

function receiveInputs() {
  const nameInput = nameInputElm.value;
  const priceInput = priceInputElm.value;
  return {
    nameInput,
    priceInput
  };
}
