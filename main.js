//@TODO Need to connect this to the site and edit the gulp file to manage these js files.




//Event Listener for Mobile Menu
const menuBar = document.querySelector('.mobile-menu-icon');

menuBar.addEventListener("click",()=>{
    const mobMenu = document.querySelector('.mobile-menu-link-container');
    mobMenu.style.display = mobMenu.style.display === 'none' ? 'inherit' : 'none';
});


