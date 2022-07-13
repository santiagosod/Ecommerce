import { items } from '../dataProduct/data.js'
import { cart, Container} from './cart.js'
import { currency } from '../currency/currency.js'

export const data = {
    items: window.localStorage.getItem('products') ? JSON.parse(window.localStorage.getItem('products')) : items,
    methods: {
        find: (id) => {
            return data.items.find(item => item.id === id)
        },
        getAll: () => {
            return data.items
        },
        remove: (item) => {
            item.forEach(item => {
                const product = data.methods.find(item.id)
                product.stock = product.stock - item.stock
            });
        }
    }

}

export function mainCart (){
    const productsContent = document.querySelector('.products__content')
    const products = data.methods.getAll()
    let html = ''

    products.forEach(product => {
        html +=`
        <article class="product__card ${product.name}">
                        <div class="product__img">
                            <img src="${product.image}" alt="${product.name}" class='img'>
                        </div>
                        <div class="product__data">
                            <div class="product__price">
                                <h2 class='price'>${currency(product.price)} </h2>
                                <span class='stock'>| Stock: ${product.stock}</span>
                            </div>
                            <div class="product__name">
                                <h2 class='name'>${product.name}</h2>
                            </div>
                            <button class="button product__button" data-id="${product.id}">
                                <i class="bx bx__plus">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4C11.4477 4 11 4.44772 11 5V11H5C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13H11V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V13H19C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11H13V5C13 4.44772 12.5523 4 12 4Z" fill="currentColor" /></svg>
                                </i>
                            </button>
                        </div>
                    </article>`
    });

    productsContent.innerHTML = html

    const productButton = document.querySelectorAll('.product__button')

    productButton.forEach(btn => {
        btn.addEventListener('click', function () {
            const id = parseInt(btn.getAttribute('data-id'))
            const product = data.methods.find(id)

            console.log(id);

            if (product && product.stock > 0) {
                cart.methods.add(id, 1)
                Container()
            } else {
                window.alert('Out of stock')
            }
        })
    });
    
    window.localStorage.setItem('products', JSON.stringify(data.items))
}