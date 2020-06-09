function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")


    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
        .then((res) => { return res.json() }) // res => res.json()
        .then(states => {

            for (const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }

        })

}


populateUFs()

function getcities(event) {

    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")


    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    console.log(ufValue)
    console.log(stateInput)
    console.log(indexOfSelectedState)


    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true


    fetch(url)
        .then(res => res.json())
        .then(cities => {


            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false
        })

}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getcities)

//intes de coleta
//pegar todos os li

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=itens]")

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    // adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id



    // verificar se existem itens selecionados
    // se sim, pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item === itemId // true or false
        return itemFound
    })

    // se tiver selecionado,
    if (alreadySelected >= 0) {
        // tirar da seleção
        const filteredItens = selectedItems.filter(item => {
            const itemisDifferent = item != itemId
            return itemisDifferent
        })

        selectedItems = filteredItens

    } else {
        // se nao tiver selecionado, adicionar a seleção
        selectedItems.push(itemId)
    }

    // atualizar o campo escondido com os itens selecionados    
    collectedItems.value = selectedItems


 }
