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

// Variables seccion operaciones
const $mainContainer = $(".mainContainer")
const $filters = $(".filters")
const $btnHideFilters = $(".btnHideFilters")
const $btnOperation = $(".btnOperation")
const $newOperation = $(".newOperation")
const $cancelNewOperation = $(".cancelNewOperation")
const newOperationArray = [$("#description"), $("#amount"), $("#type"), $("#category"), $("#date")]

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
        btn.addEventListener("click", () => categoryEdit(categoryId))
    }
    for (const btn of btnRemove) {
        const categoryId = btn.getAttribute("data-id")
        btn.addEventListener("click", () => {
            removeCategory(categoryId)
            removeCategoryLocal(categoryId)
        })

    }
}

generateCategories(categories)



const data = { categories }

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
        localStorage.setItem("datos", JSON.stringify({ categories }))

    }
}



const dataCategoriesLocalStorage = () => { return JSON.parse(localStorage.getItem("datos")).categories }




const addCategory = () => {
    $tableCategories.innerHTML = ""
    generateCategories(dataCategoriesLocalStorage())
}


addCategory()


$btnAddCategories.addEventListener("click", (e) => {
    categoryNew()
    addCategory()
    $formAddCategories.reset()
})

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

// Eventos editar y eliminar

const findCategory = (id) => {
    return dataCategoriesLocalStorage().find(category => category.id == id)
}

const editCategoriesLocal = (id) => {
    const chosenCategory = findCategory(id)
    const categories = dataCategoriesLocalStorage()
    for (const category of categories) {
        if (chosenCategory.id === category.id) {
            category.name = $inputEditCategory.value
            localStorage.setItem("datos", JSON.stringify({ categories }))

        }

    } localStorage.setItem("datos", JSON.stringify({ categories }))
}


const removeCategoryLocal = (id) => {
    const categories = filterCategory(id)
    localStorage.setItem("datos", JSON.stringify({ categories }))
}


const cleanCategories = () => $tableCategories.innerHTML = ""

const categoryEdit = (id) => {
    cleanCategories()
    $categoriesContainer.classList.add("hidden")
    $editCategory.classList.remove("hidden")
    const chosenCategory = findCategory(id)
    $inputEditCategory.value = chosenCategory.name
    $editCategoryBtn.setAttribute("data-id", id)
    $cancelEditBtn.setAttribute("data-id", id)

}

$cancelEditBtn.addEventListener("click", () => {
    $editCategory.classList.add("hidden")
    $categoriesContainer.classList.remove("hidden")
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
    $categoriesContainer.classList.remove("hidden")
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