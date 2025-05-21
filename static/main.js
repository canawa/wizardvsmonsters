import * as PIXI from './pixi.mjs'
window.addEventListener('DOMContentLoaded', async () => {
//
//    const app = new PIXI.Application()
//    await app.init({
//        backgroundColor:'#1099bb', width:1440, height:1080})
//    document.body.appendChild(app.canvas)
//
////
////
//const app = new PIXI.Application({ // создаем объект App
////            width:640, // ширина и длина окошка
////            height:640,
////            backgroundColor: '#7e6490', // цвет всего окошка
////        })
////



    const button = document.getElementById('spinButton')
    button.addEventListener('click', async ()=> {
        let response = await fetch('api/spin')
        let data = await response.json()
        console.log(data)

        const game = document.getElementById('game')
        game.innerHTML = `
            <p>${data.column1}</p>
            <p>${data.column2}</p>
            <p>${data.column3}</p>
            <p>${data.column4}</p>
            <p>${data.column5}</p>
            <p>${data.column6}</p>
            <p>${data.payout}</p>
            <p>${data.symbolsPayout}</p>
        `
        
        
    })

    

//    console.log(PIXI)

})
