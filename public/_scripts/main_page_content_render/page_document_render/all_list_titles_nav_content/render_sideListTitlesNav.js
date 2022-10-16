import enable_scrollVisible_sideListTitlesNav from './enable_scrollVisible_sideListTitlesNav.js';

export default function render_sideListTitlesNav(active) {
 const allTitleInSubject = ['.sub-title', '.sub-sub-title', '.sub-sub-sub-title'];
 const getAllTitleInSubject = document.querySelectorAll(allTitleInSubject);
 const notTableContent = document.querySelector('.no-table-content');
 const sideListTopicNavContent = document.querySelector('.side-list-titles-nav-content');

 sideListTopicNavContent.innerHTML = '';

 if (getAllTitleInSubject.length != 0 && !notTableContent && active) {
  const doc_content_render_container = document.getElementById('page-content-render-container');
  const mainTitle = document.querySelector('.main-title');
  let selectedTitleElement = null;
  let urlSearchParams = new URLSearchParams(window.location.search);

  let sideListTitlesNavHTMLContent = '';
  let allList = '';
  let navTitle_className = '';

  getAllTitleInSubject.forEach((element, index) => {
   if (element.classList.contains('sub-title')) navTitle_className = 'nav-sub-title';
   if (element.classList.contains('sub-sub-title')) navTitle_className = 'nav-sub-sub-title';
   if (element.classList.contains('sub-sub-sub-title')) navTitle_className = 'nav-sub-sub-sub-title';

   allList += `<li class="${navTitle_className}"> <a id="${index}"> ${element.innerHTML} </a></li>`;
  });

  sideListTitlesNavHTMLContent = `
  <h1>Table Content</h1>
  <ul class="side-titles-list">
    ${allList}
  </ul>
 `;

  sideListTopicNavContent.innerHTML = '';

  if (mainTitle) sideListTopicNavContent.innerHTML += sideListTitlesNavHTMLContent;

  if (urlSearchParams.has('newTab')) {
   sideListTopicNavContent.classList.add('no-sidebar');
  }

  document.querySelectorAll('.side-titles-list li a').forEach((element) => {
   // disable middle click
   element.addEventListener('auxclick', (ev) => {
    if (ev.button === 1) ev.preventDefault();
   });

   // Active scroll to position when selecting a title link from nav
   element.addEventListener('click', (ev) => {
    ev.preventDefault();
    selectedTitleElement = document.getElementById(`title-${ev.target.id}`);
    doc_content_render_container.scrollTo(0, selectedTitleElement.offsetTop);
   });
  });
 }

 // if (window.innerWidth > 1800) {
 setTimeout(() => {
  enable_scrollVisible_sideListTitlesNav(active);
 }, 1000);
 // }
}
