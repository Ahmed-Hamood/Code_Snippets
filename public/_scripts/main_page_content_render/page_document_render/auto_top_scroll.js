export default function auto_top_scroll() {
 let doc_content_render_container = document.getElementById('page-content-render-container');
 let auto_top_scroll_btn = document.querySelector('.auto-top-scroll');

 if (auto_top_scroll_btn && doc_content_render_container) {
  if (doc_content_render_container.scrollHeight > doc_content_render_container.clientHeight) {
   auto_top_scroll_btn.addEventListener('click', () => {
    doc_content_render_container.scrollTop = 0;
   });
  } else {
   auto_top_scroll_btn.style['display'] = 'none';
  }

  // double click on doc_content_render_container to scroll to the maximum bottom
  if (window.innerWidth > 800) {
   doc_content_render_container.addEventListener('dblclick', (ev) => {
    if (ev.target.id == 'page-content-render-container') {
     doc_content_render_container.scrollTo(0, doc_content_render_container.scrollHeight);
    }
   });
  }
 }
}
