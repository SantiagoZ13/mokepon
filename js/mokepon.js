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
const mapContainer = document.getElementById('map-section')
const map = document.getElementById('map')

let botAttacks = []
let buttons = []
let playerAttack = []
let botAttackSequence = []
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
let playerVictories = 0
let botVictories = 0
let mokepons = []
let btnFire
let btnGround
let btnWater
let playerMokepon
let mokeponAttacks
let randomMokeponSelection
let playerAttackSelected
let botAttackSelected
let i = 0
let canvas = map.getContext('2d')
let interval

class Mokepon{
    constructor(name, image, life){
        this.name = name
        this.image = image
        this.life = life
        this.attacks = []
        this.x = 20
        this.y = 40
        this.width = 80
        this.height = 80
        this.imageInMap = new Image()
        this.imageInMap.src = image
        this.speedX = 0
        this.speedY = 0
    }
}

let fisty = new Mokepon('Fisty', './assets/fisty.png', 3)
let gorat = new Mokepon('Gorat', './assets/Gorat.png', 3)
let esmel = new Mokepon('Esmel', './assets/esmel.png', 3)
let zerox = new Mokepon('Zerox', './assets/zerox.png', 5)
let rasfas = new Mokepon('Rasfas', './assets/rasfas.png', 5)
let sesbos = new Mokepon('Sesbos', './assets/sesbos.png', 5)

fisty.attacks.push(
    { name: 'Water 💧', id: 'water-attack' },
    { name: 'Water 💧', id: 'water-attack' },
    { name: 'Water 💧', id: 'water-attack' },
    { name: 'Fire 🔥', id: 'fire-attack' },
    { name: 'Ground 🌱', id: 'ground-attack'}
)
gorat.attacks.push(
    { name: 'Fire 🔥', id: 'fire-attack' },
    { name: 'Fire 🔥', id: 'fire-attack' },
    { name: 'Fire 🔥', id: 'fire-attack' },
    { name: 'Water 💧', id: 'water-attack' },
    { name: 'Ground 🌱', id: 'ground-attack' }
)
esmel.attacks.push(
    { name: 'Ground 🌱', id: 'ground-attack' },
    { name: 'Ground 🌱', id: 'ground-attack' },
    { name: 'Ground 🌱', id: 'ground-attack' },
    { name: 'Fire 🔥', id: 'fire-attack' },
    { name: 'Water 💧', id: 'water-attack' }
)
zerox.attacks.push(
    { name: 'Water 💧', id: 'water-attack' },
    { name: 'Water 💧', id: 'water-attack' },
    { name: 'Fire 🔥', id: 'fire-attack' },
    { name: 'Fire 🔥', id: 'fire-attack' },
    { name: 'Ground 🌱', id: 'ground-attack' }
)
rasfas.attacks.push(
    { name: 'Water 💧', id: 'water-attack' },
    { name: 'Water 💧', id: 'water-attack' },
    { name: 'Ground 🌱', id: 'ground-attack' },
    { name: 'Ground 🌱', id: 'ground-attack' },
    { name: 'Fire 🔥', id: 'fire-attack' }
)
sesbos.attacks.push(
    { name: 'Fire 🔥', id: 'fire-attack' },
    { name: 'Fire 🔥', id: 'fire-attack' },
    { name: 'Ground 🌱', id: 'ground-attack' },
    { name: 'Ground 🌱', id: 'ground-attack' },
    { name: 'Water 💧', id: 'water-attack' }
)

mokepons.push(fisty, gorat, esmel, zerox, rasfas, sesbos)

const initializeGame = () => {

    mapContainer.style.display = 'none'
    attackSelectionContainer.style.display = 'none'

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

const showSections = () => {
    mokeponSelectionContainer.style.display = 'none'
    mapContainer.style.display = 'flex'
    
    //attackSelectionContainer.style.display = 'flex'
    optionsContainer.hidden = false
    intervalo = setInterval(paintMokepon, 40)
}

function buscarAtaques(playerMokepon){
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
        <button id="${attack.id}" class="btn ${attack.id} attack-btn" >${attack.name}</button>
        `
        attackContainer.innerHTML += mokeponAttacks
    })
    buttons = document.querySelectorAll('.attack-btn')

    btnWater = document.getElementById('water-attack')
    btnFire = document.getElementById('fire-attack')
    btnGround = document.getElementById('ground-attack')
    attackSequence()
}

const attackSequence = () =>{  
    buttons.forEach((boton) =>{
        boton.addEventListener('click', (e) =>{   
           if(e.target.textContent === 'Water 💧'){
            playerAttack.push("Water 💧")
            console.log(playerAttack)
            boton.classList.remove('water-attack')
            boton.classList.add('btn-usado')
            boton.disabled = true
           } else if(e.target.textContent === 'Fire 🔥'){
            playerAttack.push("Fire 🔥")
            console.log(playerAttack)
            boton.classList.remove('fire-attack')
            boton.classList.add('btn-usado')
            boton.disabled = true
           } else{
            playerAttack.push("Ground 🌱")
            console.log(playerAttack)
            boton.classList.remove('ground-attack')
            boton.classList.add('btn-usado')
            boton.disabled = true
           }
           generateRandomAttack()
        })
    })
}

const generateRandomMokepon = () => {
    randomMokeponSelection = generateRandomNumber(0, mokepons.length -1)
    randomMokepon.innerHTML = mokepons[randomMokeponSelection].name
    botAttacks = mokepons[randomMokeponSelection].attacks
}

const generateRandomAttack = () => {
    let randomAttack = generateRandomNumber(0, botAttacks.length -1)
    if(mokepons[0] || mokepons[1] || mokepons[2]){
        if(randomAttack == 0 || randomAttack == 1  || randomAttack == 2){
            botAttackSequence.push(mokepons[randomMokeponSelection].attacks[0].name)
        }else if(randomAttack == 3){
            botAttackSequence.push(mokepons[randomMokeponSelection].attacks[3].name)
        }else{
            botAttackSequence.push(mokepons[randomMokeponSelection].attacks[4].name)
        }
    }else{
        if(randomAttack == 0 || randomAttack == 1  ){
            botAttackSequence.push(mokepons[randomMokeponSelection].attacks[0].name)
        }else if(randomAttack == 2 || randomAttack == 3){
            botAttackSequence.push(mokepons[randomMokeponSelection].attacks[2].name)
        }else{
            botAttackSequence.push(mokepons[randomMokeponSelection].attacks[4].name)
        }
    }
    
    console.log(botAttackSequence)
    combat(playerAttack, botAttackSequence)
}

const guardarVariables = (index) =>{
    playerAttackSelected = playerAttack[index]
    botAttackSelected = botAttackSequence[index]
}

const combat = (arrayPlayer, arrayBot) =>{
    
        if (arrayPlayer[i] === arrayBot[i]) {
            guardarVariables(i)
            figthMessage()
        }else if((arrayPlayer[i] === 'Water 💧' && arrayBot[i] === 'Fire 🔥') || (arrayPlayer[i] === 'Fire 🔥' && arrayBot[i] === 'Ground 🌱') || (arrayPlayer[i] === 'Ground 🌱' && arrayBot[i] === 'Water 💧')){
            guardarVariables(i)
            figthMessage()
            playerVictories++
            spanPlayerLives.innerHTML = playerVictories
        }else{
            guardarVariables(i)
            figthMessage()
            botVictories++
            spanBotLives.innerHTML = botVictories
        }
        i++

        if (arrayPlayer.length == 5) {
            evaluateWin()        
        }
    
}

const figthMessage = () =>{     
    let messagePlayer = document.createElement('p')
    let messageBot = document.createElement('p')
    messagePlayer.innerHTML = `${playerAttackSelected}`
    messageBot.innerHTML = `${botAttackSelected}`
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
    if(playerVictories === botVictories){
        result = 'Empate <br> ----Vuelve a intentarlo----'
        finalMessage()
    }else if(playerVictories > botVictories){
        result = "🏆 Ganaste 🏆 <br> ----¡Bien Hecho!----"
        finalMessage()
    }else{
        result = 'Perdiste <br> ----Vuelve a intentarlo----'
        finalMessage()
    }
    
}

const restartGame = () =>{
    location.reload()
}

const generateRandomNumber = (min, max) => {
    let randomNumber = Math.floor(Math.random() * (max - min + 1) + min)
    return randomNumber
}
const paintMokepon = () =>{
    esmel.x = esmel.x + esmel.speedX
    esmel.y = esmel.y + esmel.speedY
    canvas.clearRect(0, 0, map.width, map.height)
    canvas.drawImage(esmel.imageInMap, esmel.x, esmel.y, esmel.width, esmel.height)
}

const moveUp = () =>{
    esmel.speedY = -4
}
const moveLeft = () =>{
    esmel.speedX = -4
}
const moveRight = () =>{
    esmel.speedX = 4
}
const moveDown = () =>{
    esmel.speedY = 4
}
const stopMotion = () =>{
    esmel.speedX = 0
    esmel.speedY = 0
}

window.addEventListener('load', initializeGame)