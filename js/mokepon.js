let playerAttack;
let botAttack;
let result;
let playerLives = 3;
let botLives = 3;

const initializeGame = () => {
    let btnMokepon = document.getElementById("btn-mokepon-selection");
    btnMokepon.addEventListener('click', mascotaSelect);

    let btnWater = document.getElementById('water-attack');
    let btnFire = document.getElementById('fire-attack');
    let btnGround = document.getElementById('ground-attack');
    btnWater.addEventListener('click', waterAttack);
    btnFire.addEventListener('click', fireAttack);
    btnGround.addEventListener('click', groundAttack);

    let btnRestart = document.getElementById("btn-restart");
    btnRestart.addEventListener('click', restartGame);
}

const showSections = () => {
    let mokeponSection = document.getElementById('mokepon-selection');
    mokeponSection.style.display = 'none';
    let attackSection = document.getElementById('attack-selection');
    attackSection.style.display = 'grid';
    let btnSection = document.getElementById('options');
    btnSection.hidden = false;
}

const mascotaSelect = () => {
    let inputFisty = document.getElementById('fisty');
    let inputGorat = document.getElementById('gorat');
    let inputEsmel = document.getElementById('esmel');
    let inputZerox = document.getElementById('zerox');
    let inputRasfas = document.getElementById('rasfas');
    let inputSesbos = document.getElementById('sesbos');
    let playerMokeponName = document.getElementById('player-mokepon-name');
    if(inputFisty.checked){
        playerMokeponName.innerHTML = 'fisty';
        showSections();
    }else if(inputGorat.checked){
        playerMokeponName.innerHTML = 'gorat';
        showSections();
    }else if(inputEsmel.checked){
        playerMokeponName.innerHTML = 'esmel';
        showSections();
    }else if(inputZerox.checked){
        playerMokeponName.innerHTML = 'zerox';
        showSections();
    }else if(inputRasfas.checked){
        playerMokeponName.innerHTML = 'rasfas';
        showSections();
    }else if(inputSesbos.checked){
        playerMokeponName.innerHTML = 'sesbos';
        showSections();
    }else{
        alert('Selecciona una mascota');
    }
    generateRandomMokepon();
}


const waterAttack = () =>{
    playerAttack = 'Water 💧';
    generateRandomAttack();
}
const fireAttack = () =>{
    playerAttack = 'Fire 🔥';
    generateRandomAttack();
}
const groundAttack = () =>{
    playerAttack = 'Ground 🌱';
    generateRandomAttack();
}

const generateRandomAttack = () => {
    let randomNumber = generateRandomNumber(1, 3);
    if(randomNumber == 1){
        botAttack = 'Water 💧';
    }else if(randomNumber == 2){
        botAttack = 'Fire 🔥';
    }else if(randomNumber == 3){
        botAttack = 'Ground 🌱';
    }else{

    }
    combat()
}

const combat = () =>{
    let spanPlayerLives = document.getElementById('player-lives');
    let spanBotLives = document.getElementById('bot-lives');

    if(playerAttack == botAttack){
    }
    else if ((playerAttack == 'Water 💧' && botAttack == 'Fire 🔥') || (playerAttack == 'Fire 🔥' && botAttack == 'Ground 🌱') || (playerAttack == 'Ground 🌱' && botAttack == 'Water 💧')){
        botLives--;
        spanBotLives.innerHTML = botLives;
    }else{
        playerLives--;
        spanPlayerLives.innerHTML = playerLives;
    }
    figthMessage();
    evaluateWin();
}

const figthMessage = () =>{
    let messagePlayer = document.createElement('p');
    let messageBot = document.createElement('p');
    messagePlayer.innerHTML = `${playerAttack}  `
    messageBot.innerHTML = `${botAttack}`

    

    let messageSectionPlayer = document.getElementById('message-attack-player');
    let messageSectionBot = document.getElementById('message-attack-bot');
    messageSectionPlayer.appendChild(messagePlayer)
    messageSectionBot.appendChild(messageBot);
    
}

const finalMessage = () =>{
    let messageResult = document.createElement('p')
    messageResult.innerHTML = `${result}`
    let messageSectionResult = document.getElementById('result')
    messageSectionResult.appendChild(messageResult)
}
const evaluateWin = () =>{
    if(playerLives < 1){
        result = 'Perdiste <br> ----Vuelve a intentarlo----';
        finalMessage();
        disableButtons();
    }else if(botLives < 1){
        result = "🏆 Ganaste 🏆 <br> ----¡Bien Hecho!----";
        finalMessage();
        disableButtons();
    }
    
}

const generateRandomMokepon = () => {
    let randomMokepon = document.getElementById('bot-mokepon-name')
    let randomNumber = generateRandomNumber(1, 6);
    if(randomNumber == 1){
        randomMokepon.innerHTML = 'fisty'
    }else if(randomNumber == 2){
        randomMokepon.innerHTML = 'gorat'
    }else if(randomNumber == 3){
        randomMokepon.innerHTML = 'esmel'
    }else if(randomNumber == 4){
        randomMokepon.innerHTML = 'zerox'
    }else if(randomNumber == 5){
        randomMokepon.innerHTML = 'rasfas'
    }else if(randomNumber == 6){
        randomMokepon.innerHTML = 'sesbos'
    }
}

const disableButtons = () =>{
    let btnWater = document.getElementById('water-attack');
    let btnFire = document.getElementById('fire-attack');
    let btnGround = document.getElementById('ground-attack');
    btnWater.disabled = true;
    btnFire.disabled = true;
    btnGround.disabled = true;
}

const restartGame = () =>{
    location.reload();
}

const generateRandomNumber = (min, max) => {
    let randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    return randomNumber;
}

window.addEventListener('load', initializeGame);