// Funciones de selectores
const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)

// Variables links navbar
const $linkNavbar_balance = $(".linkNavbar_balance")
const $linkNavbar_categories = $(".linkNavbar_categories")
const $linkNavbar_reports = $(".linkNavbar_reports")

const $linkNavBarBurger_balance = $(".linkNavbarBurger_balance")
const $linkNavbarBurger_categories = $(".linkNavbarBurger_categories")
const $linkNavbarBurger_reports = $(".linkNavbarBurger_reports")

// Variables navbar
const $navbarBurguer = $(".navbarBurguer")
const $navbarMenu = $(".navbarMenu")
const $xmark = $(".xmark")

// Variables secciones
const $mainContainer = $(".mainContainer")
const $categories = $(".categories")

// Variables sección filtros
const $type = $("#type")
const $filters = $(".filters")
const $categoryFilter = $(".categoryFilter")
const $dayFilter = $(".dayFilter")

// Variables sección categorías
const $btnEdit = $$(".btnEdit")
const $cancelEdit = $(".cancelEdit")
const $btnRemove = $(".btnRemove")
const $editCategory = $(".editCategory")
const $cancelEditBtn = $(".cancelEditBtn")
const $editCategoryBtn = $(".editCategoryBtn")
const $tableCategories = $(".tableCategories")
const $addCategories = $(".addCategories")
const $btnAddCategories = $(".btnAddCategories")
const $inputEditCategory = $(".inputEditCategory")
const $categoriesContainer = $(".categoriesContainer")
const $formAddCategories = $(".formAddCategories")

// Variables sección operaciones
const $btnHideFilters = $(".btnHideFilters")
const $btnOperation = $(".btnOperation")
const $newOperation = $(".newOperation")
const $editOperation = $(".editOperation")
const $editOperationBtn = $(".editOperationBtn")
const $cancelEditOperationBtn = $(".cancelEditOperationBtn")
const $addNewOperationBtn = $(".addNewOperationBtn")
const $cancelNewOperationBtn = $(".cancelNewOperationBtn")
const newOperationArray = [$("#description"), $("#amount"), $("#type"), $("#category"), $("#date")]
const $categoryNewOperation = $(".categoryNewOperation")
const $editSelectCategory = $("#editSelectCategory")

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

const newOperationEmpty = () => {
    $("#description").value = ""
    $("#amount").value = 0
    date()
}

const saveNewOperation = () => {
    const id = generateId()
    const description = $("#description").value
    const amount = $("#amount").value
    const type = $("#selectType").value
    const category = $("#selectCategory").value
    const date = formatDate()
    operations.push({ id, description, amount, type, category, date })
    if (localStorage.getItem("datos")) {
        const operations = dataOperationsLocalStorage()
        operations.push({ id, description, amount, type, category, date })
        const localData = JSON.parse(localStorage.getItem("datos"))
        const datos = { ...localData, operations: operations }
        localStorage.setItem("datos", JSON.stringify(datos))
    }
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
        btn.addEventListener("click", () => {
            editOperation(operationId)
            selectCategoriesOperation()
        })

    }
    for (const btn of btnRemove) {
        const operationId = btn.getAttribute("data-id")
        btn.addEventListener("click", () => {
            addNewOperation(filterOperation(operationId))
            removeOperationLocal(operationId)
            operationsEmptyOrNot()
        })
    }
}

const dataOperationsLocalStorage = () => { return JSON.parse(localStorage.getItem("datos")).operations }

const operationsEmptyOrNot = () => {
    const operation = dataOperationsLocalStorage()
    if (operation.length !== 0) {
        $(".operations-empty").classList.add("hidden")
        $(".operations-table").classList.remove("hidden")
    } else {
        $(".operations-empty").classList.remove("hidden")
        $(".operations-table").classList.add("hidden")
    }
}

if (localStorage.getItem("datos")) {
    operationsEmptyOrNot()
    addNewOperation(dataOperationsLocalStorage())
}


// Funciones editar operaciones

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
    $editSelectCategory.value = chosenOperation.category
    const dateSplit = chosenOperation.date.split("/")
    const dateReverse = dateSplit.reverse()
    const dateJoin = dateReverse.join("/")
    const newDate = new Date(dateJoin)
    $("#editDate").valueAsDate = newDate

    $editOperationBtn.setAttribute("data-id", id)
    $cancelEditOperationBtn.setAttribute("data-id", id)
}

const editOperationLocal = (id) => {
    const localData = JSON.parse(localStorage.getItem("datos"))
    const chosenOperation = findOperation(id)
    const operations = dataOperationsLocalStorage()
    for (const operation of operations) {
        if (chosenOperation.id === operation.id) {
            operation.id = id
            operation.description = $("#editDescription").value
            operation.amount = $("#editAmount").value
            operation.type = $("#editSelectType").value
            operation.category = $editSelectCategory.value
            const date = $("#editDate").value
            const newDate = date.split("-").reverse().join("/")
            operation.date = newDate
            const datos = { ...localData, operations: operations }
            localStorage.setItem("datos", JSON.stringify(datos))
        }
    }
    const datos = { ...localData, operations: operations }
    localStorage.setItem("datos", JSON.stringify(datos))
}

const filterOperation = (id) => {
    return dataOperationsLocalStorage().filter(operation => operation.id !== id)
}

const removeOperationLocal = (id) => {
    const localData = JSON.parse(localStorage.getItem("datos"))
    const datos = { ...localData, operations: filterOperation(id) }
    localStorage.setItem("datos", JSON.stringify(datos))
}

$addNewOperationBtn.addEventListener("click", (e) => {
    e.preventDefault()
    saveNewOperation()
    addNewOperation(dataOperationsLocalStorage())
    operationsEmptyOrNot()
    selectCategoriesOperation()
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


// Funciones para filtrar y ordenar operaciones

// Filtro type

const typeFilterOperation = (array, $type) => {
    return array.filter(operation => operation.type === $type)
}

const filterType = (array) => {
    for (const operation of array) {
        if ($type.value === operation.type) {
            $(".operations-empty").classList.add("hidden")
            $(".operations-table").classList.remove("hidden")
            array = typeFilterOperation(array, operation.type)
            return array
        } else if ($type.value === "todos") {
            $(".operations-empty").classList.add("hidden")
            $(".operations-table").classList.remove("hidden")
            return array 
        }

        if (typeFilterOperation(array, $type.value).length === 0) {
            $(".operations-empty").classList.remove("hidden")
            $(".operations-table").classList.add("hidden")
            return array
        }
    }
}

//Filtro category

const categoryFilterOperation = (array, $categoryFilter) => {
    return array.filter(operation => operation.category === $categoryFilter)
}

const categoryFilter = (array) => {
    for (const operation of array) {
        if ($categoryFilter.value === operation.category) {
            $(".operations-empty").classList.add("hidden")
            $(".operations-table").classList.remove("hidden")
            array = categoryFilterOperation(array, operation.category)
            return array
        } else if ($categoryFilter.value === "Todas") {
            $(".operations-empty").classList.add("hidden")
            $(".operations-table").classList.remove("hidden")
            return array 
        }

        if (categoryFilterOperation(array, $categoryFilter.value).length === 0) {
            $(".operations-empty").classList.remove("hidden")
            $(".operations-table").classList.add("hidden")
            return array
        }
    }
}

// Filtro fecha

const filterDefaultDate = () => {
    const date = new Date()
    const day = "01"
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    $dayFilter.value = `${year}-${month}-${day}`
}


const filterDate = (array) => {
    console.log(array)
    const dateInput = parseInt(($dayFilter.value).split("-").join(""))
    return array.filter(operation => {
        const dateOperation = parseInt((operation.date).split("/").reverse().join(""))
        if (dateOperation >= dateInput) {    
            return operation
        }
    }) 
}

// Evento filters

$filters.addEventListener("change", () =>{
    const arr = dataOperationsLocalStorage()
    const filteredTypeArr = filterType(arr)
    const filteredCategoryArr = categoryFilter(filteredTypeArr)
    const filteredDateArr = filterDate(filteredCategoryArr)
    console.log(filteredDateArr)
    if (filteredDateArr.length === 0) {
        $(".operations-empty").classList.remove("hidden")
        $(".operations-table").classList.add("hidden")
    } else addNewOperation(filteredDateArr)
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
    for (const { id, name } of categories) {
        const div = document.createElement("div")
        div.classList.add("flex")
        div.classList.add("mt-8")
        div.innerHTML = `
        <div class="sm:w-4/5 w-3/5">
            <span class="bg-[#f8b6ce] px-2 py-1 rounded-md text-[#ab062d] text-xs">${name}</span>
        </div>
        <div class="text-blue-800 ml-2">
            <button class="btnEdit cursor-pointer hover:text-black text-xs" data-id="${id}">Editar</button>
            <button class="btnRemove ml-4 cursor-pointer hover:text-black text-xs" data-id="${id}">Eliminar</button>
        </div>
        `
        $tableCategories.append(div)
    }

    const btnEdit = $$(".btnEdit")
    const btnRemove = $$(".btnRemove")

    for (const btn of btnEdit) {
        const categoryId = btn.getAttribute("data-id")
        btn.addEventListener("click", () => {
            categoryEdit(categoryId)
            selectCategoriesOperation()
            selectCategoriesFilter()
        })
    }

    for (const btn of btnRemove) {
        const categoryId = btn.getAttribute("data-id")
        btn.addEventListener("click", () => {
            removeCategory(categoryId)
            removeCategoryLocal(categoryId)
            selectCategoriesOperation()
            selectCategoriesFilter()
        })
    }
}

const data = { categories, operations }

if (!localStorage.getItem("datos")) {
    localStorage.setItem("datos", JSON.stringify(data))
}


const categoryNew = () => {
    if ($addCategories.value === "") {
        return alert(`Por favor ingrese el nombre de la categoría que desea agregar`)
    }
    else if ($addCategories.value.length > 20) {
        return alert(`Ingrese un nombre de categoría mas corto`)
    }
    else {
        const name = $addCategories.value
        const id = generateId()
        const categories = dataCategoriesLocalStorage()
        categories.push({ id, name })
        const localData = JSON.parse(localStorage.getItem("datos"))
        const datos = { ...localData, categories: categories }
        localStorage.setItem("datos", JSON.stringify(datos))
    }
}

const dataCategoriesLocalStorage = () => { return JSON.parse(localStorage.getItem("datos")).categories }

const addCategory = () => {
    $tableCategories.innerHTML = ""
    generateCategories(dataCategoriesLocalStorage())
}


$btnAddCategories.addEventListener("click", (e) => {
    categoryNew()
    addCategory()
    selectCategoriesOperation()
    selectCategoriesFilter()
    e.preventDefault()
    $formAddCategories.reset()
})

// Eventos editar y eliminar

const findCategory = (id) => {
    return dataCategoriesLocalStorage().find(category => category.id == id)
}

const editCategoriesLocal = (id) => {
    const localData = JSON.parse(localStorage.getItem("datos"))
    const chosenCategory = findCategory(id)
    const categories = dataCategoriesLocalStorage()
    for (const category of categories) {
        if (chosenCategory.id === category.id) {
            category.name = $inputEditCategory.value
            const datos = { ...localData, categories: categories }
            localStorage.setItem("datos", JSON.stringify(datos))
        }
    }
    const datos = { ...localData, categories: categories }
    localStorage.setItem("datos", JSON.stringify(datos))
}


const removeCategoryLocal = (id) => {
    const localData = JSON.parse(localStorage.getItem("datos"))
    const datos = { ...localData, categories: filterCategory(id) }
    localStorage.setItem("datos", JSON.stringify(datos))
}


const cleanCategories = () => $tableCategories.innerHTML = ""

const categoryEdit = (id) => {
    cleanCategories()
    $categories.classList.add("hidden")
    $editCategory.classList.remove("hidden")
    const chosenCategory = findCategory(id)
    $inputEditCategory.value = chosenCategory.name
    $editCategoryBtn.setAttribute("data-id", id)
    $cancelEditBtn.setAttribute("data-id", id)
}

$cancelEditBtn.addEventListener("click", () => {
    $editCategory.classList.add("hidden")
    $categories.classList.remove("hidden")
    generateCategories(dataCategoriesLocalStorage())
})

const saveCategory = (id) => {
    return {
        id: id,
        name: $inputEditCategory.value
    }
}

const editCategory = (id) => {
    return dataCategoriesLocalStorage().map(category => {
        if (category.id === id) {
            return saveCategory(id)
        }
        return category
    })
}

$editCategoryBtn.addEventListener("click", () => {
    const categoryId = $editCategoryBtn.getAttribute("data-id")
    $editCategory.classList.add("hidden")
    $categories.classList.remove("hidden")
    generateCategories(editCategory(categoryId))
    editCategoriesLocal(categoryId)
})

const filterCategory = (id) => {
    return dataCategoriesLocalStorage().filter(category => category.id !== id)

}

const removeCategory = (id) => {
    cleanCategories()
    generateCategories(filterCategory(id))
}


// Agregar categorias del LocalStorage al select de "Nueva operación"

const selectCategoriesOperation = () => {
    $categoryNewOperation.innerHTML = ""
    $editSelectCategory.innerHTML = ""
    for (const { name } of dataCategoriesLocalStorage()) {
        $categoryNewOperation.innerHTML += `<option value="${name}">${name}</option>`
        $editSelectCategory.innerHTML += `<option value="${name}">${name}</option>`
    }
}

const selectCategoriesFilter = () => {
    $categoryFilter.innerHTML = ""
    $categoryFilter.innerHTML = `<option value="Todas">Todas</option>`
    for (const { name } of dataCategoriesLocalStorage()) {
        $categoryFilter.innerHTML +=
            `
            <option value="${name}">${name}</option>
        `
    }
}


// Evento onload

window.addEventListener("load", () => {
    generateCategories(categories)
    addCategory()
    selectCategoriesOperation()
    selectCategoriesFilter()
    filterDefaultDate()
    addNewOperation(filterDate(dataOperationsLocalStorage()))
})


// Funciones de navegación

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


const navigationConditional = (e) => {
    if (e.target === e.currentTarget) {
        const tabName = e.target.name
        chooseTab(tabName)
    } else {
        const tabName = e.target.parentElement.name
        chooseTab(tabName)
    }
}

let tabs = {
    balance: true,
    categories: false,
    reports: false,
    newOperation: false,
    editOperation: false,
    editCategory: false
}

const arrOfTabs = [$linkNavbar_balance, $linkNavbar_categories, $linkNavbar_reports, $btnOperation]

const arrOfTabsBurger = [$linkNavBarBurger_balance, $linkNavbarBurger_categories, $linkNavbarBurger_reports, $btnOperation]

for (const editBtn of $$(".btnEdit")) {
    editBtn.addEventListener("click", () => {
        navigationConditional(e)
    })
}

for (const tab of arrOfTabs) {
    tab.addEventListener("click", (e) => {
        e.preventDefault()
        navigationConditional(e)
        newOperationEmpty()
        addCategory()
    })
}

for (const tab of arrOfTabsBurger) {
    tab.addEventListener("click", (e) => {
        e.preventDefault()
        navigationConditional(e)
    })
}

const chooseTab = (tabName) => {
    for (const tab of Object.keys(tabs)) {
        tabs[tab] = false
    }
    tabs = { ...tabs, [tabName]: true }
    changeClass()
}

const changeClass = () => {
    for (const tab of Object.keys(tabs)) {
        const tabId = document.getElementById(tab)
        if (tabs[tab] !== true) {
            tabId.classList.add("hidden")
        } else {
            tabId.classList.remove("hidden")
        }
    }
}

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