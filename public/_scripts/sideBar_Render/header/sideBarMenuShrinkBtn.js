import { RenderPageContent } from '../../pageLoader.js';

export default function sideBarMenuShrinkBtn() {
 // on application startup with screen size less than 1000 hide the main content
 let sideBar = document.querySelector('.sideBar');
 let sideBarContainer = document.querySelector('.sideBar-container');
 let body = document.body;

 let close_sideMenu_btn = document.querySelector('.close-sideMenu-btn');
 let open_sideMenu_btn = document.querySelector('.open-sidebar-btn');
 let HomeBtn = document.querySelector('.home-btn-content');

 let blank_modal = document.getElementById('blank-modal');

 close_sideMenu_btn.addEventListener('click', () => {
  sideBarContainer.classList.add('hide');
  sideBar.classList.add('sideBar-slide-reverse');
  sideBar.classList.remove('sideBar-slide');

  body.setAttribute('sidebar', 'false');

  if (window.innerWidth < 900) {
   blank_modal.classList.remove('show-menu');
   body.setAttribute('blank-current-active', '');
  }

  setTimeout(() => sideBar.classList.toggle('no-sideBar'), 400);
  navigator.vibrate(1);
 });

 open_sideMenu_btn.addEventListener('click', () => {
  sideBar.classList.toggle('no-sideBar');
  sideBar.classList.add('sideBar-slide');
  sideBar.classList.remove('sideBar-slide-reverse');
  body.setAttribute('sidebar', 'true');

  if (window.innerWidth < 900) {
   blank_modal.classList.add('show-menu');
   body.setAttribute('blank-current-active', 'sidebar');
  }

  setTimeout(() => sideBarContainer.classList.remove('hide'), 400);
  navigator.vibrate(3);
 });

 HomeBtn.addEventListener('click', () => {
  if (location.href != `${location.origin}/`) {
   RenderPageContent(location.origin, false, false, false, true);
  }
 });
}
