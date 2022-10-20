import { runPageLoader } from '../../pageLoader.js';

export default function topicMenuContent() {
 let getAllTitleLinkTopics = document.querySelectorAll('.topic-title-link');
 let getCurrentUrlHash;
 let elementPath;
 let urlPath = '';
 let getPos = '';

 let createButton = "<button class='topic-view-list-btn' title='click to view table content'> ... </button>";

 // Here we merge our url href path with the topic title path
 getAllTitleLinkTopics.forEach((element) => {
  getCurrentUrlHash = location.hash.split('#'); // ['', 'Docs', 'nodejs', 'expressjs', 'Authentication', 'Helmet.html']
  elementPath = element.getAttribute('path').split('/');

  elementPath.shift();
  getCurrentUrlHash.shift(); // remove first element - ['Docs', 'nodejs', 'expressjs', 'Authentication', 'Helmet.html']
  getCurrentUrlHash.pop(); // remove last element - ['Docs', 'nodejs', 'expressjs', 'Authentication']

  if (element.getAttribute('ref_pos')) getPos = `refPos=${element.getAttribute('ref_pos')}&`;

  element.href = location.origin + `/?${getPos}newTab&topicLink#` + getCurrentUrlHash.join('#') + '#' + elementPath.join('#');

  // here we are going to add nav title viewer button beside topic title link

  if (!element.classList.contains('sub-link')) element.insertAdjacentHTML('beforebegin', createButton);
 });

 // here we get topic url path and send it to page render content when user click on the link
 getAllTitleLinkTopics.forEach((el) => {
  el.addEventListener('click', (element) => {
   element.preventDefault();

   getCurrentUrlHash = location.hash.split('#'); // ['', 'Docs', 'nodejs', 'expressjs', 'Authentication', 'Helmet.html']
   getCurrentUrlHash.shift(); // remove first element - ['Docs', 'nodejs', 'expressjs', 'Authentication', 'Helmet.html']
   getCurrentUrlHash.pop(); // remove last element - ['Docs', 'nodejs', 'expressjs', 'Authentication']
   urlPath = location.origin + '/' + getCurrentUrlHash.join('/') + el.getAttribute('path');

   if (element.target.getAttribute('ref_pos')) {
    runPageLoader(urlPath, true, false, true, false, element.target.getAttribute('ref_pos'));
   } else {
    runPageLoader(urlPath, true, false, true);
   }
  });
 });

 // add menu table content active btn into documentation-topics-list-container
 document
  .querySelector('.documentation-topics-list-container')
  .insertAdjacentHTML('afterbegin', "<button id='menu-table-content-active-btn'> Enable ListView Content </button>");
}
