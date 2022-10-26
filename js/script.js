// Funciones de selectores
const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)


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
        id: 1,
        name: "Comida"
    },
    {
        id: 2,
        name: "Servicios"
    },
    {
        id: 3,
        name: "Salidas"
    },
    {
        id: 4,
        name: "Educación"
    },
    {
        id: 5,
        name: "Transporte"
    },
    {
        id: 6,
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
                        <button class="btnEdit cursor-pointer hover:text-black text-xs" onclick="categoryEdit(${id})">Editar</button>
                        <button class="btnRemove ml-4 cursor-pointer hover:text-black text-xs" onclick="removeCategory(${id})">Eliminar</button>
                    </div>
            </div>
        `
    })

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
        // pushear al array del localStorage
        const categories = dataCategoriesLocalStorage()
        categories.push({ id, name })
        localStorage.setItem("datos", JSON.stringify({ categories }))

    }
}



const dataCategoriesLocalStorage = () => { return JSON.parse(localStorage.getItem("datos")).categories }




const addCategory = () => {
    $tableCategories.innerHTML = ""
    for (const category of dataCategoriesLocalStorage()) {
        const { id, name } = category
        $tableCategories.innerHTML += `
            <div class="flex mt-8">
                    <div class="sm:w-4/5 w-3/5">
                        <span class="bg-[#f8b6ce] px-2 py-1 rounded-md text-[#ab062d] text-xs">${name}</span>
                    </div>
                    <div class="text-blue-800 ml-2">
                        <button class="btnEdit cursor-pointer hover:text-black text-xs" onclick="categoryEdit(${id})">Editar</button>
                        <button class="btnRemove ml-4 cursor-pointer hover:text-black text-xs" onclick="removeCategory(${id})">Eliminar</button>
                    </div>
            </div>
        `
    }
}

addCategory()



$btnAddCategories.addEventListener("click", (e) => {
    categoryNew()
    addCategory()
})

// Eventos editar y eliminar

const categoriesLocal = dataCategoriesLocalStorage()


const findCategory = (id) => {
    return categoriesLocal.find(category => category.id == parseInt(id))
}

const editCategoriesLocal = (id) => {
    const chosenCategory = findCategory(id)
    for (const category of categoriesLocal) {
        if (chosenCategory.id === category.id) {
            category.name = $inputEditCategory.value
            
            return categoriesLocal
        } 

    } localStorage.setItem("datos", JSON.stringify({ categoriesLocal }))
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
    generateCategories(categoriesLocal)

})

const saveCategory = (id) => {
    return {
        id: id,
        name: $inputEditCategory.value
    }
}



const editCategory = (id) => {
    return categoriesLocal.map(category => {
        if (category.id === parseInt(id)) {
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
})

const removeCategory2 = (id) => {
    return categoriesLocal.filter(category => category.id !== parseInt(id))

}

const removeCategory = (id) => {
    cleanCategories()
    generateCategories(removeCategory2(id))
}

