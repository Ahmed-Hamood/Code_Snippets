export default function sideBarMenuShrinkBtn() {
 // on application startup with screen size less than 1000 hide the main content
 let sideBar = document.querySelector('.sideBar');
 let sideBarContainer = document.querySelector('.sideBar-container');
 let bodyElement = document.body;

 let close_sideMenu_btn = document.querySelector('.close-sideMenu-btn');
 let open_sideMenu_btn = document.querySelector('.open-sidebar-btn');

 let blank_modal = document.getElementById('blank-modal');

 let open_sideMenu_btn_cb = () => {
 
  sideBar.classList.toggle('no-sideBar');
  sideBar.classList.add('sideBar-slide');
  sideBar.classList.remove('sideBar-slide-reverse');
  bodyElement.setAttribute('sidebar', 'true');

  if (window.innerWidth < 900) {
   bodyElement.setAttribute('blank-current-active', 'sidebar');
   setTimeout(() => blank_modal.classList.add('show-sidebar-menu'), 50);
  }

  setTimeout(() => sideBarContainer.classList.remove('hide'), 400);
  navigator.vibrate(3);
 };

 let close_sideMenu_btn_cb = () => {
  sideBarContainer.classList.add('hide');
  sideBar.classList.add('sideBar-slide-reverse');
  sideBar.classList.remove('sideBar-slide');

  bodyElement.setAttribute('sidebar', 'false');

  if (window.innerWidth < 900) {
   blank_modal.classList.remove('show-sidebar-menu');
   bodyElement.setAttribute('blank-current-active', '');
  }

  setTimeout(() => sideBar.classList.toggle('no-sideBar'), 400);
  navigator.vibrate(1);
 };

 if (window.innerWidth > 1000) {
  open_sideMenu_btn.addEventListener('click', open_sideMenu_btn_cb);
 } else {
  open_sideMenu_btn.addEventListener('touchend', open_sideMenu_btn_cb);
 }

 close_sideMenu_btn.addEventListener('click', close_sideMenu_btn_cb);
}
