// Functions of selectors
const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)

// Variables links navbar
const $linkNavbar_balance = $(".linkNavbar_balance")
const $linkNavbar_categories = $(".linkNavbar_categories")
const $linkNavbar_reports = $(".linkNavbar_reports")

const $linkNavBarBurger_balance = $(".linkNavbarBurger_balance")
const $linkNavbarBurger_categories = $(".linkNavbarBurger_categories")
const $linkNavbarBurger_reports = $(".linkNavbarBurger_reports")

// Variables navbar responsive
const $navbarBurguer = $(".navbarBurguer")
const $navbarMenu = $(".navbarMenu")
const $xmark = $(".xmark")

// Variables name sections
const $mainContainer = $(".mainContainer")
const $categories = $(".categories")
const $reports = $(".reports")

// Variables section balance
const $balanceProfit = $(".balanceProfit")
const $balanceLoss = $(".balanceLoss")
const $balanceTotal = $(".balanceTotal")

// Variables section filters
const $typeFilter = $("#type")
const $filters = $(".filters")
const $categoryFilter = $(".categoryFilter")
const $dayFilter = $(".dayFilter")
const $orderBy = $("#order-by")

// Variables section operations
const $btnHideFilters = $(".btnHideFilters")
const $btnFormNewOperation = $(".btnFormNewOperation")
const $sectionNewOperation = $(".sectionNewOperation")
const $editOperationSection = $(".editOperationSection")
const $editOperationBtn = $(".editOperationBtn")
const $cancelEditOperationBtn = $(".cancelEditOperationBtn")
const $addNewOperationBtn = $(".addNewOperationBtn")
const $cancelNewOperationBtn = $(".cancelNewOperationBtn")
const $categorySelectNewOperation = $(".categorySelectNewOperation")
const $editSelectCategory = $("#editSelectCategory")

// Variables section categories
const $editCategory = $(".editCategory")
const $cancelEditCategoryBtn = $(".cancelEditBtn")
const $editCategoryBtn = $(".editCategoryBtn")
const $tableCategories = $(".tableCategories")
const $addCategoriesInput = $(".addCategoriesInput")
const $btnAddCategories = $(".btnAddCategories")
const $editCategoryInput = $(".editCategoryInput")
const $formAddCategories = $(".formAddCategories")

// Variables section reports
const $tableCategoriesReports = $(".tableCategoriesReports")
const $tableMonthReports = $(".tableMonthReports")
const $categoryMaxProfit = $(".categoryMaxProfit")
const $categoryMaxLoss = $(".categoryMaxLoss")
const $categoryMaxBalance = $(".categoryMaxBalance")
const $maxProfitMonth = $(".maxProfitMonth")
const $maxLossMonth = $(".maxLossMonth")

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
    }
    return `${arrayOne.join("")}-${arrayTwo.join("")}`
}

// Global Helper Functions

const filter = (array, propiedad, valor) => { return array.filter(obj => obj[propiedad] !== valor) }
const find = (array, propiedad, valor) => { return array.find(obj => obj[propiedad] == valor) }

const setItemLocalStorage = (storage) => localStorage.setItem("storage", JSON.stringify(storage))
const getItemLocalStorage = () => JSON.parse(localStorage.getItem("storage"))

const cleanContainer = (selector) => selector.innerHTML = ""

const operationsEmptyOrNot = () => {
    const operation = dataLocalStorage("operations")
    if (operation.length !== 0) addAndRemoveHidden($(".operations-empty"), $(".operations-table"))
    else addAndRemoveHidden($(".operations-table"), $(".operations-empty"))
}

const addAndRemoveHidden = (add, remove) => {
    add.classList.add("hidden")
    remove.classList.remove("hidden")
}

const emptyOperationsAndBalance = () => {
    addAndRemoveHidden($(".operations-table"), $(".operations-empty"))
    $balanceProfit.innerText = `+$0`
    $balanceLoss.innerText = `-$0`
    $balanceTotal.innerText = `$0`
}

// Objects of categories and operations

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

// LocalStorage Data

const data = { categories, operations }

if (!localStorage.getItem("storage")) {
    setItemLocalStorage(data)
}

const dataCategoriesLocalStorage = () => { return JSON.parse(localStorage.getItem("storage")).categories }
const dataOperationsLocalStorage = () => { return JSON.parse(localStorage.getItem("storage")).operations }
const dataLocalStorage = (key) => { return JSON.parse(localStorage.getItem("storage"))[key] }

// Section Categories
// Functions 

//Add Categories
const categoryAddLocalStorage = () => {
    const name = $addCategoriesInput.value.charAt(0).toUpperCase() + $addCategoriesInput.value.slice(1)
    const id = generateId()
    const categories = dataLocalStorage("categories")
    categories.push({ id, name })
    const localData = getItemLocalStorage()
    const storage = { ...localData, categories: categories }
    setItemLocalStorage(storage)
}

const categoryAddAlert = () => {
    if ($addCategoriesInput.value === "") {
        return alert(`Por favor ingrese el nombre de la categoría que desea agregar`)
    }
    else if ($addCategoriesInput.value.length > 20) {
        return alert(`Ingrese un nombre de categoría mas corto`)
    }
    else {
        categoryAddLocalStorage()
    }
}

const addCategoryToTable = () => {
    cleanContainer($tableCategories)
    generateCategories(dataLocalStorage("categories"))
}

// Edit Categories

const editCategoriesLocal = (id) => {
    const localData = getItemLocalStorage()
    const chosenCategory = find(dataLocalStorage("categories"), "id", id)
    const categories = dataLocalStorage("categories")
    for (const category of categories) {
        if (chosenCategory.id === category.id) {
            category.name = $editCategoryInput.value
            const storage = { ...localData, categories: categories }
            setItemLocalStorage(storage)
        }
    }
    const storage = { ...localData, categories: categories }
    setItemLocalStorage(storage)
}


const showFormCategoryEdit = (id) => {
    cleanContainer($tableCategories)
    addAndRemoveHidden($categories, $editCategory)
    const chosenCategory = find(dataLocalStorage("categories"), "id", id)
    $editCategoryInput.value = chosenCategory.name
    $editCategoryBtn.setAttribute("data-id", id)
    $cancelEditCategoryBtn.setAttribute("data-id", id)
}

const saveCategory = (id) => {
    return {
        id: id,
        name: $editCategoryInput.value
    }
}

const editCategoryDom = (id) => {
    return dataLocalStorage("categories").map(category => {
        if (category.id === id) {
            return saveCategory(id)
        }
        return category
    })
}

// Remove categories

const removeCategoryLocal = (id) => {
    const localData = getItemLocalStorage()
    const storage = { ...localData, categories: filter(dataLocalStorage("categories"), "id", id), operations: operationRemoveByFilterCategory(id) }
    setItemLocalStorage(storage)
}

const operationRemoveByFilterCategory = (id) => {
    const arrCategoriesLocal = dataLocalStorage("categories")
    let arrOperationLocal = dataLocalStorage("operations")
    if (arrOperationLocal.length !== 0) {
        for (const { category } of arrOperationLocal) {
            if (!arrCategoriesLocal.includes(id) && category === id) {
                arrOperationLocal = dataLocalStorage("operations").filter(operation => operation.category !== category)
                return arrOperationLocal
            }
        }
    }
    return arrOperationLocal
}

const removeCategory = (id) => {
    cleanContainer($tableCategories)
    generateCategories(filter(dataLocalStorage("categories"), "id", id))
    const filteredByRemovedCategory = operationRemoveByFilterCategory(id)
    if (filteredByRemovedCategory.length !== 0) addNewOperation(filteredByRemovedCategory)
}

// Functions for events

const functionsEventsAddCategories = () => {
    categoryAddAlert()
    addCategoryToTable()
    selectCategories()
    $formAddCategories.reset()
    enoughOperations()
}

const functionsEventsEditCategories = () => {
    const categoryId = $editCategoryBtn.getAttribute("data-id")
    addAndRemoveHidden($editCategory, $categories)
    generateCategories(editCategoryDom(categoryId))
    editCategoriesLocal(categoryId)
    addNewOperation(dataLocalStorage("operations"))
    selectCategories()
    enoughOperations()
}


// DOM

const nameCategory = (category) => {
    for (const { id, name } of dataLocalStorage("categories")) {
        if (category === id) {
            return category = name
        }
    }
}

const selectCategories = () => {
    cleanContainer($categorySelectNewOperation)
    cleanContainer($editSelectCategory)
    cleanContainer($categoryFilter)
    $categoryFilter.innerHTML = `<option value="Todas">Todas</option>`
    for (const { name, id } of dataLocalStorage("categories")) {
        $categorySelectNewOperation.innerHTML += `<option value="${id}">${name}</option>`
        $editSelectCategory.innerHTML += `<option value="${id}">${name}</option>`
        $categoryFilter.innerHTML += `<option value="${id}">${name}</option>`
    }
}
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
            <button class="btnRemove ml-4 max-[300px]:ml-0 cursor-pointer hover:text-black text-xs" data-id="${id}">Eliminar</button>
        </div>
        `
        $tableCategories.append(div)
    }

    const btnEdit = $$(".btnEdit")
    const btnRemove = $$(".btnRemove")

    for (const btn of btnEdit) {
        const categoryId = btn.getAttribute("data-id")
        btn.addEventListener("click", () => {
            showFormCategoryEdit(categoryId)
        })
    }

    for (const btn of btnRemove) {
        const categoryId = btn.getAttribute("data-id")
        btn.addEventListener("click", () => {
            removeCategory(categoryId)
            removeCategoryLocal(categoryId)
            selectCategories()
            operationsEmptyOrNot()
            enoughOperations()
            balanceFunction(dataLocalStorage("operations"))
        })
    }
}


// Events categories

$btnAddCategories.addEventListener("click", (e) => {
    e.preventDefault()
    functionsEventsAddCategories()
})

$addCategoriesInput.addEventListener("keypress", (e) => {
    if (e.keyCode == "13") {
        e.preventDefault()
        functionsEventsAddCategories()
    }
})

$cancelEditCategoryBtn.addEventListener("click", (e) => {
    e.preventDefault()
    addAndRemoveHidden($editCategory, $categories)
    generateCategories(dataLocalStorage("categories"))
})

$editCategoryBtn.addEventListener("click", (e) => {
    e.preventDefault()
    functionsEventsEditCategories()
})

$editCategoryInput.addEventListener("keypress", (e) => {
    if (e.keyCode == "13") {
        e.preventDefault()
        functionsEventsEditCategories()
    }
})


// Section Operations
// Functions

// New Operation

const newOperationEmpty = () => {
    $("#description").value = ""
    $("#amount").value = ""
    $("#selectType").value = "gasto"
    $("#selectCategory").selectedIndex = 0;
    $("#date").valueAsDate = new Date()
}

const ifAmountInputIsNegative = (amountInput) => {
    if (amountInput.value < 0) return Math.abs(amountInput.value)
    else return amountInput.value
}

const saveNewOperation = () => {
    const id = generateId()
    const description = $("#description").value.charAt(0).toUpperCase() + $("#description").value.slice(1)
    const amount = ifAmountInputIsNegative($("#amount"))
    const type = $("#selectType").value
    const category = $("#selectCategory").value
    const date = changeFormatDateLocalStorage($("#date"))
    operations.push({ id, description, amount, type, category, date })
    if (localStorage.getItem("storage")) {
        const operations = dataLocalStorage("operations")
        operations.push({ id, description, amount, type, category, date })
        const localData = getItemLocalStorage()
        const storage = { ...localData, operations: operations }
        setItemLocalStorage(storage)
    }
}

const changeFormatDateLocalStorage = (dateInput) => {
    const date = new Date(dateInput.value)
    const getDate = [date.getUTCMonth() + 1, date.getUTCDate(), date.getUTCFullYear()]
    const newDate = getDate.join("-")
    return newDate
}

// Edit Operation

const editOperation = (id) => {
    addAndRemoveHidden($mainContainer, $editOperationSection)
    const chosenOperation = find(dataLocalStorage("operations"), "id", id)
    $("#editDescription").value = chosenOperation.description
    $("#editAmount").value = chosenOperation.amount
    $("#editSelectType").value = chosenOperation.type
    $("#editDate").valueAsDate = new Date(chosenOperation.date)
    $("#editSelectCategory").value = chosenOperation.category
    $editOperationBtn.setAttribute("data-id", id)
    $cancelEditOperationBtn.setAttribute("data-id", id)
}

const editOperationLocal = (id) => {
    const localData = getItemLocalStorage()
    const chosenOperation = find(dataLocalStorage("operations"), "id", id)
    const operations = dataLocalStorage("operations")
    for (const operation of operations) {
        if (chosenOperation.id === operation.id) {
            operation.id = id
            operation.description = $("#editDescription").value.charAt(0).toUpperCase() + $("#editDescription").value.slice(1)
            operation.amount = ifAmountInputIsNegative($("#editAmount"))
            operation.type = $("#editSelectType").value
            operation.category = $("#editSelectCategory").value
            operation.date = changeFormatDateLocalStorage($("#editDate"))
            const storage = { ...localData, operations: operations }
            setItemLocalStorage(storage)
        }
    }
    const storage = { ...localData, operations: operations }
    setItemLocalStorage(storage)
}

// Remove operation

const removeOperationLocal = (id) => {
    const localData = getItemLocalStorage()
    const storage = { ...localData, operations: filter(dataLocalStorage("operations"), "id", id) }
    setItemLocalStorage(storage)
}

// DOM


const operationAlert = (description, amount) => {
    if (description.value === "") {
        return alert(`Por favor ingrese una descripción`)
    }
    else if (amount.value === "") {
        return alert(`Ingrese un valor`)
    }
    else {
        return true
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
    }
    else return `<p class="text-green-500">+$${amount}</p>`
}

const addNewOperation = (data) => {
    cleanContainer($(".tableBody"))
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
            trResponsive.innerHTML += `
            <th class="w-20 sm:w-56  max-[300px]:text-sm">
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
            <th class="sm:ml-5 ml-4 mt-1 truncate">
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
                addNewOperation(filter(dataLocalStorage("operations"), "id", operationId))
                operationsEmptyOrNot()
                filterFunction()
                enoughOperations()
            })
        }
    }
    else emptyOperationsAndBalance()
}

// Events operations

$addNewOperationBtn.addEventListener("click", (e) => {
    e.preventDefault()
    if (operationAlert($("#description"), $("#amount"))) {
        saveNewOperation()
        filterFunction(dataLocalStorage("operations"))
        operationsEmptyOrNot()
        filterType(dataLocalStorage("operations"))
        enoughOperations()
        addAndRemoveHidden($sectionNewOperation, $mainContainer)
    }
})

$editOperationBtn.addEventListener("click", (e) => {
    e.preventDefault()
    const operationId = $editOperationBtn.getAttribute("data-id")
    if (operationAlert($("#editDescription"), $("#editAmount"))) {
        editOperationLocal(operationId)
        filterFunction(dataLocalStorage("operations"))
        enoughOperations()
        addAndRemoveHidden($editOperationSection, $mainContainer)
    }

})


// Section Filters and Balance
// Functions filters

const filterOperationByProp = (array, prop, input) => {
    return array.filter(operation => operation[prop] === input)
}

const filterType = (array) => {
    if (array.length !== 0) {
        for (const operation of array) {
            if ($typeFilter.value === operation.type) {
                addAndRemoveHidden($(".operations-empty"), $(".operations-table"))
                array = filterOperationByProp(array, "type", $typeFilter.value)
                return categoryFilter(array)
            }
            else if ($typeFilter.value === "todos") {
                addAndRemoveHidden($(".operations-empty"), $(".operations-table"))
                return categoryFilter(array)
            }

            if (filterOperationByProp(array, "type", $typeFilter.value).length === 0) {
                emptyOperationsAndBalance()
                return array = []
            }
        }
    }
    else emptyOperationsAndBalance()
}

const categoryFilter = (array) => {
    if (array.length !== 0) {
        for (const operation of array) {
            if ($categoryFilter.value === operation.category) {
                addAndRemoveHidden($(".operations-empty"), $(".operations-table"))
                array = filterOperationByProp(array, "category", $categoryFilter.value)
                return filterDate(array)
            }
            else if ($categoryFilter.value === "Todas") {
                addAndRemoveHidden($(".operations-empty"), $(".operations-table"))
                return filterDate(array)
            }

            if (filterOperationByProp(array, "category", $categoryFilter.value).length === 0) {
                emptyOperationsAndBalance()
                return array = []
            }
        }
    }
    else emptyOperationsAndBalance()
}

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
    }
    else emptyOperationsAndBalance()
}


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

const filterFunction = () => {
    let arrOfOperations = dataLocalStorage("operations")
    let operationsFiltered
    if (arrOfOperations.length !== 0) {
        operationsFiltered = filterType(arrOfOperations)
    }
    if (arrOfOperations.length !== 0 && operationsFiltered.length !== 0) {
        balanceFunction(operationsFiltered)
        addNewOperation(orderBy(filterType(operationsFiltered)))
    }
    else emptyOperationsAndBalance()
}

// Functions balance

const balanceFunction = (array) => {
    let spent = 0
    let profit = 0
    for (const operation of array) {
        if (operation.type === "ganancia") {
            profit += parseInt(operation.amount)
        }
        else spent += parseInt(operation.amount)
    }
    const total = profit - spent
    return balanceDom({ spent, profit, total })
}

const balanceDom = (objectBalance) => {
    const { spent, profit, total } = objectBalance
    $balanceProfit.innerText = `+$${profit}`
    $balanceLoss.innerText = `-$${spent}`
    if (total < 0) {
        const totalSlice = total.toString().slice(1)
        $balanceTotal.innerText = `-$${totalSlice}`
    }
    else {
        $balanceTotal.innerText = `$${total}`
    }
}

// Event filter

$filters.addEventListener("change", () => {
    filterFunction()
})

// Section reports
// Functions

const filterByCategory = (category) => {
    return dataLocalStorage("operations").filter(operation => operation.category === category)
}

const filterByDate = (date) => {
    return dataLocalStorage("operations").filter(operation => {
        const dateOperation = new Date(operation.date)
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
    }
    return spent
}

const getEarnings = (array) => {
    let profit = 0
    for (const operation of array) {
        if (operation.type === "ganancia") {
            profit += parseInt(operation.amount)
        }
    }
    return profit
}

const getBalance = (array) => {
    return total = getEarnings(array) - getSpent(array)
}

const objectCategories = (prop, callback) => {
    const categoriesOrDates = []
    const objCategoriesOrDates = {}
    for (const operation of dataLocalStorage("operations")) {
        if (!categoriesOrDates.includes(operation[prop])) {
            if (prop === "date") {
                const dateOperation = new Date(operation[prop])
                const monthAndYear = `${dateOperation.getMonth() + 1}/${dateOperation.getFullYear()}`
                categoriesOrDates.push(monthAndYear)
            }
            else categoriesOrDates.push(operation[prop])
        }
    }
    for (const item of categoriesOrDates) {
        const objBalance = {
            gasto: getSpent(callback(item)),
            ganancia: getEarnings(callback(item)),
            balance: getBalance(callback(item))
        }
        objCategoriesOrDates[item] = objBalance

    }
    return objCategoriesOrDates
}

let categoriesTotalBalance = objectCategories("category", filterByCategory)
let dateTotalBalance = objectCategories("date", filterByDate)

const totalBalanceChange = () => {
    categoriesTotalBalance = objectCategories("category", filterByCategory)
    dateTotalBalance = objectCategories("date", filterByDate)
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
    return { maxAmount, maxCategory }
}

const monthMaxAndMin = () => {
    let maxMonthAmount = 0
    let minMonthAmount = 0
    let maxMonth
    let minMonth
    for (const obj of Object.keys(dateTotalBalance)) {
        const { ganancia, gasto } = dateTotalBalance[obj]
        if (ganancia >= maxMonthAmount) {
            maxMonthAmount = ganancia
            maxMonth = obj
        }
        if (gasto >= minMonthAmount) {
            minMonthAmount = gasto
            minMonth = obj
        }
    }
    return { maxMonthAmount, maxMonth, minMonthAmount, minMonth }
}

// DOM

const enoughOperations = () => {
    const spentAndGain = []
    for (const operation of dataLocalStorage("operations")) {
        const { type } = operation
        spentAndGain.push(type)
    }

    if (spentAndGain.includes("ganancia") && spentAndGain.includes("gasto")) {
        summaryReports()
        addAndRemoveHidden($(".operationsNotEnough"), $(".reportsTables"))
    }
    else {
        addAndRemoveHidden($(".reportsTables"), $(".operationsNotEnough"))
    }
}

const symbolBalance = (balance) => {
    if (balance <= 0) {
        const totalSlice = balance.toString().slice(1)
        return `-$${totalSlice}`
    }
    else {
        return `$${balance}`
    }
}

const summaryReports = () => {
    totalBalanceChange()
    tableReports()

    const maxEarnings = categorySummary("ganancia")
    $categoryMaxProfit.innerHTML = `
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
    $categoryMaxLoss.innerHTML = `
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
    if (maxBalance.maxAmount === 0) $categoryMaxBalance.innerHTML = `
        <div class="sm:w-1/3 mb-2 sm:mb-0">
            <p class="font-semibold">No hay categoría con mayor balance</p>
        </div>
    `
    else {
        $categoryMaxBalance.innerHTML = `
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

    const { maxMonthAmount, maxMonth, minMonthAmount, minMonth } = monthMaxAndMin()
    $maxProfitMonth.innerHTML = `
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

    $maxLossMonth.innerHTML = `
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

const tableReports = () => {
    cleanContainer($tableCategoriesReports)
    cleanContainer($tableMonthReports)
    for (const obj of Object.keys(categoriesTotalBalance)) {
        const { ganancia, gasto, balance } = categoriesTotalBalance[obj]
        $tableCategoriesReports.innerHTML += `
            <tr class="w:full flex justify-between">
                <th class="font-medium">
                    <div class="w-20 lg:min-w-[9rem] mr-1 font-medium text-start">
                        <p class="sm:text-base text-sm">${nameCategory(obj)}</p>
                    </div>
                </th>
                <th class="text-green-500">
                    <div class="w-20 lg:min-w-[9rem] mr-1 font-medium text-end">
                        <p class="sm:text-base text-sm">+$${ganancia}</p>
                    </div>
                </th>
                <th class="text-red-500">
                    <div class="w-20 lg:min-w-[9rem] mr-1 font-medium text-end">
                        <p class="sm:text-base text-sm">-$${gasto}</p>
                    </div>
                </th>
                <th class="font-medium">
                    <div class="w-20 lg:min-w-[9rem] mr-1 font-medium text-end">
                        <p class="sm:text-base text-sm">${symbolBalance(balance)}</p>
                    </div>
                </th>
            </tr>
        `
    }
    for (const obj of Object.keys(dateTotalBalance)) {
        const { ganancia, gasto, balance } = dateTotalBalance[obj]
        $tableMonthReports.innerHTML += `
        <tr class="w:full flex justify-between">
            <th class="font-medium">
                <div class="w-20 lg:min-w-[9rem] mr-1 font-medium text-start">
                    <p class="sm:text-base text-sm">${obj}</p>
                </div>
            </th>
            <th class="text-green-500">
                <div class="w-20 lg:min-w-[9rem] mr-1 font-medium text-end">
                    <p class="sm:text-base text-sm">+$${ganancia}</p>
                </div>
            </th>
            <th class="text-red-500">
                <div class="w-20 lg:min-w-[9rem] mr-1 font-medium text-end">
                    <p class="sm:text-base text-sm">-$${gasto}</p>
                </div>
            </th>
            <th class="font-medium">
                <div class="w-20 lg:min-w-[9rem] mr-1 font-medium text-end">
                    <p class="sm:text-base text-sm">${symbolBalance(balance)}</p>
                </div>
            </th>
        </tr>
        `
    }
}



const restartWebAlert = () => {
    return confirm(`Está por eliminar todas las operaciones ingresadas hasta el momento ¿Desea continuar?`)

}

// Event

$(".restartWeb").addEventListener("click", (e) => {
    if (restartWebAlert()) {
        const operations = []
        const data = { categories, operations }
        if (localStorage.getItem("storage")) {
            setItemLocalStorage(data)
        }
        const arrayEmpty = []
        addNewOperation(arrayEmpty)
        cleanContainer($tableCategories)
        generateCategories(categories)
        selectCategories()
        enoughOperations()
    }
})

// Event OnLoad

window.addEventListener("load", () => {
    generateCategories(categories)
    addCategoryToTable()
    selectCategories()
    filterDefaultDate()
    filterFunction()
    if (dataLocalStorage("operations").length !== 0) {
        const filterByDate = filterDate(dataLocalStorage("operations"))
        addNewOperation(orderBy(filterByDate))
    }
    enoughOperations()
})


// Functions navigation

const navigationConditional = (e) => {
    if (e.target === e.currentTarget) {
        const tabName = e.target.name
        chooseTab(tabName)
    }
    else {
        if (e.target.parentElement.name) {
            const tabName = e.target.parentElement.name
            chooseTab(tabName)
        }
        else if (e.target.parentElement.parentElement.name) {
            const tabName = e.target.parentElement.parentElement.name
            chooseTab(tabName)
        }
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

const arrOfTabs = [$linkNavbar_balance, $linkNavbar_categories, $linkNavbar_reports, $btnFormNewOperation]

const arrOfTabsBurger = [$linkNavBarBurger_balance, $linkNavbarBurger_categories, $linkNavbarBurger_reports, $btnFormNewOperation]

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
        addCategoryToTable()
    })
}

for (const tab of arrOfTabsBurger) {
    tab.addEventListener("click", (e) => {
        e.preventDefault()
        $navbarMenu.classList.add("hidden")
        addAndRemoveHidden($xmark, $navbarBurguer)
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
        }
        else {
            tabId.classList.remove("hidden")
        }
    }
}

// Events navigation

$navbarBurguer.addEventListener("click", () => {
    $navbarMenu.classList.remove("hidden")
    addAndRemoveHidden($navbarBurguer, $xmark)
})

$xmark.addEventListener("click", () => {
    $navbarMenu.classList.add("hidden")
    addAndRemoveHidden($xmark, $navbarBurguer)
})

$cancelNewOperationBtn.addEventListener("click", (e) => {
    e.preventDefault()
    addAndRemoveHidden($sectionNewOperation, $mainContainer)
})

$cancelEditOperationBtn.addEventListener("click", (e) => {
    e.preventDefault()
    addAndRemoveHidden($editOperationSection, $mainContainer)
})

$btnHideFilters.addEventListener("click", () => {
    if ($btnHideFilters.textContent === "Mostrar filtros") {
        $filters.classList.remove("hidden")
        $btnHideFilters.textContent = "Ocultar filtros"
    }
    else {
        $filters.classList.add("hidden")
        $btnHideFilters.textContent = "Mostrar filtros"
    }
})