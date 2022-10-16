let tablePosition = 0;

export default function enable_scrollVisible_MainListTitlesNav(active) {
 if (active) {
  const main_list_titles_nav_content = document.querySelector('.main-list-titles-nav-content');
  if (main_list_titles_nav_content) {
   tablePosition = main_list_titles_nav_content.offsetTop + main_list_titles_nav_content.offsetHeight;
  }
  document.getElementById('page-content-render-container').addEventListener('scroll', EnableScrollVisibleStickyMainListTitleNavContent);
 } else {
  document.getElementById('page-content-render-container').removeEventListener('scroll', EnableScrollVisibleStickyMainListTitleNavContent);
 }
}

function EnableScrollVisibleStickyMainListTitleNavContent(e) {
 if (tablePosition <= e.target.scrollTop) {
  document.querySelector('.titles-list-menu-active-btn')?.classList.add('view');
  document.querySelector('.main-list-titles-nav-content.sticky')?.classList.remove('no-display');
 } else {
  document.querySelector('.titles-list-menu-active-btn').classList.remove('view');
  document.querySelector('.main-list-titles-nav-content.sticky')?.classList.add('no-display');
  document.querySelector('.main-list-titles-nav-content.sticky')?.classList.remove('view-topics-list-menu');
 }
}
