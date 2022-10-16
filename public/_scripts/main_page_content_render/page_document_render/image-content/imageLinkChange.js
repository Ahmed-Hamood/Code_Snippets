export default function imageLinkChange() {
 const getAllImages = document.querySelectorAll('#image');
 if (getAllImages.length != 0) {
  const urlSearchParams = new URLSearchParams(window.location.search);
  let getPathUrl = location.hash;
  let file_extract = null;

  getPathUrl = getPathUrl.split('#');

  if (urlSearchParams.has('newTab') && urlSearchParams.has('topicLink')) getPathUrl.pop();
  else getPathUrl[getPathUrl.length - 1] = getPathUrl[getPathUrl.length - 1].slice(0, -5);

  getPathUrl = getPathUrl.join('/');

  getAllImages.forEach((element) => {
   let image_name = element.getAttribute('path');

   if (element.hasAttribute('file')) {
    file_extract = getPathUrl.split('/');
    file_extract.pop();
    getPathUrl = file_extract.join('/');
   }

   element.src = location.origin + getPathUrl + image_name;
   element.setAttribute('alt', 'image');
   element.setAttribute('loading', 'lazy');

   element.addEventListener('load', (e) => {
    if (e.target.width > 1000) {
     element.setAttribute('width', '700px');
    } else {
     if (window.innerWidth > 1930) {
      if (e.target.width > 800) element.setAttribute('width', '800px');
     } else {
      if (e.target.width > 700) element.setAttribute('width', '700px');
     }
    }
   });
  });
 }
}
