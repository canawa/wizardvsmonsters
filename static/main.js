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
            {alias:'⚡', src: '/static/img/bonus.png'},
            {alias: '🚪', src: '/static/img/mega_wild.png'},
            {alias: 'monster', src: '/static/img/monster.png'},
            {alias: 'logo', src: '/static/img/logo.webp'}




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
    const megaWildSymbol = new PIXI.Sprite(PIXI.Assets.get('🚪'))
    const background = new PIXI.Sprite(PIXI.Assets.get('background')) // текстуру бэкграунда прилепили
    const reels = new PIXI.Sprite(PIXI.Assets.get('reels')) // ищем по алиасу
    const magician = new PIXI.Sprite(PIXI.Assets.get('magician'))
    const monster = new PIXI.Sprite(PIXI.Assets.get('monster'))
    const logo = new PIXI.Sprite(PIXI.Assets.get('logo'))

    const backgroundContainer = new PIXI.Container()
    app.stage.addChild(backgroundContainer) // добавили новый контейнер на сцену
    backgroundContainer.addChildAt(background,0) // теперь пихаем в новый контейнер фон

    const slotReels = new PIXI.Container()
    app.stage.addChild(slotReels)
    slotReels.addChild(reels,magician)
    slotReels.addChildAt(monster,0)
    slotReels.addChildAt(logo,0)

    logo.anchor.set(0.5)
    logo.width = app.stage.width / 8
    logo.scale.y = logo.scale.x
    logo.x = app.screen.width / 7
    logo.y  = app.screen.height / 7


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
graphics.drawRect(app.screen.width/3.5,app.screen.height/12.3,app.screen.width/1.8,reels.height /1.22) // x,y,width,height
graphics.endFill()
app.stage.addChild(graphics)
gameConainter.mask = graphics
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




let spinMade=false
    const button = document.getElementById('spinButton')
    button.addEventListener('click', async ()=> {


        const symbolsArray = ['J','Q','K','A','🍓', '🍌','🍍','🔥','🫐','🍐','⚡','🚪']
        let response = await fetch('api/spin')
        let data = await response.json()
        gameConainter.removeChildren()

        for (let symbol of symbolsArray) {
            if (data.row1[0] == symbol) {
                sprite0 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite0.width = reels.width / 8
                sprite0.scale.y = sprite0.scale.x
                sprite0.x = app.screen.width / 3.3 // 2.95
                sprite0.y = app.screen.height / 10 - 5*sprite0.height
                gameConainter.addChild(sprite0)
                setTimeout(()=>{spinAnimation(sprite0,app.screen.height / 10)},300)
            }
            if (data.row1[1] == symbol) {
                sprite1 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite1.width = reels.width / 8
                sprite1.scale.y = sprite1.scale.x
                sprite1.x = app.screen.width / 3.3 + sprite0.width
                sprite1.y = app.screen.height / 10  - 5*sprite0.height
                gameConainter.addChild(sprite1)
                setTimeout(()=>{spinAnimation(sprite1,app.screen.height / 10)}, 600)
            }
            if (data.row1[2] == symbol) {
                sprite2 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite2.width = reels.width / 8
                sprite2.scale.y = sprite2.scale.x
                sprite2.x = app.screen.width / 3.3 + 2*sprite0.width // 2.95
                sprite2.y = app.screen.height / 10 - 5*sprite0.height
                gameConainter.addChild(sprite2)
                setTimeout(()=>{spinAnimation(sprite2,app.screen.height / 10)}, 900)
            }
            if (data.row1[3] == symbol) {
                sprite3 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite3.width = reels.width / 8
                sprite3.scale.y = sprite3.scale.x
                sprite3.x = app.screen.width / 3.3 + 3*sprite0.width // 2.95
                sprite3.y = app.screen.height / 10 - 5*sprite0.height
                gameConainter.addChild(sprite3)
                setTimeout(()=>{spinAnimation(sprite3,app.screen.height / 10)}, 1200)
            }
            if (data.row1[4] == symbol) {
                sprite4 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite4.width = reels.width / 8
                sprite4.scale.y = sprite4.scale.x
                sprite4.x = app.screen.width / 3.3 + 4*sprite0.width // 2.95
                sprite4.y = app.screen.height / 10 - 5*sprite0.height
                gameConainter.addChild(sprite4)
                setTimeout(()=>{spinAnimation(sprite4,app.screen.height / 10)}, 1500)
            }
            if (data.row2[0] == symbol) {
                sprite5 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite5.width = reels.width / 8
                sprite5.scale.y = sprite5.scale.x
                sprite5.x = app.screen.width / 3.3 + 5*sprite0.width // 2.95
                sprite5.y = app.screen.height / 10 - 5*sprite0.height
                gameConainter.addChild(sprite5)
                setTimeout(()=>{spinAnimation(sprite5,app.screen.height / 10)}, 1800)
            }
            if (data.row2[1] == symbol) {
                sprite6 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite6.width = reels.width / 8
                sprite6.scale.y = sprite6.scale.x
                sprite6.x = app.screen.width / 3.3 + 0*sprite0.width // 2.95
                sprite6.y = app.screen.height / 10 - 4*sprite0.height
                gameConainter.addChild(sprite6)
                setTimeout(()=>{spinAnimation(sprite6, app.screen.height / 10 + 1*sprite0.height)},300)
            }
            if (data.row2[2] == symbol) {
                sprite7 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite7.width = reels.width / 8
                sprite7.scale.y = sprite7.scale.x
                sprite7.x = app.screen.width / 3.3 + 1*sprite0.width // 2.95
                sprite7.y = app.screen.height / 10 -4*sprite0.height
                gameConainter.addChild(sprite7)
                setTimeout(()=>{spinAnimation(sprite7, app.screen.height / 10 + 1*sprite0.height)},600)
            }
            if (data.row2[3] == symbol) {
                sprite8 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite8.width = reels.width / 8
                sprite8.scale.y = sprite8.scale.x
                sprite8.x = app.screen.width / 3.3 + 2*sprite0.width // 2.95
                sprite8.y = app.screen.height / 10 -4*sprite0.height
                gameConainter.addChild(sprite8)
                setTimeout(()=>{spinAnimation(sprite8, app.screen.height / 10 + 1*sprite0.height)},900)
            }
            if (data.row2[4] == symbol) {
                sprite9 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite9.width = reels.width / 8
                sprite9.scale.y = sprite9.scale.x
                sprite9.x = app.screen.width / 3.3 + 3*sprite0.width // 2.95
                sprite9.y = app.screen.height / 10 - 4*sprite0.height
                gameConainter.addChild(sprite9)
                setTimeout(()=>{spinAnimation(sprite9, app.screen.height / 10 + 1*sprite0.height)},1200)
            }
            if (data.row3[0] == symbol) {
                sprite10 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite10.width = reels.width / 8
                sprite10.scale.y = sprite10.scale.x
                sprite10.x = app.screen.width / 3.3 + 4*sprite0.width // 2.95
                sprite10.y = app.screen.height / 10 - 4*sprite0.height
                gameConainter.addChild(sprite10)
                setTimeout(()=>{spinAnimation(sprite10, app.screen.height / 10 + 1*sprite0.height)},1500)
            }
            if (data.row3[1] == symbol) {
                sprite11 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite11.width = reels.width / 8
                sprite11.scale.y = sprite11.scale.x
                sprite11.x = app.screen.width / 3.3 + 5*sprite0.width // 2.95
                sprite11.y = app.screen.height / 10 + -4*sprite0.height
                gameConainter.addChild(sprite11)
                setTimeout(()=>{spinAnimation(sprite11, app.screen.height / 10 + 1*sprite0.height)},1800)
            }
            if (data.row3[2] == symbol) {
                sprite12 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite12.width = reels.width / 8
                sprite12.scale.y = sprite12.scale.x
                sprite12.x = app.screen.width / 3.3 + 0*sprite0.width // 2.95
                sprite12.y = app.screen.height / 10 -3*sprite0.height
                gameConainter.addChild(sprite12)
                setTimeout(()=>{spinAnimation(sprite12, app.screen.height / 10 + 2*sprite0.height)},300)
            }
            if (data.row3[3] == symbol) {
                sprite13 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite13.width = reels.width / 8
                sprite13.scale.y = sprite13.scale.x
                sprite13.x = app.screen.width / 3.3 + 1*sprite0.width // 2.95
                sprite13.y = app.screen.height / 10 -3*sprite0.height
                gameConainter.addChild(sprite13)
                setTimeout(()=>{spinAnimation(sprite13, app.screen.height / 10 + 2*sprite0.height)},600)
            }
            if (data.row3[4] == symbol) {
                sprite14 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite14.width = reels.width / 8
                sprite14.scale.y = sprite14.scale.x
                sprite14.x = app.screen.width / 3.3 + 2*sprite0.width // 2.95
                sprite14.y = app.screen.height / 10 -3*sprite0.height
                gameConainter.addChild(sprite14)
                setTimeout(()=>{spinAnimation(sprite14, app.screen.height / 10 + 2*sprite0.height)},900)
            }
            if (data.row4[0] == symbol) {
                sprite15 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite15.width = reels.width / 8
                sprite15.scale.y = sprite15.scale.x
                sprite15.x = app.screen.width / 3.3 + 3*sprite0.width // 2.95
                sprite15.y = app.screen.height / 10 -3*sprite0.height
                gameConainter.addChild(sprite15)
                setTimeout(()=>{spinAnimation(sprite15, app.screen.height / 10 + 2*sprite0.height)},1200)
            }
            if (data.row4[1] == symbol) {
                sprite16 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite16.width = reels.width / 8
                sprite16.scale.y = sprite16.scale.x
                sprite16.x = app.screen.width / 3.3 + 4*sprite0.width // 2.95
                sprite16.y = app.screen.height / 10-3*sprite0.height
                gameConainter.addChild(sprite16)
                setTimeout(()=>{spinAnimation(sprite16, app.screen.height / 10 + 2*sprite0.height)},1500)

            }
            if (data.row4[2] == symbol) {
                sprite17 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite17.width = reels.width / 8
                sprite17.scale.y = sprite17.scale.x
                sprite17.x = app.screen.width / 3.3 + 5*sprite0.width // 2.95
                sprite17.y = app.screen.height / 10 -3*sprite0.height
                gameConainter.addChild(sprite17)
                setTimeout(()=>{spinAnimation(sprite17, app.screen.height / 10 + 2*sprite0.height)},1800)
            }
            if (data.row4[3] == symbol) {
                sprite18 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite18.width = reels.width / 8
                sprite18.scale.y = sprite18.scale.x
                sprite18.x = app.screen.width / 3.3 + 0*sprite0.width // 2.95
                sprite18.y = app.screen.height / 10 - 2*sprite0.height
                gameConainter.addChild(sprite18)
                setTimeout(()=>{spinAnimation(sprite18, app.screen.height / 10 + 3*sprite0.height)},300)
            }
            if (data.row4[4] == symbol) {
                sprite19 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite19.width = reels.width / 8
                sprite19.scale.y = sprite19.scale.x
                sprite19.x = app.screen.width / 3.3 + 1*sprite0.width // 2.95
                sprite19.y = app.screen.height / 10 - 2*sprite0.height
                gameConainter.addChild(sprite19)
                setTimeout(()=>{spinAnimation(sprite19, app.screen.height / 10 + 3*sprite0.height)},600)
            }
            if (data.row5[0] == symbol) {
                sprite20 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite20.width  = reels.width / 8
                sprite20.scale.y = sprite20.scale.x
                sprite20.x = app.screen.width / 3.3 + 2*sprite0.width // 2.95
                sprite20.y = app.screen.height / 10 - 2*sprite0.height
                gameConainter.addChild(sprite20)
                setTimeout(()=>{spinAnimation(sprite20, app.screen.height / 10 + 3*sprite0.height)},900)
            }
            if (data.row5[1] == symbol) {
                sprite21 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite21.width = reels.width / 8
                sprite21.scale.y = sprite21.scale.x
                sprite21.x = app.screen.width / 3.3 + 3*sprite0.width // 2.95
                sprite21.y = app.screen.height / 10 - 2*sprite0.height
                gameConainter.addChild(sprite21)
                setTimeout(()=>{spinAnimation(sprite21, app.screen.height / 10 + 3*sprite0.height)},1200)
            }
            if (data.row5[2] == symbol) {
                sprite22 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite22.width = reels.width / 8
                sprite22.scale.y = sprite22.scale.x
                sprite22.x = app.screen.width / 3.3 + 4*sprite0.width // 2.95
                sprite22.y = app.screen.height / 10 - 2*sprite0.height
                gameConainter.addChild(sprite22)
                setTimeout(()=>{spinAnimation(sprite22, app.screen.height / 10 + 3*sprite0.height)},1500)
            }
            if (data.row5[3] == symbol) {
                sprite23 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite23.width = reels.width / 8
                sprite23.scale.y = sprite23.scale.x
                sprite23.x = app.screen.width / 3.3 + 5*sprite0.width // 2.95
                sprite23.y = app.screen.height / 10 - 2*sprite0.height
                gameConainter.addChild(sprite23)
                setTimeout(()=>{spinAnimation(sprite23, app.screen.height / 10 + 3*sprite0.height)},1800)
            }
            if (data.row5[4] == symbol) {
                sprite24 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite24.width = reels.width / 8
                sprite24.scale.y = sprite24.scale.x
                sprite24.x = app.screen.width / 3.3 + 0*sprite0.width // 2.95
                sprite24.y = app.screen.height / 10 -1*sprite0.height
                gameConainter.addChild(sprite24)
                setTimeout(()=>{spinAnimation(sprite24, app.screen.height / 10 + 4*sprite0.height)},300)
            }
            if (data.row6[0] == symbol) {
                sprite25 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite25.width = reels.width / 8
                sprite25.scale.y = sprite25.scale.x
                sprite25.x = app.screen.width / 3.3 + 1*sprite0.width // 2.95
                sprite25.y = app.screen.height / 10 -1*sprite0.height
                gameConainter.addChild(sprite25)
                setTimeout(()=>{spinAnimation(sprite25, app.screen.height / 10 + 4*sprite0.height)},600)
            }
            if (data.row6[1] == symbol) {
                sprite26 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite26.width = reels.width / 8
                sprite26.scale.y = sprite26.scale.x
                sprite26.x = app.screen.width / 3.3 + 2*sprite0.width // 2.95
                sprite26.y = app.screen.height / 10 -1*sprite0.height
                gameConainter.addChild(sprite26)
                setTimeout(()=>{spinAnimation(sprite26, app.screen.height / 10 + 4*sprite0.height)},900)
            }
            if (data.row6[2] == symbol) {
                sprite27 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite27.width = reels.width / 8
                sprite27.scale.y = sprite27.scale.x
                sprite27.x = app.screen.width / 3.3 + 3*sprite0.width // 2.95
                sprite27.y = app.screen.height / 10 -1*sprite0.height
                gameConainter.addChild(sprite27)
                setTimeout(()=>{spinAnimation(sprite27, app.screen.height / 10 + 4*sprite0.height)},1200)
            }
            if (data.row6[3] == symbol) {
                sprite28 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite28.width = reels.width / 8
                sprite28.scale.y = sprite28.scale.x
                sprite28.x = app.screen.width / 3.3 + 4*sprite0.width // 2.95
                sprite28.y = app.screen.height / 10 -1*sprite0.height
                gameConainter.addChild(sprite28)
                setTimeout(()=>{spinAnimation(sprite28, app.screen.height / 10 + 4*sprite0.height)},1500)
            }
            if (data.row6[4] == symbol) {
                sprite29 = new PIXI.Sprite(PIXI.Assets.get(symbol))

                sprite29.width = reels.width / 8
                sprite29.scale.y = sprite29.scale.x
                sprite29.x = app.screen.width / 3.3 + 5*sprite0.width // 2.95
                sprite29.y = app.screen.height / 10 -1*sprite0.height
                gameConainter.addChild(sprite29)
                setTimeout(()=>{spinAnimation(sprite29, app.screen.height / 10 + 4*sprite0.height)},1800)
            }
            spinMade=true

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