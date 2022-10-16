// the following :-
// display search input when user clicks on search icon
// and change the search icon on click into close icon

export default function sidebarSearchBtn() {
 let searchBtn = document.querySelector('.search-btn');
 let menuBtnContent = document.querySelector('.menu-btn-content');
 let headerTitle = document.querySelector('.side-title-header');
 let menuHeaderTimeout;

 if (searchBtn) {
  searchBtn.addEventListener('click', (ev) => {
   let inputElement = ev.target.nextElementSibling;
   inputElement.classList.toggle('view');

   if (menuBtnContent.classList.contains('no-display')) menuHeaderTimeout = 300;
   else menuHeaderTimeout = 0;

   setTimeout(() => {
    menuBtnContent.classList.toggle('no-display');
    headerTitle.classList.toggle('no-display');
   }, menuHeaderTimeout);

   if (inputElement.classList.contains('view')) {
    ev.target.className = 'svg close-svg search-btn';
    inputElement.focus();
    ev.target.parentElement.style['border'] = 'none';
   } else {
    ev.target.className = 'svg search-svg search-btn';
    inputElement.value = '';
    ev.target.parentElement.style['border'] = '';
   }
  });
 }
}
