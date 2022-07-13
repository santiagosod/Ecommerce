export function filter (){
    const showAll = document.querySelector('.all')
    const filterHoodies = document.querySelector('.hoodies')
    const filterShirts = document.querySelector('.shirts')
    const filterSweatshirts = document.querySelector('.sweatshirts')

    const hoodies = document.querySelector('.Hoodies')
    const shirts = document.querySelector('.Shirts')
    const sweatshirts = document.querySelector('.Sweatshirts')

    filterHoodies.addEventListener('click', function(){
        shirts.classList.add('filter')
        sweatshirts.classList.add('filter')
        hoodies.classList.remove('hidden')
        setTimeout(function(){
            shirts.classList.add('hidden')
            sweatshirts.classList.add('hidden')
            hoodies.classList.remove('filter')
        }, 100);
    })

    filterShirts.addEventListener('click', function(){
        hoodies.classList.add('filter')
        sweatshirts.classList.add('filter')
        shirts.classList.remove('hidden')
        setTimeout(function(){
            hoodies.classList.add('hidden')
            sweatshirts.classList.add('hidden');
            shirts.classList.remove('filter')
        }, 100);
    })

    filterSweatshirts.addEventListener('click', function(){
        hoodies.classList.add('filter')
        shirts.classList.add('filter')
        sweatshirts.classList.remove('hidden')
        setTimeout(function(){
            hoodies.classList.add('hidden')
            shirts.classList.add('hidden');
            sweatshirts.classList.remove('filter')
        }, 100);
    })

    showAll.addEventListener('click', function(){
        hoodies.classList.remove('hidden')
        shirts.classList.remove('hidden')
        sweatshirts.classList.remove('hidden')
        setTimeout(function(){
            hoodies.classList.remove('filter')
            shirts.classList.remove('filter')
            sweatshirts.classList.remove('filter')
        }, 0);
    })

    
}