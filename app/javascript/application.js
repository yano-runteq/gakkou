// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
//= require jquery
import "controllers"

// ハンバーガーメニューの表示・非表示
const hamburgerMenuBtnEl = document.getElementById("hamburgerMenuBtn");
const menuContentEl = document.getElementById("menuContent");
function existLeft(el) { el.style.left = "-400%"; }
hamburgerMenuBtnEl.addEventListener("click", () => {
  if (menuContentEl.style.opacity == 0) {
    menuContentEl.style.left = "10px";
    menuContentEl.style.opacity = 1;
  } else {
    menuContentEl.style.opacity = 0;
    setTimeout(existLeft, 200, menuContentEl);
  }
})
document.addEventListener("click", (e) => {
  if (!e.target.closest("#menuContent") && e.target !== hamburgerMenuBtnEl) { 
    menuContentEl.style.opacity = 0;
    setTimeout(existLeft, 200, menuContentEl); }
})
