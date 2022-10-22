import { RunPageLoader } from '../../pageLoader.js';

export default function homeBtnActive() {
 let HomeBtn = document.querySelector('.home-btn-content');

 HomeBtn.addEventListener('click', () => {
  if (location.href != `${location.origin}/`) {
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
