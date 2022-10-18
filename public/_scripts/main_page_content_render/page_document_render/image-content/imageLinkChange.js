export default function imageLinkChange() {
 const getAllImages = document.querySelectorAll('#image');
 if (getAllImages.length != 0) {
  let get_current_path = document.body.getAttribute("current_path")

  get_current_path = get_current_path.split("/");
  get_current_path.pop()
  get_current_path = get_current_path.join("/")

  getAllImages.forEach((element) => {
   let image_name = element.getAttribute('path');

   element.src = location.origin + get_current_path + image_name;
   element.setAttribute('alt', 'image');
   element.setAttribute('loading', 'lazy');

  //  element.addEventListener('load', (e) => {
  //   if (e.target.width > 1000) {
  //    element.setAttribute('width', '700px');
  //   } else {
  //    if (window.innerWidth > 1930) {
  //     if (e.target.width > 800) element.setAttribute('width', '800px');
  //    } else {
  //     if (e.target.width > 700) element.setAttribute('width', '700px');
  //    }
  //   }
  //  });
  });

 }
}
