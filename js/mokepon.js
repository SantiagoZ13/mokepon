const btnMokeponSelection = document.getElementById("btn-mokepon-selection")
const playerMokeponName = document.getElementById('player-mokepon-name')
const mokeponSelectionContainer = document.getElementById('mokepon-selection')
const attackSelectionContainer = document.getElementById('attack-selection')
const optionsContainer = document.getElementById('options')
const randomMokepon = document.getElementById('bot-mokepon-name')
const spanPlayerLives = document.getElementById('player-lives')
const spanBotLives = document.getElementById('bot-lives')
const messageSectionPlayer = document.getElementById('message-attack-player')
const messageSectionBot = document.getElementById('message-attack-bot')
const cardsContainer = document.getElementById('cards-container')
const attackContainer = document.getElementById('attack-container')
const btnRestart = document.getElementById("btn-restart")

let buttons = []
let playerAttack = []
let botAttack
let result
let mokeponStructure
let inputFisty
let inputGorat
let inputEsmel
let inputZerox
let inputRasfas
let inputSesbos
let playerLives = 3
let botLives = 3
let mokepons = []
let btnFire
let btnGround
let btnWater
let playerMokepon
let mokeponAttacks

class Mokepon{
    constructor(name, image, life){
        this.name = name
        this.image = image
        this.life = life
        this.attacks = []
    }
}

let fisty = new Mokepon('Fisty', './assets/fisty.png', 3)
let gorat = new Mokepon('Gorat', './assets/Gorat.png', 3)
let esmel = new Mokepon('Esmel', './assets/esmel.png', 3)
let zerox = new Mokepon('Zerox', './assets/zerox.png', 5)
let rasfas = new Mokepon('Rasfas', './assets/rasfas.png', 5)
let sesbos = new Mokepon('Sesbos', './assets/sesbos.png', 5)

fisty.attacks.push(
    { nombre: 'Agua 💧', id: 'water-attack' },
    { nombre: 'Agua 💧', id: 'water-attack' },
    { nombre: 'Agua 💧', id: 'water-attack' },
    { nombre: 'Fuego 🔥', id: 'fire-attack' },
    { nombre: 'Tierra 🌱', id: 'ground-attack'}
)
gorat.attacks.push(
    { nombre: 'Fuego 🔥', id: 'fire-attack' },
    { nombre: 'Fuego 🔥', id: 'fire-attack' },
    { nombre: 'Fuego 🔥', id: 'fire-attack' },
    { nombre: 'Agua 💧', id: 'water-attack' },
    { nombre: 'Tierra 🌱', id: 'ground-attack' }
)
esmel.attacks.push(
    { nombre: 'Tierra 🌱', id: 'ground-attack' },
    { nombre: 'Tierra 🌱', id: 'ground-attack' },
    { nombre: 'Tierra 🌱', id: 'ground-attack' },
    { nombre: 'Fuego 🔥', id: 'fire-attack' },
    { nombre: 'Agua 💧', id: 'water-attack' }
)
zerox.attacks.push(
    { nombre: 'Agua 💧', id: 'water-attack' },
    { nombre: 'Agua 💧', id: 'water-attack' },
    { nombre: 'Fuego 🔥', id: 'fire-attack' },
    { nombre: 'Fuego 🔥', id: 'fire-attack' },
    { nombre: 'Tierra 🌱', id: 'ground-attack' }
)
rasfas.attacks.push(
    { nombre: 'Agua 💧', id: 'water-attack' },
    { nombre: 'Agua 💧', id: 'water-attack' },
    { nombre: 'Tierra 🌱', id: 'ground-attack' },
    { nombre: 'Tierra 🌱', id: 'ground-attack' },
    { nombre: 'Fuego 🔥', id: 'fire-attack' }
)
sesbos.attacks.push(
    { nombre: 'Fuego 🔥', id: 'fire-attack' },
    { nombre: 'Fuego 🔥', id: 'fire-attack' },
    { nombre: 'Tierra 🌱', id: 'ground-attack' },
    { nombre: 'Tierra 🌱', id: 'ground-attack' },
    { nombre: 'Agua 💧', id: 'water-attack' }
)

mokepons.push(fisty, gorat, esmel, zerox, rasfas, sesbos)

const initializeGame = () => {
    mokepons.forEach((mokepon) =>{
        mokeponStructure = `
        <input name=${mokepon.name} type="radio" id=${mokepon.name}>
        <label class="card-mokepon" for=${mokepon.name}>
            <p>${mokepon.name}</p>
            <img src=${mokepon.image} alt="mokepon " + ${mokepon.name}>
        </label>
        `

        cardsContainer.innerHTML += mokeponStructure
    })

    inputFisty = document.getElementById('Fisty')
    inputGorat = document.getElementById('Gorat')
    inputEsmel = document.getElementById('Esmel')
    inputZerox = document.getElementById('Zerox')
    inputRasfas = document.getElementById('Rasfas')
    inputSesbos = document.getElementById('Sesbos')

    btnMokeponSelection.addEventListener('click', mascotaSelect)
    btnRestart.addEventListener('click', restartGame)
    
}

const mascotaSelect = () => {
    if(inputFisty.checked){
        playerMokeponName.innerHTML = inputFisty.id
        showSections()
        playerMokepon = inputFisty.id
    }else if(inputGorat.checked){
        playerMokeponName.innerHTML = inputGorat.id
        showSections()
        playerMokepon = inputGorat.id
    }else if(inputEsmel.checked){
        playerMokeponName.innerHTML = inputEsmel.id
        showSections()
        playerMokepon = inputEsmel.id
    }else if(inputZerox.checked){
        playerMokeponName.innerHTML = inputZerox.id
        showSections()
        playerMokepon = inputZerox.id
    }else if(inputRasfas.checked){
        playerMokeponName.innerHTML = inputRasfas.id
        showSections()
        playerMokepon = inputRasfas.id
    }else if(inputSesbos.checked){
        playerMokeponName.innerHTML = inputSesbos.id
        showSections()
        playerMokepon = inputSesbos.id
    }else{
        alert('Selecciona una mascota')
    }

    generateRandomMokepon()

    buscarAtaques(playerMokepon)
}

function buscarAtaques(playerMokepon){
    // Implementar los ataques del enemigo
    let attacksPlayer
    for (let i = 0; i < mokepons.length; i++) {
        if (playerMokepon == mokepons[i].name){
            attacksPlayer = mokepons[i].attacks
            
        }   
    }
    showAttacks(attacksPlayer)
    
}

function showAttacks(attacks){
    attacks.forEach((attack) =>{
        mokeponAttacks = `
        <button id="${attack.id}" class="btn ${attack.id} attack-btn" >${attack.nombre}</button>
        `
        attackContainer.innerHTML += mokeponAttacks
    })
    buttons = document.querySelectorAll('.attack-btn')

    console.log(buttons)

    btnWater = document.getElementById('water-attack')
    btnFire = document.getElementById('fire-attack')
    btnGround = document.getElementById('ground-attack')
    attackSequence()
}

const attackSequence = () =>{  
    buttons.forEach((boton) =>{
        boton.addEventListener('click', (e) =>{   
           if(e.target.textContent === 'Agua 💧'){
            playerAttack.push("AGUA")
            console.log(playerAttack)
            boton.style.background = '#616f79' 
           } else if(e.target.textContent === 'Fuego 🔥'){
            playerAttack.push("FUEGO")
            console.log(playerAttack)
            boton.style.background = '#616f79' 
           } else{
            playerAttack.push("TIERRA")
            console.log(playerAttack)
            boton.style.background = '#616f79'  
           }
        })
    })
}

const showSections = () => {
    mokeponSelectionContainer.style.display = 'none'
    attackSelectionContainer.style.display = 'grid'
    optionsContainer.hidden = false
}

const generateRandomMokepon = () => {
    let randomNumber = generateRandomNumber(0, mokepons.length -1)
    randomMokepon.innerHTML = mokepons[randomNumber].name
}

const waterAttack = () =>{
    playerAttack = 'Water 💧'
    generateRandomAttack()
}
const fireAttack = () =>{
    playerAttack = 'Fire 🔥'
    generateRandomAttack()
}
const groundAttack = () =>{
    playerAttack = 'Ground 🌱'
    generateRandomAttack()
}

const generateRandomAttack = () => {
    let randomNumber = generateRandomNumber(1, 3)
    if(randomNumber == 1){
        botAttack = 'Water 💧'
    }else if(randomNumber == 2){
        botAttack = 'Fire 🔥'
    }else if(randomNumber == 3){
        botAttack = 'Ground 🌱'
    }else{

    }
    combat()
}

const combat = () =>{
    if(playerAttack == botAttack){
    }
    else if ((playerAttack == 'Water 💧' && botAttack == 'Fire 🔥') || (playerAttack == 'Fire 🔥' && botAttack == 'Ground 🌱') || (playerAttack == 'Ground 🌱' && botAttack == 'Water 💧')){
        botLives--
        spanBotLives.innerHTML = botLives
    }else{
        playerLives--
        spanPlayerLives.innerHTML = playerLives
    }
    figthMessage()
    evaluateWin()
}

const figthMessage = () =>{
    let messagePlayer = document.createElement('p')
    let messageBot = document.createElement('p')
    messagePlayer.innerHTML = `${playerAttack}  `
    messageBot.innerHTML = `${botAttack}`
    messageSectionPlayer.appendChild(messagePlayer)
    messageSectionBot.appendChild(messageBot)
}

const finalMessage = () =>{
    let messageResult = document.createElement('p')
    messageResult.innerHTML = `${result}`
    let messageSectionResult = document.getElementById('result')
    messageSectionResult.appendChild(messageResult)
}

const evaluateWin = () =>{
    if(playerLives < 1){
        result = 'Perdiste <br> ----Vuelve a intentarlo----'
        finalMessage()
        disableButtons()
    }else if(botLives < 1){
        result = "🏆 Ganaste 🏆 <br> ----¡Bien Hecho!----"
        finalMessage()
        disableButtons()
    }
    
}

const disableButtons = () =>{
    btnWater.disabled = true
    btnFire.disabled = true
    btnGround.disabled = true
}

const restartGame = () =>{
    location.reload()
}

const generateRandomNumber = (min, max) => {
    let randomNumber = Math.floor(Math.random() * (max - min + 1) + min)
    return randomNumber
}

window.addEventListener('load', initializeGame)