import { setSidebarFileLinkForPageLoader } from './setSidebarSubjectFilesLink.js';

let allMainTopFolders;
let allSubjectFiles;

// letlet subject_lvl_section_children = null;

export default function EnableSidebarMenuListEventListener() {
 allSubjectFiles = document.querySelectorAll('.subject-title-link.file-type');
 allMainTopFolders = document.querySelectorAll('.main-folder');

 allMainTopFolders.forEach((folders) => {
  folders.addEventListener('click', (main_folder) => {
   // target all main folder and start nesting events when u open them
   ArrowChange(main_folder.target); // Apply to main-folder
   ToggleAndEnableMenu(main_folder.target); // Apply to main-folder
   FolderIconChange(main_folder.target); // Apply to main-folder
   AddEventListenersToSubFolders(main_folder.target);
   AddEventListenerToFilesOnOpenedFolder(main_folder.target);
  });
 });
}

export function AddEventListenersToSubFolders(targetElement) {
 // targetElement all a.subject-title-link
 // targetElement.parentElement.nextElementSibling = a.subject-title-link -> subject-content-link -> target subject-list-menu.###-level
 if (targetElement.parentElement.nextElementSibling) {
  //
  let subject_lvl_section_children = targetElement.parentElement.nextElementSibling.children;
  // loop inside subject-list-menu.###-level on each children
  for (let index = 0; index < subject_lvl_section_children.length; index++) {
   // if the child element has a .subject-content-link.folder-content class then target it
   if (subject_lvl_section_children[index].classList.contains('folder-content') && !targetElement.classList.contains('empty-folder')) {
    // if targetElement contain menu open then add event for each div.subject-content-link folder-type > a.subject-title-link.folder-type
    if (targetElement.classList.contains('menu-enable')) {
     // access a.subject-content-link.folder-type > a.subject-title-link
     subject_lvl_section_children[index].children[0].addEventListener('click', AddEventListenerToSubFolder);
    } else {
     subject_lvl_section_children[index].children[0].removeEventListener('click', AddEventListenerToSubFolder);
    }
   }
  }
 }
}

export function AddEventListenerToFilesOnOpenedFolder(targetElement, is_nav_access = false) {
 // targetElement = a.subject-title-link
 // targetElement.parentElement.nextElementSibling = a.subject-title-link -> subject-content-link -> target subject-list-menu.###-level
 if (targetElement.parentElement.nextElementSibling) {
  let subject_lvl_section_children = targetElement.parentElement.nextElementSibling.children;

  if (targetElement.classList.contains('subject-title-link') && !targetElement.classList.contains('empty-folder')) {
   if (targetElement.getAttribute('event') == 'false' || is_nav_access) {
    targetElement.setAttribute('event', 'true');
    // loop inside subject-list-menu.###-level on each children
    for (let index = 0; index < subject_lvl_section_children.length; index++) {
     // if the child element has a.subject-content-link.file-type class then target it
     if (subject_lvl_section_children[index].classList.contains('file-content')) {
      // access a.subject-content-link.file-type > a.subject-title-link
      if (subject_lvl_section_children[index].children[0].getAttribute('event') != 'true') {
       subject_lvl_section_children[index].children[0].addEventListener('click', AddEventListenerToFile);
       subject_lvl_section_children[index].children[0].setAttribute('event', 'true');
      }
     }
    }
   } else {
    targetElement.setAttribute('event', 'false');
    for (let index = 0; index < subject_lvl_section_children.length; index++) {
     if (subject_lvl_section_children[index].classList.contains('file-content')) {
      subject_lvl_section_children[index].children[0].removeEventListener('click', AddEventListenerToFile);
      subject_lvl_section_children[index].children[0].setAttribute('event', 'false');
     }
    }
   }
  }
 }
}

function AddEventListenerToFile(event) {
 event.preventDefault();

 // remove highlight class name from all subject title links
 // highlight the selected topic title link
 allSubjectFiles.forEach((el) => el.classList.remove('highlight-menu'));
 if (event.target.classList.contains('file-type')) {
  event.target.classList.add('highlight-menu');
  setSidebarFileLinkForPageLoader(event);
 }
}

function AddEventListenerToSubFolder(e) {
 // target a.subject-title-link.folder-type
 ToggleAndEnableMenu(e.target);
 ArrowChange(e.target);
 FolderIconChange(e.target);
 AddEventListenersToSubFolders(e.target);
 AddEventListenerToFilesOnOpenedFolder(e.target);
}

// ..............................................................
// ..............................................................
// ..............................................................

function ToggleAndEnableMenu(element) {
 // a.subject-title-link toggle with menu-enable
 if (element.classList.contains('subject-title-link') && !element.classList.contains('empty-folder')) {
  element.classList.toggle('menu-enable');
  // a.subject-title-link > subject-content-link > next element
  if (element.parentElement.nextElementSibling) {
   // if next element contains subject-list-menu.##-level then add .menu-open to it
   if (element.parentElement.nextElementSibling.classList.contains('subject-list-menu')) {
    element.parentElement.nextElementSibling.classList.toggle('menu-open');
   }
  }
 }
}

function FolderIconChange(element) {
 // element(subject-title-link) -> children[1] -> i.svg-folder-style
 if (element.classList.contains('subject-title-link')) {
  if (element.children[1].classList.contains('svg-folder-style')) {
   if (element.classList.contains('menu-enable') && !element.classList.contains('empty-folder')) {
    element.children[1].classList.add('open-folder-svg');
    element.children[1].classList.remove('close-folder-svg');
   } else {
    element.children[1].classList.add('close-folder-svg');
    element.children[1].classList.remove('open-folder-svg');
   }
  }
 }
}

function ArrowChange(element) {
 if (element.classList.contains('subject-title-link') && !element.classList.contains('empty-folder')) {
  element.children[0].classList.toggle('arrow-open');
 }
}

{
 /* <section class="subject-menu-list-content">

    <div class="subject-content-link folder-type">
        <a class="subject-title-link folder-type main-folder menu-enable" title="dir_entry_path: /nodejs" id="menu-list" event="true">
          <i class="arrow svg arrow-svg arrow-open"></i>
          <img class="subject-icon custom-icon" src="./_images/subject_icons/nodejs.png" alt="image">
          <span class="subject-name">Node.js</span>
        </a>
     </div>
     
  <section class="subject-list-menu one-level-menu menu-open">
  
      
      <div class="subject-content-link folder-type">
            <a class="subject-title-link folder-type main-folder menu-enable" title="dir_entry_path: /nodejs" id="menu-list" event="true">
              <i class="arrow svg arrow-svg arrow-open"></i>
              <img class="subject-icon custom-icon" src="./_images/subject_icons/nodejs.png" alt="image">
              <span class="subject-name">Node.js</span>
            </a>
      </div>
    
      <section class="subject-list-menu two-level-menu menu-open"> 
              <div class="subject-content-link file-type">
                    <a class="subject-title-link folder-type main-folder menu-enable" title="dir_entry_path: /nodejs" id="menu-list" event="true">
                      <i class="arrow svg arrow-svg arrow-open"></i>
                      <img class="subject-icon custom-icon" src="./_images/subject_icons/nodejs.png" alt="image">
                      <span class="subject-name">Node.js</span>
                    </a>
              </div>
                
              <div class="subject-content-link file-type">
                    <a class="subject-title-link folder-type main-folder menu-enable" title="dir_entry_path: /nodejs" id="menu-list" event="true">
                      <i class="arrow svg arrow-svg arrow-open"></i>
                      <img class="subject-icon custom-icon" src="./_images/subject_icons/nodejs.png" alt="image">
                      <span class="subject-name">Node.js</span>
                    </a>
              </div>
            
              <div class="subject-content-link file-type">
                    <a class="subject-title-link folder-type main-folder menu-enable" title="dir_entry_path: /nodejs" id="menu-list" event="true">
                      <i class="arrow svg arrow-svg arrow-open"></i>
                      <img class="subject-icon custom-icon" src="./_images/subject_icons/nodejs.png" alt="image">
                      <span class="subject-name">Node.js</span>
                    </a>
              </div>
      </section>
      
  
  </section>

  </section> */
}
