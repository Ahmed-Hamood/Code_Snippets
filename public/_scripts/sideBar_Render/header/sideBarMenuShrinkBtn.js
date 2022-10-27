export default function sideBarMenuShrinkBtn() {
 // on application startup with screen size less than 1000 hide the main content
 let sideBar = document.querySelector('.sideBar');
 let sideBarContainer = document.querySelector('.sideBar-container');
 let bodyElement = document.body;

 let close_sideMenu_btn = document.querySelector('.close-sideMenu-btn');
 let open_sideMenu_btn = document.querySelector('.open-sidebar-btn');

 let blank_modal = document.getElementById('blank-modal');

 let open_sideMenu_btn_cb = () => {
  sideBar.classList.remove('no-sideBar');
  sideBar.classList.add('sideBar-slide');
  sideBar.classList.remove('sideBar-slide-reverse');
  bodyElement.setAttribute('sidebar', 'true');

  if (window.innerWidth < 1200) {
   sideBar.style['display'] = 'block';
   bodyElement.setAttribute('blank-current-active', 'sidebar');
   setTimeout(() => blank_modal.classList.add('show-sidebar-menu'), 50);
   open_sideMenu_btn.style['pointer-events'] = 'none';
   open_sideMenu_btn.style['display'] = 'none';
   navigator.vibrate(3);
  }

  sideBarContainer.classList.remove('hide');
 };

 let close_sideMenu_btn_cb = () => {
  sideBar.classList.add('sideBar-slide-reverse');
  sideBar.classList.remove('sideBar-slide');
  bodyElement.setAttribute('sidebar', 'false');

  if (window.innerWidth < 1200) {
   blank_modal.classList.remove('show-sidebar-menu');
   bodyElement.setAttribute('blank-current-active', '');
   navigator.vibrate(1);
  } else {
   sideBarContainer.classList.add('hide');
  }

  open_sideMenu_btn.style['display'] = '';

  setTimeout(() => {
   sideBar.classList.add('no-sideBar');
   open_sideMenu_btn.style['pointer-events'] = '';
  }, 500);
 };

 if (window.innerWidth > 1000) {
  open_sideMenu_btn.addEventListener('click', open_sideMenu_btn_cb);
 } else {
  open_sideMenu_btn.addEventListener('click', open_sideMenu_btn_cb);
  open_sideMenu_btn.addEventListener('touchend', open_sideMenu_btn_cb);
 }

 close_sideMenu_btn.addEventListener('click', close_sideMenu_btn_cb);
}
