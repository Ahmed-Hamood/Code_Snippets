export default function tabsSwitchContentRender_Active() {
 let get_all_tab_content = document.querySelectorAll('[tab-switch-content]');

 const tabsSwitchBtnActive = () => {
  let tabAction = (e, tabIndex) => {
   let el = e.target.parentElement.parentElement.lastElementChild.children;
   let codeContainerChildren = e.target.parentElement.children;

   // if (!e.target.classList.contains('active')) SideBar_Close.play();

   // Remove active class from every Tab-Btn
   for (let index = 0; index < codeContainerChildren.length; index++) {
    codeContainerChildren[index].classList.remove('active');
   }

   for (let index = 0; index < el.length; index++) {
    if (el[index].classList.contains('tab-content')) el[index].classList.add('disableTab');
   }

   e.target.classList.add('active');

   e.target.parentElement.parentElement.lastElementChild.children[tabIndex].classList.remove('disableTab');
  };

  document.querySelectorAll('.main-tab-content').forEach((item) => {
   for (let index = 0; index < item.children.length; index++) {
    if (!item.previousElementSibling.children[index].classList.contains('active')) {
     item.children[index].classList.add('disableTab');
    }
    // if (index != 0) item.children[index].classList.add('disableTab');
   }
  });

  document.querySelectorAll('.btn_tabs').forEach((el) => {
   for (let index = 0; index < el.children.length; index++) {
    el.children[index].addEventListener('click', (e) => {
     tabAction(e, index);
    });
   }
  });
 };

 if ([...get_all_tab_content].length != 0) {
  let tabSectionContent = [];
  let tabSectionTitleBtn = '';
  let tabSectionElement = '';

  let tab_title = '';
  let isActive = false;
  let tabHasActive = null;

  get_all_tab_content.forEach((element) => {
   tabSectionContent = element.children;

   element.classList.add('tab-container');

   tabSectionTitleBtn = '';
   tabSectionElement = '';
   tabHasActive = false;

   for (let i = 0; i < tabSectionContent.length; i++) {
    tab_title = tabSectionContent[i].getAttribute('tab-title') || 'Example ' + (i + 1);
    isActive = tabSectionContent[i].hasAttribute('active');

    tab_title = tab_title ? tab_title : tabSectionContent[i].children[0].getAttribute('title-header');
    tab_title = tab_title ? tab_title : 'Example';

    if (!tabHasActive) {
     isActive = isActive ? 'active' : '';
     tabHasActive = isActive ? true : false;
    }

    tabSectionTitleBtn += `<button class="tab-btn ${isActive ? isActive : ''}">${tab_title}</button>`;

    tabSectionElement += `
      <div class="tab-content">
       ${tabSectionContent[i].innerHTML}
      </div>
      `;
   }

   element.innerHTML = `
      <div class="btn_tabs">
        ${tabSectionTitleBtn}
      </div>
    <!-- ########### Begin main tab content ########### -->
    <div class="main-tab-content">
        ${tabSectionElement}
    </div>
    <!-- ########### End main tab content ########### -->
   `;
  });

  tabsSwitchBtnActive();
 }
}
