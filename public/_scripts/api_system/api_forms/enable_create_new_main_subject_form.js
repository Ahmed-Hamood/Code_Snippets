export default async function enable_create_new_main_subject_form() {
 let selected_icon = 'default.png';
 const icons_folder_link = document.querySelector('.icons-folder-link');
 const reload_svg_btn = document.querySelector('.reload-svg-btn');
 let icon_selection_content = document.querySelector('.subject-icon-selection-content .content-wrapper');

 // here we start fetching icons and insert them into selection content
 const EmbedAndActiveIconsSubjectSelection = async () => {
  let mergeIcons = '';
  let allIcons = '';

  icon_selection_content.innerHTML = 'Loading Icons...';
  reload_svg_btn.classList.add('rotate');
  selected_icon = 'default.png';

  try {
    allIcons = await fetchAllSubjectIcons();
  } catch (error) {
    icon_selection_content.innerHTML = '<red>Error while fetching icons..</red>';
    reload_svg_btn.classList.remove('rotate');
  }


  mergeIcons += `
     <div class="icon-selection-img active" icon-name="default">
       <img src="./_images/subject_icons/default.png" name="" style="height:24px;" alt="">
     </div>
   `;

  allIcons.forEach((name) => {
   if (name == 'default.png') return;
   mergeIcons += `
     <div class="icon-selection-img" icon-name="${name}">
       <img src="./_images/subject_icons/${name}" alt="icon"> 
     </div>
     `;
  });

  setTimeout(() => {
   icon_selection_content.innerHTML = mergeIcons;
   reload_svg_btn.classList.remove('rotate');
   // enable event on all icons for selection
   EnableIconClickSelection();
  }, 1700);
 };

 // here api post request to fetch all icons list
 const fetchAllSubjectIcons = async () => {
  let result = await fetch(location.origin + '/get_all_icons');
  result = await result.json();
  return result.data;
 };

 // active icon selection
 const EnableIconClickSelection = () => {
  let all_icons_selection = document.querySelectorAll('.icon-selection-img');

  document.querySelectorAll('.icon-selection-img').forEach((iconElement) => {
   iconElement.addEventListener('click', () => {
    // 1. remove 'active' class from all icon-selection-img
    all_icons_selection.forEach((el) => el.classList.remove('active'));
    // 2. active the selected icon
    iconElement.classList.add('active');
    // 3. set selected_icon
    selected_icon = iconElement.getAttribute('icon-name');
    console.log(selected_icon);
   });
  });
 };

 const openImagesFolder = async () => {
  let result = await fetch(location.origin + '/open_icon_images_folder');
  result = await result.json();
  console.log(result.msg);
 };

 const ActiveIconSelection = () => {
  // fetch icon then insert them into selection content
  EmbedAndActiveIconsSubjectSelection();
  // active icon folder link to open the _images folder in window explorer
  icons_folder_link.addEventListener('click', () => openImagesFolder());
  // reload subject icons selection content
  reload_svg_btn.addEventListener('click', () => EmbedAndActiveIconsSubjectSelection());
 };

 //  ############################
 //  ############################
 //  ############################

 // 1. fetch all subject icons  and insert them inside subject-icon-selection-content
 ActiveIconSelection();

 console.log('Create New Subject Form is loaded....');
}
