import * as PIXI from '/static/pixi.mjs'

const music = new Howl ({
   src : ['/static/sounds/music.wav'],
   loop : true,
   volume : 0.04
})
const spinSound = new Howl ({
    src : ['/static/sounds/spinSound.mp3'],
    volume : 0.4
})
const button_click = new Howl ({
    src : ['/static/sounds/button_click.mp3'],
    volume : 0.5
})
const swooshSpin = new Howl ({
    src : ['/static/sounds/swoosh.mp3'], // легкое дуновение ветра при спине
    volume : 0.0
})
const bonusSymbolDropped = new Howl ({
    src : ['/static/sounds/bonusSymbolSound.mp3'],
    volume : 0.5
})

const winSound = new Howl ({
    src : ['/static/sounds/winSound.mp3'],
    volume : 0.4
})
const shutterSound = new Howl ({
    src : ['/static/sounds/shutterSound.mp3'],
    volume : 0.4
})

let sprite0
let sprite1
let sprite2
let sprite3
let sprite4
let sprite5
let sprite6
let sprite7
let sprite8
let sprite9
let sprite10
let sprite11
let sprite12
let sprite13
let sprite14
let sprite15
let sprite16
let sprite17
let sprite18
let sprite19
let sprite20
let sprite21
let sprite22
let sprite23
let sprite24
let sprite25
let sprite26
let sprite27
let sprite28
let sprite29
let settingsShown = false
let isOneMenuAlreadyOpened = false


function formatNumber(num) {
    return num.toLocaleString('ru-RU') + '₽' // форматируем число в рублях (просто готовая функция)
}

window.addEventListener('DOMContentLoaded', async () => {
    const app = new PIXI.Application()
    await app.init({
        background:0x1099bb, // мое приложение и его размеры
        height:1080,
        width:1920
    })
    document.body.appendChild(app.canvas)

    


    async function loadTextures() {
        const textures = [ // массив с текстурами, PIXI JS шарит что у меня тут alias и src (такой стандарт)
            {alias:'J', src : '/static/img/J.png'}, // мои символы
            {alias:'K', src : '/static/img/K.png'},
            {alias:'Q', src : '/static/img/Q.png'},
            {alias:'A', src : '/static/img/A.png'},
            {alias: '🍓', src : '/static/img/strawberry.png'},
            {alias:'background', src: '/static/img/background.webp'},
            {alias: 'reels', src: '/static/img/reels.png'},
            {alias: 'magician', src: '/static/img/magician.png'},
            {alias: '🍌', src: '/static/img/banana.png'},
            {alias: '🍍', src: '/static/img/pineapple.png'},
            {alias: '🔥', src: '/static/img/WILD.png'},
            {alias: '🫐', src : '/static/img/blueberry.png'},
            {alias: '🍐', src: '/static/img/pear.png'},
            {alias:'⚡', src: '/static/img/bonus.png'},
            {alias: '🚪', src: '/static/img/mega_wild.png'},
            {alias: 'monster', src: '/static/img/monster.png'},
            {alias: 'logo', src: '/static/img/logo.webp'},
            {alias: 'spin', src: '/static/img/spin.png'},
            {alias: 'hamburger', src: '/static/img/hamburger.png'},
            {alias: 'onSwitch', src: '/static/img/onSwitch.png'},
            {alias: 'offSwitch', src: '/static/img/offSwitch.png'},
            {alias: 'changeBet', src: '/static/img/changeBet.png'},




        ]
        await PIXI.Assets.load(textures) // подгружаем текстуры в КЕШ, потом можно будет обратиться через PIXI.Assets.get('alias')


    }
    await loadTextures() // ждем пока полностью вызывается функция и подгруз происходит

    // создаем спрайты и цепляем к ним текстуры

    const background = new PIXI.Sprite(PIXI.Assets.get('background')) // текстуру бэкграунда прилепили
    const reels = new PIXI.Sprite(PIXI.Assets.get('reels')) // ищем по алиасу
    const magician = new PIXI.Sprite(PIXI.Assets.get('magician'))
    const monster = new PIXI.Sprite(PIXI.Assets.get('monster'))
    const logo = new PIXI.Sprite(PIXI.Assets.get('logo'))
    const spinButton = new PIXI.Sprite(PIXI.Assets.get('spin'))
    const hamburger = new PIXI.Sprite(PIXI.Assets.get('hamburger'))
    const backgroundContainer = new PIXI.Container()
    const switchOn = new PIXI.Sprite(PIXI.Assets.get('onSwitch'))
    const switchOff = new PIXI.Sprite(PIXI.Assets.get('offSwitch'))
    const sfxOn = new PIXI.Sprite(PIXI.Assets.get('onSwitch'))
    const sfxOff = new PIXI.Sprite(PIXI.Assets.get('offSwitch'))
    const changeBet = new PIXI.Sprite(PIXI.Assets.get('changeBet'))
    app.stage.addChild(backgroundContainer) // добавили новый контейнер на сцену
    backgroundContainer.addChildAt(background,0) // теперь пихаем в новый контейнер фон

 
    
    const slotReels = new PIXI.Container()
    app.stage.addChild(slotReels)
    slotReels.addChild(reels,magician)
    slotReels.addChildAt(monster,0)
    slotReels.addChildAt(logo,0)


    logo.anchor.set(0.5)
    logo.width = app.screen.width / 4
    logo.scale.y = logo.scale.x
    logo.x = app.screen.width / 7
    logo.y  = app.screen.height / 6


    monster.anchor.set(0.5)
    monster.width = app.stage.width / 3.5
    monster.scale.y = monster.scale.x
    monster.x = app.screen.width / 1.07
    monster.y = app.screen.height / 1.5

    reels.anchor.set(0.5,0.5)
    reels.width = app.screen.width / 1.45
    reels.scale.y = reels.scale.x
    reels.x = app.screen.width / 1.78
    reels.y = app.screen.height / 2


    magician.anchor.set(0.5)
    magician.width = app.stage.width / 4
    magician.scale.y = magician.scale.x
    magician.x = app.screen.width / 8
    magician.y = app.screen.height / 1.5

   async function spriteManager() {
    sprite0 = new PIXI.Sprite(PIXI.Assets.get('J'))
    sprite0.width = reels.width / 8
    sprite0.scale.y = sprite0.scale.x
    let spriteWidth = sprite0.width
    let spriteHeight = sprite0.height
    globalThis.spriteWidth = spriteWidth
    globalThis.spriteHeight = spriteHeight
  
   }
   await spriteManager()

    
    

    const gameConainter = new PIXI.Container(); // создали контейнер для игры
    app.stage.addChild(gameConainter)
//    gameConainter.addChild(jSymbol,qSymbol,kSymbol,aSymbol,strawberrySymbol) // выдвинули в gameContainer



    background.anchor.set(0.5,0.5)
    background.x = app.screen.width / 2
    background.y = app.screen.height / 2

   
    if (app.screen.width >= app.screen.height ) {
        background.width = app.screen.width * 1.2 // чтобы немножко выходило за края
        background.scale.y = background.scale.x // чтобы сохранить пропорции
    }
    else {
        background.height = app.screen.height * 1.2 // если с покофона
        background.scale.x = background.scale.y
    }
const graphics = new PIXI.Graphics()

graphics.beginFill(0xff0000)
graphics.drawRect(app.screen.width/3.5,app.screen.height/11.8,app.screen.width/1.8,reels.height /1.22) // x,y,width,height
graphics.endFill()
app.stage.addChild(graphics)
gameConainter.mask = graphics

const menuContainer = new PIXI.Container()
app.stage.addChild(menuContainer)
const menu = new PIXI.Graphics()
menu.beginFill(0x49423D, 0.8)
const menuWidth = backgroundContainer.width / 2.3
const menuHeight = backgroundContainer.height / 17
menu.drawRoundedRect(0,0, menuWidth, menuHeight)
menu.endFill()

menuContainer.addChild(menu)
menuContainer.addChild(spinButton)
menuContainer.addChild(hamburger)

menu.x = app.screen.width / 3.35
menu.y = app.screen.width / 1.97

const musicSwitch = new PIXI.Text('ФОНОВАЯ МУЗЫКА:', {
    fontSize: app.screen.width / 60,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fill: 0xffffff,
})
const musicDescription = new PIXI.Text('Включить или выключить фоновую музыку', {
    fontSize: app.screen.width / 110,
    fontFamily: 'Arial',
    fill: 0xB5B8B1,
})
const sfx = new PIXI.Text('ЗВУКИ И ВСЕ SFX:', {
    fontSize: app.screen.width / 60,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fill: 0xffffff,
})
const sfxDescription = new PIXI.Text('Включить или выключить звуки игры', {
    fontSize: app.screen.width / 110,
    fontFamily: 'Arial',
    fill: 0xB5B8B1,
})


const settings = new PIXI.Graphics()
settings.beginFill(0x49423D, 0.95)
    settings.lineStyle(2, 0xFFFFFF) // обводка: толщина 2, белый цвет 
    settings.drawRoundedRect(0,0, app.screen.width / 2, app.screen.height / 2)
    settings.endFill()
    
    settings.x = app.screen.width / 3.2
    settings.y = app.screen.height / 4.5
    settings.eventMode = 'static'

hamburger.width = app.screen.width / 25
hamburger.scale.y = hamburger.scale.x
hamburger.x = app.screen.width / 3.25
hamburger.y = app.screen.height /  1.1
hamburger.eventMode = 'static'
hamburger.cursor = 'pointer'
hamburger.on('pointerdown', () => {
    if (settingsShown == false) {
    
    menuContainer.addChild(settings)
    settingsShown = true
    spinButton.eventMode = 'none' // потом разблокается когда выходишь из меню
    changeBet.eventMode = 'none' // потом разблокается когда выходишь из меню
    
    if (music.volume() == 0.04) {
        menuContainer.addChild(switchOn)
    }
    else {
        menuContainer.addChild(switchOff)
    }
    switchOn.width = app.screen.width / 18.5
    switchOn.scale.y = switchOn.scale.x
    switchOn.x = app.screen.width / 1.90
    switchOn.y = app.screen.height / 3.85
    switchOn.eventMode = 'static'
    switchOn.cursor = 'pointer'
    switchOn.on('pointerdown', () => {
        menuContainer.removeChild(switchOn)
        menuContainer.addChild(switchOff)
        music.volume(0)
    })
    switchOff.width = app.screen.width / 18.5
    switchOff.scale.y = switchOff.scale.x
    switchOff.x = app.screen.width / 1.90
    switchOff.y = app.screen.height / 3.85
    switchOff.eventMode = 'static'
    switchOff.cursor = 'pointer'
    switchOff.on('pointerdown', () => {
        menuContainer.removeChild(switchOff)
        menuContainer.addChild(switchOn)
        music.volume(0.04)
    })
    
   
    menuContainer.addChild(sfx)
    menuContainer.addChild(sfxDescription)
    menuContainer.addChild(sfxOn)
    sfx.x = app.screen.width / 3.1
    sfx.y = app.screen.height / 2.9
    sfxDescription.x = app.screen.width / 3.1
    sfxDescription.y = app.screen.height / 2.55
    sfxOn.width = app.screen.width / 18.5
    sfxOn.scale.y = sfxOn.scale.x
    sfxOn.x = app.screen.width / 1.90
    sfxOn.y = app.screen.height / 2.85
    sfxOff.width = app.screen.width / 18.5
    sfxOff.scale.y = sfxOff.scale.x
    sfxOff.x = app.screen.width / 1.90
    sfxOff.y = app.screen.height / 2.85
    sfxOn.eventMode = 'static'
    sfxOn.cursor = 'pointer'
    sfxOff.eventMode = 'static'
    sfxOff.cursor = 'pointer'

    
    
    if (spinSound.volume() == 0.4) {
        menuContainer.addChild(sfxOn)
    }
    else {
        menuContainer.addChild(sfxOff)
    }
    sfxOn.on('pointerdown', () => {
        menuContainer.removeChild(sfxOn)
        menuContainer.addChild(sfxOff)
        spinSound.volume(0)
        shutterSound.volume(0)
        

    })
    sfxOff.on('pointerdown', () => {
        menuContainer.removeChild(sfxOff)
        menuContainer.addChild(sfxOn)
        spinSound.volume(0.4)
        shutterSound.volume(0.4)
        swooshSpin.volume(0.4)
        button_click.volume(1)
    })
    
    musicDescription.x = app.screen.width / 3.1
    musicDescription.y = app.screen.height / 3.4
    menuContainer.addChild(musicDescription)
    musicSwitch.x = app.screen.width / 3.1
    musicSwitch.y = app.screen.height / 4
    menuContainer.addChild(musicSwitch)

    
        
    }
    else {
        menuContainer.removeChild(settings)
        settingsShown = false
        
        hamburger.eventMode = 'static'
        hamburger.cursor = 'pointer'
        menuContainer.removeChild(switchOn)
        menuContainer.removeChild(switchOff)
        menuContainer.removeChild(musicSwitch)
        menuContainer.removeChild(musicDescription)
        menuContainer.removeChild(sfx)
        menuContainer.removeChild(sfxDescription)
        menuContainer.removeChild(sfxOn)
        menuContainer.removeChild(sfxOff)
        spinButton.eventMode = 'static'
        changeBet.eventMode = 'static'
    }
}


)
let betSettingsOpened = false
spinButton.width = app.screen.width / 10
spinButton.scale.y = spinButton.scale.x
spinButton.x = app.screen.width / 1.38
spinButton.y = app.screen.height / 1.12400
spinButton.eventMode = 'static'
spinButton.cursor = 'pointer'
// menu.anchor.set(0.5,0.5) - у PIXI.GRAPHICS нет acnhor почему то, придется через костыль
changeBet.width = app.screen.width / 25
changeBet.scale.y = changeBet.scale.x
changeBet.x = app.screen.width / 2.9

changeBet.y = app.screen.height / 1.10
changeBet.eventMode = 'static'
changeBet.cursor = 'pointer'
menuContainer.addChild(changeBet)



changeBet.on('pointerdown', () => {
    if (betSettingsOpened == false) {
        betSettingsOpened = true
        menuContainer.addChild(changeBetMenu)
        spinButton.eventMode = 'none'
        hamburger.eventMode = 'none'
        const betVariation = [ '0.20₽', '0.40₽', '0.60₽', '0.80₽', '1.00₽', '2.00₽', '4.00₽', '8.00₽','10.00₽', '16.00₽','24.00₽', '32.00₽','64.00₽','128.00₽', '256.00₽', '512.00₽', '1024.00₽', '2048.00₽', '4096.00₽', '6000.00₽', '10000.00₽']
            betVariation.forEach((element)=>{
            const betVariationText = new PIXI.Text(element, {
            fontSize: app.screen.width / 80,
            fontFamily: 'Arial',
            fill: 0xffffff,
    })
    betVariationText.anchor.set(0.5)
    betVariationText.x = app.screen.width / 5
    betVariationText.y = app.screen.height / 3
    
    menuContainer.addChild(betVariationText)
    changeBetMenu.addChild(betVariationText)
    
    
})


    }
    else {
        betSettingsOpened = false
        menuContainer.removeChild(changeBetMenu)
        spinButton.eventMode = 'static'
        hamburger.eventMode = 'static'
    }
    
})

const changeBetMenu = new PIXI.Graphics()
changeBetMenu.beginFill(0x49423D, 0.95)
changeBetMenu.drawRoundedRect(0, 0, app.screen.width / 2, app.screen.height / 2)
changeBetMenu.lineStyle(2, 0xFFFFFF)
changeBetMenu.endFill()
changeBetMenu.x = app.screen.width / 3.2
changeBetMenu.y = app.screen.height / 4.5
changeBetMenu.eventMode = 'static'



// Глобальные переменные для текстовых элементов
let balanceText = new PIXI.Text('Кредит: ?')
balanceText.style.fontSize = app.screen.width / 60

balanceText.style.fontFamily = 'Arial'
balanceText.style.fill = 0xffffff
balanceText.style.stroke = 0x000000
balanceText.style.strokeThickness = 2
menuContainer.addChild(balanceText)
balanceText.x = app.screen.width / 2.58
balanceText.y = app.screen.height / 1.08

let payoutText = new PIXI.Text('Выигрыш: 0')
payoutText.style.fontSize = app.screen.width / 60
payoutText.style.fontFamily = 'Arial'
payoutText.style.fill = 0xffffff
payoutText.style.stroke = 0x000000
payoutText.style.strokeThickness = 2
payoutText.x = app.screen.width / 2
payoutText.y = app.screen.height / 100


let betText = new PIXI.Text('Ставка: 1000₽')
betText.style.fontSize = app.screen.width / 60
betText.style.fontFamily = 'Arial'
betText.style.fill = 0xffffff
betText.style.stroke = 0x000000
betText.style.strokeThickness = 2
betText.x = app.screen.width / 1.65
betText.y = app.screen.height / 1.08
menuContainer.addChild(betText)
// Флаг для блокировки кнопки
let isSpinning = false

spinButton.on('pointerdown', async () => { // нажатие на кнопку спина pointerdown это при отпускании кнопки
    // Проверяем, не заблокирована ли кнопка
    menuContainer.removeChild(payoutText)
    if (isSpinning==true) {
        console.log('Спин уже в процессе, подождите...')
        return // просто выходим из функции
    }
    
    console.log('Кнопка спина нажата!') // просто для отладки
    
    // Блокируем кнопку
    isSpinning = true // блокируем кнопку
    spinButton.alpha = 0.5 // Делаем кнопку полупрозрачной
    spinButton.cursor = 'not-allowed' // Меняем курсор
    
    music.play() // играем музыку
    await spin() // вызываем функцию spin
    await balance()
    // Разблокируем кнопку через 4 секунды
    setTimeout(() => {
        isSpinning = false
        spinButton.alpha = 1.0 // Возвращаем полную прозрачность
        spinButton.cursor = 'pointer' // Возвращаем курсор
        console.log('Кнопка спина разблокирована!')
    }, 2500)
})



async function spinAnimation(thisSprite,targetY) {
    const fallAnimation = (time)=>{
        const speed=20
        
        if (thisSprite.y < targetY) {
            thisSprite.y = thisSprite.y + speed*time.deltaTime
        }
        else {
            thisSprite.y = targetY
        }
        
        
        
    }
    
    app.ticker.add(fallAnimation)
    }


    async function spinOnLoad() {
        const symbolsArray = ['J','Q','K','A','🍓', '🍌','🍍','🔥','🫐','🍐','⚡','🚪']
            let response = await fetch('api/spin')
            let data = await response.json()
            gameConainter.removeChildren()
    
            for (let symbol of symbolsArray) {
                if (data.row1[0] == symbol) {
                    sprite0 = new PIXI.Sprite(PIXI.Assets.get(symbol))
    
                    sprite0.width = spriteWidth
                    sprite0.scale.y = sprite0.scale.x
                    sprite0.x = app.screen.width / 3.3 // 2.95
                    sprite0.y = app.screen.height / 10 - 0*spriteHeight
                    gameConainter.addChild(sprite0)
                    
                }
                if (data.row1[1] == symbol) {
                    sprite1 = new PIXI.Sprite(PIXI.Assets.get(symbol))
    
                    sprite1.width = spriteWidth
                    sprite1.scale.y = sprite1.scale.x
                    sprite1.x = app.screen.width / 3.3 + spriteWidth
                    sprite1.y = app.screen.height / 10  - 0*spriteHeight
                    gameConainter.addChild(sprite1)
                    
                }
                if (data.row1[2] == symbol) {
                    sprite2 = new PIXI.Sprite(PIXI.Assets.get(symbol))
    
                    sprite2.width = spriteWidth
                    sprite2.scale.y = sprite2.scale.x
                    sprite2.x = app.screen.width / 3.3 + 2*spriteWidth// 2.95
                    sprite2.y = app.screen.height / 10 - 0*spriteHeight
                    gameConainter.addChild(sprite2)
                    
                }
                if (data.row1[3] == symbol) {
                    sprite3 = new PIXI.Sprite(PIXI.Assets.get(symbol))
    
                    sprite3.width = spriteWidth
                    sprite3.scale.y = sprite3.scale.x
                    sprite3.x = app.screen.width / 3.3 + 3*spriteWidth // 2.95
                    sprite3.y = app.screen.height / 10 - 0*spriteHeight
                    gameConainter.addChild(sprite3)
                    
                }
                if (data.row1[4] == symbol) {
                    sprite4 = new PIXI.Sprite(PIXI.Assets.get(symbol))
    
                    sprite4.width = spriteWidth
                    sprite4.scale.y = sprite4.scale.x
                    sprite4.x = app.screen.width / 3.3 + 4*spriteWidth // 2.95
                    sprite4.y = app.screen.height / 10 - 0*spriteHeight
                    gameConainter.addChild(sprite4)
                    
                }
                if (data.row2[0] == symbol) {
                    sprite5 = new PIXI.Sprite(PIXI.Assets.get(symbol))
    
                    sprite5.width = spriteWidth
                    sprite5.scale.y = sprite5.scale.x
                    sprite5.x = app.screen.width / 3.3 + 5*spriteWidth // 2.95
                    sprite5.y = app.screen.height / 10 - 0*spriteHeight
                    gameConainter.addChild(sprite5)
                    
                }
                if (data.row2[1] == symbol) {
                    sprite6 = new PIXI.Sprite(PIXI.Assets.get(symbol))
    
                    sprite6.width = spriteWidth
                    sprite6.scale.y = sprite6.scale.x
                    sprite6.x = app.screen.width / 3.3 + 0*spriteWidth// 2.95
                    sprite6.y = app.screen.height / 10 + 1*spriteHeight
                    gameConainter.addChild(sprite6)
                    
                }
                if (data.row2[2] == symbol) {
                    sprite7 = new PIXI.Sprite(PIXI.Assets.get(symbol))
    
                    sprite7.width = spriteWidth
                    sprite7.scale.y = sprite7.scale.x
                    sprite7.x = app.screen.width / 3.3 + 1*spriteWidth // 2.95
                    sprite7.y = app.screen.height / 10 + 1*spriteHeight
                    gameConainter.addChild(sprite7)
                    
                }
                if (data.row2[3] == symbol) {
                    sprite8 = new PIXI.Sprite(PIXI.Assets.get(symbol))
    
                    sprite8.width = spriteWidth
                    sprite8.scale.y = sprite8.scale.x
                    sprite8.x = app.screen.width / 3.3 + 2*spriteWidth // 2.95
                    sprite8.y = app.screen.height / 10 + 1*spriteHeight
                    gameConainter.addChild(sprite8)
                    
                }
                if (data.row2[4] == symbol) {
                    sprite9 = new PIXI.Sprite(PIXI.Assets.get(symbol))
    
                    sprite9.width = spriteWidth
                    sprite9.scale.y = sprite9.scale.x
                    sprite9.x = app.screen.width / 3.3 + 3*spriteWidth// 2.95
                    sprite9.y = app.screen.height / 10 + 1*spriteHeight
                    gameConainter.addChild(sprite9)
                    
                }
                if (data.row3[0] == symbol) {
                    sprite10 = new PIXI.Sprite(PIXI.Assets.get(symbol))
    
                    sprite10.width = spriteWidth
                    sprite10.scale.y = sprite10.scale.x
                    sprite10.x = app.screen.width / 3.3 + 4*spriteWidth// 2.95
                    sprite10.y = app.screen.height / 10 + 1*spriteHeight
                    gameConainter.addChild(sprite10)
                   
                }
                if (data.row3[1] == symbol) {
                    sprite11 = new PIXI.Sprite(PIXI.Assets.get(symbol))
    
                    sprite11.width = spriteWidth
                    sprite11.scale.y = sprite11.scale.x
                    sprite11.x = app.screen.width / 3.3 + 5*spriteWidth // 2.95
                    sprite11.y = app.screen.height / 10 +  1*spriteHeight
                    gameConainter.addChild(sprite11)
                    
                }
                if (data.row3[2] == symbol) {
                    sprite12 = new PIXI.Sprite(PIXI.Assets.get(symbol))
    
                    sprite12.width = spriteWidth
                    sprite12.scale.y = sprite12.scale.x
                    sprite12.x = app.screen.width / 3.3 + 0*spriteWidth// 2.95
                    sprite12.y = app.screen.height / 10 + 2*spriteHeight
                    gameConainter.addChild(sprite12)
                  
                }
                if (data.row3[3] == symbol) {
                    sprite13 = new PIXI.Sprite(PIXI.Assets.get(symbol))
    
                    sprite13.width = spriteWidth
                    sprite13.scale.y = sprite13.scale.x
                    sprite13.x = app.screen.width / 3.3 + 1*spriteWidth // 2.95
                    sprite13.y = app.screen.height / 10 + 2*spriteHeight
                    gameConainter.addChild(sprite13)
                    
                }
                if (data.row3[4] == symbol) {
                    sprite14 = new PIXI.Sprite(PIXI.Assets.get(symbol))
    
                    sprite14.width = spriteWidth
                    sprite14.scale.y = sprite14.scale.x
                    sprite14.x = app.screen.width / 3.3 + 2*spriteWidth // 2.95
                    sprite14.y = app.screen.height / 10 + 2*spriteHeight
                    gameConainter.addChild(sprite14)
                   
                }
                if (data.row4[0] == symbol) {
                    sprite15 = new PIXI.Sprite(PIXI.Assets.get(symbol))
    
                    sprite15.width = spriteWidth
                    sprite15.scale.y = sprite15.scale.x
                    sprite15.x = app.screen.width / 3.3 + 3*spriteWidth // 2.95
                    sprite15.y = app.screen.height / 10 + 2*spriteHeight
                    gameConainter.addChild(sprite15)
                 
                }
                if (data.row4[1] == symbol) {
                    sprite16 = new PIXI.Sprite(PIXI.Assets.get(symbol))
    
                    sprite16.width = spriteWidth
                    sprite16.scale.y = sprite16.scale.x
                    sprite16.x = app.screen.width / 3.3 + 4*spriteWidth // 2.95
                    sprite16.y = app.screen.height / 10+ 2*spriteHeight
                    gameConainter.addChild(sprite16)
             
    
                }
                if (data.row4[2] == symbol) {
                    sprite17 = new PIXI.Sprite(PIXI.Assets.get(symbol))
    
                    sprite17.width = spriteWidth
                    sprite17.scale.y = sprite17.scale.x
                    sprite17.x = app.screen.width / 3.3 + 5*spriteWidth // 2.95
                    sprite17.y = app.screen.height / 10 +2*spriteHeight
                    gameConainter.addChild(sprite17)
                
                }
                if (data.row4[3] == symbol) {
                    sprite18 = new PIXI.Sprite(PIXI.Assets.get(symbol))
    
                    sprite18.width = spriteWidth
                    sprite18.scale.y = sprite18.scale.x
                    sprite18.x = app.screen.width / 3.3 + 0*spriteWidth // 2.95
                    sprite18.y = app.screen.height / 10 +3*spriteHeight
                    gameConainter.addChild(sprite18)
                
                }
                if (data.row4[4] == symbol) {
                    sprite19 = new PIXI.Sprite(PIXI.Assets.get(symbol))
    
                    sprite19.width = spriteWidth
                    sprite19.scale.y = sprite19.scale.x
                    sprite19.x = app.screen.width / 3.3 + 1*spriteWidth// 2.95
                    sprite19.y = app.screen.height / 10 +3*spriteHeight
                    gameConainter.addChild(sprite19)
               
                }
                if (data.row5[0] == symbol) {
                    sprite20 = new PIXI.Sprite(PIXI.Assets.get(symbol))
    
                    sprite20.width  = spriteWidth
                    sprite20.scale.y = sprite20.scale.x
                    sprite20.x = app.screen.width / 3.3 + 2*spriteWidth// 2.95
                    sprite20.y = app.screen.height / 10 +3*spriteHeight
                    gameConainter.addChild(sprite20)
                }
                if (data.row5[1] == symbol) {
                    sprite21 = new PIXI.Sprite(PIXI.Assets.get(symbol))
    
                    sprite21.width = spriteWidth
                    sprite21.scale.y = sprite21.scale.x
                    sprite21.x = app.screen.width / 3.3 + 3*spriteWidth // 2.95
                    sprite21.y = app.screen.height / 10 +3*spriteHeight
                    gameConainter.addChild(sprite21)
                    
          
                }
                if (data.row5[2] == symbol) {
                    sprite22 = new PIXI.Sprite(PIXI.Assets.get(symbol))
    
                    sprite22.width = spriteWidth
                    sprite22.scale.y = sprite22.scale.x
                    sprite22.x = app.screen.width / 3.3 + 4*spriteWidth // 2.95
                    sprite22.y = app.screen.height / 10 +3*spriteHeight
                    gameConainter.addChild(sprite22)
              
                }
                if (data.row5[3] == symbol) {
                    sprite23 = new PIXI.Sprite(PIXI.Assets.get(symbol))
    
                    sprite23.width = spriteWidth
                    sprite23.scale.y = sprite23.scale.x
                    sprite23.x = app.screen.width / 3.3 + 5*spriteWidth // 2.95
                    sprite23.y = app.screen.height / 10 +3*spriteHeight
                    gameConainter.addChild(sprite23)
                 
                }
                if (data.row5[4] == symbol) {
                    sprite24 = new PIXI.Sprite(PIXI.Assets.get(symbol))
    
                    sprite24.width = spriteWidth
                    sprite24.scale.y = sprite24.scale.x
                    sprite24.x = app.screen.width / 3.3 + 0*spriteWidth // 2.95
                    sprite24.y = app.screen.height / 10 +4*spriteHeight
                    gameConainter.addChild(sprite24)
               
                }
                if (data.row6[0] == symbol) {
                    sprite25 = new PIXI.Sprite(PIXI.Assets.get(symbol))
    
                    sprite25.width = spriteWidth
                    sprite25.scale.y = sprite25.scale.x
                    sprite25.x = app.screen.width / 3.3 + 1*spriteWidth // 2.95
                    sprite25.y = app.screen.height / 10 +4*spriteHeight
                    gameConainter.addChild(sprite25)
                
                }
                if (data.row6[1] == symbol) {
                    sprite26 = new PIXI.Sprite(PIXI.Assets.get(symbol))
    
                    sprite26.width = spriteWidth
                    sprite26.scale.y = sprite26.scale.x
                    sprite26.x = app.screen.width / 3.3 + 2*spriteWidth// 2.95
                    sprite26.y = app.screen.height / 10 +4*spriteHeight
                    gameConainter.addChild(sprite26)
               
                }
                if (data.row6[2] == symbol) {
                    sprite27 = new PIXI.Sprite(PIXI.Assets.get(symbol))
    
                    sprite27.width = spriteWidth
                    sprite27.scale.y = sprite27.scale.x
                    sprite27.x = app.screen.width / 3.3 + 3*spriteWidth // 2.95
                    sprite27.y = app.screen.height / 10 +4*spriteHeight
                    gameConainter.addChild(sprite27)
            
                }
                if (data.row6[3] == symbol) {
                    sprite28 = new PIXI.Sprite(PIXI.Assets.get(symbol))
    
                    sprite28.width = spriteWidth
                    sprite28.scale.y = sprite28.scale.x
                    sprite28.x = app.screen.width / 3.3 + 4*spriteWidth // 2.95
                    sprite28.y = app.screen.height / 10 +4*spriteHeight
                    gameConainter.addChild(sprite28)
              
                }
                if (data.row6[4] == symbol) {
                    sprite29 = new PIXI.Sprite(PIXI.Assets.get(symbol))
    
                    sprite29.width = spriteWidth
                    sprite29.scale.y = sprite29.scale.x
                    sprite29.x = app.screen.width / 3.3 + 5*spriteWidth // 2.95
                    sprite29.y = app.screen.height / 10 +4*spriteHeight
                    gameConainter.addChild(sprite29)
                 
                }
               
    
            }
    
    }





async function spin() {
    const symbolsArray = ['J','Q','K','A','🍓', '🍌','🍍','🔥','🫐','🍐','⚡','🚪']
        let response = await fetch('api/spin')
        let data = await response.json()
        gameConainter.removeChildren()
        button_click.play()
        // setTimeout(()=>{swooshSpin.play()},400)
        // setTimeout(()=>{swooshSpin.play()},800)
        // setTimeout(()=>{swooshSpin.play()},1200)
        // setTimeout(()=>{swooshSpin.play()},1600)
        // setTimeout(()=>{swooshSpin.play()},2000)
        
        for (let symbol of symbolsArray) {
            if (data.row1[0] == symbol) {
                sprite0 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite0.width = spriteWidth
                sprite0.scale.y = sprite0.scale.x
                sprite0.x = app.screen.width / 3.3 // 2.95
                sprite0.y = app.screen.height / 10 - 5*spriteHeight
                gameConainter.addChild(sprite0)
                if (data.row1[0] == '⚡') {
                    setTimeout(()=>{bonusSymbolDropped.play()},600)
                }
                setTimeout(()=>{spinAnimation(sprite0,app.screen.height / 10)},300)
            }
            if (data.row1[1] == symbol) {
                sprite1 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite1.width = spriteWidth
                sprite1.scale.y = sprite1.scale.x
                sprite1.x = app.screen.width / 3.3 + spriteWidth
                sprite1.y = app.screen.height / 10  - 5*spriteHeight
                gameConainter.addChild(sprite1)
                if (data.row1[1] == '⚡') {
                    setTimeout(()=>{bonusSymbolDropped.play()},900)
                }
                setTimeout(()=>{spinAnimation(sprite1,app.screen.height / 10)}, 600)
            }
            if (data.row1[2] == symbol) {
                sprite2 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite2.width = spriteWidth
                sprite2.scale.y = sprite2.scale.x
                sprite2.x = app.screen.width / 3.3 + 2*spriteWidth// 2.95
                sprite2.y = app.screen.height / 10 - 5*spriteHeight
                gameConainter.addChild(sprite2)
                if (data.row1[2] == '⚡') {
                    setTimeout(()=>{bonusSymbolDropped.play()},1200)
                }
                setTimeout(()=>{spinAnimation(sprite2,app.screen.height / 10)}, 900)
            }
            if (data.row1[3] == symbol) {
                sprite3 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite3.width = spriteWidth
                sprite3.scale.y = sprite3.scale.x
                sprite3.x = app.screen.width / 3.3 + 3*spriteWidth // 2.95
                sprite3.y = app.screen.height / 10 - 5*spriteHeight
                gameConainter.addChild(sprite3)
                if (data.row1[3] == '⚡') {
                    setTimeout(()=>{bonusSymbolDropped.play()},1500)
                }
                setTimeout(()=>{spinAnimation(sprite3,app.screen.height / 10)}, 1200)
            }
            if (data.row1[4] == symbol) {
                sprite4 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite4.width = spriteWidth
                sprite4.scale.y = sprite4.scale.x
                sprite4.x = app.screen.width / 3.3 + 4*spriteWidth // 2.95
                sprite4.y = app.screen.height / 10 - 5*spriteHeight
                gameConainter.addChild(sprite4)
                if (data.row1[4] == '⚡') {
                    setTimeout(()=>{bonusSymbolDropped.play()},1800)
                }
                setTimeout(()=>{spinAnimation(sprite4,app.screen.height / 10)}, 1500)
            }
            if (data.row2[0] == symbol) {
                sprite5 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite5.width = spriteWidth
                sprite5.scale.y = sprite5.scale.x
                sprite5.x = app.screen.width / 3.3 + 5*spriteWidth // 2.95
                sprite5.y = app.screen.height / 10 - 5*spriteHeight
                gameConainter.addChild(sprite5)
                if (data.row2[0] == '⚡') {
                    setTimeout(()=>{bonusSymbolDropped.play()},2100)
                }
                setTimeout(()=>{spinAnimation(sprite5,app.screen.height / 10)}, 1800)
            }
            if (data.row2[1] == symbol) {
                sprite6 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite6.width = spriteWidth
                sprite6.scale.y = sprite6.scale.x
                sprite6.x = app.screen.width / 3.3 + 0*spriteWidth// 2.95
                sprite6.y = app.screen.height / 10 - 4*spriteHeight
                gameConainter.addChild(sprite6)
                if (data.row2[1] == '⚡') {
                    setTimeout(()=>{bonusSymbolDropped.play()},300)
                }
                setTimeout(()=>{spinAnimation(sprite6, app.screen.height / 10 + 1*sprite0.height)},300)
            }
            if (data.row2[2] == symbol) {
                sprite7 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite7.width = spriteWidth
                sprite7.scale.y = sprite7.scale.x
                sprite7.x = app.screen.width / 3.3 + 1*spriteWidth // 2.95
                sprite7.y = app.screen.height / 10 -4*spriteHeight
                gameConainter.addChild(sprite7)
                if (data.row2[2] == '⚡') {
                    setTimeout(()=>{bonusSymbolDropped.play()},600)
                }
                setTimeout(()=>{spinAnimation(sprite7, app.screen.height / 10 + 1*sprite0.height)},600)
            }
            if (data.row2[3] == symbol) {
                sprite8 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite8.width = spriteWidth
                sprite8.scale.y = sprite8.scale.x
                sprite8.x = app.screen.width / 3.3 + 2*spriteWidth // 2.95
                sprite8.y = app.screen.height / 10 -4*spriteHeight
                gameConainter.addChild(sprite8)
                if (data.row2[3] == '⚡') {
                    setTimeout(()=>{bonusSymbolDropped.play()},900)
                }
                setTimeout(()=>{spinAnimation(sprite8, app.screen.height / 10 + 1*sprite0.height)},900)
            }
            if (data.row2[4] == symbol) {
                sprite9 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite9.width = spriteWidth
                sprite9.scale.y = sprite9.scale.x
                sprite9.x = app.screen.width / 3.3 + 3*spriteWidth// 2.95
                sprite9.y = app.screen.height / 10 - 4*spriteHeight
                gameConainter.addChild(sprite9)
                if (data.row2[4] == '⚡') {
                    setTimeout(()=>{bonusSymbolDropped.play()},1200)
                }
                setTimeout(()=>{spinAnimation(sprite9, app.screen.height / 10 + 1*sprite0.height)},1200)
            }
            if (data.row3[0] == symbol) {
                sprite10 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite10.width = spriteWidth
                sprite10.scale.y = sprite10.scale.x
                sprite10.x = app.screen.width / 3.3 + 4*spriteWidth// 2.95
                sprite10.y = app.screen.height / 10 - 4*spriteHeight
                gameConainter.addChild(sprite10)
                if (data.row3[0] == '⚡') {
                    setTimeout(()=>{bonusSymbolDropped.play()},1500)
                }
                setTimeout(()=>{spinAnimation(sprite10, app.screen.height / 10 + 1*sprite0.height)},1500)
            }
            if (data.row3[1] == symbol) {
                sprite11 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite11.width = spriteWidth
                sprite11.scale.y = sprite11.scale.x
                sprite11.x = app.screen.width / 3.3 + 5*spriteWidth // 2.95
                sprite11.y = app.screen.height / 10 + -4*spriteHeight
                gameConainter.addChild(sprite11)
                if (data.row3[1] == '⚡') {
                    setTimeout(()=>{bonusSymbolDropped.play()},1800)
                }
                setTimeout(()=>{spinAnimation(sprite11, app.screen.height / 10 + 1*sprite0.height)},1800)
            }
            if (data.row3[2] == symbol) {
                sprite12 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite12.width = spriteWidth
                sprite12.scale.y = sprite12.scale.x
                sprite12.x = app.screen.width / 3.3 + 0*spriteWidth// 2.95
                sprite12.y = app.screen.height / 10 -3*spriteHeight
                gameConainter.addChild(sprite12)
                if (data.row3[2] == '⚡') {
                    setTimeout(()=>{bonusSymbolDropped.play()},300)
                }
                setTimeout(()=>{spinAnimation(sprite12, app.screen.height / 10 + 2*sprite0.height)},300)
            }
            if (data.row3[3] == symbol) {
                sprite13 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite13.width = spriteWidth
                sprite13.scale.y = sprite13.scale.x
                sprite13.x = app.screen.width / 3.3 + 1*spriteWidth // 2.95
                sprite13.y = app.screen.height / 10 -3*spriteHeight
                gameConainter.addChild(sprite13)
                if (data.row3[3] == '⚡') {
                    setTimeout(()=>{bonusSymbolDropped.play()},600)
                }
                setTimeout(()=>{spinAnimation(sprite13, app.screen.height / 10 + 2*sprite0.height)},600)
            }
            if (data.row3[4] == symbol) {
                sprite14 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite14.width = spriteWidth
                sprite14.scale.y = sprite14.scale.x
                sprite14.x = app.screen.width / 3.3 + 2*spriteWidth // 2.95
                sprite14.y = app.screen.height / 10 -3*spriteHeight
                gameConainter.addChild(sprite14)
                if (data.row3[4] == '⚡') {
                    setTimeout(()=>{bonusSymbolDropped.play()},900)
                }
                setTimeout(()=>{spinAnimation(sprite14, app.screen.height / 10 + 2*sprite0.height)},900)
            }
            if (data.row4[0] == symbol) {
                sprite15 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite15.width = spriteWidth
                sprite15.scale.y = sprite15.scale.x
                sprite15.x = app.screen.width / 3.3 + 3*spriteWidth // 2.95
                sprite15.y = app.screen.height / 10 -3*spriteHeight
                gameConainter.addChild(sprite15)
                if (data.row4[0] == '⚡') {
                    setTimeout(()=>{bonusSymbolDropped.play()},1200)
                }
                setTimeout(()=>{spinAnimation(sprite15, app.screen.height / 10 + 2*sprite0.height)},1200)
            }
            if (data.row4[1] == symbol) {
                sprite16 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite16.width = spriteWidth
                sprite16.scale.y = sprite16.scale.x
                sprite16.x = app.screen.width / 3.3 + 4*spriteWidth // 2.95
                sprite16.y = app.screen.height / 10-3*spriteHeight
                gameConainter.addChild(sprite16)
                if (data.row4[1] == '⚡') {
                    setTimeout(()=>{bonusSymbolDropped.play()},1500)
                }
                setTimeout(()=>{spinAnimation(sprite16, app.screen.height / 10 + 2*sprite0.height)},1500)

            }
            if (data.row4[2] == symbol) {
                sprite17 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite17.width = spriteWidth
                sprite17.scale.y = sprite17.scale.x
                sprite17.x = app.screen.width / 3.3 + 5*spriteWidth // 2.95
                sprite17.y = app.screen.height / 10 -3*spriteHeight
                gameConainter.addChild(sprite17)
                if (data.row4[2] == '⚡') {
                    setTimeout(()=>{bonusSymbolDropped.play()},1800)
                }
                setTimeout(()=>{spinAnimation(sprite17, app.screen.height / 10 + 2*sprite0.height)},1800)
            }
            if (data.row4[3] == symbol) {
                sprite18 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite18.width = spriteWidth
                sprite18.scale.y = sprite18.scale.x
                sprite18.x = app.screen.width / 3.3 + 0*spriteWidth // 2.95
                sprite18.y = app.screen.height / 10 - 2*spriteHeight
                gameConainter.addChild(sprite18)
                if (data.row4[3] == '⚡') {
                    setTimeout(()=>{bonusSymbolDropped.play()},300)
                }
                setTimeout(()=>{spinAnimation(sprite18, app.screen.height / 10 + 3*sprite0.height)},300)
            }
            if (data.row4[4] == symbol) {
                sprite19 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite19.width = spriteWidth
                sprite19.scale.y = sprite19.scale.x
                sprite19.x = app.screen.width / 3.3 + 1*spriteWidth// 2.95
                sprite19.y = app.screen.height / 10 - 2*spriteHeight
                gameConainter.addChild(sprite19)
                if (data.row4[4] == '⚡') {
                    setTimeout(()=>{bonusSymbolDropped.play()},600)
                }
                setTimeout(()=>{spinAnimation(sprite19, app.screen.height / 10 + 3*sprite0.height)},600)
            }
            if (data.row5[0] == symbol) {
                sprite20 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite20.width  = spriteWidth
                sprite20.scale.y = sprite20.scale.x
                sprite20.x = app.screen.width / 3.3 + 2*spriteWidth// 2.95
                sprite20.y = app.screen.height / 10 - 2*spriteHeight
                gameConainter.addChild(sprite20)
                if (data.row5[0] == '⚡') {
                    setTimeout(()=>{bonusSymbolDropped.play()},900)
                }
                setTimeout(()=>{spinAnimation(sprite20, app.screen.height / 10 + 3*sprite0.height)},900)
            }
            if (data.row5[1] == symbol) {
                sprite21 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite21.width = spriteWidth
                sprite21.scale.y = sprite21.scale.x
                sprite21.x = app.screen.width / 3.3 + 3*spriteWidth // 2.95
                sprite21.y = app.screen.height / 10 - 2*spriteHeight
                gameConainter.addChild(sprite21)
                if (data.row5[1] == '⚡') {
                    setTimeout(()=>{bonusSymbolDropped.play()},1200)
                }
                setTimeout(()=>{spinAnimation(sprite21, app.screen.height / 10 + 3*sprite0.height)},1200)
            }
            if (data.row5[2] == symbol) {
                sprite22 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite22.width = spriteWidth
                sprite22.scale.y = sprite22.scale.x
                sprite22.x = app.screen.width / 3.3 + 4*spriteWidth // 2.95
                sprite22.y = app.screen.height / 10 - 2*spriteHeight
                gameConainter.addChild(sprite22)
                if (data.row5[2] == '⚡') {
                    setTimeout(()=>{bonusSymbolDropped.play()},1500)
                }
                setTimeout(()=>{spinAnimation(sprite22, app.screen.height / 10 + 3*sprite0.height)},1500)
            }
            if (data.row5[3] == symbol) {
                sprite23 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite23.width = spriteWidth
                sprite23.scale.y = sprite23.scale.x
                sprite23.x = app.screen.width / 3.3 + 5*spriteWidth // 2.95
                sprite23.y = app.screen.height / 10 - 2*spriteHeight
                gameConainter.addChild(sprite23)
                if (data.row5[3] == '⚡') {
                    setTimeout(()=>{bonusSymbolDropped.play()},1800)
                }
                setTimeout(()=>{spinAnimation(sprite23, app.screen.height / 10 + 3*sprite0.height)},1800)
            }
            if (data.row5[4] == symbol) {
                sprite24 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite24.width = spriteWidth
                sprite24.scale.y = sprite24.scale.x
                sprite24.x = app.screen.width / 3.3 + 0*spriteWidth // 2.95
                sprite24.y = app.screen.height / 10 -1*spriteHeight
                gameConainter.addChild(sprite24)
                if (data.row5[4] == '⚡') {
                    setTimeout(()=>{bonusSymbolDropped.play()},300)
                }
                setTimeout(()=>{spinAnimation(sprite24, app.screen.height / 10 + 4*sprite0.height)},300)
                setTimeout(()=>{spinSound.play()},900)
            }
            if (data.row6[0] == symbol) {
                sprite25 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite25.width = spriteWidth
                sprite25.scale.y = sprite25.scale.x
                sprite25.x = app.screen.width / 3.3 + 1*spriteWidth // 2.95
                sprite25.y = app.screen.height / 10 -1*spriteHeight
                gameConainter.addChild(sprite25)
                if (data.row6[0] == '⚡') {
                    setTimeout(()=>{bonusSymbolDropped.play()},600)
                }
                setTimeout(()=>{spinAnimation(sprite25, app.screen.height / 10 + 4*sprite0.height)},600)
                setTimeout(()=>{spinSound.play()},1200)
            }
            if (data.row6[1] == symbol) {
                sprite26 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite26.width = spriteWidth
                sprite26.scale.y = sprite26.scale.x
                sprite26.x = app.screen.width / 3.3 + 2*spriteWidth// 2.95
                sprite26.y = app.screen.height / 10 -1*spriteHeight
                gameConainter.addChild(sprite26)
                if (data.row6[1] == '⚡') {
                    setTimeout(()=>{bonusSymbolDropped.play()},900)
                }
                setTimeout(()=>{spinAnimation(sprite26, app.screen.height / 10 + 4*sprite0.height)},900)
                setTimeout(()=>{spinSound.play()},1500)
            }
            if (data.row6[2] == symbol) {
                sprite27 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite27.width = spriteWidth
                sprite27.scale.y = sprite27.scale.x
                sprite27.x = app.screen.width / 3.3 + 3*spriteWidth // 2.95
                sprite27.y = app.screen.height / 10 -1*spriteHeight
                gameConainter.addChild(sprite27)
                if (data.row6[2] == '⚡') {
                    setTimeout(()=>{bonusSymbolDropped.play()},1200)
                }
                setTimeout(()=>{spinAnimation(sprite27, app.screen.height / 10 + 4*sprite0.height)},1200)
                setTimeout(()=>{spinSound.play()},1800)
            }
            if (data.row6[3] == symbol) {
                sprite28 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite28.width = spriteWidth
                sprite28.scale.y = sprite28.scale.x
                sprite28.x = app.screen.width / 3.3 + 4*spriteWidth // 2.95
                sprite28.y = app.screen.height / 10 -1*spriteHeight
                gameConainter.addChild(sprite28)
                if (data.row6[3] == '⚡') {
                    setTimeout(()=>{bonusSymbolDropped.play()},1500)
                }
                setTimeout(()=>{spinAnimation(sprite28, app.screen.height / 10 + 4*sprite0.height)},1500)
                setTimeout(()=>{spinSound.play()},2100)
            }
            if (data.row6[4] == symbol) {
                sprite29 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite29.width = spriteWidth
                sprite29.scale.y = sprite29.scale.x
                sprite29.x = app.screen.width / 3.3 + 5*spriteWidth // 2.95
                sprite29.y = app.screen.height / 10 -1*spriteHeight
                gameConainter.addChild(sprite29)
                if (data.row6[4] == '⚡') {
                    setTimeout(()=>{bonusSymbolDropped.play()},1800)
                }
                setTimeout(()=>{spinAnimation(sprite29, app.screen.height / 10 + 4*sprite0.height)},1800)
                setTimeout(()=>{spinSound.play()},2400)
            }
          

        }

}

   
await spinOnLoad()

async function balance() {
    let response = await fetch('api/balance') // запрос к серверу
    let data = await response.json() // получаем данные
    balanceText.text = `Кредит: ${formatNumber(data.beforeEndOfTheSpin)}`
    setTimeout(() => {
        balanceText.text = `Кредит: ${formatNumber(data.balance)}`
        
    }, 2500)


    // Обновляем существующий payoutText вместо создания нового
    payoutText.text = `Выигрыш: ${formatNumber(0)}`
    setTimeout(() => {
        payoutText.text = `Выигрыш: ${formatNumber(data.payout)}`
        if (data.payout > 0) {
            winSound.play()
            menuContainer.addChild(payoutText)
        }
    }, 2500)
 
   
}


async function getBalanceOnOpen() {
    let response = await fetch('api/getBalanceOnOpen')
    let data = await response.json()
    balanceText.text = `Кредит: ${formatNumber(data.balance)}` // тоже самое ток при первом открытии
    payoutText.text = `Выигрыш: ${formatNumber(data.payout)}` // тоже самое ток при первом открытии
}

await getBalanceOnOpen()


})