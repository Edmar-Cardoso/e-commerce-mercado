//cardsProduto
function createCard(produto){
    const ul       = document.querySelector("ul")
    const li       = document.createElement("li")
    const img      = createImgCard(produto)
    const h3       = createNameProductCard(produto)
    const span     = createSectionProductCard(produto)
    const ol       = createComponentesCard(produto)
    const pEButton = createPrecoEButtonCard(produto)
    li.append(img, h3, span, ol, pEButton)
    ul.append(li)
}
function createImgCard(produto){
    const img = document.createElement("img")
    img.src   = produto.img
    img.alt   = `Imagem ${produto.nome}`
    return img
}
function createNameProductCard(produto){
    const h3     = document.createElement("h3")
    h3.innerText = produto.nome
    return h3
}
function createSectionProductCard(produto){
    const span     = document.createElement("span")
    span.innerText = produto.secao
    return span
}
function createComponentesCard(produto){
    const ol = document.createElement("ol")
    const {componentes} = produto

    componentes.forEach((elem, i) => {
        const li = document.createElement("li")
        const p  = document.createElement("p")
        li.classList.add("listaComponentes")
        p.classList.add("pGenerico")
        p.innerText = `${i + 1}. ${elem}`
        li.append(p)
        ol.append(li)
    })
    return ol
}
function createPrecoEButtonCard(produto){
    const div    = document.createElement("div")
    const p      = document.createElement("p")
    const button = document.createElement("button")
    div.classList.add("divPrecoProduto")
    p.classList.add("listarProdutos")
    p.classList.add("pPreco")
    button.classList.add("estiloGeralBotoes")
    button.classList.add("estiloGeralBotoes--comprar")
    button.id = `${produto.id}`
    button.innerText = `Comprar`
    if(produto.promocao === true){
        p.innerText = `R$ ${produto.precoPromocao}`
    }
    else{
        p.innerText = `R$ ${produto.preco}`
    }
    div.append(p, button)
    return div
}
function listingCards(array){
    array.forEach((produto) => {
        const productInCard = createCard(produto)
        return productInCard
    })
    clickButtonComprar()
}


//FiltragemProdutos
function filterProductsHortifruit(){
    const ButtonSectionHortifruti = document.querySelector(".estiloGeralBotoes--filtrarHortifruti")
    ButtonSectionHortifruti.addEventListener("click", filterHortifruti)
}
function filterHortifruti(){
    const productsHortifruti = produtos.filter((produto) => {
        return produto.secao == "Hortifruti"      
    })
    clearUl()
    listingCards(productsHortifruti)
}

function filterProductsPanificadora(){
    const ButtonSectionPanificadora = document.querySelector(".estiloGeralBotoes--filtrarPanificadora")
    ButtonSectionPanificadora.addEventListener("click", filterPanificadora)
}
function filterPanificadora(){
    const productsPanificadora = produtos.filter((produto) => {
        return produto.secao == "Panificadora"      
    })
    clearUl()
    listingCards(productsPanificadora)
}

function filterProductsLaticionios(){
    const ButtonSectionLaticinios = document.querySelector(".estiloGeralBotoes--filtrarLaticinios")
    ButtonSectionLaticinios.addEventListener("click", filterLaticionios)
}
function filterLaticionios(){
    const productsLaticinios = produtos.filter((produto) => {
        return produto.secao == "Laticinio"      
    })
    clearUl()
    listingCards(productsLaticinios)
}

function showAll(){
    const buttonMostrarTodos = document.querySelector(".estiloGeralBotoes--mostrarTodos")
    buttonMostrarTodos.addEventListener("click", filterMostrarTodos)
}
function filterMostrarTodos(){
    clearUl()
    listingCards(produtos)
}
function searchName(){
    const buttonBuscar = document.querySelector(".estiloGeralBotoes--botaoBuscaPorNome")
    buttonBuscar.addEventListener("click", filterButtonBuscar)
}
function filterButtonBuscar(){
    const input      = document.querySelector(".campoBuscaPorNome")
    const valueInput =  input.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")

    let searchFilterProductsName = produtos.filter((produto)=>{
        const treatesProduct = produto.nome.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        return treatesProduct.includes(valueInput)
    })
    let searchFilterProductsSections = produtos.filter((produto)=>{
        const treatesProduct = produto.secao.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        return treatesProduct.includes(valueInput)
    })
    let searchFilterProductsCategory = produtos.filter((produto)=>{
        const treatesProduct = produto.categoria.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        return treatesProduct.includes(valueInput)
    })
    const lastFilter = filterArrayProducts(searchFilterProductsName, searchFilterProductsSections, searchFilterProductsCategory)
    clearUl()
    listingCards(lastFilter)
}
function filterArrayProducts(para1, para2, para3){
    const productsArray = [...para1, ...para2, ...para3]
    const filterProductsArray = productsArray.filter((elem, i) => {
        return productsArray.indexOf(elem) === i
    })
    return filterProductsArray
}
function clearUl(){
    const ul     = document.querySelector("ul")
    ul.innerHTML = ``
}

listingCards(produtos)
filterProductsHortifruit()
filterProductsPanificadora()
filterProductsLaticionios()
showAll()
searchName()

//carrinho
function emptyCarrinho(){
    const ulCarrinho = document.querySelector(".ulProductsCarrinho")
    const li = document.createElement("li")
    const img = document.createElement("img")
    li.classList.add("liCarrinhoVazio")
    img.classList.add("imgCarrinhoVazio")
    img.src = `./src/img/ImgCarrinhoVazio.png`
    img.alt = `Carrinho de compras vazio.`
    li.appendChild(img)
    ulCarrinho.appendChild(li)
}
emptyCarrinho()

let arrayCarrinho = []
let buttonsUlCarrinho
let allIconsRemove

function clickButtonComprar(){
    const buttonsCompra = Array.from(document.querySelectorAll(".estiloGeralBotoes--comprar"))
    const ul = document.querySelector("ul")
    const ulCarrinho = document.querySelector(".ulProductsCarrinho")
    const divContainer  = document.querySelector(".totalContainer")
    ul.addEventListener("click", (event)=>{
        buttonsCompra.forEach((button) => {
            if(event.target === button){
                const {id} = button
                const produtoClicado = produtos.filter((elem) => elem.id === Number(id) )
                arrayCarrinho.push(produtoClicado[0])
                ulCarrinho.innerHTML = ``
                divContainer.innerHTML = ``
                createTemplateTotalCarrinho()
                divContainer.classList.remove("hidden")
            }
        })
        
        listingCardsCarrinho(arrayCarrinho)
        ButtonsRemoveCarrinho()
    }) 
}
function createCardCarrinho(produto){
    const ulCarrinho = document.querySelector(".ulProductsCarrinho")
    const liCarrinho = document.createElement("li")
    const img        = createImgCard(produto)
    const divInfo    = createInfoCardCarrinho(produto)
    const button     = createButtonRemoveCarrinho(produto)
    liCarrinho.append(img, divInfo, button)
    ulCarrinho.appendChild(liCarrinho)
}
function createInfoCardCarrinho(produto){
    const div    = document.createElement("div")
    const pNome  = document.createElement("p")
    const pSecao = document.createElement("p")
    const pPreco = document.createElement("p")
    div.classList.add("infoProdutoCarrinho")
    pNome.classList.add("nomeProdutoCarrinho")
    pSecao.classList.add("secaoProdutoCarrinho")
    pPreco.classList.add("precoProdutoCarrinho")
    pNome.innerText = `${produto.nome}`
    pSecao.innerText = `${produto.secao}`
    if(produto.promocao === true){
        pPreco.innerText = `R$ ${produto.precoPromocao}`
    }
    else{
        pPreco.innerText = `R$ ${produto.preco}`
    }
    div.append(pNome, pSecao, pPreco)
    return div
}
function createButtonRemoveCarrinho(produto){
    const button = document.createElement("button")
    const i      = document.createElement("i")
    button.classList.add("buttonRemoveCarrinho")
    i.classList.add("fa-solid")
    i.classList.add("fa-trash")
    button.appendChild(i)
    return button
}
function listingCardsCarrinho(array){
    array.forEach((produto) => {
        createCardCarrinho(produto)
    })

    sumTotalCarrinho(array)
    quantidadeTotalCarrinho(array)
    removedProductCarrinho()
}
function createTemplateTotalCarrinho(){
    const divContainer  = document.querySelector(".totalContainer")
    const divDescricao  = createQuantTemplateCarrinho()
    const divPreco      = createTotalTemplateCarrinho()

    divContainer.append(divDescricao, divPreco)
}
function createQuantTemplateCarrinho(){
    const divDescricao   = document.createElement("div")
    const pQuantidade    = document.createElement("p")
    const pQuantidadeNum = document.createElement("p")
    divDescricao.classList.add("descricaoTotal")
    pQuantidadeNum.classList.add("quantidadeCarrinho")
    pQuantidadeNum.innerText = `0`
    pQuantidade.innerText = `Quantidade`
    divDescricao.append(pQuantidade, pQuantidadeNum)
    return divDescricao
}
function createTotalTemplateCarrinho(){
    const divContainer = document.createElement("div")
    const pTotal       = document.createElement("p")
    const ptotal2      = document.createElement("p")
    const span         = document.createElement("span")
    divContainer.classList.add("containerPrecoTotal")
    pTotal.innerText = `Total`
    ptotal2. innerText = `R$ `
    span.id = `precoTotal`
    span.innerText = `00.00`
    ptotal2.append(span)
    divContainer.append(pTotal, ptotal2)
    return divContainer
}
function sumTotalCarrinho(array){
    let priceTotal = 0
    array.forEach((produto)=>{

        produto.promocao === true ? priceTotal += Number(produto.precoPromocao) : priceTotal += Number(produto.preco)
        
    })
    const spanTotal = document.querySelector("#precoTotal")
    spanTotal.innerText = ``
    spanTotal.innerText = `${priceTotal.toFixed(2)}`
}
function quantidadeTotalCarrinho(array){
    const pQuantidade = document.querySelector(".quantidadeCarrinho")
    pQuantidade.innerText = ``
    pQuantidade.innerText = `${array.length}`
}

function ButtonsRemoveCarrinho(){
    const buttonsRemove = Array.from(document.querySelectorAll(".buttonRemoveCarrinho")) 
    buttonsUlCarrinho = buttonsRemove
    const is = Array.from(document.querySelectorAll(".fa-trash")) 
    allIconsRemove = is
}
function removedProductCarrinho(){
    const ulCarrinho = document.querySelector(".ulProductsCarrinho")
    
    ulCarrinho.addEventListener("click", (event) => {
        eventPlace(event, allIconsRemove)
        eventPlace(event, buttonsUlCarrinho)
    })
}
function eventPlace(evento, place){
    const ulCarrinho = document.querySelector(".ulProductsCarrinho")
    const divContainer  = document.querySelector(".totalContainer")
    place.forEach((elem, i) => {
            if(evento.target === elem){
                arrayCarrinho.splice(i, 1)
                ulCarrinho.innerHTML = ``
                listingCardsCarrinho(arrayCarrinho)
                ButtonsRemoveCarrinho()
                if(arrayCarrinho.length === 0){
                    emptyCarrinho()
                    divContainer.innerHTML = ``
                    divContainer.classList.add("hidden")
                }
            }
        })
}
