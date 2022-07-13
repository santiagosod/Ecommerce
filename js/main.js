import { navMenu } from './functions/navMenu.js'
import { navShop } from './functions/navShop.js'
import { darkMode } from './functions/darkMode.js'
import { mainCart } from './functions/products.js'
import { Container } from './functions/cart.js'
import { filter } from './functions/filter.js'
import { headerScroll } from './functions/headerScroll.js'

document.addEventListener('DOMContentLoaded', function () {
    darkMode()
    navMenu()
    navShop()
    Container()
    mainCart()
    filter()
    headerScroll()
})

