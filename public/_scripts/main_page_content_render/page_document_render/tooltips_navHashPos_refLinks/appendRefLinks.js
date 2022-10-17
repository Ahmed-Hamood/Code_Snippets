export default async function appendRefLinks() {
 const getAllLinks = document.querySelectorAll('#ref-link');
 const getAllOnlyLinks = document.querySelectorAll('#only-link');
 const page_content_type = document.querySelector('.highlight-menu');
 let get_href = '';

 let LoadRefJSON = async (url_link) => {
  let getData = await fetch(url_link + '/ref.json');
  getData = await getData.json();
  return getData;
 };

 if (getAllOnlyLinks.length != 0) {
  getAllOnlyLinks.forEach((element) => {
   element.target = '_blank';
  //  element.innerHTML += `<p class='tooltiptext'><span class="link-text">Click to visit the link</span></p>`;
  });
 }

 if (getAllLinks.length != 0) {
  const urlSearchParams = new URLSearchParams(window.location.search);
  let getPathUrl = location.hash;
  let getDataRef;
  let ref_name;
  let ref_href;
  let ref_info;
  let refHashPos;
  let refQs;
  let ref_description;
  let hasMatch;

  getPathUrl = getPathUrl.split('#');
  // ['', 'Docs', 'nodejs', 'expressjs', 'Authentication', 'Helmet', '3%20-%20topic%20three.html'] // new tab topic link
  // ['', 'Docs', 'nodejs', 'expressjs', 'Authentication', 'Helmet.html'] // topic link

  if (urlSearchParams.has('newTab') && urlSearchParams.has('topicLink')) getPathUrl.pop();
  else getPathUrl[getPathUrl.length - 1] = getPathUrl[getPathUrl.length - 1].slice(0, -5);

  if (page_content_type) if (page_content_type.getAttribute('page_content_type') == 'topic') getPathUrl.pop();

  if (urlSearchParams.has('page_content_type')) if (urlSearchParams.get('page_content_type') == 'topic') getPathUrl.pop();

  getPathUrl = getPathUrl.join('/');

  try {
   getDataRef = await LoadRefJSON(getPathUrl);

   getAllLinks.forEach((element) => {
    get_href = element.getAttribute('href');
    ref_name = '';
    ref_href = '';
    ref_info = '';
    refHashPos = '';
    refQs = '';
    ref_description = '';
    hasMatch = false;

    if (getDataRef && getDataRef?.length != 0) {
     getDataRef.forEach((data) => {
      if (get_href == data.ref_id) {
       hasMatch = true;
       ref_name = data.ref_name?.trim();
       ref_href = data.ref_href?.trim();
       ref_info = data.ref_info?.trim();
       refHashPos = data.hashPos.substring(1);
       refQs = data.qs;
       ref_description = data.ref_description;

       refHashPos = refHashPos ? `refPos=${refHashPos}` : '';
       ref_href = location.origin + `/?${refHashPos}&${refQs}` + ref_href;

       element.href = ref_href;
       element.target = '_blank';
       element.textContent = ref_name;

       element.innerHTML += `<p class='tooltiptext'> ${ref_description} <span class="link-text ${ref_description ? 'mt' : ''}">Click for more information</span></p>`;
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
