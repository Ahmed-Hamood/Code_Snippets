export default function tabSwitchContentRender() {
 let get_all_tab_content = document.querySelectorAll('[tab-switch-content]');

 if (get_all_tab_content.length != 0) {
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
    tab_title = tabSectionContent[i].getAttribute('tab-title') || "Example " + (i + 1);
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
 }
}
