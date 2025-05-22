import * as PIXI from '/static/pixi.mjs'
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



window.addEventListener('DOMContentLoaded', async () => {
    const app = new PIXI.Application()
    await app.init({
        background:0x1099bb, // мое приложение и его размеры
        height:720,
        width:1280
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
            {alias:'⚡', src: '/static/img/bonus.png'}




        ]
        await PIXI.Assets.load(textures) // подгружаем текстуры в КЕШ, потом можно будет обратиться через PIXI.Assets.get('alias')


    }
    await loadTextures() // ждем пока полностью вызывается функция и подгруз происходит

    // создаем спрайты и цепляем к ним текстуры
    const jSymbol = new PIXI.Sprite(PIXI.Assets.get('J'))
    const qSymbol = new PIXI.Sprite(PIXI.Assets.get('Q'))
    const kSymbol = new PIXI.Sprite(PIXI.Assets.get('K'))
    const aSymbol = new PIXI.Sprite(PIXI.Assets.get('A')) // прицепили текстуру к спрайту A
    const strawberrySymbol = new PIXI.Sprite(PIXI.Assets.get('🍓'))
    const bananaSymbol = new PIXI.Sprite(PIXI.Assets.get('🍌'))
    const wildSymbol = new PIXI.Sprite(PIXI.Assets.get('🔥'))
    const pineappleSymbol = new PIXI.Sprite(PIXI.Assets.get('🍍'))
    const blueberrySymbol = new PIXI.Sprite(PIXI.Assets.get('🫐'))
    const pearSymbol = new PIXI.Sprite(PIXI.Assets.get('🍐'))
    const bonusSymbol = new PIXI.Sprite(PIXI.Assets.get('⚡'))
    const background = new PIXI.Sprite(PIXI.Assets.get('background')) // текстуру бэкграунда прилепили
    const reels = new PIXI.Sprite(PIXI.Assets.get('reels')) // ищем по алиасу
    const magician = new PIXI.Sprite(PIXI.Assets.get('magician'))

    const backgroundContainer = new PIXI.Container()
    app.stage.addChild(backgroundContainer) // добавили новый контейнер на сцену
    backgroundContainer.addChildAt(background,0) // теперь пихаем в новый контейнер фон

    const slotReels = new PIXI.Container()
    app.stage.addChild(slotReels)
    slotReels.addChild(reels,magician)
    reels.anchor.set(0.5,0.5)
    reels.width = app.screen.width / 1.25
    reels.scale.y = reels.scale.x
    reels.x = app.screen.width / 1.65
    reels.y = app.screen.height / 2.2

    magician.anchor.set(0.5)
    magician.width = app.stage.width / 4
    magician.scale.y = magician.scale.x
    magician.x = app.screen.width / 8
    magician.y = app.screen.height / 1.5



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











    const button = document.getElementById('spinButton')
    button.addEventListener('click', async ()=> {
        const symbolsArray = ['J','Q','K','A','🍓', '🍌','🍍','🔥','🫐','🍐','⚡']
        let response = await fetch('api/spin')
        let data = await response.json()

        gameConainter.removeChildren()
        for (let symbol of symbolsArray) {
            if (data.row1[0] == symbol) {
                sprite0 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite0.width = reels.width / 8
                sprite0.scale.y = sprite0.scale.x
                sprite0.x = app.screen.width / 3.3 // 2.95
                sprite0.y = app.screen.height / 7
                gameConainter.addChild(sprite0)
            }
            if (data.row1[1] == symbol) {
                sprite1 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite1.width = reels.width / 8
                sprite1.scale.y = sprite1.scale.x
                sprite1.x = app.screen.width / 3.3 + sprite0.width // 2.95
                sprite1.y = app.screen.height / 7
                gameConainter.addChild(sprite1)
            }
            if (data.row1[2] == symbol) {
                sprite2 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite2.width = reels.width / 8
                sprite2.scale.y = sprite2.scale.x
                sprite2.x = app.screen.width / 3.3 + 2*sprite0.width // 2.95
                sprite2.y = app.screen.height / 7
                gameConainter.addChild(sprite2)
            }
            if (data.row1[3] == symbol) {
                sprite3 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite3.width = reels.width / 8
                sprite3.scale.y = sprite3.scale.x
                sprite3.x = app.screen.width / 3.3 + 3*sprite0.width // 2.95
                sprite3.y = app.screen.height / 7
                gameConainter.addChild(sprite3)
            }
            if (data.row1[4] == symbol) {
                sprite4 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite4.width = reels.width / 8
                sprite4.scale.y = sprite4.scale.x
                sprite4.x = app.screen.width / 3.3 + 4*sprite0.width // 2.95
                sprite4.y = app.screen.height / 7
                gameConainter.addChild(sprite4)
            }
            if (data.row2[0] == symbol) {
                sprite5 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite5.width = reels.width / 8
                sprite5.scale.y = sprite5.scale.x
                sprite5.x = app.screen.width / 3.3 + 5*sprite0.width // 2.95
                sprite5.y = app.screen.height / 7
                gameConainter.addChild(sprite5)
            }
            if (data.row2[1] == symbol) {
                sprite6 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite6.width = reels.width / 8
                sprite6.scale.y = sprite6.scale.x
                sprite6.x = app.screen.width / 3.3 + 0*sprite0.width // 2.95
                sprite6.y = app.screen.height / 7 + 1*sprite0.height
                gameConainter.addChild(sprite6)
            }


        }

        const game = document.getElementById('game')
        game.innerHTML = `
            <p>${data.row1}</p>
            <p>${data.row2}</p>
            <p>${data.row3}</p>
            <p>${data.row4}</p>
            <p>${data.row5}</p>
            <p>${data.row6}</p>
            <p>${data.payout}</p>
            <p>${data.symbolsPayout}</p>
        `
        
        
    })



})