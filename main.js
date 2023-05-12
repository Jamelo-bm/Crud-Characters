// Pega o conteúdo do banco de personagens em String, transforma em JSON.
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_characters')) ?? []

// Recebe o novo banco de personagens, transformando-o em String e enviando para o LocalStorage
const setLocalStorage = (dbCharacters) => localStorage.setItem("db_characters", JSON.stringify(dbCharacters))

// Analisa se o formulário foi corretamente preenchido e validado, retornando TRUE caso sim.
const validFields = () => {
    return document.getElementById("cadastrar").reportValidity()
}

const clearFields = () => {
    const fields = document.querySelectorAll('.fields') 
    fields.forEach(field => field.value = "")
}

const closeModal = () => {
    const button = document.getElementById('close')
    button.click()
}

const createCard = (character) => {
    const container = document.querySelector('#cards>div')
    
    const newCard = document.createElement('div');
    newCard.classList.add('card', 'mx-3', 'my-3', 'text-primary', 'btn-card', 'shadow');
    newCard.style.width = '20rem';
    newCard.innerHTML =
    `
    <div>
        <img src="assets/Padrão.jpg" class="img-fluid rounded shadow" style="margin-top: 12px;" alt="Personagem">
        <div class="card-body">
            <h4 class="card-title">${character.nome}</h4>
            <p>${character.raça} ${character.classe}</p>
        </div>
    </div>
    `
    container.appendChild(newCard)
}

const clearCards = () => {
    const cards = document.querySelectorAll('#cards>div>div');
    cards.forEach(card => card.remove());
}

const updateCards = () => {
    // Armazena todos os personagens na variável dbCharacters.
    dbCharacters = readCharacters()

    // Limpa os Cards para evitar repetições.
    clearCards()

    // Para todos os personagens, se chama a função CreateCard.
    dbCharacters.forEach(createCard)
}

// === CRUD - Create, Read, Update, Delete === \\

// Create =======================================
    const createCharacter = (character) => {

        // chama a função getLocalStorage para armazenar na variável dbCharacters.
        const dbCharacters = getLocalStorage()

        // Acrescenta mais um "character" no banco de personagens. Esse novo character é recebido na função createCharacter.
        dbCharacters.push(character)

        // chama a função setLocalStorage, enviando o banco de personagens atualizado com um novo personagem.
        setLocalStorage(dbCharacters)
    }

// Read =========================================
    const readCharacters = () => getLocalStorage()

// Update =======================================
    const updateCharacter = (index, character) => {

        // chama a função de Read, que chama a função getLocalStorage.
        const dbCharacters = readCharacters()

        // um novo personagem será armazenado na posição do index do personagem que será substituído.
        dbCharacters[index] = character

        // chama a função setLocalStorage, enviando o banco de personagens atualizado com um novo personagem que substitui um antigo. 
        setLocalStorage(dbCharacters)
    } 

// Delete =======================================
    const deleteCharacter = (index) => {

        // chama a função de Read, que chama a função getLocalStorage.
        const dbCharacters = readCharacters()

        // deleta um personagem na posição do index.
        dbCharacters.splice(index, 1)

        // chama a função setLocalStorage, enviando o banco de personagens atualizado sem o personagem deletado. 
        setLocalStorage(dbCharacters)
    }

// === Interação com o Usuário === \\

updateCards()

const saveCharacter = () => {

    // Se os campos estiverem corretamente preenchidos e validados, cadastra um novo personagem.
    if (validFields()){
        const character = {
            nome: document.getElementById('nome').value,
            raça: document.getElementById('raça').value,
            classe: document.getElementById('classe').value,
            história: document.getElementById('história').value,
            imagem: document.getElementById('imagem').value,
        }
        createCharacter(character)
        console.log("Personagem cadastrado.")

        clearFields()
        closeModal()
        updateCards()

    }

}

// === Eventos === \\

// Identifica quanco ocorre um click para salvar um novo personagem, chamando a função de salvar as informações do novo personagem.
document.getElementById("salvar")
    .addEventListener("click", saveCharacter)

// Identifica quando ocoore um click para fechar o formulário de novo personagem, apagando todas as informações presentes nos inputs, enquanto fecha.
document.getElementById("close")
    .addEventListener("click", clearFields)