export default function doc_nav_header_active() {
 const expand_width_svg_btn = document.querySelector('.expand-width-svg-btn');
 const bodyElm = document.body;
 let DocContentRender = document.getElementById('page-content-wrapper');

//  if (bodyElm.getAttribute('max-content') == 'disabled') {
//   bodyElm.setAttribute('max-content', 'enabled');
  expand_width_svg_btn.addEventListener('click', (element) => {
   bodyElm.setAttribute('max-content', bodyElm.getAttribute('max-content') == 'true' ? 'false' : 'true');
   element.target.children[0].classList.toggle('shrink-width-svg');

   DocContentRender.setAttribute('id', '');
   void DocContentRender.offsetWidth;
   DocContentRender.setAttribute('id', 'page-content-wrapper');
  });
//  }
}
