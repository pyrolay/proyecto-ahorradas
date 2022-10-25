// Funciones de selectores
const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)


// Variables seccion categorias
const $categories = $(".categories")
const $btnEdit = $$(".btnEdit")
const $editCategory = $(".editCategory")
const $cancelEdit = $(".cancelEdit")
const $tableCategories = $(".tableCategories")
const $addCategories = $(".addCategories")
const $btnAddCategories = $(".btnAddCategories")



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
        localStorage.setItem("datos", JSON.stringify({categories}))

    }
}



const dataCategoriesLocalStorage = () => {return JSON.parse(localStorage.getItem("datos")).categories}



const addCategory = () => {
    $tableCategories.innerHTML = ""
    for (const category of dataCategoriesLocalStorage()) {
        const {id, name} = category
            $tableCategories.innerHTML += `
            <div class="flex mt-8">
                    <div class="sm:w-4/5 w-3/5">
                        <span class="bg-[#f8b6ce] px-2 py-1 rounded-md text-[#ab062d] text-xs">${name}</span>
                    </div>
                    <div class="text-blue-800 ml-2">
                        <a href="" class="btnEdit cursor-pointer hover:text-black text-xs" onlick=${id}>Editar</a>
                        <a href="" class="ml-4 cursor-pointer hover:text-black text-xs" onlick=${id}>Eliminar</a>
                    </div>
            </div>
        `
    
}}

addCategory()

console.log(dataCategoriesLocalStorage());

$btnAddCategories.addEventListener("click", (e) => {
    categoryNew()
    addCategory()
})

// Eventos de navegción interna de la página

for (const btnEdit of $btnEdit) {
    btnEdit.addEventListener("click", (e) => {
        e.preventDefault()
        $categories.classList.add("hidden")
        $editCategory.classList.remove("hidden")
    })
}

$cancelEdit.addEventListener("click", (e) => {
    $categories.classList.remove("hidden")
    $editCategory.classList.add("hidden")
})