export function headerScroll (){
    const header = document.querySelector('.header')

    console.log('hola');

    window.addEventListener('scroll', function(){
        if(this.window.scrollY > 20){
            header.classList.add('header__scroll')
        } else {
            header.classList.remove('header__scroll')
        }
    })
}