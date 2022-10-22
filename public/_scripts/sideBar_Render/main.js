import EmbeddingAllSubjectsIntoSidebarMenuList from '../../Subjects_list/import_create_menu_list.js';
import EnableSidebarMenuListEventListener from './menu/EnableSidebarMenuListEventListener.js';
import sideBarMenuShrinkBtn from './header/sideBarMenuShrinkBtn.js';
import homeBtnActive from './menu/homeBtnActive.js';

const urlSearchParams = new URLSearchParams(window.location.search);

export default function startup_SideBarRender() {
 if (!urlSearchParams.has('newTab')) {
  EmbeddingAllSubjectsIntoSidebarMenuList();
  EnableSidebarMenuListEventListener();
  sideBarMenuShrinkBtn();
  homeBtnActive();
  console.log('Startup SideBar Render');
 }
}

// #############################################################
// The following :-
// Shortcuts
// #############################################################

window.addEventListener('keyup', function (event) {
 // switch theme when press Shift + T Key
 if (event.shiftKey && event.key == 'T') {
  document.querySelector('html').toggleAttribute('light-theme');
 }

 // invoke the searchIcon click when press Shift + S
 //  if (event.shiftKey && event.key == 'S') {
 //   let iconClick = document.querySelector('.search-btn');
 //   iconClick.dispatchEvent(new Event('click'));
 //   document.querySelector('.search-input').value = '';
 //  }

 // When press Shift + S Key
 // SideBar will shrink
 if (event.shiftKey && event.key == 'M') {
  let menuIconClickEvent = new Event('click');
  let close_side_btn = document.querySelector('.close-sideMenu-btn');
  let open_sidebar_btn = document.querySelector('.open-sidebar-btn');

  if (document.body.getAttribute('sidebar') == 'true') close_side_btn.dispatchEvent(menuIconClickEvent);
  else open_sidebar_btn.dispatchEvent(menuIconClickEvent);
 }
});
