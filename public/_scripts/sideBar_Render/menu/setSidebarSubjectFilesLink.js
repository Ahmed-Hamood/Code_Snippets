import { RunPageLoader } from '../../pageLoader.js';
import { AddEventListenersToSubFolders, AddEventListenerToFilesOnOpenedFolder } from './EnableSidebarMenuListEventListener.js';
import { ConvertPathFromSlashToHashes, GetLocationPathPart } from '../../utilities/url_path_utility.js';

import Sounds from '../../sounds.js';
import _urlPathDBStore from '../../_urlPathDBStore.js';
import { eventInvoker } from '../../utilities/other_utilities.js';

const { getCurrentActivePath } = _urlPathDBStore();

// Active render content on every url link change
export function setSidebarSubjectFilesLink() {
 const allSubjectFiles = document.querySelectorAll('.subject-title-link.file-type');
 let UrlTab = '';
 let finalUrlWithParam = '';

 allSubjectFiles.forEach((targetLinkElement) => {
  if (targetLinkElement.classList.contains('file-type')) {
   let getPathUrl = targetLinkElement.getAttribute('urlPath');
   let getPageContentType = targetLinkElement.getAttribute('page_content_type');

   UrlTab = ConvertPathFromSlashToHashes(location.origin + getPathUrl);
   finalUrlWithParam = location.origin + `?newTab&page_content_type=${getPageContentType}&subjectTitle=${targetLinkElement.children[2].textContent}__` + UrlTab;
   targetLinkElement.setAttribute('href', finalUrlWithParam);
  }
 });
}

export function setSidebarFileLinkForPageLoader(targetElement) {
 let navTitleHeader = document.querySelector('.nav-title-header');
 let SelectedUrlPath = null;
 let isDocumentation = false;

 targetElement = targetElement.target;

 isDocumentation = targetElement.getAttribute('page_content_type') == 'documentation';

 navTitleHeader.innerHTML = targetElement.children[2].textContent;
 SelectedUrlPath = targetElement.getAttribute('urlPath');
 if (SelectedUrlPath != getCurrentActivePath()) {
  SelectedUrlPath = location.origin + SelectedUrlPath;

  if (window.innerWidth <= 1000 ) eventInvoker('.close-sideMenu-btn')

  RunPageLoader(SelectedUrlPath, false, true, false, false, null, isDocumentation, false);
  Sounds().Play_press();
 }
}

export function OpenFolderAndFileSideBarMenuAutomatically(urlPath) {
 const mergePaths = [];
 let UrlPathName = GetLocationPathPart(urlPath) == '/Docs' ? '/' : GetLocationPathPart(urlPath);
 let navTitleHeader = document.querySelector('.nav-title-header');

 let folders = UrlPathName.split('/'); //  ['', 'Docs', 'nodejs', 'expressjs', 'Authentication', 'Helmet.html']
 let File_highlighted = false;
 let getAllFiles = document.querySelectorAll('.subject-title-link.file-type');

 // select file that ends with .html or clear all files highlight if path is home
 if (UrlPathName.slice(-4) === 'html' || UrlPathName == '/') {
  // highlight the path name file
  getAllFiles.forEach((el) => {
   if (el.getAttribute('urlPath') == UrlPathName && !File_highlighted) {
    el.classList.add('highlight-menu');
    navTitleHeader.innerHTML = el.children[2].textContent;
    File_highlighted = true;
   } else {
    el.classList.remove('highlight-menu');
   }
  });
 }

 folders.shift(); // remove first element ''
 folders.shift(); // remove first element 'Docs'
 folders.pop(); // remove last element 'Helmet.html' - folders = ['nodejs', 'expressjs', 'Authentication']

 mergePaths.push(`/Docs/${folders[0]}`);

 for (let index = 1; index < folders.length; index++) {
  mergePaths.push(mergePaths[index - 1] + '/' + folders[index]);
 }

 // mergePaths = ['/Docs/nodejs', '/Docs/nodejs/expressjs', '/Docs/nodejs/expressjs/Authentication']

 document.querySelectorAll('.subject-title-link.folder-type').forEach((el) => {
  mergePaths.forEach((path) => {
   if (el.getAttribute('urlPath') == path) {
    el.classList.add('menu-enable');

    AddEventListenersToSubFolders(el);
    AddEventListenerToFilesOnOpenedFolder(el, true);

    el.children[0].classList.add('arrow-open');
    if (el.children[1].classList.contains('svg-folder-style')) el.children[1].classList.add('open-folder-svg');
    if (el.parentElement.nextElementSibling.classList.contains('subject-list-menu')) el.parentElement.nextElementSibling.classList.add('menu-open');
   }
  });
 });
}
