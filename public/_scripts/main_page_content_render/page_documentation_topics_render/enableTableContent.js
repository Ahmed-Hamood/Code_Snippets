export default function enableTableContent() {
 // Active topic list
 let subjectMainTitle = document.querySelector('.subject-main-title');
 let topicViewListBtn = document.querySelectorAll('.topic-view-list-btn');
 let menuTableContentActiveBtn = document.getElementById('menu-table-content-active-btn');
 let doc_content_render_container = document.getElementById('page-content-render-container');

 let currentActiveLinkView = null;
 let isMenuTableContentActive = false;
 let linkResult;

 let ViewMsgContent = "<b>Click</b> on the button beside any topic title below to view it's table content list";
 let ViewLinkErrorMsgContent = '<span class="LinkError"> Error While Fetching Link ..... </span>';

 let ViewLoadingContent = `
 <div class="spinner-content" style="height:31px;">
  <div class="spinner-wheel" style="border-top-color: #0cf36d;"></div>
 </div>`;

 let CreateTableContentViewer = `
  <div class='doc-subject-list-titles-content-viewer'> 
    <div class='msg-text'> <p> ${ViewMsgContent} </p>  </div>
    <p class='doc-table-content' hasData='false'> </p>
  </div>`;

 // add topics list viewer
 subjectMainTitle.insertAdjacentHTML('afterend', CreateTableContentViewer);

 topicViewListBtn.forEach((element, index) => {
  element.id = 'no-' + index;
 });

 let docMenuTableContentSubjectViewer = document.querySelector('.doc-subject-list-titles-content-viewer');
 let msgTextContent = document.querySelector('.msg-text');
 let msgTextParagraph = document.querySelector('.msg-text p');
 let docTableContent = document.querySelector('.doc-table-content');

 // view Menu Table Content Subject Viewer when click on Enable table content button
 if (menuTableContentActiveBtn) {
  menuTableContentActiveBtn.addEventListener('click', (e) => {
   e.preventDefault();
   if (!isMenuTableContentActive) {
    isMenuTableContentActive = true;

    docMenuTableContentSubjectViewer.classList.add('view');
    topicViewListBtn.forEach((element) => element.classList.add('view'));

    ViewTableContentBtn(!isMenuTableContentActive);
    ToggleAllViewListBtn(isMenuTableContentActive);
   } else {
    isMenuTableContentActive = false;

    docMenuTableContentSubjectViewer.classList.remove('view');
    topicViewListBtn.forEach((element) => element.classList.remove('view'));

    ViewTableContentBtn(!isMenuTableContentActive);
    ToggleAllViewListBtn(isMenuTableContentActive);
   }
  });

  EnableTextMsgContent(null);
 }

 function ToggleAllViewListBtn(isActive) {
  topicViewListBtn.forEach((element) => {
   if (isActive) {
    element.addEventListener('click', EventListener_ViewListBtn);
   } else {
    element.removeEventListener('click', EventListener_ViewListBtn);
   }
  });
 }

 async function EventListener_ViewListBtn(ev) {
  if (currentActiveLinkView != ev.target.id) {
   topicViewListBtn.forEach((ev2) => ev2.classList.remove('active'));
   ev.target.classList.add('active');
   disableEnableAllViewListBtn('disabled');

   EnableTextMsgContent(ViewLoadingContent);

   linkResult = await getTopicsListByUrl(ev.target.nextSibling.getAttribute('path')).catch((error) => {
    console.log('Error: ', error);
    EnableTextMsgContent(ViewLinkErrorMsgContent);
    setTimeout(() => {
     if (docTableContent.getAttribute('hasData') != 'true') {
      clearAllTopicViewListBtn();
      EnableTextMsgContent(ViewMsgContent);
     } else {
      EnableTableContentList();
      selectLastLinkView();
     }
     disableEnableAllViewListBtn('enabled');
    }, 4000);
   });
   // ......
   render_table_contents(linkResult, ev.target.nextSibling.getAttribute('path'));
   currentActiveLinkView = ev.target.id;
  }
 }

 async function getTopicsListByUrl(urlPath) {
  let getCurrentUrlHash;
  let finalPath;
  let all_topic_titles;
  let main_topic_title;

  const allTitleInSubject = ['.sub-title', '.sub-sub-title', '.sub-sub-sub-title'];
  const parser = new DOMParser();

  getCurrentUrlHash = location.hash.split('#');
  getCurrentUrlHash.shift();
  getCurrentUrlHash.pop();

  finalPath = location.origin + '/' + getCurrentUrlHash.join('/') + urlPath;

  let response = await fetch(finalPath);

  const data = await response.text();

  const doc = parser.parseFromString(data, 'text/html');

  all_topic_titles = doc.querySelectorAll(allTitleInSubject);
  main_topic_title = doc.querySelector('.main-title');

  return { mainTitle: main_topic_title, otherTitles: all_topic_titles };
 }

 function render_table_contents(data, topicPath) {
  let allList = '';
  let navTitle_className = '';
  let mergeHashWithLink;
  let getCurrentUrlHash;
  let elementPath;

  getCurrentUrlHash = location.hash.split('#'); // ['', 'Docs', 'nodejs', 'expressjs', 'Authentication', 'Helmet.html']
  elementPath = topicPath.split('/');

  elementPath.shift();
  getCurrentUrlHash.shift(); // remove first element - ['Docs', 'nodejs', 'expressjs', 'Authentication', 'Helmet.html']
  getCurrentUrlHash.pop(); // remove last element - ['Docs', 'nodejs', 'expressjs', 'Authentication']

  if (data.otherTitles.length != 0) {
   data.otherTitles.forEach((element, index) => {
    if (element.classList.contains('sub-title')) navTitle_className = 'menu-nav-sub-title';
    if (element.classList.contains('sub-sub-title')) navTitle_className = 'menu-nav-sub-sub-title';
    if (element.classList.contains('sub-sub-sub-title')) navTitle_className = 'menu-nav-sub-sub-sub-title';

    mergeHashWithLink = location.origin + `/?refPos=${index}&newTab&topicLink#` + getCurrentUrlHash.join('#') + '#' + elementPath.join('#');

    allList += `<li class="${navTitle_className}"> <a href="${mergeHashWithLink}" target="_blank" title="Open this topic in a new tap"> ${element.innerHTML} </a></li>`;
   });
  } else {
   allList += `<li class="${navTitle_className}"> No Topic Titles </li>`;
  }

  setTimeout(() => {
   if (data.mainTitle != null) {
    docTableContent.innerHTML = `
           <h1> ${data.mainTitle.innerHTML} </h1>
           <ul class="doc-menu-table-list-content">
             ${allList}
           </ul>
            `;

    docTableContent.setAttribute('hasData', true);
    disableEnableAllViewListBtn('enabled');
    EnableTableContentList();
   } else {
    docTableContent.innerHTML = ` <h1> No Data </h1>`;
    disableEnableAllViewListBtn('enabled');
    EnableTableContentList();
   }
  }, 1500);
 }

 function clearAllTopicViewListBtn() {
  topicViewListBtn.forEach((el) => {
   el.classList.remove('active');
  });
 }

 function EnableTextMsgContent(msgType) {
  msgTextContent.style['display'] = 'flex';
  docTableContent.style['display'] = 'none';
  docMenuTableContentSubjectViewer.style['background'] = '#1c1d1f';

  if (msgType) msgTextParagraph.innerHTML = msgType;
  doc_content_render_container.scrollTop = 0;
 }

 function EnableTableContentList() {
  msgTextContent.style['display'] = 'none';
  docTableContent.style['display'] = 'block';
  docMenuTableContentSubjectViewer.style['background'] = '';
  doc_content_render_container.scrollTop = 0;
 }

 function ViewTableContentBtn(status) {
  if (!status) {
   menuTableContentActiveBtn.disabled = true;
   menuTableContentActiveBtn.style['opacity'] = 0.5;
   menuTableContentActiveBtn.style['pointer-events'] = 'none';
   menuTableContentActiveBtn.innerHTML = 'Disable ListView Content';

   setTimeout(() => {
    menuTableContentActiveBtn.disabled = false;
    menuTableContentActiveBtn.style['opacity'] = 1;
    menuTableContentActiveBtn.style['pointer-events'] = 'all';
   }, 2000);
  } else {
   menuTableContentActiveBtn.innerHTML = 'Enable ListView Content';
  }
 }

 function selectLastLinkView() {
  topicViewListBtn.forEach((ev) => {
   ev.classList.remove('active');
   if (currentActiveLinkView == ev.id) {
    ev.classList.add('active');
   }
  });
 }

 function disableEnableAllViewListBtn(status) {
  if (status == 'disabled') {
   topicViewListBtn.forEach((element) => {
    element.disabled = true;
    element.style['opacity'] = 0.3;
    element.style['pointer-events'] = 'none';
   });
  } else {
   topicViewListBtn.forEach((element) => {
    element.disabled = false;
    element.style['opacity'] = 1;
    element.style['pointer-events'] = 'auto';
   });
  }
 }
}
