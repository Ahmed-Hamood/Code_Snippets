import startup_SideBarRender from './sideBar_Render/main.js';
import Startup_PageLoader from './pageLoader.js';
import Startup_api from './api_system/start_api.js';
import modal_interact_manage from './modal_interact_manage.js';

document.addEventListener('DOMContentLoaded', () => {
 StartUp();
});

function StartUp() {
 let urlSearchParams = new URLSearchParams(window.location.search);
 
 startup_SideBarRender();
 Startup_PageLoader();
 modal_interact_manage()
 
 if (window.innerWidth > 800 && !urlSearchParams.has('newTab')) {
  document.body.setAttribute('api-system', 'true');
  Startup_api();
 }


  

 

}
