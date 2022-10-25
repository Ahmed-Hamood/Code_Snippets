import { eventInvoker } from "./utilities/other_utilities.js";

export default function modal_interact_manage() {
 let blank_modal = document.getElementById('blank-modal');
 let body = document.body;

 const options_menu_container = document.querySelector('.options-menu-container');
 let main_list_titles_nav_sticky_content = null;

 blank_modal.addEventListener('click', () => {
  if (body.getAttribute('blank-current-active') == 'sidebar') {
    eventInvoker(".close-sideMenu-btn")
  }

  if (body.getAttribute('blank-current-active') == 'options-menu') {
   options_menu_container.classList.add('hide');
   blank_modal.classList.remove('show-options');
   body.setAttribute('blank-current-active', '');
   setTimeout(() => {
    options_menu_container.style['display'] = 'none';
   }, 200);
  } 

  if (body.getAttribute('blank-current-active') == 'tooltip') {
   body.setAttribute('blank-current-active', '');
   blank_modal.classList.remove('show-tooltip');
   document.querySelector('.tooltip-modal').classList.remove('show');
  }

  if (body.getAttribute('blank-current-active') == 'table-content') {
   main_list_titles_nav_sticky_content = document.querySelector('.main-list-titles-nav-content.sticky');
   main_list_titles_nav_sticky_content.classList.remove("view-topics-list-menu")
   body.setAttribute('blank-current-active', '');
   blank_modal.classList.remove('show-table-content');
  }
 });
}
