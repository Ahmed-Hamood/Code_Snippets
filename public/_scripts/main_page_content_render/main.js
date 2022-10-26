import tabsSwitchContentRender_Active from './page_document_render/tabSwitchRender/tabsSwitchContentRender_Active.js';

import topicMenuContentActive from './page_documentation_topics_render/topicMenuContent.js';
import enableTableContent from './page_documentation_topics_render/enableTableContent.js';

import render_mainListTitlesNav from './page_document_render/table_content_page_titles/render_mainListTitlesNav.js';
import render_sideListTitlesNav from './page_document_render/table_content_page_titles/render_sideListTitlesNav.js';

import appendRefLinks from './page_document_render/tooltips_navHashPos_refLinks/appendRefLinks.js';
import imageLinkChange from './page_document_render/image-content/imageLinkChange.js';
import imageViewer from './page_document_render/image-content/imageViewer.js';
import collapsible_content_render from './page_document_render/collapsible_content_render.js';

import auto_top_scroll from './page_document_render/auto_top_scroll.js';

import start_all_code_blocks_and_highlight from './page_pre_block_contents_render/start.js';

import navToHashPos from './page_document_render/tooltips_navHashPos_refLinks/navToHashPos.js';
import render_buttons from './page_document_render/render_buttons.js';
import tooltip from './page_document_render/tooltips_navHashPos_refLinks/tooltip.js';
import content_section_wrapper from './page_document_render/content_section_wrapper.js';

let page_content = document.getElementById('page-content-wrapper');
let bodyElement = document.body;
const parser = new DOMParser();

export default function EmbeddingHTMLPage({ DocContentHTMLText, ResStatus }, refPos = null) {
 let isPageLoadSuccess = true;

 let HTMLEditTextMsg = `
 <p class="msg-title">File is Empty</p>
 <p class="msg-info">Click on <i class="svg vscode-svg vscode-icon"></i> to edit this file.</p>
 `;

 let FileMayNotExistTextMsg = `
 <p class="msg-title">No Content, Maybe File Does not Exist </p> 
   <p class="msg-info">
    Click on <i class="svg vscode-svg vscode-icon"></i> to create the file.
   </p> `;

 const titlesContentWrapper = (HTMLContent) => {
  // 1. convert text/string into HTMLDocument
  HTMLContent = parser.parseFromString(HTMLContent, 'text/html');

  //  2. get all sub-titles
  const all_titles = HTMLContent.querySelectorAll(['.sub-title', '.sub-sub-title']);
  let subSubTitleIndex = 0;

  // 3. loop thru each sub-title and add ##start## and ##end## text
  // first sub-title will only have ##start## text next to it.
  all_titles.forEach((element, index) => {
   if (index == 0) {
    element.insertAdjacentHTML('afterend', '##start##');
   } else {
    if (element.classList.contains('sub-title')) {
     subSubTitleIndex = 0;
     element.insertAdjacentHTML('beforebegin', '##end## ##end##');
     element.insertAdjacentHTML('afterend', '##start##');
    }

    if (element.classList.contains('sub-sub-title')) {
     // every first sub-sub-title element will only have ##start## after
     if (subSubTitleIndex == 0) {
      subSubTitleIndex = 1;
      element.insertAdjacentHTML('afterend', '##start##');
      return;
     }
     element.insertAdjacentHTML('beforebegin', '##end##');
     element.insertAdjacentHTML('afterend', '##start##');
    }
   }
  });

  // 4. convert HTMLContent to text/string
  HTMLContent = new XMLSerializer().serializeToString(HTMLContent);

  // 5. now, replace All ##start##/ and ##end##
  HTMLContent = HTMLContent.replace(/##end##/g, '</div>');
  HTMLContent = HTMLContent.replace(/##start##/g, "<div class='start-wrapper'>");
  HTMLContent = HTMLContent.replace(/<\/body>/g, '</div></body>');

  return HTMLContent;
 };

 if (ResStatus == 404) {
  isPageLoadSuccess = false;
  DocContentHTMLText = `
  <div class='page-msg-content warning'>
   ${FileMayNotExistTextMsg}
  </div>`;
 }

 if (!DocContentHTMLText) {
  isPageLoadSuccess = false;
  DocContentHTMLText = `
  <div class='page-msg-content guide'>
   ${HTMLEditTextMsg}
  </div>`;
 }

 page_content.setAttribute('id', '');
 void page_content.offsetWidth;
 page_content.setAttribute('id', 'page-content-wrapper');

 page_content.innerHTML = titlesContentWrapper(DocContentHTMLText);
 page_content.innerHTML += '<br/> <br/> <br/> <br/>';

 bodyElement.setAttribute('pageLoading', true);
 startup_pageRender(isPageLoadSuccess, refPos);
 bodyElement.setAttribute('pageLoading', false);
}

// ++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++

function startup_pageRender(isPageLoadSuccess, refPos = null) {
 if (isPageLoadSuccess) {
  let has_documentation_topics_list_container = document.querySelector('.documentation-topics-list-container');

  if (has_documentation_topics_list_container) {
   // get all topic menu links
   topicMenuContentActive();

   // active table content in menu document
   enableTableContent();

   // render all list titles content
   render_mainListTitlesNav(false);
   render_sideListTitlesNav(false);
  } else {
   render_buttons();

   // add top scroll button a
   auto_top_scroll();

   // render all list titles content
   render_mainListTitlesNav(true);
   render_sideListTitlesNav(true);

   // tab content switch and render
   tabsSwitchContentRender_Active();

   // create a Collapsible content
   collapsible_content_render();

   // -------------------------------------
   // -------------------------------------

   start_all_code_blocks_and_highlight();

   // -------------------------------------
   // -------------------------------------
   // -------------------------------------

   // here we replace all tooltip
   tooltip();

   // add ref links to every link
   appendRefLinks();

   // set all images source with proper url path
   imageLinkChange();

   // create a view content for each image
   imageViewer();

   // on link ref open navigate to certain topic title
   navToHashPos(refPos);

   // wrap sections after each title
   content_section_wrapper();
  }
 }
}
