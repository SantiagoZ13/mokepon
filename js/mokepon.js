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

let mokeponSelected
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
let mapBackground = new Image()
mapBackground.src = './assets/mokemap.jpg'


class Mokepon{
    constructor(name, image, life, Mapimage, width = 60, height = 60, x = 10, y = 10){
        this.name = name
        this.image = image
        this.life = life
        this.attacks = []
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.imageInMap = new Image()
        this.imageInMap.src = Mapimage
        this.speedX = 0
        this.speedY = 0
    }
    paintMokepon(){
        canvas.drawImage(this.imageInMap, this.x, this.y, this.width, this.height)
    }
}

const generateRandomNumber = (min, max) => {
    let randomNumber = Math.floor(Math.random() * (max - min + 1) + min)
    return randomNumber
}

let fisty = new Mokepon('Fisty', './assets/fisty.png', 3, './assets/fistyMap.png')
let gorat = new Mokepon('Gorat', './assets/Gorat.png', 3, './assets/goratMap.png')
let esmel = new Mokepon('Esmel', './assets/esmel.png', 3, './assets/esmelMap.png')
let zerox = new Mokepon('Zerox', './assets/zerox.png', 5, './assets/zeroxMap.png', 80, 60)
let rasfas = new Mokepon('Rasfas', './assets/rasfas.png', 5, './assets/rasfasMap1.png', 80, 60)
let sesbos = new Mokepon('Sesbos', './assets/sesbos.png', 5, './assets/sesbosMap.png')

let fistyEnemy = new Mokepon('Fisty', './assets/fisty.png', 3, './assets/fistyMap.png',60 ,60 ,generateRandomNumber(20, 460), generateRandomNumber(20, 280))
let goratEnemy = new Mokepon('Gorat', './assets/Gorat.png', 3, './assets/goratMap.png',60 ,60,generateRandomNumber(20, 460), generateRandomNumber(20, 280))
let esmelEnemy = new Mokepon('Esmel', './assets/esmel.png', 3, './assets/esmelMap.png',60 ,60 ,generateRandomNumber(20, 460), generateRandomNumber(20, 280))
let zeroxEnemy = new Mokepon('Zerox', './assets/zerox.png', 5, './assets/zeroxMap.png', 80,60, generateRandomNumber(20, 460), generateRandomNumber(20, 280))
let rasfasEnemy = new Mokepon('Rasfas', './assets/rasfas.png', 5, './assets/rasfasMap1.png', 80, 60, generateRandomNumber(20, 460), generateRandomNumber(20, 280))
let sesbosEnemy = new Mokepon('Sesbos', './assets/sesbos.png', 5, './assets/sesbosMap.png',60,60, generateRandomNumber(20, 460), generateRandomNumber(20, 280))

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

    btnMokeponSelection.addEventListener('click', mokeponSelect)
    btnRestart.addEventListener('click', restartGame)
    
}

const mokeponSelect = () => {
    if(inputFisty.checked){
        playerMokeponName.innerHTML = inputFisty.id
        playerMokepon = inputFisty.id
        showSections()
    }else if(inputGorat.checked){
        playerMokeponName.innerHTML = inputGorat.id
        playerMokepon = inputGorat.id
        showSections()
    }else if(inputEsmel.checked){
        playerMokeponName.innerHTML = inputEsmel.id
        playerMokepon = inputEsmel.id
        showSections()
    }else if(inputZerox.checked){
        playerMokeponName.innerHTML = inputZerox.id
        playerMokepon = inputZerox.id
        showSections()
    }else if(inputRasfas.checked){
        playerMokeponName.innerHTML = inputRasfas.id
        playerMokepon = inputRasfas.id
        showSections()
    }else if(inputSesbos.checked){
        playerMokeponName.innerHTML = inputSesbos.id
        playerMokepon = inputSesbos.id
        showSections()
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
    initMap()
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

const paintCanvas = () =>{
    mokeponSelected.x = mokeponSelected.x + mokeponSelected.speedX
    mokeponSelected.y = mokeponSelected.y + mokeponSelected.speedY
    canvas.clearRect(0, 0, map.width, map.height)
    canvas.drawImage(mapBackground, 0, 0, map.width, map.height)
    mokeponSelected.paintMokepon()
    fistyEnemy.paintMokepon()
    goratEnemy.paintMokepon()
    esmelEnemy.paintMokepon()
    zeroxEnemy.paintMokepon()
    rasfasEnemy.paintMokepon()
    sesbosEnemy.paintMokepon()
}

const moveUp = () =>{
    mokeponSelected.speedY = -4
}
const moveLeft = () =>{
    mokeponSelected.speedX = -4
}
const moveRight = () =>{
    mokeponSelected.speedX = 4
}
const moveDown = () =>{
    mokeponSelected.speedY = 4
}

const stopMotion = () =>{
    mokeponSelected.speedX = 0
    mokeponSelected.speedY = 0
}

const keyPressed = (event) =>{
    switch (event.key) {
        case 'ArrowUp':
        case 'w':
            moveUp()
            break;
        case 'ArrowLeft':
        case 'a':
            moveLeft()
            break;
        case 'ArrowRight':
        case 'd':
            moveRight()
            break;
        case 'ArrowDown':
        case 's':
            moveDown()
            break;
        default:
            break;
    }
}
const initMap = () =>{
    mokeponSelected = getSelectedMokepon()
    map.width = 520
    map.height = 340
    interval = setInterval(paintCanvas, 40)
    window.addEventListener('keydown', keyPressed)
    window.addEventListener('keyup', stopMotion)
}

const getSelectedMokepon = () =>{
    for (let i = 0; i < mokepons.length; i++) {
        if (playerMokepon == mokepons[i].name){
            return mokepons[i]
        }   
    }
}

window.addEventListener('load', initializeGame)
