import startup_contentRender from './main_page_content_render/main.js';

import { ConvertPathFromSlashToHashes, ConvertPathFromHashToSlash, GetLocationPathPart } from './utilities/url_path_utility.js';
import { setSidebarSubjectFilesLink, OpenFolderAndFileSideBarMenuAutomatically } from './sideBar_Render/menu/setSidebarSubjectFilesLink.js';
import modal_interact_manage from './modal_interact_manage.js';
import EmbeddingHTMLPage from './main_page_content_render/main.js';
import doc_nav_header_active from './main_page_content_render/page_document_render/doc_nav_header_expander.js';

let UrlPathsHistory = ['/'];

export let currentActivePath = '';
let DocContentRender = document.getElementById('page-content-wrapper');
let navTitleHeader = document.querySelector('.nav-title-header');
let pathViewContentHeader = document.querySelector('.path-view-content-header');

let page_path = '';
let vs_code_opener_svg_btn = document.querySelector('.vs-code-opener-svg-btn');

let BackBtn = document.querySelector('.go-back-btn');
let ForwardBtn = document.querySelector('.go-forward-btn');
let HomeBtn = document.querySelector('.home-btn-content');

let sideBar = document.querySelector('.sideBar');
let bodyElement = document.body;

let urlSearchParams = new URLSearchParams(window.location.search);
let currentUrlPathsHistoryIndex = 0;
let _isPageTopicLinkSelected = false;

let LoadingHTML = `<div class="spinner-content">
<div class="spinner-wheel"></div>
<p class="spinner-message"></p>
</div>`;

export default function Startup_PageLoader() {
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

 if (getUrlPath != '') currentUrlPathsHistoryIndex++;

 getUrlPath = location.origin + getUrlPath;

 if (urlSearchParams.has('newTab')) {
  sideBar.remove();
  currentUrlPathsHistoryIndex = 0;
  UrlPathsHistory.shift();
  bodyElement.setAttribute('newTab', '');
  bodyElement.setAttribute('sidebar', 'off');
  runPageLoader(getUrlPath, false, false, false, false, null, false, false);
 } else {
  runPageLoader(getUrlPath, false, true, false, false, null, false, true);
 }
}

// Setup Navigate back and forward Buttons
function setupNavigationBackAndForwardHistoryButtons() {
 BackBtn.addEventListener('click', () => {
  if (currentUrlPathsHistoryIndex != 0) {
   let extractHistoryPath,
    _getUrlPath = '';

   extractHistoryPath = UrlPathsHistory[--currentUrlPathsHistoryIndex];

   _getUrlPath = location.origin + ConvertPathFromHashToSlash(location.origin + extractHistoryPath);

   runPageLoader(_getUrlPath, true, true, false, false, null, false, true);
  }
 });

 ForwardBtn.addEventListener('click', (e) => {
  // disable forward button when history length is in last page, and disable it also when entering a topic link
  if (currentUrlPathsHistoryIndex < UrlPathsHistory.length - 1 && !_isPageTopicLinkSelected) {
   let extractHistoryPath = '';
   let _getUrlPath = '';

   extractHistoryPath = UrlPathsHistory[++currentUrlPathsHistoryIndex];
   _getUrlPath = location.origin + ConvertPathFromHashToSlash(location.origin + extractHistoryPath);

   runPageLoader(_getUrlPath, true, true, false, false, null, false, true);
  }
 });

 window.onpopstate = function () {
  if (currentActivePath.includes('%20')) {
   let currentMenuPath = currentActivePath.split('/');
   currentMenuPath.pop();
   currentMenuPath = currentMenuPath.join('/').concat('.html');
   window.history.pushState('page', null, ConvertPathFromSlashToHashes(location.origin + currentMenuPath));
  } else {
   window.history.pushState('page', null, ConvertPathFromSlashToHashes(location.origin + currentActivePath));
  }
 };
}

// ########################################################################################
// ########################################################################################
// ########################################################################################
// ########################################################################################

function InvokeClickEvent(className) {
 let menuIconClickEvent = new Event('click');
 let IconClick = document.querySelector(`.${className}`);
 IconClick.dispatchEvent(menuIconClickEvent);
}

// ########################################################################################
// ########################################################################################
// ########################################################################################
// ########################################################################################

function RenderPathHeaderView(paths, isPageTopicLinkSelected, isFileLinkSelected) {
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

  if (!isPageTopicLinkSelected && urlSearchParams.has('subjectTitle')) headerTitle = urlSearchParams.get('subjectTitle').replace('__', '');

  if (!isFileLinkSelected) navTitleHeader.innerHTML = headerTitle;
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

export async function runPageLoader(
 urlHrefLink,
 disableHistoryPathPush = false,
 isSubjectFileLinkSelected = false,
 isPageTopicLinkSelected = false,
 homeBtnClicked = false,
 refPos = null,
 isDocumentation = false,
 automaticFolderFileOpen = false
) {
 let getHashedPath = ConvertPathFromSlashToHashes(urlHrefLink);

 if (automaticFolderFileOpen) {
  OpenFolderAndFileSideBarMenuAutomatically(urlHrefLink);
 }

 if (homeBtnClicked) {
  currentUrlPathsHistoryIndex++;
  ForwardBtn.classList.add('disable');
  document.querySelectorAll('.file-type').forEach((el) => el.classList.remove('highlight-menu'));
 }

 if (urlHrefLink.slice(-4) === 'html' || urlHrefLink == location.origin) {
  currentActivePath = GetLocationPathPart(urlHrefLink);

  if (urlHrefLink == location.origin) {
   getHashedPath = '/';
   currentActivePath = '';
   urlHrefLink = location.origin + '/Docs';
   // on home page disable home btn
   HomeBtn.classList.add('disable');
  } else {
   HomeBtn.classList.remove('disable');
  }

  if (getHashedPath.slice(-4) === 'html' && !disableHistoryPathPush) {
   if (UrlPathsHistory[UrlPathsHistory.length - 1] != getHashedPath) UrlPathsHistory.push(getHashedPath);
   currentUrlPathsHistoryIndex = UrlPathsHistory.length - 1;
  }

  // if current index path is 0 then set go-back button opacity to disable state
  if (currentUrlPathsHistoryIndex == 0) {
   BackBtn.classList.add('disable');
  } else {
   BackBtn.classList.remove('disable');
  }

  // if current index path is equal to UrlPathsHistory length then set forward-back button opacity disable state
  if (!homeBtnClicked) {
   if (currentUrlPathsHistoryIndex == UrlPathsHistory.length - 1) {
    ForwardBtn.classList.add('disable');
   } else {
    ForwardBtn.classList.remove('disable');
   }
  }

  if (isPageTopicLinkSelected) {
   _isPageTopicLinkSelected = isPageTopicLinkSelected;
   currentUrlPathsHistoryIndex++;
   BackBtn.classList.remove('disable');
   ForwardBtn.classList.add('disable');
  } else {
   window.history.pushState('page', null, getHashedPath);
   _isPageTopicLinkSelected = isPageTopicLinkSelected;
  }

  RenderPathHeaderView(getHashedPath, _isPageTopicLinkSelected, isSubjectFileLinkSelected);

  // console.log('Url Paths History: ', UrlPathsHistory);
  // console.log('current history index: ', currentUrlPathsHistoryIndex);
  // console.log('current Active Link: ', currentActivePath);

  // #############################################################
  // #############################################################
  // #############################################################

  DocContentRender.innerHTML = LoadingHTML;

  // let getLastPositionPath = currentActivePath.split('/');
  // getLastPositionPath = getLastPositionPath[getLastPositionPath.length - 1];

  if (window.innerWidth <= 1000 && !urlSearchParams.has('newTab') && bodyElement.getAttribute('sidebar') != 'false') InvokeClickEvent('close-sideMenu-btn');

  let DocContentHTMLText;
  let ResStatus;

  try {
   let responseData = await fetch(urlHrefLink);
   let contentText = await responseData.text();
   DocContentHTMLText = contentText.trim();
   ResStatus = responseData.status;

   vs_code_opener_svg_btn.children[1].innerHTML = 'Open file with vscode';

   if (ResStatus == 404) {
    console.log('Not Found');
    UrlPathsHistory.splice(UrlPathsHistory.length - 1, 1);
    currentUrlPathsHistoryIndex--;
    vs_code_opener_svg_btn.children[1].innerHTML = 'Create file with vscode';
   }

   // prepare page path
   page_path = getHashedPath.replace(/\#/g, '/');
   page_path = decodeURIComponent(page_path);
   bodyElement.setAttribute('current_path', page_path);
  } catch (error) {
   console.log('Error: ', error);
   ResStatus = 400;
  }

  EmbeddingHTMLPage({ DocContentHTMLText, ResStatus }, refPos);

  // startup_contentRender();
 }
}
