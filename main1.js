const formElm = document.querySelector("form");
const nameInputElm = document.querySelector(".product-name");
const priceInputElm = document.querySelector(".product-price");
const listGroupElm = document.querySelector(".list-group");

// tracking items
const products = [];

formElm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const { nameInput, priceInput } = receiveInputs();

  const isError = validateInput(nameInput, priceInput);
  if (!isError) {
    const id = products.length;
    products.push({
      id: id,
      name: nameInput,
      price: priceInput
    });
    addItemToUI(id, nameInput, priceInput);
    console.log(products);
    resetInput();
  }
});

// delete items
listGroupElm.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("delete-item")) {
    const id = getItemId(evt.target);
  }
});

function getItemId(elm) {
  const liElm = elm.parentElement;
  console.log(Number(liElm.classList[1].split("-")[1]));
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
  if (!name || name.length < 2) {
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
