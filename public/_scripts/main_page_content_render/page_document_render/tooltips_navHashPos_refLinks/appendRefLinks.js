export default async function appendRefLinks() {
 const getAllLinksRef = document.querySelectorAll('#link-ref');
 const getAllLinksUrl = document.querySelectorAll('#link-url');
 const getAllLinksNav = document.querySelectorAll('#link-nav');

 let get_href = '';

 let LoadRefJSON = async (url_link) => {
  let getData = await fetch(url_link + '/ref.json');
  getData = await getData.json();
  return getData;
 };

 if ([...getAllLinksUrl].length != 0) {
  getAllLinksUrl.forEach((element) => {
   element.setAttribute('title', `Visit URL Link, open in a new tab.`);
   element.setAttribute('target', `_blank`);
  });
 }

 if ([...getAllLinksNav].length != 0) {
  getAllLinksNav.forEach((element) => {
   element.setAttribute('title', `Scroll to [${element.textContent}] title`);
  });
 }

 if ([...getAllLinksRef].length != 0) {
  let get_current_path = document.body.getAttribute('current_path');

  let getDataRef;
  let ref_text_content;
  let ref_href;
  let ref_subject_title;
  let ref_info;
  let refHashTitlePos;
  let queryString;
  let ref_description;
  let hasMatch;

  get_current_path = get_current_path.split('/');
  get_current_path.pop();
  get_current_path = get_current_path.join('/');

  try {
   getDataRef = await LoadRefJSON(get_current_path);

   getAllLinksRef.forEach((element) => {
    get_href = element.getAttribute('href');
    ref_text_content = '';
    ref_href = '';
    ref_subject_title = '';
    ref_info = '';
    refHashTitlePos = '';
    queryString = '';
    ref_description = '';
    hasMatch = false;

    if (getDataRef && getDataRef?.length != 0) {
     getDataRef.forEach((data) => {
      if (get_href == data.ref_id) {
       hasMatch = true;
       ref_text_content = data.ref_text_content?.trim();
       ref_href = data.ref_href?.trim();
       ref_subject_title = data.ref_subject_title?.trim();
       ref_info = data.ref_info?.trim();
       refHashTitlePos = data.hashPos.substring(1);
       ref_description = data.ref_description;

       ref_href = ref_href.replace(/\//g, '#');

       if (!ref_subject_title) {
        ref_subject_title = ref_href.split('#');
        ref_subject_title = ref_subject_title[ref_subject_title.length - 1];
        ref_subject_title = ref_subject_title.replace(/.html/, '');
       }

       refHashTitlePos = refHashTitlePos ? `refPos=${refHashTitlePos}` : '';
       queryString = `/?${refHashTitlePos}&newTab&subjectTitle=${ref_subject_title}__`;
       ref_href = location.origin + queryString + ref_href;

       element.href = ref_href;
       element.target = '_blank';
       element.textContent = ref_text_content ? ref_text_content : element.textContent;
       element.innerHTML += `<div class='tooltiptext'> ${ref_description} <span class="link-text ${ref_description ? 'mt' : ''}">Click for more information</span></div>`;
      }
     });
     if (!hasMatch) element.innerHTML = `<red>[Error]</red>`;
    }
   });
  } catch (error) {
   console.log('Error While fetching reference Link');
  }
 }
}
