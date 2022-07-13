export function navShop (){
    const navShop = document.querySelector('.nav__shop')
    const cart = document.querySelector('.cart')
    const cartClose = document.querySelector('.cart__close')

    navShop.addEventListener('click', function(){
        cart.classList.toggle('show__cart')
    })

    cartClose.addEventListener('click', function(){
        cart.classList.remove('show__cart')
    })
}