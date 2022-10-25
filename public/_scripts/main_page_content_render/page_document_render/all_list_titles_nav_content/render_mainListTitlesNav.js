import enable_scrollVisible_MainListTitlesNav from './enable_scrollVisible_MainListTitlesNav.js';

export default function render_mainListTitlesNav(active) {
 const allTitleInSubject = ['.sub-title', '.sub-sub-title', '.sub-sub-sub-title'];
 const getAllTitleInSubject = document.querySelectorAll(allTitleInSubject);
 const notTableContent = document.querySelector('.no-table-content');

 if (getAllTitleInSubject.length != 0 && !notTableContent && active) {
  const doc_content_render_container = document.getElementById('page-content-render-container');
  const hasTableContent = document.querySelector('.table-content');
  const mainTitle = document.querySelector('.main-title');
  let selectedTitleElement = null;

  let topic_menu_btn = null;
  let main_list_titles_nav_sticky_content = null;
  let main_titles_list = null;

  let mainListTitlesContentHTML = '';

  let allList = '';
  let navTitle_className = '';
  let delayTitleMS = 140;

  getAllTitleInSubject.forEach((element, index) => {
   if (element.classList.contains('sub-title')) navTitle_className = 'nav-sub-title';
   if (element.classList.contains('sub-sub-title')) navTitle_className = 'nav-sub-sub-title';
   if (element.classList.contains('sub-sub-sub-title')) navTitle_className = 'nav-sub-sub-sub-title';
   element.id = `title-${index}`;
   allList += `<li class="${navTitle_className}"> <a id="${index}"> ${element.innerHTML} </a></li>`;
  });

  mainListTitlesContentHTML = `
   <div class="main-list-titles-nav-content">
      <h1>Table Content</h1>
      <ul class="main-titles-list main">
        ${allList}
      </ul>
    </div>

    <div class="main-list-titles-nav-content sticky">
      <h1>Table Content</h1>
      <ul class="main-titles-list">
        ${allList}
      </ul>
   </div>
   `;

  if (hasTableContent) {
   hasTableContent.innerHTML = mainListTitlesContentHTML;
  } else {
   if (mainTitle) mainTitle.insertAdjacentHTML('afterend', mainListTitlesContentHTML);
  }

  topic_menu_btn = document.querySelector('.titles-list-menu-active-btn');
  main_list_titles_nav_sticky_content = document.querySelector('.main-list-titles-nav-content.sticky');
  main_titles_list = document.querySelectorAll('.main-titles-list.main li');

  // disable middle click on table content list > ul.main-titles-list.main li a
  main_titles_list.forEach((element) => {
   element = element.children[0];
   // disable middle click
   element.addEventListener('auxclick', (ev) => {
   if (ev.button === 1) ev.preventDefault();
   });

   // Hide top topic menu on small device when you click on any topic links
   // Active scroll to position when selecting a title link from nav
   element.addEventListener('click', (ev) => {
    ev.preventDefault();
    main_list_titles_nav_sticky_content.classList.remove('view-topics-list-menu');
    selectedTitleElement = document.getElementById(`title-${ev.target.id}`);
    doc_content_render_container.scrollTo(0, selectedTitleElement.offsetTop);
   });
  });

  delayTitleMS = main_titles_list.length > 20 ? 70 : delayTitleMS

  setTimeout(() => {
   // animation effect
   main_titles_list.forEach((element, index) => {
    element.style.setProperty('--delay', `${index * delayTitleMS}ms`);
   });
  }, 1200);

  // enable topic doc content menu button - view

  topic_menu_btn.addEventListener('click', () => {
   main_list_titles_nav_sticky_content.classList.toggle('view-topics-list-menu');
   navigator.vibrate(1);
  });
 }

 // if (window.innerWidth < 1800) {
 setTimeout(() => {
  enable_scrollVisible_MainListTitlesNav(active);
 }, 1000);
 // }
}
