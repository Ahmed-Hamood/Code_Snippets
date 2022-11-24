import RenderListMenuItem from '../_scripts/sideBar_Render/menu/render_menu/RenderListMenuItem.js';
import { Subject_Sample_ListMenu } from './_Subject_Sample_ListMenu.js';
import { Node_Subject_Menu } from './_Node_Subject_List.js';
import { Azure_Subject_Menu } from './_Azure_Subject_List.js';
import { React_Subject_ListMenu } from './_React_Subject_List.js';
import { MongoDB_Subject_Menu } from './_MongoDB_Subject_List.js';
import { Git_Subject_Menu } from './_Git_Subject_List.js';
import { Docker_Subject_Menu } from './_Docker_Subject_List.js';
import { Python_Subject_Menu } from './_Python_Subject_List.js';
import { Javascript_Subject_Menu } from './_Javascript_Subject_List.js';
import { Automation_Subject_Menu } from './_automation_Subject_List.js';

// import test from './test.json' assert { type: 'json' };

export let getAllSubjectMenus = {
 Subject_Sample_ListMenu,
 Node_Subject_Menu,
 Azure_Subject_Menu,
 React_Subject_ListMenu,
 MongoDB_Subject_Menu,
 Git_Subject_Menu,
 Docker_Subject_Menu,
 Python_Subject_Menu,
 Javascript_Subject_Menu,
 Automation_Subject_Menu
};

export default async function CreateSubjectsMenuList() {
 const menuContent = document.querySelector('.sideBar-subjects-menu .content-wrapper');

 menuContent.innerHTML = '';

 menuContent.innerHTML += "<h1 class='menu-title-section-header'> Server Side </h1>";
 menuContent.innerHTML += RenderListMenuItem(getAllSubjectMenus.Node_Subject_Menu, '_Node_Subject_List.json');
 menuContent.innerHTML += RenderListMenuItem(getAllSubjectMenus.MongoDB_Subject_Menu, '_MongoDB_Subject_List.json');
 menuContent.innerHTML += "<h1 class='menu-title-section-header'> Client Side </h1>";
 menuContent.innerHTML += RenderListMenuItem(getAllSubjectMenus.React_Subject_ListMenu, 'example.json');
 menuContent.innerHTML += RenderListMenuItem(getAllSubjectMenus.Subject_Sample_ListMenu, '_Subject_Sample_ListMenu.json');
 menuContent.innerHTML += "<h1 class='menu-title-section-header'> Tools and Utilities </h1>";
 menuContent.innerHTML += RenderListMenuItem(getAllSubjectMenus.Git_Subject_Menu, 'example.json');
 menuContent.innerHTML += RenderListMenuItem(getAllSubjectMenus.Docker_Subject_Menu, 'example.json');
 menuContent.innerHTML += "<h1 class='menu-title-section-header'> Programming languages </h1>";
 menuContent.innerHTML += RenderListMenuItem(getAllSubjectMenus.Python_Subject_Menu, 'example.json');
 menuContent.innerHTML += RenderListMenuItem(getAllSubjectMenus.Javascript_Subject_Menu, 'example.json');
 menuContent.innerHTML += "<h1 class='menu-title-section-header'> Information Technology </h1>";
 menuContent.innerHTML += RenderListMenuItem(getAllSubjectMenus.Azure_Subject_Menu, 'example.json');
 menuContent.innerHTML += "<h1 class='menu-title-section-header'> Industrial </h1>";
 menuContent.innerHTML += RenderListMenuItem(getAllSubjectMenus.Automation_Subject_Menu, 'example.json');
}
