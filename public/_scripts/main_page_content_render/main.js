import tabSwitchContentRender from './page_document_render/tabSwitchRender/tabSwitchContentRender.js';
import blockContentTabSwitch from './page_document_render/tabSwitchRender/blockContentTabSwitch.js';

import topicMenuContentActive from './page_documentation_topics_render/topicMenuContent.js';
import enableTableContent from './page_documentation_topics_render/enableTableContent.js';

import render_mainListTitlesNav from './page_document_render/all_list_titles_nav_content/render_mainListTitlesNav.js';
import render_sideListTitlesNav from './page_document_render/all_list_titles_nav_content/render_sideListTitlesNav.js';

import appendRefLinks from './page_document_render/tooltips_navHashPos_refLinks/appendRefLinks.js';
import imageLinkChange from './page_document_render/image-content/imageLinkChange.js';
import imageViewer from './page_document_render/image-content/imageViewer.js';
import Collapsible_content from './page_document_render/collapsible_content.js';

import auto_top_scroll from './page_document_render/auto_top_scroll.js';

import start_all_code_blocks_and_highlight from './page_pre_block_contents_render/start.js';

import navToHashPos from './page_document_render/tooltips_navHashPos_refLinks/navToHashPos.js';
import render_buttons from './page_document_render/render_buttons.js';
import tooltip from './page_document_render/tooltips_navHashPos_refLinks/tooltip.js';
import doc_title_header_active from './page_document_render/doc_title_header_expander.js';

export default function startup_contentRender(ref_Pos = null) {
 let is_subject_topics_list_container = document.querySelector('.subject-topics-list-container');

 if (is_subject_topics_list_container) {
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
  tabSwitchContentRender();
  blockContentTabSwitch();
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

  // create a Collapsible content
  Collapsible_content();

  // on link ref open navigate to certain topic title
  navToHashPos(ref_Pos);
 }

 // document title header active
 doc_title_header_active();

 document.querySelectorAll('.sub-title').forEach((element) => {
  element.addEventListener('click', () => {
   element.classList.toggle('hide-content');
  });
 });
}
