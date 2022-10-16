export default function modal_interact_manage() {
 let blank_modal = document.getElementById('blank-modal');
 let body = document.body;
 let close_sideMenu_btn = document.querySelector('.close-sideMenu-btn');

 const options_menu_container = document.querySelector('.options-menu-container');
 let ClickEvent = new Event('click');

 blank_modal.addEventListener('click', () => {
  if (body.getAttribute('blank-current-active') == 'sidebar') {
   close_sideMenu_btn.dispatchEvent(ClickEvent);
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
   document.querySelector('.mb-tooltip-content').classList.remove('show');
  }
 });
}
