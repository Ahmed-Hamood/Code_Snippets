import { RunPageLoader } from '../../pageLoader.js';
import { eventInvoker } from '../../utilities/other_utilities.js';

export default function homeBtnActive() {
 let HomeBtn = document.querySelector('.home-btn-content');

 HomeBtn.addEventListener('click', () => {
  if (location.href != `${location.origin}/`) {
   if (window.innerWidth < 1000) eventInvoker('.close-sideMenu-btn');
   RunPageLoader(location.origin, false, false, false, true);
   //  urlHrefLink = location.origin,
   //  disableHistoryPathPush = false,
   //  isSubjectFileLinkSelected = false,
   //  isPageTopicLinkSelected = false,
   //  isHomeBtnClicked = true,
   //  refPos = null,
   //  isDocumentation = false,
   //  automaticFolderFileOpenOnPageReload = false
  }
 });
}
