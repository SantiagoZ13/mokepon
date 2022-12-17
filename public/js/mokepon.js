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

let enemysMokepons = []
let playerId = null
let enemyId = null
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
let inputMiu
let inputSquirtle
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
let canvas = map.getContext('2d')
let interval

let messageMissionBelow = new Image
messageMissionBelow.src = './assets/messageBelow.png'

let pressEnter = false
let pressSpace = false
let initialMap = true
let houseInside = false
let forestAdove = false
let forestBelow = false

let mapBackground = new Image()
mapBackground.src = './assets/mokemap.jpg'
let desiredHeight
let widthMap = window.innerWidth - 20
const widthMax = 750

if(widthMap > widthMax){
    widthMap = widthMax - 20
}

desiredHeight = widthMap * 350 / 700
map.width = widthMap
map.height = desiredHeight

class Mokepon{
    constructor(name, image, life, mapImage, width = 60, height = 60, id = null){
        this.id = id
        this.name = name
        this.image = image
        this.life = life
        this.attacks = []
        this.width = width
        this.height = height
        this.x = generateRandomNumber(0, map.width - this.width)
        this.y = generateRandomNumber(0, map.height - this.height)
        this.imageInMap = new Image()
        this.imageInMap.src = mapImage
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
let miu = new Mokepon('Miu', './assets/miu.png', 10, './assets/miuMap.png')
let squirtle = new Mokepon('Squirtle', './assets/squirtle.png', 7, './assets/squirtleMap.png')

const fistyAttacks = [
    { name: 'Water 💧', id: 'water-attack' },
    { name: 'Water 💧', id: 'water-attack' },
    { name: 'Water 💧', id: 'water-attack' },
    { name: 'Fire 🔥', id: 'fire-attack' },
    { name: 'Ground 🌱', id: 'ground-attack'}
]
fisty.attacks.push(...fistyAttacks)

const goratAttacks = [
    { name: 'Fire 🔥', id: 'fire-attack' },
    { name: 'Fire 🔥', id: 'fire-attack' },
    { name: 'Fire 🔥', id: 'fire-attack' },
    { name: 'Water 💧', id: 'water-attack' },
    { name: 'Ground 🌱', id: 'ground-attack' }
]
gorat.attacks.push(...goratAttacks)

const esmelAttacks = [
    { name: 'Ground 🌱', id: 'ground-attack' },
    { name: 'Ground 🌱', id: 'ground-attack' },
    { name: 'Ground 🌱', id: 'ground-attack' },
    { name: 'Fire 🔥', id: 'fire-attack' },
    { name: 'Water 💧', id: 'water-attack' }
]
esmel.attacks.push(...esmelAttacks)

const zeroxAttacks = [
    { name: 'Water 💧', id: 'water-attack' },
    { name: 'Water 💧', id: 'water-attack' },
    { name: 'Fire 🔥', id: 'fire-attack' },
    { name: 'Fire 🔥', id: 'fire-attack' },
    { name: 'Ground 🌱', id: 'ground-attack' }
]
zerox.attacks.push(...zeroxAttacks)

const rasfasAttacks = [
    { name: 'Water 💧', id: 'water-attack' },
    { name: 'Water 💧', id: 'water-attack' },
    { name: 'Ground 🌱', id: 'ground-attack' },
    { name: 'Ground 🌱', id: 'ground-attack' },
    { name: 'Fire 🔥', id: 'fire-attack' }
]
rasfas.attacks.push(...rasfasAttacks)

const sesbosAttack = [
    { name: 'Fire 🔥', id: 'fire-attack' },
    { name: 'Fire 🔥', id: 'fire-attack' },
    { name: 'Ground 🌱', id: 'ground-attack' },
    { name: 'Ground 🌱', id: 'ground-attack' },
    { name: 'Water 💧', id: 'water-attack' }
]
sesbos.attacks.push(...sesbosAttack)

const squirtleAttacks = [
    { name: 'Water 💧', id: 'water-attack' },
    { name: 'Water 💧', id: 'water-attack' },
    { name: 'Fire 🔥', id: 'fire-attack' },
    { name: 'Ground 🌱', id: 'ground-attack'},
    { name: 'Ground 🌱', id: 'ground-attack'}
]
squirtle.attacks.push(...squirtleAttacks)

const miuAttacks = [
    { name: 'Water 💧', id: 'water-attack' },
    { name: 'Fire 🔥', id: 'fire-attack' },
    { name: 'Fire 🔥', id: 'fire-attack' },
    { name: 'Ground 🌱', id: 'ground-attack'},
    { name: 'Ground 🌱', id: 'ground-attack'}
]
miu.attacks.push(...miuAttacks)


mokepons.push(fisty, gorat, esmel, zerox, rasfas, sesbos, miu, squirtle)

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
        inputFisty = document.getElementById('Fisty')
        inputGorat = document.getElementById('Gorat')
        inputEsmel = document.getElementById('Esmel')
        inputZerox = document.getElementById('Zerox')
        inputRasfas = document.getElementById('Rasfas')
        inputSesbos = document.getElementById('Sesbos')
        inputMiu = document.getElementById('Miu')
        inputSquirtle = document.getElementById('Squirtle')
    })

    btnMokeponSelection.addEventListener('click', mokeponSelect)
    btnRestart.addEventListener('click', restartGame)

    joinGame()
}

const joinGame = () =>{
    fetch('http://192.168.0.13:8080/join')
        .then(function (res){
            if(res.ok){
                res.text()
                    .then(function(result){
                        console.log(result)
                        playerId = result
                    })
            }
        })
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
    }else if(inputMiu.checked){
        playerMokeponName.innerHTML = inputMiu.id
        playerMokepon = inputMiu.id
        showSections()
    }else if(inputSquirtle.checked){
        playerMokeponName.innerHTML = inputSquirtle.id
        playerMokepon = inputSquirtle.id
        showSections()
    }else{
        alert('Selecciona una mascota')
        return
    }

    selectMokeponBackend(playerMokepon)

    buscarAtaques(playerMokepon)
}

const showSections = () => {
    
    mokeponSelectionContainer.style.display = 'none'
    mapContainer.style.display = 'flex'
    
    initMap()
}

const selectMokeponBackend = (playerMokepon) =>{
    fetch(`http://192.168.0.13:8080/mokepon/${playerId}`, {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: playerMokepon
        })
    })
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
           if(playerAttack.length === 5){
            sendAttacks()
           }
        })
    })
}

const sendAttacks = ()=>{
    fetch(`http://192.168.0.13:8080/mokepon/${playerId}/attacks`,{
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            attacks: playerAttack
        })
    })
    interval = setInterval(getEnemyAttacks, 50)
}

const getEnemyAttacks = () =>{
    fetch(`http://192.168.0.13:8080/mokepon/${enemyId}/attacks`)
    .then(function (res){
        if(res.ok){
            res.json()
            .then(function({ attacks }){
                if(attacks.length === 5){
                    botAttackSequence = attacks
                    combat(playerAttack, botAttackSequence)
                }
            })
        }
    })
}

const generateEnemyMokepon = (enemy) => {
    randomMokepon.innerHTML = enemy.name
    botAttacks = enemy.attacks
}

const generateRandomAttack = () => {
    let randomAttack = generateRandomNumber(0, botAttacks.length)
    if(mokepons[0] || mokepons[1] || mokepons[2]){
        if(randomAttack == 0 || randomAttack == 1  || randomAttack == 2){
            botAttackSequence.push(botAttacks[0].name)
        }else if(randomAttack == 3){
            botAttackSequence.push(botAttacks[3].name)
        }else{
            botAttackSequence.push(botAttacks[4].name)
        }
    }else{
        if(randomAttack == 0 || randomAttack == 1  ){
            botAttackSequence.push(botAttacks[0].name)
        }else if(randomAttack == 2 || randomAttack == 3){
            botAttackSequence.push(botAttacks[2].name)
        }else{
            botAttackSequence.push(botAttacks[4].name)
        }
    }
    
    console.log(botAttackSequence)
    initBattle()
}

const initBattle = () => {
    if(playerAttack.length === 5){
        combat(playerAttack, botAttackSequence)
    }
}

const guardarVariables = (index) =>{
    playerAttackSelected = playerAttack[index]
    botAttackSelected = botAttackSequence[index]
}

const combat = (arrayPlayer, arrayBot) =>{
        clearInterval(interval)
        for(let i = 0; i < playerAttack.length; i++){
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
        }
        evaluateWin()
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
    mokeponSelected.x += mokeponSelected.speedX
    mokeponSelected.y += mokeponSelected.speedY
    canvas.clearRect(0, 0, map.width, map.height)
    canvas.drawImage(mapBackground, 0, 0, map.width, map.height)
    mokeponSelected.paintMokepon()

    sendPosition(mokeponSelected.x, mokeponSelected.y)
    enemysMokepons.forEach(function (mokepon){
        mokepon.paintMokepon()
        checkCollision(mokepon)
    })
    
    if(mokeponSelect.speedX !== 0 || mokeponSelected.speedY !== 0 ){
        validateActionChangeMap()
    }
    
}

const sendPosition = (x, y)=>{
    fetch(`http://192.168.0.13:8080/mokepon/${playerId}/position`,{
        method: 'post',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            x, 
            y
        })
    })
    .then(function (res){
        if(res.ok){
            res.json()
            .then(function ({ enemys }){
                console.log(enemys)
                
                enemysMokepons = enemys.map((function(enemy){
                    let enemyMokepon = null
                    const mokeponName = enemy.mokepon.name || ''
                    if(mokeponName === 'Fisty'){
                        enemyMokepon = new Mokepon('Fisty', './assets/fisty.png', 3, './assets/fistyMap.png',60 ,60, enemy.id)
                    }else if(mokeponName === 'Gorat'){
                        enemyMokepon = new Mokepon('Gorat', './assets/Gorat.png', 3, './assets/goratMap.png',60 ,60, enemy.id)        
                    }else if(mokeponName === 'Esmel'){
                        enemyMokepon = new Mokepon('Esmel', './assets/esmel.png', 3, './assets/esmelMap.png',60 ,60, enemy.id)
                    }else if(mokeponName === 'Zerox'){
                        enemyMokepon = new Mokepon('Zerox', './assets/zerox.png', 5, './assets/zeroxMap.png', 80,60, enemy.id)
                    }else if(mokeponName === 'Rasfas'){
                        enemyMokepon = new Mokepon('Rasfas', './assets/rasfas.png', 5, './assets/rasfasMap1.png', 80, 60, enemy.id)
                    }else if(mokeponName === 'Sesbos'){
                        enemyMokepon = new Mokepon('Sesbos', './assets/sesbos.png', 5, './assets/sesbosMap.png',60,60, enemy.id)
                    }else if(mokeponName === 'Miu'){
                        enemyMokepon = new Mokepon('Miu', './assets/miu.png', 10, './assets/miuMap.png',60,60, enemy.id)
                    }else if(mokeponName === 'Squirtle'){
                        enemyMokepon = new Mokepon('Squirtle', './assets/squirtle.png', 10, './assets/squirtleMap.png',60,60, enemy.id)
                    }
                    enemyMokepon.x = enemy.x || 0
                    enemyMokepon.y = enemy.y || 0
                    
                    return enemyMokepon
                }))
            })
        }
    })
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
        case 'Enter':
            pressEnter = true
            break;
        case ' ':
            pressSpace = true
            break;
        default:
            break;
    }
}
const initMap = () =>{
    mokeponSelected = getSelectedMokepon()
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

const checkCollision = (enemy) =>{
    const upPet = mokeponSelected.y+20
    const downPet = mokeponSelected.y + mokeponSelected.height-20
    const leftPet = mokeponSelected.x +20
    const rightPet = mokeponSelected.x + mokeponSelected.width-20

    const upEnemy = enemy.y
    const downEnemy = enemy.y + enemy.height
    const leftEnemy = enemy.x
    const rightEnemy = enemy.x + enemy.width

    if(downPet < upEnemy || upPet > downEnemy || rightPet < leftEnemy || leftPet > rightEnemy){
        return
    }

    stopMotion()
    clearInterval(interval)
    enemyId = enemy.id
    generateEnemyMokepon(enemy)
    mapContainer.style.display = 'none'
    attackSelectionContainer.style.display = 'grid'
    optionsContainer.hidden = false
}

const validateActionChangeMap = () =>{
    if(initialMap){
        if((mokeponSelected.x > ((map.width/2)-120) && mokeponSelected.x < ((map.width/2-60))) && (mokeponSelected.y > ((map.height/2)-30) && mokeponSelected.y < (map.height/2)+30) && pressEnter){
            changeMap('./assets/secretmap.png', ((map.width/2)+17), 10)
            houseInside = true
            initialMap = false
        }else if(mokeponSelected.y < 0 && mokeponSelected.x > ((map.width/2)+60) && mokeponSelected.x < map.width-60){
            changeMap('./assets/mokemap2.jpg', mokeponSelected.x, (map.height-60))
            forestAdove = true
            initialMap = false
        }else if(mokeponSelected.y > map.height-60 && mokeponSelected.x > ((map.width/2)-180) && mokeponSelected.x < map.width-400){
            changeMap('./assets/mokemap4.jpg', mokeponSelected.x, 0)
            forestBelow = true
            initialMap = false
        }else{
            mapLimit()
        }
    }else if(houseInside){
        if(mokeponSelected.y < 0 && mokeponSelected.x > (map.width/2) && mokeponSelected.x < (map.width/2)+60){
            changeMap('./assets/mokemap.jpg', (map.width/2-80), ((map.height/2)-15))
            initialMap = true
            houseInside = false
        }else{
            mapLimit()
        }
        pressEnter = false
    }else if(forestAdove){
        if(mokeponSelected.y > map.height-60 && mokeponSelected.x > 0 && mokeponSelected.x < map.width){
            changeMap('./assets/mokemap.jpg', mokeponSelected.x, 0)
            initialMap = true
            forestAdove = false
        }else{
            mapLimit()
        }
    }else if(forestBelow){
        if(mokeponSelected.y > (map.height/2-60) && mokeponSelected.y < (map.height/2+60) && mokeponSelected.x > (map.width/2-60) && mokeponSelected.x < (map.width/2+60)){
            canvas.drawImage(messageMissionBelow, (map.width/2+20),(map.height/4), 150,150);
            if(pressSpace){
                messageMissionBelow.src = './assets/messageBelow2.png'
                pressSpace = false
            }
        }else if(mokeponSelected.y < 0 && mokeponSelected.x > 0 && mokeponSelected.x < map.width){
            changeMap('./assets/mokemap.jpg', mokeponSelected.x, (map.height-60))
            initialMap = true
            forestBelow = false
        }else{
            mapLimit()
        }
    }
}

const mapLimit = () =>{
    if(mokeponSelected.x < 0){
        mokeponSelected.x = 0
    }else if(mokeponSelected.x > map.width-60){
        mokeponSelected.x = map.width-60
    }else if(mokeponSelected.y < 0){
        mokeponSelected.y = 0
    }else if(mokeponSelected.y > map.height-60){
        mokeponSelected.y = map.height-60
    }
}

const changeMap = (mapImage, x, y) => {
    mapBackground.src = mapImage
    mokeponSelected.x = x 
    mokeponSelected.y = y
}

window.addEventListener('load', initializeGame)
