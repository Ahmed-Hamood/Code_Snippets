let tablePosition = 0;
let page_content_render = document.getElementById('page-content-render-container');

const EnableScrollVisibleStickyMainListTitleNavContent = (event) => {
 if (tablePosition <= event.target.scrollTop) document.querySelector('.titles-list-menu-active-btn')?.classList.add('view');
 else document.querySelector('.titles-list-menu-active-btn').classList.remove('view');
};

export default function enable_scrollVisible_MainListTitlesNav(active) {
 if (active) {
  const main_list_titles_nav_content = document.querySelector('.main_table_content_topic_page');

  if (main_list_titles_nav_content) tablePosition = main_list_titles_nav_content.offsetTop + main_list_titles_nav_content.offsetHeight;
  console.log('Add main table content scroll listener');
  page_content_render.addEventListener('scroll', EnableScrollVisibleStickyMainListTitleNavContent);
 } else {
  console.log('remove main table content scroll listener');
  page_content_render.removeEventListener('scroll', EnableScrollVisibleStickyMainListTitleNavContent);
 }
}
