export function darkMode (){
    const changeMode = document.querySelector('.change__mode')
    const body = document.querySelector('.light__mode')

    changeMode.addEventListener('click', function(){
        body.classList.toggle('dark__mode')
    })

    changeMode.addEventListener('click', function(){
        changeMode.classList.toggle('bx__sun')
    })
}