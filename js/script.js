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
const $orderBy = $("#order-by")

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

// Add y remove hidden

const addAndRemoveHidden = (add, remove) => {
    add.classList.add("hidden")
    remove.classList.remove("hidden")
}

const emptyOperationsAndBalance = () => {
    addAndRemoveHidden($(".operations-table"), $(".operations-empty"))
    $(".balanceProfit").innerText = `+$0`
    $(".balanceSpent").innerText = `-$0`
    $(".balanceTotal").innerText = `$0`
}

// Objetos de categorias y operaciones

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

const operations = []


// Función que genera Categorias

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
        })
    }

    for (const btn of btnRemove) {
        const categoryId = btn.getAttribute("data-id")
        btn.addEventListener("click", () => {
            removeCategory(categoryId)
            removeCategoryLocal(categoryId)
            selectCategoriesOperation()
            selectCategoriesFilter()
            operationsEmptyOrNot()
            enoughOperations()
            balanceFunction(dataOperationsLocalStorage())
        })
    }
}

generateCategories(categories)

// Se envian los objetos al Local Storage

const data = { categories, operations }

if (!localStorage.getItem("datos")) {
    localStorage.setItem("datos", JSON.stringify(data))
}

// Funciones y eventos para agregar una categoria

const categoryNew = () => {
    if ($addCategories.value === "") {
        return alert(`Por favor ingrese el nombre de la categoría que desea agregar`)
    }
    else if ($addCategories.value.length > 20) {
        return alert(`Ingrese un nombre de categoría mas corto`)
    }
    else {
        const name = $addCategories.value.charAt(0).toUpperCase() + $addCategories.value.slice(1)
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
    enoughOperations()
})

// Eventos y funciones para editar categorias

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


const cleanCategories = () => $tableCategories.innerHTML = ""

const categoryEdit = (id) => {
    cleanCategories()
    addAndRemoveHidden($categories, $editCategory)
    const chosenCategory = findCategory(id)
    $inputEditCategory.value = chosenCategory.name
    $editCategoryBtn.setAttribute("data-id", id)
    $cancelEditBtn.setAttribute("data-id", id)
}

$cancelEditBtn.addEventListener("click", () => {
    addAndRemoveHidden($editCategory, $categories)
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
    addAndRemoveHidden($editCategory, $categories)
    generateCategories(editCategory(categoryId))
    editCategoriesLocal(categoryId)
    addNewOperation(dataOperationsLocalStorage())
    selectCategoriesOperation()
    selectCategoriesFilter()
    enoughOperations()
})

// Eventos y funciones para eliminar categorias

const removeCategoryLocal = (id) => {
    const localData = JSON.parse(localStorage.getItem("datos"))
    const datos = { ...localData, categories: filterCategory(id), operations: filterCategoryOperationRemove(id) }
    localStorage.setItem("datos", JSON.stringify(datos))
}

const filterCategory = (id) => {
    return dataCategoriesLocalStorage().filter(category => category.id !== id)

}

const filterCategoryOperationRemove = (id) => {
    const arrCategoriesLocal = dataCategoriesLocalStorage()
    const arrOperationLocal = dataOperationsLocalStorage()
    if (arrOperationLocal.length !== 0) {
        for (const { category } of arrOperationLocal) {
            if (!arrCategoriesLocal.includes(id) && category === id) {
                const data = dataOperationsLocalStorage().filter(operation => operation.category !== category)
                return data
            }
        }
    } else return emptyArr = []
}

const removeCategory = (id) => {
    cleanCategories()
    generateCategories(filterCategory(id))
    const filteredByRemovedCategory = filterCategoryOperationRemove(id)
    if (filteredByRemovedCategory.length !== 0) addNewOperation(filteredByRemovedCategory)
}


// Funciones que agregan las categorias a los selects de "Nueva operación", "Filtros" y "Formulario editar operaciones"

const selectCategoriesOperation = () => {
    $categoryNewOperation.innerHTML = ""
    $editSelectCategory.innerHTML = ""
    for (const { name, id } of dataCategoriesLocalStorage()) {
        $categoryNewOperation.innerHTML += `<option value="${id}">${name}</option>`
        $editSelectCategory.innerHTML += `<option value="${id}">${name}</option>`
    }
}

const selectCategoriesFilter = () => {
    $categoryFilter.innerHTML = ""
    $categoryFilter.innerHTML = `<option value="Todas">Todas</option>`
    for (const { name, id } of dataCategoriesLocalStorage()) {
        $categoryFilter.innerHTML += `<option value="${id}">${name}</option>`
    }
}

// Funciones para agregar una nueva operación

const newOperationEmpty = () => {
    $("#description").value = ""
    $("#amount").value = 0
    $("#date").valueAsDate = new Date()
}

const saveNewOperation = () => {
    const id = generateId()
    const description = $("#description").value.charAt(0).toUpperCase() + $("#description").value.slice(1)
    const amount = $("#amount").value
    const type = $("#selectType").value
    const category = $("#selectCategory").value
    const date = $("#date").value
    operations.push({ id, description, amount, type, category, date })
    if (localStorage.getItem("datos")) {
        const operations = dataOperationsLocalStorage()
        operations.push({ id, description, amount, type, category, date })
        const localData = JSON.parse(localStorage.getItem("datos"))
        const datos = { ...localData, operations: operations }
        localStorage.setItem("datos", JSON.stringify(datos))
    }
}

const formatDate = (date) => {
    date = new Date(date)
    const getDate = [date.getUTCDate(), date.getUTCMonth() + 1, date.getUTCFullYear()]
    const newDate = getDate.join("/")
    return newDate
}



const amountColorChange = (amount, type) => {
    if (type === "gasto") {
        return `<p class="text-red-500">-$${amount}</p>`
    } else return `<p class="text-green-500">+$${amount}</p>`
}


const nameCategory = (category) => {
    for (const { id, name } of dataCategoriesLocalStorage()) {
        if (category === id) {
            return category = name
        }
    }
}

const addNewOperation = (data) => {
    $(".tableBody").innerHTML = ""
    const localOperations = data
    if (localOperations.length !== 0) {
        localOperations.map(({ id, description, amount, type, category, date }) => {
            let tr = document.createElement("tr")
            const cls = ["md:inline-block", "hidden", "w-full", "mt-3", "flex", "max-h-32", "overflow-y-auto", "overflow-x-hidden"]
            tr.classList.add(...cls)
            tr.innerHTML += `
            <th class="overflow-y-auto overflow-x-hidden">
            <div class="w-36 lg:min-w-[10rem] mr-5 font-medium text-start truncate">
                <p>${description}</p>
            </div>
            </th>
            <th class="">
            <div class="w-24 lg:min-w-[9rem] ml-2 text-start truncate">
                <span class="bg-[#f8b6ce] px-2 py-1 rounded-md text-[#ab062d] text-xs">${nameCategory(category)}</span>
            </div>
            </th>
            <th class="">
            <div class="w-24 lg:min-w-[9rem] font-light text-start">
                <p>${formatDate(date)}</p>
            </div>
            </th>
            <th class="">
            <div class="w-20 lg:min-w-[8rem] font-medium text-start">
                <p>${amountColorChange(amount, type)}</p>
            </div>
            </th>
            <th class="">
            <div class="w-30 md:ml-4 lg:ml-0 flex 2xl:flex-row lg:flex-col md:flex-row text-blue-800 py-1 text-start">
                <button class="btnOperationEdit cursor-pointer hover:text-black text-xs flex" data-id="${id}">Editar</button>
                <button class="btnOperationRemove 2xl:ml-4 lg:ml-0 md:ml-4 2xl:mt-0 lg:mt-2 md:mt-0 cursor-pointer hover:text-black text-xs" data-id="${id}">Eliminar</button>
            </div>
        </th> `

        $(".tableBody").append(tr)

        const trResponsive = document.createElement("tr")
        const responsiveCls = ["md:hidden", "mt-3", "w-11/12", "sm:w-4/5", "flex", "justify-between"]
        trResponsive.classList.add(...responsiveCls)
        trResponsive.innerHTML +=`
        <th class="w-20 sm:w-56 truncate">
            <div class="font-medium text-start">
                <p>${description}</p>
            </div>
            <div class="font-light text-start">
                <p>${formatDate(date)}</p>
            </div>
            <div class="font-medium text-start">
                <p>${amountColorChange(amount, type)}</p>
            </div>
        </th>
        <th class="sm:ml-5 ml-3 truncate">
                <div>
                    <span class="bg-[#f8b6ce] px-2 py-1 rounded-md text-[#ab062d] text-sm">${nameCategory(category)}</span>
                </div>
                <div class="flex text-blue-800 py-1 justify-center">
                    <a href="" class="btnOperationEdit cursor-pointer text-[#ab062d] text-xl" data-id="${id}">
                        <i class="fa-regular fa-pen-to-square"></i>
                    </a>
                    <a href="" class="btnOperationRemove ml-4 cursor-pointer text-[#ab062d] text-xl" data-id="${id}">
                        <i class="fa-solid fa-trash-can"></i>
                    </a>
                </div>
        </th> `
            $(".tableBody").append(trResponsive)
        })
    
        const btnEdit = $$(".btnOperationEdit")
        const btnRemove = $$(".btnOperationRemove")
    
        for (const btn of btnEdit) {
            const operationId = btn.getAttribute("data-id")
            btn.addEventListener("click", (e) => {
                e.preventDefault()
                editOperation(operationId)
                filterFunction()
            })
        }
    
        for (const btn of btnRemove) {
            const operationId = btn.getAttribute("data-id")
            btn.addEventListener("click", (e) => {
                e.preventDefault()
                removeOperationLocal(operationId)
                addNewOperation(filterOperation(operationId))
                operationsEmptyOrNot()
                filterFunction()
                enoughOperations()
            })
        }
    } else emptyOperationsAndBalance()
}

const dataOperationsLocalStorage = () => { return JSON.parse(localStorage.getItem("datos")).operations }

const operationsEmptyOrNot = () => {
    const operation = dataOperationsLocalStorage()
    if (operation.length !== 0) addAndRemoveHidden($(".operations-empty"), $(".operations-table"))
    else addAndRemoveHidden($(".operations-table"), $(".operations-empty"))
}

if (localStorage.getItem("datos")) {
    operationsEmptyOrNot()
    addNewOperation(dataOperationsLocalStorage())
}


// Funciones para editar operaciones

const findOperation = (id) => {
    return dataOperationsLocalStorage().find(operation => operation.id == id)
}

const editOperation = (id) => {
    addAndRemoveHidden($mainContainer, $editOperation)
    const chosenOperation = findOperation(id)
    $("#editDescription").value = chosenOperation.description
    $("#editAmount").value = chosenOperation.amount
    $("#editSelectType").value = chosenOperation.type
    $("#editDate").valueAsDate = new Date(chosenOperation.date)
    $("#editSelectCategory").value = chosenOperation.category
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
            operation.description = $("#editDescription").value.charAt(0).toUpperCase() + $("#editDescription").value.slice(1)
            operation.amount = $("#editAmount").value
            operation.type = $("#editSelectType").value
            operation.category = $("#editSelectCategory").value
            operation.date = $("#editDate").value
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
    filterFunction(dataOperationsLocalStorage())
    operationsEmptyOrNot()
    selectCategoriesOperation()
    filterType(dataOperationsLocalStorage())
    enoughOperations()
    addAndRemoveHidden($newOperation, $mainContainer)
})

$editOperationBtn.addEventListener("click", () => {
    const operationId = $editOperationBtn.getAttribute("data-id")
    editOperationLocal(operationId)
    filterFunction(dataOperationsLocalStorage())
    enoughOperations()
    addAndRemoveHidden($editOperation, $mainContainer)
})



// Funciones para filtrar y ordenar operaciones

// Filtro type

const filterOperationByProp = (array, prop, input) => {
    return array.filter(operation => operation[prop] === input)
}

const filterType = (array) => {
    if (array.length !== 0) {
        for (const operation of array) {
            if ($type.value === operation.type) {
                addAndRemoveHidden($(".operations-empty"), $(".operations-table"))
                array = filterOperationByProp(array, "type", $type.value)
                return categoryFilter(array)
            } else if ($type.value === "todos") {
                addAndRemoveHidden($(".operations-empty"), $(".operations-table"))
                return categoryFilter(array)
            }
    
            if (filterOperationByProp(array, "type", $type.value).length === 0) {
                emptyOperationsAndBalance()
                return array = []
            }
        }
    } else emptyOperationsAndBalance()
}

// Filtro category

const categoryFilter = (array) => {
    if (array.length !== 0) {
        for (const operation of array) {
            if ($categoryFilter.value === operation.category) {
                addAndRemoveHidden($(".operations-empty"), $(".operations-table"))
                array = filterOperationByProp(array, "category", $categoryFilter.value)
                return filterDate(array)
            } else if ($categoryFilter.value === "Todas") {
                addAndRemoveHidden($(".operations-empty"), $(".operations-table"))
                return filterDate(array)
            }
    
            if (filterOperationByProp(array, "category", $categoryFilter.value).length === 0) {
                emptyOperationsAndBalance()
                return array = []
            }
        }
    } else emptyOperationsAndBalance()
}

// Filtro fecha

const filterDefaultDate = () => {
    const date = new Date()
    const day = [date.getFullYear(), date.getMonth() + 1, "01"]
    $dayFilter.value = day.join("-")
}


const filterDate = (array) => {
    if (array.length !== 0) {
        const value = new Date($dayFilter.value)
        const dateInput = value.getTime()
        return array.filter(operation => {
            const dateOperation = new Date(operation.date)
            const dateTime = dateOperation.getTime()
            if (dateTime >= dateInput) {
                return operation
            }
        }) 
    } else emptyOperationsAndBalance()
}

// Ordenar

const orderBy = (array) => {
    const changeDate = (sort) => {
        const date = new Date(sort.date)
        return date.getTime()
    }

    if ($orderBy.value === "1") return array.sort((a, b) => changeDate(b) - changeDate(a))
    if ($orderBy.value === "2") return array.sort((a, b) => changeDate(a) - changeDate(b))

    if ($orderBy.value === "3") return array.sort((a, b) => b.amount - a.amount)
    if ($orderBy.value === "4") return array.sort((a, b) => a.amount - b.amount)

    if ($orderBy.value === "5") {
        return array.sort((a, b) => {
            if (a.description < b.description) return -1
            if (a.description > b.description) return 1
        })
    }
    if ($orderBy.value === "6") {
        return array.sort((a, b) => {
            if (a.description > b.description) return -1
            if (a.description < b.description) return 1
        })
    }
}

// Evento filters

const filterFunction = () => {
    let arrOfOperations = dataOperationsLocalStorage()
    let operationsFiltered
    if (arrOfOperations.length !== 0) {
        operationsFiltered = filterType(arrOfOperations)
    }
    if (arrOfOperations.length !== 0 && operationsFiltered.length !== 0) {
        balanceFunction(operationsFiltered)
        addNewOperation(orderBy(filterType(operationsFiltered)))
    } else emptyOperationsAndBalance()
}

$filters.addEventListener("change", () => {
    filterFunction()
})

const balanceFunction = (array) => {
    let spent = 0
    let profit = 0
    for (const operation of array) {
        if (operation.type === "ganancia") {
            profit += parseInt(operation.amount)
        } else spent += parseInt(operation.amount)
    }
    const total = profit - spent
    return balanceDom({ spent, profit, total })
}

const balanceDom = (objectBalance) => {
    const { spent, profit, total } = objectBalance
    $(".balanceProfit").innerText = `+$${profit}`
    $(".balanceSpent").innerText = `-$${spent}`
    if (total < 0) {
        const totalSlice = total.toString().slice(1)
        $(".balanceTotal").innerText = `-$${totalSlice}`
    } else {
        $(".balanceTotal").innerText = `$${total}`
    }
}

// Eventos y funciones sección reportes

const filterByCategory = (category) => {
    return dataOperationsLocalStorage().filter(operation => operation.category === category)
}

const filterByDate = (date) => {
    return dataOperationsLocalStorage().filter(operation => {
        const dateOperation = new Date (operation.date)
        const monthAndYear = `${dateOperation.getMonth() + 1}/${dateOperation.getFullYear()}`
        if (monthAndYear === date) {
            return operation
        }
    })
}

const getSpent = (array) => {
    let spent = 0
    for (const operation of array) {
        if (operation.type === "gasto") {
            spent += parseInt(operation.amount)
        }
    } return spent
}

const getEarnings = (array) => {
    let profit = 0
    for (const operation of array) {
        if (operation.type === "ganancia") {
            profit += parseInt(operation.amount)
        }
    } return profit
}

const getBalance = (array) => {
    return total = getEarnings(array) - getSpent(array)
}

const objectCategories = (prop, callback) => {
    const categoriesOrDates = []
    const objCategoriesOrDates = {}
    for (const operation of dataOperationsLocalStorage()) {
            if (!categoriesOrDates.includes(operation[prop])) {
                if(prop === "date"){
                    const dateOperation = new Date(operation[prop])
                    const monthAndYear = `${dateOperation.getMonth() + 1}/${dateOperation.getFullYear()}`
                    categoriesOrDates.push(monthAndYear) 
                } else  categoriesOrDates.push(operation[prop])
            }
    }
    for (const item of categoriesOrDates) {
        const objBalance = {
            gasto: getSpent(callback(item)),
            ganancia: getEarnings(callback(item)),
            balance: getBalance(callback(item))
        }
        objCategoriesOrDates[item] = objBalance

    } return objCategoriesOrDates
}

let categoriesTotalBalance = objectCategories("category", filterByCategory)
let dateTotalBalance = objectCategories("date", filterByDate)

const totalBalanceChange = () => {
    categoriesTotalBalance = objectCategories("category", filterByCategory)
    dateTotalBalance = objectCategories("date", filterByDate)
}

const symbolBalance = (balance) => {
    if (balance <= 0) {
        const totalSlice = balance.toString().slice(1)
        return `-$${totalSlice}`
    } else {
        return `$${balance}`
    }
}

const tableReports = () => {
    $(".tableCategoriesReports").innerHTML = ""
    $(".tableMonthReports").innerHTML = ""
    for (const obj of Object.keys(categoriesTotalBalance)) {
        const { ganancia, gasto, balance } = categoriesTotalBalance[obj]
        $(".tableCategoriesReports").innerHTML += `
            <tr class="flex justify-between">
                <th class="font-medium">${nameCategory(obj)}</th>
                <th class="ml-10 font-medium text-green-500">+$${ganancia}</th>
                <th class="ml-10 font-medium text-red-500">-$${gasto}</th>
                <th class="ml-10 font-medium">${symbolBalance(balance)}</th>
            </tr>
        `
    }
    for(const obj of Object.keys(dateTotalBalance)){
        const { ganancia, gasto, balance } = dateTotalBalance[obj]
        $(".tableMonthReports").innerHTML += `
            <tr class="flex justify-between">
                <th class="font-medium">${obj}</th>
                <th class="ml-10 font-medium text-green-500">+$${ganancia}</th>
                <th class="ml-10 font-medium text-red-500">-$${gasto}</th>
                <th class="ml-10 font-medium">${symbolBalance(balance)}</th>
            </tr>
        `
    }
}

const categorySummary = (prop) => {
    let maxAmount = 0
    let maxCategory
    for (const obj of Object.keys(categoriesTotalBalance)) {
        const value = categoriesTotalBalance[obj][prop]
        if (value >= maxAmount) {
            maxAmount = value
            maxCategory = obj
        }
    }
    return {maxAmount, maxCategory}
}


const monthMaxAndMin = () => {
    let maxMonthAmount = 0
    let minMonthAmount = 0
    let maxMonth
    let minMonth
    for (const obj of Object.keys(dateTotalBalance)) {
        const {ganancia,gasto} = dateTotalBalance[obj]
        if (ganancia >= maxMonthAmount) {
            maxMonthAmount = ganancia
            maxMonth = obj
        }
        if (gasto >= minMonthAmount) {
            minMonthAmount = gasto
            minMonth = obj
        }
    } return  {maxMonthAmount, maxMonth, minMonthAmount, minMonth}
}


const summaryReports = () => {
    totalBalanceChange()
    tableReports()

    const maxEarnings = categorySummary("ganancia")
    $(".categoryMaxProfit").innerHTML = `
        <div class="sm:w-1/3 mb-2 sm:mb-0">
            <p class="font-semibold">Categoría con mayor ganancia</p>
        </div>
        <div class="sm:w-1/3 sm:text-end">
            <span class="bg-[#f8b6ce] px-2 py-1 rounded-md text-[#ab062d] text-xs font-bold"">${nameCategory(maxEarnings.maxCategory)}</span>
        </div>
        <div class="sm:w-1/3 sm:text-end font-semibold">
            <span class="text-green-500 font-semibold">+$${maxEarnings.maxAmount}</span>
        </div>
    `

    const maxSpent = categorySummary("gasto")
    $(".categoryMaxSpent").innerHTML = `
        <div class="sm:w-1/3 mb-2 sm:mb-0">
            <p class="font-semibold">Categoría con mayor gasto</p>
        </div>
        <div class="sm:w-1/3 sm:text-end">
            <span class="bg-[#f8b6ce] px-2 py-1 rounded-md text-[#ab062d] text-xs font-bold">${nameCategory(maxSpent.maxCategory)}</span>
        </div>
        <div class="sm:w-1/3 sm:text-end font-semibold">
            <span class="text-red-500 font-semibold">-$${maxSpent.maxAmount}</span>
        </div>
    `

    const maxBalance = categorySummary("balance")
    if (maxBalance.maxAmount === 0) $(".categoryMaxBalance").innerHTML = `
        <div class="sm:w-1/3 mb-2 sm:mb-0">
            <p class="font-semibold">No hay categoría con mayor balance</p>
        </div>
    `
    else { $(".categoryMaxBalance").innerHTML = `
        <div class="sm:w-1/3 mb-2 sm:mb-0">
            <p class="font-semibold">Categoria con mayor balance</p>
        </div>
        <div class="sm:w-1/3 sm:text-end">
            <span class="bg-[#f8b6ce] px-2 py-1 rounded-md text-[#ab062d] text-xs font-bold">${nameCategory(maxBalance.maxCategory)}</span>
        </div>
        <div class="sm:w-1/3 sm:text-end font-semibold">
            <span class="font-semibold">$${maxBalance.maxAmount}</span>
        </div>
    `
    }

    const {maxMonthAmount, maxMonth, minMonthAmount, minMonth} = monthMaxAndMin()
    $(".maxProfitMonth").innerHTML = `
        <div class="sm:w-1/3 mb-2 sm:mb-0">
            <p class="font-semibold">Mes con mayor ganancia</p>
        </div>
        <div class="sm:w-1/3 sm:text-end">
            <span class="category">${maxMonth}</span>
        </div>
        <div class="sm:w-1/3 sm:text-end font-semibold">
            <span class="most-month-profit text-green-500 font-semibold">+$${maxMonthAmount}</span>
        </div>
    `

    $(".maxSpentMonth").innerHTML = `
        <div class="sm:w-1/3 mb-2 sm:mb-0">
            <p class="font-semibold">Mes con mayor gasto</p>
        </div>
        <div class="sm:w-1/3 sm:text-end">
            <span class="category">${minMonth}</span>
        </div>
        <div class="sm:w-1/3 sm:text-end font-semibold">
            <span class="most-month-profit text-red-500 font-semibold">-$${minMonthAmount}</span>
        </div>
    `
}

const enoughOperations = () => {
    const spentAndGain = []
    for (const operation of dataOperationsLocalStorage()) {
        const { type } = operation
        spentAndGain.push(type)
    }

    if (spentAndGain.includes("ganancia") && spentAndGain.includes("gasto")) {
        summaryReports()
        addAndRemoveHidden($(".operationsNotEnough"), $(".reportsTables"))
    } else {
        addAndRemoveHidden($(".reportsTables"), $(".operationsNotEnough"))
    }
}

// Evento onload

window.addEventListener("load", () => {
    generateCategories(categories)
    addCategory()
    selectCategoriesOperation()
    selectCategoriesFilter()
    filterDefaultDate()
    filterFunction()
    if (dataOperationsLocalStorage.length !== 0) {
        const filterByDate = filterDate(dataOperationsLocalStorage())
        addNewOperation(orderBy(filterByDate))
    }
    enoughOperations()
})


// Funciones de navegación

$navbarBurguer.addEventListener("click", () => {
    $navbarMenu.classList.remove("hidden")
    addAndRemoveHidden($navbarBurguer, $xmark)
})

$xmark.addEventListener("click", () => {
    $navbarMenu.classList.add("hidden")
    addAndRemoveHidden($xmark, $navbarBurguer)
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
    addAndRemoveHidden($newOperation, $mainContainer)
})

$cancelEditOperationBtn.addEventListener("click", () => {
    addAndRemoveHidden($editOperation, $mainContainer)
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
