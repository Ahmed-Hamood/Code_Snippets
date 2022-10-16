export default function RenderListMenuItem(main_data, filename) {
 let sideType = null;
 let idName = null;
 let getType = null;
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

 const createMainSubjectContent = (main_data) => {
  main_subjectName = main_data.main_subject_name;
  main_subjectPath = main_data.subject_path;
  main_iconName = main_data.subject_icon_name;
  main_type = main_data.type;
  main_list_menu = main_data.subject_list_menu;

  hasMainFolder = main_list_menu.length != 0 ? 'main-folder' : 'disable-main-folder';

  if (main_iconName != '') MainSubject_IconPath = `<img class="subject-icon custom-icon" src="${customIconsPath}/${main_iconName}" alt="image"></img>`;
  else MainSubject_IconPath = `<i class="svg close-folder-svg svg-folder-style main-folder"></i>`;

  return `
   <article class="subject-content">
      <a class="subject-title-link folder-type ${hasMainFolder}" 
      title="dir_entry_path: ${main_subjectPath} \n json_entry_path: /" urlPath="${AllSubjectsMainFolder}${main_subjectPath}" 
      dir_entry_path="${main_subjectPath}" json_entry_path="/data/subject_list_menu[]" 
      json_file="${filename}" 
      id="menu-list">
 
        <i class="arrow svg arrow-svg"></i>
        ${MainSubject_IconPath}
        <span class="subject-name">${main_subjectName}</span>
 
      </a>
      ${subjectLevelsContent()}
   </article>
   `;
 };

 const createSubSubjectTitleLink = (
  data,
  main_subject_Path,
  { index1 = null, index2 = null, index3 = null, index4 = null, index5 = null, index6 = null },
  Lvl1 = { subject_path: '' },
  Lvl2 = { subject_path: '' },
  Lvl3 = { subject_path: '' },
  Lvl4 = { subject_path: '' },
  Lvl5 = { subject_path: '' }
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

  concatURLPaths = main_subject_Path + Lvl1['subject_path'] + Lvl2['subject_path'] + Lvl3['subject_path'] + Lvl4['subject_path'] + Lvl5['subject_path'] + subjectPath;

  concatJSONPath =
   (index1 != null ? `/subject_list_menu[${index1}]` : '') +
   (index2 != null ? `/subject_list_menu[${index2}]` : '') +
   (index3 != null ? `/subject_list_menu[${index3}]` : '') +
   (index4 != null ? `/subject_list_menu[${index4}]` : '') +
   (index5 != null ? `/subject_list_menu[${index5}]` : '') +
   (index6 != null ? `/subject_list_menu[${index6}]` : '');

  getPageContentType = contentPageType == 'documentation' ? 'page_content_type="documentation"' : 'page_content_type="topic"';
  getPageContentType = type === 'folder' || type === 'folder' ? '' : getPageContentType;

  if (type == 'file') iconElement = `<i class="svg file-svg svg-file-style" alt="image"></i>`;
  if (type == 'folder' && iconName != '') iconElement = `<img class="subject-icon custom-icon" src="${customIconsPath}/${iconName}" alt="image">`;
  if (type == 'folder' && iconName == '') iconElement = `<i class="svg close-folder-svg svg-folder-style"></i>`;

  return `
     <a class="subject-title-link ${getType} sub-folder" 
     title="dir_entry_path: ${concatURLPaths} \n json_entry_path: ${concatJSONPath}" 
     urlPath="${AllSubjectsMainFolder}${concatURLPaths}" 
     json_file="${filename}" 
     dir_entry_path="${concatURLPaths}" 
     json_entry_path="${concatJSONPath}" 
     id="${idName}" ${getPageContentType}
     >
       <span class="${sideType}"></span>
       ${iconElement}
       <span class="subject-name">${subjectName}</span>
     </a>
     `;
 };

 const subjectLevelsContent = () => {
  return `
   <section class="subject-list-menu one-level-menu">
   ${main_data.subject_list_menu
    .map((elLvl1, index1) => {
     if (elLvl1['type'] == 'file') {
      return createSubSubjectTitleLink({ ...elLvl1 }, main_data['subject_path'], { index1 });
     } else {
      return `
       ${createSubSubjectTitleLink({ ...elLvl1 }, main_data['subject_path'], { index1 })}
       <section class="subject-list-menu two-level-menu">
         ${elLvl1['subject_list_menu']
          .map((elLvl2, index2) => {
           if (elLvl2['type'] == 'file') {
            return createSubSubjectTitleLink({ ...elLvl2 }, main_data['subject_path'], { index1, index2 }, elLvl1);
           } else {
            return `
             ${createSubSubjectTitleLink({ ...elLvl2 }, main_data['subject_path'], { index1, index2 }, elLvl1)}
             <section class="subject-list-menu three-level-menu">
               ${elLvl2['subject_list_menu']
                .map((elLvl3, index3) => {
                 if (elLvl3['type'] == 'file') {
                  return createSubSubjectTitleLink({ ...elLvl3 }, main_data['subject_path'], { index1, index2, index3 }, elLvl1, elLvl2);
                 } else {
                  return `
                    ${createSubSubjectTitleLink({ ...elLvl3 }, main_data['subject_path'], { index1, index2, index3 }, elLvl1, elLvl2)}
                    <section class="subject-list-menu four-level-menu">
                      ${elLvl3['subject_list_menu']
                       .map((elLvl4, index4) => {
                        if (elLvl4['type'] == 'file') {
                         return createSubSubjectTitleLink({ ...elLvl4 }, main_data['subject_path'], { index1, index2, index3, index4 }, elLvl1, elLvl2, elLvl3);
                        } else {
                         return `
                           ${createSubSubjectTitleLink({ ...elLvl4 }, main_data['subject_path'], { index1, index2, index3, index4 }, elLvl1, elLvl2, elLvl3)}
                           <section class="subject-list-menu five-level-menu">                   
                           ${elLvl4['subject_list_menu']
                            .map((elLvl5, index5) => {
                             if (elLvl5['type'] == 'file') {
                              return createSubSubjectTitleLink(
                               { ...elLvl5 },
                               main_data['subject_path'],
                               { index1, index2, index3, index4, index5 },
                               elLvl1,
                               elLvl2,
                               elLvl3,
                               elLvl4
                              );
                             } else {
                              return `
                               ${createSubSubjectTitleLink(
                                { ...elLvl5 },
                                main_data['subject_path'],
                                { index1, index2, index3, index4, index5 },
                                elLvl1,
                                elLvl2,
                                elLvl3,
                                elLvl4
                               )}
                                <section class="subject-list-menu six-level-menu"> 
                                ${elLvl5['subject_list_menu']
                                 .map((elLvl6, index6) => {
                                  if (elLvl6['type'] == 'file') {
                                   return createSubSubjectTitleLink(
                                    { ...elLvl6 },
                                    main_data['subject_path'],
                                    { index1, index2, index3, index4, index5, index6 },
                                    elLvl1,
                                    elLvl2,
                                    elLvl3,
                                    elLvl4,
                                    elLvl5
                                   );
                                  } else {
                                   alert('Limit is six levels');
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

 return createMainSubjectContent({ ...main_data });
}
