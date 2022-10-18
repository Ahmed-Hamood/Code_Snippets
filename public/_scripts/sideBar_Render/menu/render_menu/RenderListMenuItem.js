export default function RenderListMenuItem(main_data, filename) {
 let sideType = null;
 let idName = null;
 let getType = null;
 let typeContent = null;
 let iconElement = null;
 let concatURLPaths = null;
 let concatJSONPath = null;
 let getPageContentType = null;
 let MainSubject_IconPath = null;

 const customIconsPath = './_images/subject_icons';
 const AllSubjectsMainFolder = '/Docs';

 let main_subjectName = '';
 let main_subjectPath = '';
 let main_iconName = '';
 let main_type = '';
 let main_list_menu = '';
 let hasMainFolder = '';

 let subjectName = '';
 let iconName = '';
 let type = '';
 let subjectPath = '';
 let list_menu = '';
 let contentPageType = '';

 let no_path = { subject_path: '' };

 const createMainSubjectContent = () => {
  main_subjectName = main_data.main_subject_name;
  main_subjectPath = main_data.subject_path;
  main_iconName = main_data.subject_icon_name;
  main_type = main_data.type;
  main_list_menu = main_data.subject_list_menu;

  hasMainFolder = main_list_menu.length != 0 ? 'main-folder' : 'disable-main-folder';

  if (main_iconName != '') MainSubject_IconPath = `<img class="subject-icon custom-icon" src="${customIconsPath}/${main_iconName}" alt="image"></img>`;
  else MainSubject_IconPath = `<i class="svg close-folder-svg svg-folder-style main-folder"></i>`;

  return `
  <section class="subject-menu-list-content">
    <div class="subject-content-link folder-type">
        <a class="subject-title-link folder-type ${hasMainFolder}" 
        title="dir_entry_path: ${main_subjectPath} \n json_entry_path: /" urlPath="${AllSubjectsMainFolder}${main_subjectPath}" 
        dir_entry_path="${main_subjectPath}" json_entry_path="/data/subject_list_menu[]" 
        json_file="${filename}" 
        event="false"
        id="menu-list">
          <i class="svg arrow-svg"></i>
          ${MainSubject_IconPath}
          <span class="subject-name">${main_subjectName}</span>
          <div class="options-menu-btn"> 
            <i class="svg options-svg option-svg-btn"></i>  
          </div>
        </a>
     </div>
     ${subjectLevelsContent()}
  </section>
  `;
 };

 const createSubjectTitleLink = (
  data,
  { idx1 = null, idx2 = null, idx3 = null, idx4 = null, idx5 = null, idx6 = null },
  { elLvl1 = no_path, elLvl2 = no_path, elLvl3 = no_path, elLvl4 = no_path, elLvl5 = no_path }
 ) => {
  subjectName = data.subject_name;
  iconName = data.subject_icon_name;
  type = data.type;
  subjectPath = data.subject_path;
  list_menu = data.subject_list_menu;
  contentPageType = data.page_content_type;
  // --------------------------------------------

  sideType = type == 'folder' || type == 'folder' ? 'arrow svg arrow-svg' : 'hierarchy-line';
  idName = type === 'folder' ? 'menu-list' : '';

  getType = type === 'file' ? 'file-type' : 'folder-type';
  getType = list_menu.length == 0 && type == 'folder' ? 'empty-folder' : getType;
  typeContent = type == 'folder' ? 'folder-content' : 'file-content';

  concatURLPaths =
   main_data['subject_path'] + elLvl1['subject_path'] + elLvl2['subject_path'] + elLvl3['subject_path'] + elLvl4['subject_path'] + elLvl5['subject_path'] + subjectPath;

  concatJSONPath =
   (idx1 != null ? `/subject_list_menu[${idx1}]` : '') +
   (idx2 != null ? `/subject_list_menu[${idx2}]` : '') +
   (idx3 != null ? `/subject_list_menu[${idx3}]` : '') +
   (idx4 != null ? `/subject_list_menu[${idx4}]` : '') +
   (idx5 != null ? `/subject_list_menu[${idx5}]` : '') +
   (idx6 != null ? `/subject_list_menu[${idx6}]` : '');

  getPageContentType = contentPageType == 'documentation' ? 'page_content_type="documentation"' : 'page_content_type="topic"';
  getPageContentType = type === 'folder' || type === 'folder' ? '' : getPageContentType;

  if (type == 'file') iconElement = `<i class="svg file-svg svg-file-style" alt="image"></i>`;
  if (type == 'folder' && iconName != '') iconElement = `<img class="subject-icon custom-icon" src="${customIconsPath}/${iconName}" alt="image">`;
  if (type == 'folder' && iconName == '') iconElement = `<i class="svg close-folder-svg svg-folder-style"></i>`;

  return `
  <div class="subject-content-link ${typeContent}">
      <a class="subject-title-link ${getType} sub-level" 
      title="dir_entry_path: ${concatURLPaths} \n json_entry_path: ${concatJSONPath}" 
      urlPath="${AllSubjectsMainFolder}${concatURLPaths}" 
      json_file="${filename}" 
      dir_entry_path="${concatURLPaths}" 
      json_entry_path="${concatJSONPath}" 
      event="false"
      id="${idName}" ${getPageContentType}>
        <div class="${sideType}"></div>
        ${iconElement}
        <span class="subject-name">${subjectName}</span>
      </a>
  </div>
    `;
 };

 const createTopicDocTitleLink = () => {};

 const subjectLevelsContent = () => {
  return `
  <section class="subject-list-menu one-level-menu">
  ${main_data.subject_list_menu
   .map((elLvl1, idx1) => {
    if (elLvl1['type'] == 'file') {
     return createSubjectTitleLink({ ...elLvl1 }, { idx1 }, {});
    } else {
     return `
      ${createSubjectTitleLink({ ...elLvl1 }, { idx1 }, {})}
      <section class="subject-list-menu two-level-menu">
        ${elLvl1['subject_list_menu']
         .map((elLvl2, idx2) => {
          if (elLvl2['type'] == 'file') {
           return createSubjectTitleLink({ ...elLvl2 }, { idx1, idx2 }, { elLvl1 });
          } else {
           return `
            ${createSubjectTitleLink({ ...elLvl2 }, { idx1, idx2 }, { elLvl1 })}
            <section class="subject-list-menu three-level-menu">
              ${elLvl2['subject_list_menu']
               .map((elLvl3, idx3) => {
                if (elLvl3['type'] == 'file') {
                 return createSubjectTitleLink({ ...elLvl3 }, { idx1, idx2, idx3 }, { elLvl1, elLvl2 });
                } else {
                 return `
                   ${createSubjectTitleLink({ ...elLvl3 }, { idx1, idx2, idx3 }, { elLvl1, elLvl2 })}
                   <section class="subject-list-menu four-level-menu">
                     ${elLvl3['subject_list_menu']
                      .map((elLvl4, idx4) => {
                       if (elLvl4['type'] == 'file') {
                        return createSubjectTitleLink({ ...elLvl4 }, { idx1, idx2, idx3, idx4 }, { elLvl1, elLvl2, elLvl3 });
                       } else {
                        return `
                          ${createSubjectTitleLink({ ...elLvl4 }, { idx1, idx2, idx3, idx4 }, { elLvl1, elLvl2, elLvl3 })}
                          <section class="subject-list-menu five-level-menu">                   
                          ${elLvl4['subject_list_menu']
                           .map((elLvl5, idx5) => {
                            if (elLvl5['type'] == 'file') {
                             return createSubjectTitleLink({ ...elLvl5 }, { idx1, idx2, idx3, idx4, idx5 }, { elLvl1, elLvl2, elLvl3, elLvl4 });
                            } else {
                             return `
                              ${createSubjectTitleLink({ ...elLvl5 }, { idx1, idx2, idx3, idx4, idx5 }, { elLvl1, elLvl2, elLvl3, elLvl4 })}
                               <section class="subject-list-menu six-level-menu"> 
                               ${elLvl5['subject_list_menu']
                                .map((elLvl6, idx6) => {
                                 if (elLvl6['type'] == 'file') {
                                  return createSubjectTitleLink({ ...elLvl6 }, { idx1, idx2, idx3, idx4, idx5, idx6 }, { elLvl1, elLvl2, elLvl3, elLvl4, elLvl5 });
                                 } else {
                                  alert('Limit is six levels');
                                  return;
                                 }
                                })
                                .join('')}
                               </section>
                              `;
                            }
                            // remaining level here
                           })
                           .join('')}
                          </section>
                          `;
                       }
                      })
                      .join('')}
                   </section>
                   `;
                }
               })
               .join('')}
            </section>
            `;
          }
         })
         .join('')}
      </section>
      `;
    }
   })
   .join('')}
  `;
 };

 return createMainSubjectContent();
}
