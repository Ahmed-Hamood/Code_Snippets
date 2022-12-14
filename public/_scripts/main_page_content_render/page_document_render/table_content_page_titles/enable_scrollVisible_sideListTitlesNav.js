let getAllSideTableTitles = null;
let titleSections = null;
let tablePosition = 0;

const EnableScrollVisibleSideListTitleNavContent = (ev) => {
 let title_name = null;
 let currentTitleSection = '0';

 if (tablePosition <= ev.target.scrollTop) {
  document.querySelector('.side-list-titles-nav-content').classList.add('show');
 } else {
  document.querySelector('.side-list-titles-nav-content').classList.remove('show');
 }

 titleSections.forEach((element, index) => {
  if (ev.target.scrollTop >= element.offsetTop - 20) {
   currentTitleSection = element.id;
  }
 });

 getAllSideTableTitles.forEach((link_title) => {
  link_title.classList.remove('nav-active');
  title_name = `title-${link_title.children[0].getAttribute('id')}`;
  if (title_name == currentTitleSection) link_title.classList.add('nav-active');
 });
};

export default function enable_scrollVisible_sideListTitlesNav(active) {
 const main_list_titles_nav_content = document.querySelector('.main_table_content_topic_page');

 if (active && main_list_titles_nav_content) {
  const allTitleInSideMenu = ['.nav-sub-title', '.nav-sub-sub-title', '.nav-sub-sub-sub-title'];
  const allTitleInDocumentContent = ['.sub-title', '.sub-sub-title', '.sub-sub-sub-title', 'get-title'];

  getAllSideTableTitles = document.querySelectorAll(allTitleInSideMenu);
  titleSections = document.querySelectorAll(allTitleInDocumentContent);

  if (main_list_titles_nav_content) tablePosition = main_list_titles_nav_content.offsetTop + main_list_titles_nav_content.offsetHeight;

  console.log('added');
  document.getElementById('page-content-render-container').addEventListener('scroll', EnableScrollVisibleSideListTitleNavContent);
 } else {
  console.log('removed');
  document.getElementById('page-content-render-container').removeEventListener('scroll', EnableScrollVisibleSideListTitleNavContent);
 }
}
