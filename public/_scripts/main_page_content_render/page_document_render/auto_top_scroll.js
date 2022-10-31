export default function auto_top_scroll() {
 let page_content_render_container = document.getElementById('page-content-render-container');
 let auto_top_scroll_btn = document.querySelector('.auto-top-scroll');

 const mainTitle = document.querySelector('.main-title');
 const getAllTitleInSubject = document.querySelectorAll(['.sub-title', '.sub-sub-title', '.sub-sub-sub-title']);

 if (!mainTitle || [...getAllTitleInSubject].length == 0) {
  auto_top_scroll_btn.style['display'] = 'none';
  return
 }

 auto_top_scroll_btn.addEventListener('click', () => {
  page_content_render_container.scrollTop = 0;
 });

 

//  if (auto_top_scroll_btn && page_content_render_container) {

//   if (page_content_render_container.scrollHeight >= page_content_render_container.clientHeight) {

//    auto_top_scroll_btn.addEventListener('click', () => {
//     page_content_render_container.scrollTop = 0;
//     console.log("ddddddddddddddddddd");
//    });

//   } else {
//   //  auto_top_scroll_btn.style['display'] = 'none';
//   }

//   // double click on page_content_render_container to scroll to the maximum bottom
//   if (window.innerWidth > 800) {
//    page_content_render_container.addEventListener('dblclick', (ev) => {
//     if (ev.target.id == 'page-content-render-container') {
//      page_content_render_container.scrollTo(0, page_content_render_container.scrollHeight);
//     }
//    });
//   }
//  }
}
