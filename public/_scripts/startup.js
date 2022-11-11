import startup_SideBarRender from './sideBar_Render/main.js';
import Startup_PageLoader from './pageLoader.js';
import Startup_api from './api_system/start_api.js';

var scrollTimer = -1;
var scrollFinished = () => {
 document.body.setAttribute('scrollActive', false);
};

document.addEventListener('DOMContentLoaded', () => StartUp());

function StartUp() {
 startup_SideBarRender();
 Startup_PageLoader();

 if (window.innerWidth > 800 && !new URLSearchParams(window.location.search).has('newTab')) {
  document.body.setAttribute('api-system', 'true');
  Startup_api();
 }

 document.body.addEventListener(
  'scroll',
  () => {
   document.body.setAttribute('scrollActive', true);

   if (scrollTimer != -1) clearTimeout(scrollTimer);

   scrollTimer = window.setTimeout(scrollFinished, 500);
  },
  true
 );
}
