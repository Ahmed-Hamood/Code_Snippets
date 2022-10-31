export default function sideBarMenuShrinkBtn() {
 // on application startup with screen size less than 1000 hide the main content
 let sideBar = document.querySelector('.sideBar');
 let sideBarContainer = document.querySelector('.sideBar-container');
 let bodyElement = document.body;

 let close_sideMenu_btn = document.querySelector('.close-sideMenu-btn');
 let open_sideMenu_btn = document.querySelector('.open-sidebar-btn');

 let blank_modal = document.getElementById('blank-modal');
 let isDragCompleted = false;

 let open_sideMenu_btn_cb = (e) => {
  bodyElement.setAttribute('sidebar', 'true');
  sideBar.classList.add('sideBar-slide');
  sideBar.classList.remove('sideBar-slide-reverse');
  sideBar.classList.remove('no-sideBar');
  sideBarContainer.classList.remove('hide');
  
  if (window.innerWidth < 1200) {
   sideBar.style['display'] = 'block';
   open_sideMenu_btn.style['display'] = 'none';
   setTimeout(() => bodyElement.setAttribute('blank-current-active', 'sidebar'), 100);
   blank_modal.classList.add('show-sidebar-menu');
   navigator.vibrate(3);
  }
 };

 let close_sideMenu_btn_cb = () => {
  sideBar.classList.add('sideBar-slide-reverse');
  sideBar.classList.remove('sideBar-slide');
  bodyElement.setAttribute('sidebar', 'false');

  if (window.innerWidth < 1200) {
   blank_modal.classList.remove('show-sidebar-menu'); // for close button
   bodyElement.setAttribute('blank-current-active', '');
   navigator.vibrate(1);
   open_sideMenu_btn.style['left'] = '';
  } else {
   sideBarContainer.classList.add('hide');
  }

  open_sideMenu_btn.style['display'] = '';
  open_sideMenu_btn.style['pointer-events'] = 'none';

  setTimeout(() => {
   sideBar.style['display'] = '';
   sideBar.classList.add('no-sideBar');
   open_sideMenu_btn.style['pointer-events'] = '';
  }, 1000);
 };

 if (window.innerWidth > 1000) {
  open_sideMenu_btn.addEventListener('click', open_sideMenu_btn_cb);
 } else {
  open_sideMenu_btn.addEventListener('click', open_sideMenu_btn_cb);

  open_sideMenu_btn.addEventListener('touchend', () => {
   if (isDragCompleted) {
    open_sideMenu_btn_cb();
    isDragCompleted = false;
    open_sideMenu_btn.style['left'] = '';
   }
  });

  open_sideMenu_btn.addEventListener('touchmove', (e) => {
   open_sideMenu_btn.style['left'] = 0;
   if (e.changedTouches[0].clientX > 25) {
    open_sideMenu_btn.style['left'] = 0;
    isDragCompleted = true;
   }
   if (e.changedTouches[0].clientX < 50) {
    open_sideMenu_btn.style['left'] = '';
    isDragCompleted = false;
   }
  });
 }

 close_sideMenu_btn.addEventListener('click', close_sideMenu_btn_cb);
}

function isMobile() {
 const toMatch = [/Android/i, /webOS/i, /iPhone/i, /iPad/i, /iPod/i, /BlackBerry/i, /Windows Phone/i];

 return toMatch.some((toMatchItem) => {
  return navigator.userAgent.match(toMatchItem);
 });
}
