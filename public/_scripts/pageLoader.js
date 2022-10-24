import { ConvertPathFromSlashToHashes, ConvertPathFromHashToSlash, GetLocationPathPart } from './utilities/url_path_utility.js';
import { setSidebarSubjectFilesLink, OpenFolderAndFileSideBarMenuAutomatically } from './sideBar_Render/menu/setSidebarSubjectFilesLink.js';
import modal_interact_manage from './modal_interact_manage.js';
import EmbeddingHTMLPage from './main_page_content_render/main.js';
import doc_nav_header_active from './main_page_content_render/page_document_render/doc_nav_header_expander.js';
import _urlPathDBStore from './_urlPathDBStore.js';
import { eventInvoker } from './utilities/other_utilities.js';

const db = _urlPathDBStore();

let DocContentRender = document.getElementById('page-content-wrapper');
let navTitleHeader = document.querySelector('.nav-title-header');
let pathViewContentHeader = document.querySelector('.path-view-content-header');


let page_path = '';
let vs_code_opener_svg_btn = document.querySelector('.vs-code-opener-svg-btn');

let BackBtn = document.querySelector('.go-back-btn');
let ForwardBtn = document.querySelector('.go-forward-btn');
let HomeBtn = document.querySelector('.home-btn-content');

let sideBar = document.querySelector('.sideBar');
let allSidebarFiles = [];
let bodyElement = document.body;

let urlSearchParams = new URLSearchParams(window.location.search);
let _isDocumentationPageLinkSelected = false;

let LoadingSpinnerHTML = `<div class="spinner-content">
<div class="spinner-wheel"></div>
<p class="spinner-message"></p>
</div>`;

export default function Startup_PageLoader() {
 allSidebarFiles = document.querySelectorAll('.file-type');

 if (!urlSearchParams.has('newTab')) setSidebarSubjectFilesLink();
 setup_PageLoaderURLPath();
 setupNavigationBackAndForwardHistoryButtons();
 ActiveTitleHeaderPathLinkCopy();
 modal_interact_manage();
 setup_vscode_opener();
 doc_nav_header_active();
}

// ########################################################################################
// ########################################################################################
// ########################################################################################
// ########################################################################################

function ActiveTitleHeaderPathLinkCopy() {
 let lastTitleText = '';
 navTitleHeader.addEventListener('click', () => {
  if (!navigator.clipboard) {
   let inputElement = document.createElement('textarea');
   document.body.appendChild(inputElement);
   inputElement.value = page_path;
   inputElement.select();
   document.execCommand('copy');
   inputElement.parentNode.removeChild(inputElement);
  } else {
   navigator.clipboard
    .writeText(page_path)
    .then(() => {
     console.log('Path Copied.....');
     console.log(page_path);
     lastTitleText = navTitleHeader.textContent;
     navTitleHeader.innerHTML = '<green bold> Path copied <green>';
     setTimeout(() => (navTitleHeader.innerHTML = lastTitleText), 2000);
    })
    .catch(() => {
     throw 'Error While copy';
    });
  }
 });
}

function setup_vscode_opener() {
 vs_code_opener_svg_btn.addEventListener('click', async () => {
  if (page_path != '') {
   let result = await fetch('http://localhost:3331/open_page', {
    headers: {
     Accept: 'application/json',
     'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ page_path }),
   });

   result = await result.json();

   if (result.status == 200) {
    console.log(result.msg);
   } else {
    console.log('vscode fetching failed....');
   }
  } else {
   console.log('Error while sending vscode...');
  }
 });
}

// when page load get url path and render the content
function setup_PageLoaderURLPath() {
 let getUrlPath = ConvertPathFromHashToSlash(location) || '';

 if (getUrlPath != '') db.IncreaseUrlPathHistoryIndex();

 getUrlPath = location.origin + getUrlPath;

 if (urlSearchParams.has('newTab')) {
  sideBar.remove();
  db.ResetCurrentUrlPathHistoryIndex();
  db.shiftUrlPathHistory();
  bodyElement.setAttribute('newTab', '');
  bodyElement.setAttribute('sidebar', 'off');
  RunPageLoader(getUrlPath, false, false, false, false, null, false, false);
 } else {
  if (window.innerWidth <= 1000) eventInvoker('.close-sideMenu-btn');
  RunPageLoader(getUrlPath, false, true, false, false, null, false, true);
 }
}

// Setup Navigate back and forward Buttons
function setupNavigationBackAndForwardHistoryButtons() {
 BackBtn.addEventListener('click', () => {
  if (db.getCurrentUrlPathsHistoryIndex() != 0) {
   let extractHistoryPath,
    _getUrlPath = '';

   extractHistoryPath = db.getPreviousHistoryPath();

   _getUrlPath = location.origin + ConvertPathFromHashToSlash(location.origin + extractHistoryPath);

   RunPageLoader(_getUrlPath, true, true, false, false, null, false, true);
  }
 });

 ForwardBtn.addEventListener('click', (e) => {
  // disable forward button when history length is in last page, and disable it also when entering a topic link
  if (db.getCurrentUrlPathsHistoryIndex() < db.getLastUrlPathIndex() && !_isDocumentationPageLinkSelected) {
   let extractHistoryPath = '';
   let _getUrlPath = '';

   extractHistoryPath = db.getNextPathHistory();
   _getUrlPath = location.origin + ConvertPathFromHashToSlash(location.origin + extractHistoryPath);

   RunPageLoader(_getUrlPath, true, true, false, false, null, false, true);
  }
 });

 window.onpopstate = function () {
  if (db.getCurrentActivePath().includes('%20')) {
   let currentMenuPath = db.getCurrentActivePath().split('/');
   currentMenuPath.pop();
   currentMenuPath = currentMenuPath.join('/').concat('.html');
   window.history.pushState('page', null, ConvertPathFromSlashToHashes(location.origin + currentMenuPath));
  } else {
   window.history.pushState('page', null, ConvertPathFromSlashToHashes(location.origin + db.getCurrentActivePath()));
  }
 };
}

// ########################################################################################
// ########################################################################################
// ########################################################################################
// ########################################################################################

function RenderTitleAndPathHeaderView(paths, isSubjectFileLinkSelected) {
 let pathViewContent = '';
 let headerTitle = '';
 let ArrayOfPaths = paths.split('#'); // ['', 'Docs', 'nodejs', 'expressjs', 'Installation.html']
 let HtmlFile = ArrayOfPaths[ArrayOfPaths.length - 1] || ''; // get last file path
 let addArrowPath = '';

 ArrayOfPaths.shift(); // remove first path  // ['Docs', 'nodejs', 'expressjs', 'Installation.html']
 ArrayOfPaths.shift(); // remove first path  // ['nodejs', 'expressjs', 'Installation.html']

 HtmlFile = decodeURIComponent(HtmlFile);

 if (HtmlFile.slice(-4) === 'html') {
  ArrayOfPaths[ArrayOfPaths.length - 1] = HtmlFile.replace(/\.html/g, '.doc');

  headerTitle = HtmlFile.replace(/.html/g, '');

  if (urlSearchParams.has('newTab')) isSubjectFileLinkSelected = false;

  if (urlSearchParams.has('subjectTitle') && !_isDocumentationPageLinkSelected) headerTitle = urlSearchParams.get('subjectTitle').replace('__', '');

  if (!isSubjectFileLinkSelected) navTitleHeader.innerHTML = headerTitle;
 }

 if (ArrayOfPaths.length == 0) {
  ArrayOfPaths.push('Home Page');
  navTitleHeader.innerHTML = 'Main Page';
 }

 //  console.log('ArrayOfPaths:', ArrayOfPaths);

 ArrayOfPaths.forEach((path, index) => {
  addArrowPath = ArrayOfPaths.length - 1 != index ? '<i class="svg arrow-svg path-arrow-svg"></i>' : '';

  pathViewContent += `
  <li> 
    <span class="path-view-title">${decodeURIComponent(path)}</span> 
    ${addArrowPath}
  </li>
  `;
 });

 pathViewContentHeader.innerHTML = `
 <marquee behavior="none" direction="left" scrollamount="0">
  <ul class="path_view_link">
    ${pathViewContent}
  </ul>
 </marquee>`;

 if (pathViewContentHeader.children[0].children[0].offsetWidth + 10 > pathViewContentHeader.offsetWidth - 12)
  pathViewContentHeader.children[0].setAttribute('scrollamount', 10);
}

// ######################
// ######################
// ######################

export async function RunPageLoader(
 urlPathLink,
 isHistoryPathPushDisabled = false,
 isSubjectFileLinkSelected = false,
 isDocumentationPageLinkSelected = false,
 isHomeBtnSelected = false,
 refTitlePos = null,
 isDocumentationPage = false,
 automaticFolderFileOpenOnPageReload = false
) {
 let DocContentHTMLText;
 let ResStatus;
 let getUrlPathHashedLink = ConvertPathFromSlashToHashes(urlPathLink);

 if (automaticFolderFileOpenOnPageReload) {
  OpenFolderAndFileSideBarMenuAutomatically(urlPathLink);
 }

 if (isHomeBtnSelected) {
  db.IncreaseUrlPathHistoryIndex();
  ForwardBtn.classList.add('disable');
  allSidebarFiles.forEach((el) => el.classList.remove('highlight-menu'));
 }

 if (urlPathLink.slice(-4) === 'html' || urlPathLink == location.origin) {
  db.setCurrentActivePath(GetLocationPathPart(urlPathLink));

  if (urlPathLink == location.origin) {
   getUrlPathHashedLink = '/';
   db.setCurrentActivePath('');
   isHistoryPathPushDisabled = true;
   urlPathLink = location.origin + '/Docs';
   // on home page disable home btn
   HomeBtn.classList.add('disable');
  } else {
   HomeBtn.classList.remove('disable');
  }

  if (!isHistoryPathPushDisabled) {
   // if last history path does not match our current path then add urlPath
   if (db.getLastUrlPathHistory() != getUrlPathHashedLink) db.pushUrlPathHistory(getUrlPathHashedLink);
   //  set the last path history index and save it as the currentUrlPathsHistoryIndex
   db.setCurrentUrlPathHistoryAsLastIndex();
  }

  // if current index path is 0 then set go-back button opacity to disable state
  if (db.getCurrentUrlPathsHistoryIndex() == 0) {
   BackBtn.classList.add('disable');
  } else {
   BackBtn.classList.remove('disable');
  }

  // if current index path is equal to UrlPathsHistory length then set forward-back button opacity disable state
  if (!isHomeBtnSelected) {
   if (db.getCurrentUrlPathsHistoryIndex() == db.getLastUrlPathIndex()) {
    ForwardBtn.classList.add('disable');
   } else {
    ForwardBtn.classList.remove('disable');
   }
  }

  if (isDocumentationPageLinkSelected) {
   db.IncreaseUrlPathHistoryIndex();
   BackBtn.classList.remove('disable');
   ForwardBtn.classList.add('disable');
  } else {
   window.history.pushState('page', null, getUrlPathHashedLink);
  }

  _isDocumentationPageLinkSelected = isDocumentationPageLinkSelected;

  RenderTitleAndPathHeaderView(getUrlPathHashedLink, isSubjectFileLinkSelected);

  // console.log('Url Paths History: ', db.getArrayPathsHistory());
  // console.log('current history index: ', db.getCurrentUrlPathsHistoryIndex());
  // console.log('current Active Link: ', db.getCurrentActivePath());

  // #############################################################
  // #############################################################
  // #############################################################

  DocContentRender.innerHTML = LoadingSpinnerHTML;

  try {
   let responseData = await fetch(urlPathLink);
   let DocContentHTMLText = await responseData.text();
   DocContentHTMLText = DocContentHTMLText.trim();

   ResStatus = responseData.status;

   vs_code_opener_svg_btn.children[1].innerHTML = 'Open file with vscode';
   
   if (ResStatus == 404) {
     console.log('Not Found');
     db.RemoveLastUrlPathHistory();
     db.DecreaseUrlPathHistoryIndex();
     vs_code_opener_svg_btn.children[1].innerHTML = 'Create file with vscode';
    }
    
    // prepare page path
    page_path = getUrlPathHashedLink.replace(/\#/g, '/');
    page_path = decodeURIComponent(page_path);
    bodyElement.setAttribute('current_path', page_path);
 
   EmbeddingHTMLPage({ DocContentHTMLText, ResStatus }, refTitlePos);
  } catch (error) {
   console.log('Error: ', error);
   DocContentRender.innerHTML = `
   <div class='page-msg-content error'>
    <p class="msg-title">Page Error</p>
    <p class="msg-info">404 Error</p>
  </div>`;
  }
 }
}
