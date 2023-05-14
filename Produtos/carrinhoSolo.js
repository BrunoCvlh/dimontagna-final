
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoader", ready)
} else {
  ready()
}
var totalAmount = "0,00"


//função que começa a página chamando todos os botões e configurações 
function ready() {

  //pega o botão de remover produtos do carrinho e ouve clicks. A cada click ele chama a função de remover produtos do carrinho.
  const removeProductButtons = document.getElementsByClassName("btn btn-dark button-remove")
  for (var i = 0; i < removeProductButtons.length; i++) {
    removeProductButtons[i].addEventListener("click", removeProducts)
  }

  //captura eventos de mudança no input de quantidade de produtos, e após essas mudanças chama a função de checar inputs vazios.
  const quantityInputs = document.getElementsByClassName("form-control form-control-sm")
  for (var i = 0; i < quantityInputs.length; i++) {
    quantityInputs[i].addEventListener("change", checkInputIsNull)
  }


  //pega o botao de adicionar produtos ao carrinho e captura eventos de click do mouse. após o click, chama a função de adicionar os produtos ao carrinho.
  const addToCartButtons = document.getElementsByClassName("btn btn-outline-dark d-grid col-6 mx-auto")
  for (var i = 0; i < addToCartButtons.length; i++) {
    addToCartButtons[i].addEventListener("click", addProductToCart)


    //pega o botão de finalizar a compra, escuta eventos de click e chama a função makepurchase. 
    const purchaseButton = document.getElementsByClassName("btn btn-dark btn-block btn-lg")[0]
    purchaseButton.addEventListener("click", makePurchase)



  }

  //função de mensagem de finalização da compra, caso tenha itens no carrinho ou não.
  function makePurchase() {
    const totalAmountNumber = parseFloat(totalAmount.replace(",", "."));

    if (totalAmountNumber === "0") {
      alert("Seu carrinho está vazio");
      return;
    }
  }
  //Função que remove produtos caso o valor do input seja zero.
  function checkInputIsNull(event) {
    console.log(event.target)
    if (event.target.value == "0") {
      event.target.parentElement.parentElement.remove()
    }
    updateTotal()
  }


  //função que insere injeta itens no carrinho, conforme atributos coletados dos cards.
  function addProductToCart(event) {


    const button = event.target
    const productInfos = button.parentElement.parentElement
    const productImage = productInfos.getElementsByClassName("card-img-top")[0].src
    const productTitle = productInfos.getElementsByClassName("card-title")[0].innerText
    const productPrice = productInfos.getElementsByClassName("card-price")[0].innerText
    const productsCartName = document.getElementsByClassName("text-black mb-0")

    for (var i = 0; i < productsCartName.length; i++) {
      if (productsCartName[i].innerText == productTitle) {
        const quantityInput = productsCartName[i].parentElement.parentElement.getElementsByClassName(
          "form-control form-control-sm"
        )[0];
        quantityInput.value++;
        updateTotal(); // Chame updateTotal() aqui para atualizar a quantidade no carrinho
        return;
      }
    }

    //parte do código que injeta a div de cada produto clicado dentro do carrinho
    let newCartProduct = document.createElement("div")
    newCartProduct.classList.add("cart-product")
    newCartProduct.innerHTML =
      `
  <div class="cart-product">  
  <div class="row mb-4 d-flex justify-content-between
    align-items-center">
    <div class="col-md-2 col-lg-2 col-xl-2">
      <img
        src="${productImage}"
        class="img-fluid rounded-3" alt="${productTitle}">
    </div>
    <div class="col-md-3 col-lg-3 col-xl-3">
      <h6 class="text-muted ms-2">Produto</h6>
      <h6 class="text-black mb-0 ms-2">${productTitle}</h6>
    </div>
    <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
      <button class="btn btn-link px-2">
        <i class=""></i>
      </button>
      <input id="form1" min="0" name="quantity" value="1"
        type="number"
        class="form-control form-control-sm" />
      <button class="btn btn-link px-2">
        <i class=""></i>
      </button>
    </div>
    <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
      <h6 class="mb-0 price ms-2">${productPrice}</h6>
    </div>
    <div class="col-md-0 col-lg-1 col-xl-1 text-end">
      <button type="button" class="btn btn-dark
      button-remove me-4">Remover</button>
    </div>
    <div class="col-md-1 col-lg-1 col-xl-1 text-end">
      <a href="#!" class="text-muted"><i class=""></i></a>
    </div>
  </div>
</div>
  `;
    const divInside = document.querySelector(".p-5-cart")
    divInside.append(newCartProduct)
    newCartProduct.getElementsByClassName("form-control form-control-sm")[0].addEventListener("change", checkInputIsNull)
    newCartProduct.getElementsByClassName("btn btn-dark button-remove")[0].addEventListener("click", removeProducts)
    updateTotal()
  }


  //função que remove produtos do carrinho
  function removeProducts() {
    event.target.parentElement.parentElement.remove()
    updateTotal()
  }

  //função que atualiza os calculos do carrinho
  function updateTotal() {
    totalAmount = 0
    let totalAmountWithShipping = 0


    const cartProducts = document.getElementsByClassName("row mb-4 d-flex justify-content-between align-items-center")
    for (var i = 0; i < cartProducts.length; i++) {
      const productPrice = cartProducts[i].getElementsByClassName("mb-0 price")[0].innerText.replace("R$", "").replace(",", ".")
      const productQuantity = cartProducts[i].getElementsByClassName("form-control form-control-sm")[0].value
      console.log(productQuantity)
      const searchValueResume = document.getElementsByClassName("value-shipping")[0].innerText.replace("R$", "").replace(",", ".")
      //const abaixo transforma a string em inteiro. Para poder fazer o cálculo.
      const valueResume = parseFloat(searchValueResume)
      totalAmount += productPrice * productQuantity
      totalAmountWithShipping = totalAmount + valueResume
    }

    totalAmount = totalAmount.toFixed(2)
    totalAmount = totalAmount.replace(".", ",")
    totalAmountWithShipping = totalAmountWithShipping.toFixed(2)
    totalAmountWithShipping = totalAmountWithShipping.replace(".", ",")
    document.getElementsByClassName("value-no-shipping")[0].innerText = "R$ " + totalAmount
    document.getElementsByClassName("value-total")[0].innerText = "R$ " + totalAmountWithShipping
  }
}