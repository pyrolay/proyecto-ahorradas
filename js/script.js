// Funciones de selectores
const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)

// Variables links navbar
const $linkNavbar_balance = $$(".linkNavbar_balance")
const $linkNavbar_categories = $$(".linkNavbar_categories")
const $linkNavbar_reports = $$(".linkNavbar_reports")

// Variables navbar
const $navbarBurguer = $(".navbarBurguer")
const $navbarMenu = $(".navbarMenu")
const $xmark = $(".xmark")

// Variables seccion categorias
const $categories = $(".categories")
const $btnEdit = $$(".btnEdit")
const $editCategory = $(".editCategory")
const $cancelEdit = $(".cancelEdit")
const $tableCategories = $(".tableCategories")
const $addCategories = $(".addCategories")
const $btnAddCategories = $(".btnAddCategories")

// Variables seccion operaciones
const $mainContainer = $(".mainContainer")
const $filters = $(".filters")
const $btnHideFilters = $(".btnHideFilters")
const $btnOperation = $(".btnOperation")
const $newOperation = $(".newOperation")
const $cancelNewOperationBtn = $(".cancelNewOperationBtn")
const $addNewOperationBtn = $(".addNewOperationBtn")
const $editOperation = $(".editOperation")
const $editOperationBtn = $(".editOperationBtn")
const $cancelEditOperationBtn = $(".cancelEditOperationBtn")

// Variables seccion reportes
const $reports = $(".reports")

// Id Random
const idStringLetters = "abcdefghijklmnopqrstuvwxyz"
const idStringNumber = "1234567890"

const generateId = () => {
    const arrayOne = []
    const arrayTwo = []
    for (let i = 0; i < 3; i++) {
        const randomIdLetters = Math.floor(Math.random() * idStringLetters.length)
        const randomIdNumber = Math.floor(Math.random() * idStringNumber.length)
        arrayOne.push(idStringLetters[randomIdLetters] + idStringNumber[randomIdNumber])
    }
    for (let i = 0; i < 3; i++) {
        const randomIdLetters = Math.floor(Math.random() * idStringLetters.length)
        const randomIdNumber = Math.floor(Math.random() * idStringNumber.length)
        arrayTwo.push(idStringLetters[randomIdLetters] + idStringNumber[randomIdNumber])
    } return `${arrayOne.join("")}-${arrayTwo.join("")}`
}

// Funciones: Objeto de nueva operación

const operations = []

const saveNewOperation = () => {
    const id= generateId()
    const description = $("#description").value
    const amount = $("#amount").value
    const type = $("#selectType").value
    const category = $("#selectCategory").value
    const date = formatDate()
    operations.push({ id, description, amount, type, category, date })
    if (localStorage.getItem("datos")) {
        const operations = dataOperationsLocalStorage()
        operations.push({ id, description, amount, type, category, date })
        localStorage.setItem("datos", JSON.stringify({ operations }))
    } else localStorage.setItem("datos", JSON.stringify({ operations }))
}

const date = () => {
    const date = new Date()
    $("#date").valueAsDate = date
}

const formatDate = () => {
    const date = $("#date").value
    const newDate = date.split("-").reverse().join("/")
    return newDate
}

const amountColorChange = (amount, type) => {
    if (type === "gasto") {
        return `<p class="text-red-500">-$${amount}</p>`
    } else return `<p class="text-green-500">+$${amount}</p>`
}

const addNewOperation = (data) => {
    $(".tableBody").innerHTML = ""
    const localOperations = data
    localOperations.map(({ id, description, amount, type, category, date }) => {
        const tr = document.createElement("tr")
        tr.classList.add("w-full")
        tr.classList.add("mt-5")
        tr.classList.add("flex")
        tr.classList.add("max-h-32")
        tr.innerHTML += `
            <th class="w-36 mr-5 overflow-y-auto overflow-x-hidden">
                <div class="font-medium text-start">
                    <p>${description}</p>
                </div>
            </th>
            <th class="w-24 ml-10">
                <div class="text-start">
                    <span class="bg-[#f8b6ce] px-2 py-1 rounded-md text-[#ab062d] text-xs">${category}</span>
                </div>
            </th>
            <th class="w-24 ml-10">
                <div class="font-light text-start">
                    <p>${date}</p>
                </div>
            </th>
            <th class="w-24 ml-10">
                <div class="font-medium text-start">
                    <p>${amountColorChange(amount, type)}</p>
                </div>
            </th>
            <th class="w-24 ml-10">
                <div class="flex text-blue-800 py-1 text-start">
                    <button class="btnOperationEdit cursor-pointer hover:text-black text-xs flex" data-id="${id}">Editar</button>
                    <button class="btnOperationRemove ml-4 cursor-pointer hover:text-black text-xs" data-id="${id}">Eliminar</button>
                </div>
            </th>
        `
        $(".tableBody").append(tr)
    })
    
    const btnEdit = $$(".btnOperationEdit")
    const btnRemove = $$(".btnOperationRemove")
    
    for (const btn of btnEdit) {
        const operationId = btn.getAttribute("data-id")
        btn.addEventListener("click", () => editOperation(operationId))
    }
    for (const btn of btnRemove) {
        const operationId = btn.getAttribute("data-id")
        btn.addEventListener("click", () => {
            addNewOperation(filterOperation(operationId))
            removeOperationLocal(operationId)
            operationsEmptyOrNot(dataOperationsLocalStorage())
        })
    }
}

const dataOperationsLocalStorage = () => { return JSON.parse(localStorage.getItem("datos")).operations }

const operationsEmptyOrNot = (operation) => {
    if (operation.length !== 0) {
        $(".operations-empty").classList.add("hidden")
        $(".operations-table").classList.remove("hidden")
    } else {
        $(".operations-empty").classList.remove("hidden")
        $(".operations-table").classList.add("hidden")
    }
}
operationsEmptyOrNot(operations)

if (localStorage.getItem("datos")) {
    operationsEmptyOrNot(operations)
    addNewOperation(dataOperationsLocalStorage())
}


const findOperation = (id) => {
    return dataOperationsLocalStorage().find(operation => operation.id == id)
}

const editOperation = (id) => {
    $editOperation.classList.remove("hidden")
    $mainContainer.classList.add("hidden")
    const chosenOperation = findOperation(id)
    $("#editDescription").value = chosenOperation.description
    $("#editAmount").value = chosenOperation.amount
    $("#editSelectType").value = chosenOperation.type
    $("#editSelectCategory").value = chosenOperation.category
    const dateSplit = chosenOperation.date.split("/")
    const dateReverse = dateSplit.reverse()
    const dateJoin = dateReverse.join("/")
    const newDate = new Date(dateJoin)
    $("#editDate").valueAsDate = newDate

    $editOperationBtn.setAttribute("data-id", id)
    $cancelEditOperationBtn.setAttribute("data-id", id)
}

const editOperationLocal = (id) => {
    const chosenOperation = findOperation(id)
    const operations = dataOperationsLocalStorage()
    for (const operation of operations) {
        if (chosenOperation.id === operation.id) {
            operation.id = id
            operation.description = $("#editDescription").value
            operation.amount = $("#editAmount").value
            operation.type = $("#editSelectType").value
            operation.category = $("#editSelectCategory").value
            operation.date = $("#editDate").value
            localStorage.setItem("datos", JSON.stringify({ operations }))
        }
    }
    localStorage.setItem("datos", JSON.stringify({ operations }))
}

const filterOperation = (id) => {
    return dataOperationsLocalStorage().filter(operation => operation.id !== id)
}

const removeOperationLocal = (id) => {
    const operations = filterOperation(id)
    localStorage.setItem("datos", JSON.stringify({ operations }))
}


$addNewOperationBtn.addEventListener("click", (e) => {
    e.preventDefault()
    saveNewOperation()
    addNewOperation(dataOperationsLocalStorage())
    operationsEmptyOrNot(operations)
    $newOperation.classList.add("hidden")
    $mainContainer.classList.remove("hidden")
})

$cancelEditOperationBtn.addEventListener("click", () => {
    $editOperation.classList.add("hidden")
    $mainContainer.classList.remove("hidden")
})

$editOperationBtn.addEventListener("click", () => {
    const operationId = $editOperationBtn.getAttribute("data-id")
    editOperationLocal(operationId)
    addNewOperation(dataOperationsLocalStorage())
    $editOperation.classList.add("hidden")
    $mainContainer.classList.remove("hidden")
})

$mainContainer.addEventListener("change", () => {
    const operationId = $$(".btnOperationRemove").getAttribute("data-id")
    addNewOperation(filterOperation(operationId))
})



// Funciones: Objeto de categorias

const categories = [
    {
        id: generateId(),
        name: "Comida"
    },
    {
        id: generateId(),
        name: "Servicios"
    },
    {
        id: generateId(),
        name: "Salidas"
    },
    {
        id: generateId(),
        name: "Educación"
    },
    {
        id: generateId(),
        name: "Transporte"
    },
    {
        id: generateId(),
        name: "Trabajo"
    }
]


const generateCategories = (categories) => {
    categories.map(({ id, name }) => {
        $tableCategories.innerHTML += `
            <div class="flex mt-8">
                    <div class="sm:w-4/5 w-3/5">
                        <span class="bg-[#f8b6ce] px-2 py-1 rounded-md text-[#ab062d] text-xs">${name}</span>
                    </div>
                    <div class="text-blue-800 ml-2">
                        <a href="" class="btnEdit cursor-pointer hover:text-black text-xs" onlick=${id}>Editar</a>
                        <a href="" class="ml-4 cursor-pointer hover:text-black text-xs" online=${id}>Eliminar</a>
                    </div>
            </div>
        `
    }) 

}

generateCategories(categories)

/* if ((localStorage.getItem('datos'))) {
    const categoriesDatosJSON = localStorage.getItem('datos')
    const categoriesDatos = JSON.parse(categoriesDatosJSON)
    if (categoriesDatos.datos === "") {
        const datos = {categorias: "categories" }}
        const categoriesDatosTwo = JSON.stringify(datos)
        localStorage.setItem('datos', categoriesDatosTwo)
}

const categoryNew = () => {
    if ($addCategories.value !== "") {
        const name = $addCategories.value
        const id = generateId()
        categories.push({ id, name })
        return localStorage.setItem("datos", JSON.stringify(categories))
    }
}


const addCategory = () => {
    if ($addCategories.value === "") {
        return alert(`Por favor ingrese el nombre de la categoría que desea agregar`)
    }
    else if ($addCategories.value.length > 20) {
        return alert(`Ingrese un nombre de categoría mas corto`)
    }
    else ($addCategories.value !== "")
    return $tableCategories.innerHTML += `
            <div class="flex mt-8">
                    <div class="sm:w-4/5 w-3/5">
                        <span class="bg-[#f8b6ce] px-2 py-1 rounded-md text-[#ab062d] text-xs">${$addCategories.value}</span>
                    </div>
                    <div class="text-blue-800 ml-2">
                        <a href="" class="btnEdit cursor-pointer hover:text-black text-xs">Editar</a>
                        <a href="" class="ml-4 cursor-pointer hover:text-black text-xs">Eliminar</a>
                    </div>
            </div>
        `
}

$btnAddCategories.addEventListener("click", () => {
    addCategory()
    categoryNew()
}) */

// Eventos de navegación interna de la página

$navbarBurguer.addEventListener("click", () => {
    $navbarMenu.classList.remove("hidden")
    $xmark.classList.remove("hidden")
    $navbarBurguer.classList.add("hidden")
})

$xmark.addEventListener("click", () => {
    $navbarMenu.classList.add("hidden")
    $xmark.classList.add("hidden")
    $navbarBurguer.classList.remove("hidden")
})

for (const linkNavbar_balance of $linkNavbar_balance) {
    linkNavbar_balance.addEventListener("click", () => {
        $categories.classList.add("hidden")
        $mainContainer.classList.remove("hidden")
        $reports.classList.add("hidden")
        $newOperation.classList.add("hidden")
        $editCategory.classList.add("hidden")
    })
}

for (const linkNavbar_categories of $linkNavbar_categories) {
    linkNavbar_categories.addEventListener("click", () => {
        $categories.classList.remove("hidden")
        $mainContainer.classList.add("hidden")
        $reports.classList.add("hidden")
        $newOperation.classList.add("hidden")
        $editCategory.classList.add("hidden")
    })
}

for (const linkNavbar_reports of $linkNavbar_reports) {
    linkNavbar_reports.addEventListener("click", () => {
        $categories.classList.add("hidden")
        $mainContainer.classList.add("hidden")
        $reports.classList.remove("hidden")
        $newOperation.classList.add("hidden")
        $editCategory.classList.add("hidden")
    })
}

$btnOperation.addEventListener("click", () => {
    $mainContainer.classList.add("hidden")
    $newOperation.classList.remove("hidden")
    date()
})


$cancelNewOperationBtn.addEventListener("click", () => {
    $newOperation.classList.add("hidden")
    $mainContainer.classList.remove("hidden")
})

$btnHideFilters.addEventListener("click", () => {
    if ($btnHideFilters.textContent === "Mostrar filtros") {
        $filters.classList.remove("hidden")
        $btnHideFilters.textContent = "Ocultar filtros"
    } else {
        $filters.classList.add("hidden")
        $btnHideFilters.textContent = "Mostrar filtros"
    }
})

for (const btnEdit of $btnEdit) {
    btnEdit.addEventListener("click", (e) => {
        e.preventDefault()
        $categories.classList.add("hidden")
        $editCategory.classList.remove("hidden")
    })
}

$cancelEdit.addEventListener("click", () => {
    $categories.classList.remove("hidden")
    $editCategory.classList.add("hidden")
})