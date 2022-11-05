import startup_SideBarRender from './sideBar_Render/main.js';
import Startup_PageLoader from './pageLoader.js';
import Startup_api from './api_system/start_api.js';

document.addEventListener('DOMContentLoaded', () => StartUp());

function StartUp() {
 //  let urlSearchParams = new URLSearchParams(window.location.search);

 startup_SideBarRender();
 Startup_PageLoader();

 if (window.innerWidth > 800 && !new URLSearchParams(window.location.search).has('newTab')) {
  document.body.setAttribute('api-system', 'true');
  Startup_api();
 }
 
}
