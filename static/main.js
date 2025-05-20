window.addEventListener('DOMContentLoaded', () => {

    const button = document.getElementById('spinButton')
    button.addEventListener('click', async ()=> {
        response = await fetch('http://localhost:8000/api/spin')
        data = await response.json()
        console.log(data)
    })


})
