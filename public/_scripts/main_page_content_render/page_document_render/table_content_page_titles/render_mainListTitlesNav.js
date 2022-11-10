import { eventInvoker } from '../../../utilities/other_utilities.js';
import enable_scrollVisible_MainListTitlesNav from './enable_scrollVisible_MainListTitlesNav.js';

let topic_menu_btn = document.querySelector('.titles-list-menu-active-btn');
let blank_modal = document.getElementById('blank-modal');
let bodyElement = document.body;

export default function render_mainListTitlesNav(active) {
 const getAllTitleInSubject = document.querySelectorAll(['.sub-title', '.sub-sub-title', '.sub-sub-sub-title']);

 const disableTableContent = document.querySelector('.no-table-content');
 const hasTableContent = document.querySelector('.table-content');

 if ([...getAllTitleInSubject].length == 0 || disableTableContent) active = false;

 setTimeout(() => enable_scrollVisible_MainListTitlesNav(active), 1000);

 if (!active || disableTableContent) return;

 const doc_content_render_container = document.getElementById('page-content-render-container');
 const mainTitle = document.querySelector('.main-title');
 let selectedTitleElement = null;
 let get_sticky_table_content_topic_page = null;
 let get_all_list_titles = null;
 let get_list_titles_length = null;

 let mainListTitlesContentHTML = '';

 let allList = '';
 let navTitle_className = '';
 let delayTitleMS = 140;

 topic_menu_btn.classList.remove('view');

 getAllTitleInSubject.forEach((element, index) => {
  if (element.classList.contains('sub-title')) navTitle_className = 'nav-sub-title';
  if (element.classList.contains('sub-sub-title')) navTitle_className = 'nav-sub-sub-title';
  if (element.classList.contains('sub-sub-sub-title')) navTitle_className = 'nav-sub-sub-sub-title';
  element.id = `title-${index}`;
  allList += `<li class="${navTitle_className}"> <a id="${index}"> ${element.innerHTML} </a></li>`;
 });

 mainListTitlesContentHTML = `
   <div class="main_table_content_topic_page">
      <h1>Table Content</h1>
      <ul class="titles_list_content">
        ${allList}
      </ul>
    </div>

    <div class="sticky_table_content_topic_page">
      <h1>Table Content</h1> 
        <ul class="titles_list_content">
          ${allList}
        </ul>
   </div>
   `;

 if (hasTableContent) {
  hasTableContent.innerHTML = mainListTitlesContentHTML;
 } else {
  //  if (mainTitle)
  mainTitle.insertAdjacentHTML('afterend', mainListTitlesContentHTML);
 }

 get_sticky_table_content_topic_page = document.querySelector('.sticky_table_content_topic_page');
 get_all_list_titles = document.querySelectorAll('.titles_list_content li');
 get_list_titles_length = document.querySelectorAll('.main_table_content_topic_page li').length;

 // disable middle click on table content list > ul.titles_list.main li a
 get_all_list_titles.forEach((element) => {
  element = element.children[0];
  // disable middle click
  element.addEventListener('auxclick', (ev) => {
   if (ev.button === 1) ev.preventDefault();
  });

  // Hide top topic menu on small device when you click on any topic links
  // Active scroll to position when selecting a title link from nav
  element.addEventListener('click', (ev) => {
   ev.preventDefault();
   // get_sticky_table_content_topic_page.classList.remove('view_sticky_table_content');
   eventInvoker('#blank-modal');
   selectedTitleElement = document.getElementById(`title-${ev.target.id}`);
   doc_content_render_container.scrollTo(0, selectedTitleElement.offsetTop);
  });
 });

 delayTitleMS = get_list_titles_length > 20 ? 70 : delayTitleMS;

 setTimeout(() => {
  // animation effect
  get_all_list_titles.forEach((element, index) => {
   element.style.setProperty('--delay', `${index * delayTitleMS}ms`);
  });
 }, 1200);

 // enable topic doc content menu button - view

 topic_menu_btn.addEventListener('click', () => {
  get_sticky_table_content_topic_page.classList.toggle('view_sticky_table_content');
  blank_modal.classList.add('show-table-content');
  bodyElement.setAttribute('blank-current-active', 'table-content');
  navigator.vibrate(1);
 });
}
