import { data, mainCart }  from './products.js'
import { currency } from '../currency/currency.js'

export const cart = {
    items: window.localStorage.getItem('cart') ? JSON.parse(window.localStorage.getItem('cart')) : [],
    methods: {
        add: (id, stock) => {
            const item = cart.methods.get(id);

            if (item) {
                if (cart.methods.hasInventory(id, stock + item.stock)) {
                    item.stock += stock
                } else {
                    window.alert('Not in stock')
                }
            } else {
                cart.items.push({ id, stock })
            }
        },
        remove: (id, stock) => {
            const item = cart.methods.get(id);

            if(item.stock - stock > 0){
                item.stock -= stock
            } else {
                cart.items = cart.items.filter(item => item.id !== id)
            }
        },
        removeAll: (id) => {
            cart.items = cart.items.filter(item => item.id !== id)
        },
        count: () => {
            return cart.items.reduce((acc, item) => acc + item.stock, 0)
        },
        get: (id) => {
            const index = cart.items.findIndex(item => item.id === id)
            return index >= 0 ? cart.items[index] : null
        },
        getAll: () => {
            return cart.items
        },
        getTotal: () => {
            const total = cart.items.reduce((acc, item) => {
                const dataTotal = data.methods.find(item.id)
                return acc + (dataTotal.price * item.stock)
            }, 0)
            return total
        },
        hasInventory: (id, stock) => {
            return data.methods.find(id).stock - stock >= 0
        },
        purchase: () => {
            data.methods.remove(cart.items)
            cart.items = [];
        }
    }
}

export function Container () {
    const cartContainer = document.querySelector('.cart__container')
    const cartItems = cart.methods.getAll()
    let html = ''

    if (cartItems.length > 0) {
        cartItems.forEach(item => {
            const product = data.methods.find(item.id)
            html += `
            <div class="cart__card">

                <div class="card__img">
                    <img src="${product.image}" alt="${product.name}" class="img">
                </div>

                <div class="card__descr">
                    <h4>${product.name}</h4>
                    <div class="card__price">
                        <p class="card__stock">Stock: ${product.stock} | <span class="cost">${currency(product.price)}</span></p>
                    </div>

                    <div class="subtotal">
                        <p>Subtotal: ${currency(item.stock * product.price)}</p>
                    </div>

                    <div class="card__amount">
                        <div class="card__item__amount">
                            <div class="btn__minus" data-id="${product.id}">
                                <i class="minus"  >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 12C4 11.4477 4.44772 11 5 11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H5C4.44772 13 4 12.5523 4 12Z" fill="currentColor" /></svg>
                                </i>
                            </div>
                            <p class="amount">${item.stock}</p>
                            <div class="btn__plus"  data-id="${product.id}">
                                <i class="plus">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4C11.4477 4 11 4.44772 11 5V11H5C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13H11V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V13H19C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11H13V5C13 4.44772 12.5523 4 12 4Z" fill="currentColor" /></svg>
                                </i>
                            </div>
                        </div>
                        <i class="btn__trash" data-id='${product.id}'>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M17 6V5C17 3.89543 16.1046 3 15 3H9C7.89543 3 7 3.89543 7 5V6H4C3.44772 6 3 6.44772 3 7C3 7.55228 3.44772 8 4 8H5V19C5 20.6569 6.34315 22 8 22H16C17.6569 22 19 20.6569 19 19V8H20C20.5523 8 21 7.55228 21 7C21 6.44772 20.5523 6 20 6H17ZM15 5H9V6H15V5ZM17 8H7V19C7 19.5523 7.44772 20 8 20H16C16.5523 20 17 19.5523 17 19V8Z" fill="currentColor" /></svg>
                        </i>
                    </div>
                </div>
            </div>`
        });
    } else {
        html = `
        <div class="cart__empty">
                <img src="./images/empty-cart.png" alt="empty cart">
                <h2>Your cart is empty</h2>
                <p>you can add items to your cart ny clicking on the '<i><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4C11.4477 4 11 4.44772 11 5V11H5C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13H11V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V13H19C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11H13V5C13 4.44772 12.5523 4 12 4Z" fill="currentColor" /></svg></i>' button on the product page</p>
            </div>`
    }

    cartContainer.innerHTML = html

    const cartCount = document.querySelector('.cart__count')
    const itemCount = document.querySelector('.item__count')

    cartCount.innerHTML = cart.methods.count()
    itemCount.innerHTML = cart.methods.count()

    const btnMinus = document.querySelectorAll('.btn__minus')
    const btnPlus = document.querySelectorAll('.btn__plus')
    const btnTrash = document.querySelectorAll('.btn__trash')
    const cartTotal = document.querySelector('.cart__prices__total')
    const checkBtn = document.querySelector('.cart__btn')

    btnMinus.forEach(item => {
        item.addEventListener('click', function () {
            const id = parseInt(item.getAttribute('data-id'))
            cart.methods.remove(id, 1)
            Container()
        })
    });

    btnPlus.forEach(item => {
        item.addEventListener('click', function () {
            const id = parseInt(item.getAttribute('data-id'))
            cart.methods.add(id, 1)
            Container()
        })
    });

    btnTrash.forEach(btn => {
        btn.addEventListener('click', function (){
            const id = parseInt(btn.getAttribute('data-id'))
            cart.methods.removeAll(id)
            Container()
        })
    });

    const totalPrice = cart.methods.getTotal()
    cartTotal.innerHTML = currency(totalPrice)

    checkBtn.addEventListener('click', function(){
        cart.methods.purchase()
        Container()
    })

    window.localStorage.setItem('cart', JSON.stringify(cart.items))
    window.localStorage.setItem('products', JSON.stringify(data.items))
}


