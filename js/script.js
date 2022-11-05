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
            operationsEmptyOrNot()
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
    addNewOperation(dataOperationsLocalStorage())
    selectCategoriesOperation()
    selectCategoriesFilter()
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
    const arrCatgoriesLocal = dataCategoriesLocalStorage()
    const arrOperationLocal = dataOperationsLocalStorage()
    for (const { category } of arrOperationLocal) {
        if (!arrCatgoriesLocal.includes(id) && category === id) {
            return dataOperationsLocalStorage().filter(operation => operation.category !== category)
        }
    }
}

const removeCategory = (id) => {
    cleanCategories()
    generateCategories(filterCategory(id))
    addNewOperation(filterCategoryOperationRemove(id))
}


// Funciones que agregan las categorias a los selects de "Nueva operación" y "Filtros"

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
        <span class="bg-[#f8b6ce] px-2 py-1 rounded-md text-[#ab062d] text-xs">${nameCategory(category)}</span>
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
            filterFunction()
        })
    }

    for (const btn of btnRemove) {
        const operationId = btn.getAttribute("data-id")
        btn.addEventListener("click", () => {
            addNewOperation(filterOperation(operationId))
            removeOperationLocal(operationId)
            operationsEmptyOrNot()
            filterFunction()
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


// Funciones para editar operaciones

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
    const localData = JSON.parse(localStorage.getItem("datos"))
    const chosenOperation = findOperation(id)
    const operations = dataOperationsLocalStorage()
    for (const operation of operations) {
        if (chosenOperation.id === operation.id) {
            operation.id = id
            operation.description = $("#editDescription").value
            operation.amount = $("#editAmount").value
            operation.type = $("#editSelectType").value
            operation.category = $("#editSelectCategory").value
            const dateSplit = $("#editDate").value.split("-")
            const dateReverse = dateSplit.reverse()
            const dateJoin = dateReverse.join("/")
            operation.date = dateJoin
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
    $newOperation.classList.add("hidden")
    $mainContainer.classList.remove("hidden")
})

$editOperationBtn.addEventListener("click", () => {
    const operationId = $editOperationBtn.getAttribute("data-id")
    editOperationLocal(operationId)
    filterFunction(dataOperationsLocalStorage())
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
            $(".balanceProfit").innerText = `+$0`
            $(".balanceSpent").innerText = `-$0`
            $(".balanceTotal").innerText = `$0`
            return array = []
        }
    }
}

// Filtro category

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
            $(".balanceProfit").innerText = `+$0`
            $(".balanceSpent").innerText = `-$0`
            $(".balanceTotal").innerText = `$0`
            return array = []
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
    const dateInput = parseInt(($dayFilter.value).split("-").join(""))
    return array.filter(operation => {
        const dateOperation = parseInt((operation.date).split("/").reverse().join(""))
        if (dateOperation >= dateInput) {
            return operation
        }
    })
}

// Ordenar

const orderBy = (array) => {
    const changeDate = (sort) => parseInt((sort.date).split("/").reverse().join(""))

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
    const arrOfOperations = dataOperationsLocalStorage()
    const filteredTypeArr = filterType(arrOfOperations)
    const filteredCategoryArr = categoryFilter(filteredTypeArr)
    const filteredDateArr = filterDate(filteredCategoryArr)
    if (filteredDateArr.length === 0) {
        $(".operations-empty").classList.remove("hidden")
        $(".operations-table").classList.add("hidden")
        $(".balanceProfit").innerText = `+$0`
        $(".balanceSpent").innerText = `-$0`
        $(".balanceTotal").innerText = `$0`
    } else {
        balanceFunction(filteredDateArr)
        addNewOperation(orderBy(filteredDateArr))
    }
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

// Función resumen

const filterByCategory = (category) => {
    return dataOperationsLocalStorage().filter(operation => operation.category === category)
}


const filterByDate = (date) => {
    return dataOperationsLocalStorage().filter(operation => {
        const dateOperation = operation.date.slice(3).split("/").join("/")
        if (dateOperation === date) {
            return operation
        }
    })

}

const getSpent = (array) => {
    // return el gasto total a partir de un array de operaciones
    let spent = 0
    for (const operation of array) {
        if (operation.type === "gasto") {
            spent += parseInt(operation.amount)
        }
    } return spent
}


const getEarnings = (array) => {
    // return ganancia total a partir de un array de operaciones
    let profit = 0
    for (const operation of array) {
        if (operation.type === "ganancia") {
            profit += parseInt(operation.amount)
        }
    } return profit
}


const getBalance = (array) => {
    // return el balance total a partir de un array de operaciones
    return total = getEarnings(array) - getSpent(array)
}


const objetoCategories = (propiedad, callback) => {
    const arrCategories = []
    const objCategories = {}
    for (const operation of dataOperationsLocalStorage()) {
            if (!arrCategories.includes(operation[propiedad])) {
                if(propiedad === "date"){
                    const sliceValue = operation[propiedad].slice(3).split("/").join("/") 
                    arrCategories.push(sliceValue) 
                } else  arrCategories.push(operation[propiedad])
            }
    }
    for (const arr of arrCategories) {
        const objBalance = {
            gasto: getSpent(callback(arr)),
            ganancia: getEarnings(callback(arr)),
            balance: getBalance(callback(arr))
        }
        objCategories[arr] = objBalance

    } return objCategories
}

const categoriesTotalBalance = objetoCategories("category", filterByCategory)
const dateTotalBalance = objetoCategories("date", filterByDate)

const symbolBalance = (balance) => {
    if (balance < 0) {
        const totalSlice = balance.toString().slice(1)
        return `-$${totalSlice}`
    } else {
        return `$${balance}`
    }
}

const tableReports = () => {
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
tableReports()

const categoryMaxEarnings = () => {
    let maxAmount = 0
    let maxCategory
    for (const obj of Object.keys(categoriesTotalBalance)) {
        const {ganancia} = categoriesTotalBalance[obj]
        if (ganancia > maxAmount) {
            maxAmount = ganancia
            maxCategory = obj
        }
    } return  {maxAmount, maxCategory}
}

const categoryMaxSpent = () => {
    let maxSpentAmount = 0
    let maxSpent
    for (const obj of Object.keys(categoriesTotalBalance)) {
        const {gasto} = categoriesTotalBalance[obj]
        if (gasto > maxSpentAmount) {
            maxSpentAmount = gasto
            maxSpent = obj
        }
    } return  {maxSpentAmount, maxSpent}
}

const categoryMaxBalance = () => {
    let maxBalanceAmount = 0
    let maxBalance
    for (const obj of Object.keys(categoriesTotalBalance)) {
        const {balance} = categoriesTotalBalance[obj]
        if (balance > maxBalanceAmount) {
            maxBalanceAmount = balance
            maxBalance = obj
        }
    } return  {maxBalanceAmount, maxBalance}
}

const monthMaxAndMin = () => {
    let maxMonthAmount = 0
    let minMonthAmount = 0
    let maxMonth
    let minMonth
    for (const obj of Object.keys(dateTotalBalance)) {
        const {ganancia,gasto} = dateTotalBalance[obj]
        if (ganancia > maxMonthAmount) {
            maxMonthAmount = ganancia
            maxMonth = obj
        }
        if (gasto > maxMonthAmount) {
            minMonthAmount = gasto
            minMonth = obj
        }
    } return  {maxMonthAmount, maxMonth, minMonthAmount, minMonth}
}


const summaryReports = () => {
    const {maxAmount, maxCategory} = categoryMaxEarnings() 
    $(".categoryMaxProfit").innerHTML += `
        <div class="sm:w-1/3 sm:text-end">
            <span class="bg-[#f8b6ce] px-2 py-1 rounded-md text-[#ab062d] text-xs font-bold"">${nameCategory(maxCategory)}</span>
        </div>
        <div class="sm:w-1/3 sm:text-end font-semibold">
            <span class="text-green-500 font-semibold">+$${maxAmount}</span>
        </div>`
    const {maxSpentAmount, maxSpent} = categoryMaxSpent()
    $(".categoryMaxSpent").innerHTML += `
        <div class="sm:w-1/3 sm:text-end">
            <span class="bg-[#f8b6ce] px-2 py-1 rounded-md text-[#ab062d] text-xs font-bold">${nameCategory(maxSpent)}</span>
        </div>
        <div class="sm:w-1/3 sm:text-end font-semibold">
            <span class="text-red-500 font-semibold">-$${maxSpentAmount}</span>
        </div>`
    const {maxBalanceAmount, maxBalance} = categoryMaxBalance()
        $(".categoryMaxBalance").innerHTML += `
        <div class="sm:w-1/3 sm:text-end">
            <span class="bg-[#f8b6ce] px-2 py-1 rounded-md text-[#ab062d] text-xs font-bold">${nameCategory(maxBalance)}</span>
        </div>
        <div class="sm:w-1/3 sm:text-end font-semibold">
            <span class="font-semibold">$${maxBalanceAmount}</span>
        </div>
    `
    const {maxMonthAmount, maxMonth, minMonthAmount, minMonth} = monthMaxAndMin()
    $(".maxProfitMonth").innerHTML += `
        <div class="sm:w-1/3 sm:text-end">
            <span class="category">${maxMonth}</span>
        </div>
        <div class="sm:w-1/3 sm:text-end font-semibold">
            <span class="most-month-profit text-green-500 font-semibold">+$${maxMonthAmount}</span>
        </div>
    `
    $(".maxSpentMonth").innerHTML += `
        <div class="sm:w-1/3 sm:text-end">
            <span class="category">${minMonth}</span>
        </div>
        <div class="sm:w-1/3 sm:text-end font-semibold">
            <span class="most-month-profit text-red-500 font-semibold">-$${minMonthAmount}</span>
        </div>
    `
}

summaryReports()
// Evento onload

window.addEventListener("load", () => {
    generateCategories(categories)
    addCategory()
    selectCategoriesOperation()
    selectCategoriesFilter()
    filterDefaultDate()
    filterFunction()
    const filterByDate = filterDate(dataOperationsLocalStorage())
    addNewOperation(orderBy(filterByDate))
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
