function openMenu() {
    if(document.getElementById("dropdown-list").style.display == "flex") {
        document.getElementById("dropdown-list").style.display = "none";
    }
    else {
        document.getElementById("dropdown-list").style.display = "flex";
    } 
}
function closeMenu() {
    if(window.innerWidth >= 640) {
        document.getElementById("dropdown-list").style.display = "none";
    }
}
document.getElementById("menu-dropdown").addEventListener("mouseover", openMenu);
document.getElementById("dropdown-list").addEventListener("mouseleave", openMenu);
window.addEventListener("resize", closeMenu);