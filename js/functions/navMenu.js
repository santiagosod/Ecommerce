export function navMenu () {
    const mobileNav = document.querySelector('.mobile__nav')
    const navMenu = document.querySelector('.nav__menu')
    const navClose = document.querySelector('.nav__close')
    const navLink = document.querySelectorAll('.nav__link')

    mobileNav.addEventListener('click', function () {
        navMenu.classList.toggle('show__menu')
    })

    navClose.addEventListener('click', function (){
        navMenu.classList.remove('show__menu')
    })

    function linkClick () {
        const navMenu = document.querySelector('.nav__menu')
        navMenu.classList.remove('show__menu')
      }
     navLink.forEach(x => {
        x.addEventListener('click', linkClick)
     }); 
}

