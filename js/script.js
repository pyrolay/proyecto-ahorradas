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
const $cancelNewOperation = $(".cancelNewOperation")
const $addNewOperation = $(".addNewOperation")
const $date = $("#date")

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

let idValue = generateId()

// Funciones: Objeto de nueva operación

const operations = []

const getValuesOfNewOperations = () => {
    operations.push(
        { id: generateId(),
        descripcion: $("#description").value,
        monto: $("#amount").value,
        tipo: expenseOrProfit(),
        categoria: $("#selectCategory").value,
        fecha: formatDate()
    })
}

const expenseOrProfit = () => {
    if ($("#type").value === "1") {
        return "gasto"
    } else return "ganancia"
}

const date = () => {
    const date = new Date()
    $date.valueAsDate = date
    return date
}

const formatDate = () => {
    const date = $date.value
    const newDate = date.split("-").reverse().join("/")
    return newDate
}

$addNewOperation.addEventListener("click", (e) => {
    e.preventDefault()
    getValuesOfNewOperations()
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


$cancelNewOperation.addEventListener("click", () => {
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