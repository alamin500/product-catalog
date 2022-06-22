const formElm = document.querySelector("form");
const nameInputElm = document.querySelector(".product-name");
const priceInputElm = document.querySelector(".product-price");

formElm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  console.log(nameInputElm.value);
  console.log(priceInputElm.value);
  console.log(Event);
  const inputValues = receiveInputs();
  console.log(inputValues);
});

function receiveInputs() {
  const nameInput = nameInputElm.value;
  const priceInput = priceInputElm.value;
  return {
    nameInput,
    priceInput
  };
}
