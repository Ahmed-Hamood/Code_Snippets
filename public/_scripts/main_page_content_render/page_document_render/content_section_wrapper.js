export default function content_section_wrapper() {
 let main_title = document.querySelector('.main-title');
 let all_sub_titles = document.querySelectorAll(['.sub-title', '.sub-sub-title']);

 if ([...all_sub_titles].length != 0) {
  if (main_title) main_title.setAttribute('All-Expand', 'true');

  // when you click on main-title all below titles expand
  main_title.addEventListener('click', (ev) => {
   if (ev.target.getAttribute('All-Expand') == 'true') {
    all_sub_titles.forEach((element) => element.classList.add('hide-content'));
    ev.target.setAttribute('All-Expand', 'false');
   } else {
    all_sub_titles.forEach((element) => element.classList.remove('hide-content'));
    ev.target.setAttribute('All-Expand', 'true');
   }
  });

  all_sub_titles.forEach((element) => {
   element.addEventListener('click', () => {
    element.classList.toggle('hide-content');
   });
  });
 }
}
