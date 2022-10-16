export default function _ImageViewer() {
 let AllImages = document.querySelectorAll('#image');

 if (AllImages.length != 0) {
  if (window.innerWidth > 900) {
   // Image view Only open with computer but not mobiles
   let imageElement = null;
   let zoom = 0.7;
   let maximumZoom = 0;
   let minimumZoom = 0.6;
   let contentRender = document.getElementById('page-content-wrapper');
   let modalContainer = `
  <div id="myModal" class="modal-container">
    <i class="svg close-svg close-image"></i>
    <img class="modal-image-content" src="" alt="">
    <div class="modal-image-title"> Click on Image Clip to Restart the Clip </div>
  </div>
  `;

   contentRender.insertAdjacentHTML('afterbegin', modalContainer);

   let modal_container = document.querySelector('.modal-container');
   let modal_image_content = document.querySelector('.modal-image-content');
   let modal_image_title = document.querySelector('.modal-image-title');

   // ############################################################

   function cb() {
    modal_image_content.setAttribute('src', '');
    modal_image_content.setAttribute('src', imageElement.src);
   }

   modal_container.addEventListener('wheel', (event) => {
    console.dir(maximumZoom);
    if (event.deltaY < 0) {
     if (zoom <= maximumZoom) {
      modal_image_content.style['transform'] = `scale(${(zoom += 0.3)})`;
     }
    } else if (event.deltaY > 0) {
     if (zoom >= minimumZoom) {
      modal_image_content.style['transform'] = `scale(${(zoom -= 0.3)})`;
     }
    }
   });

   document.querySelector('.close-image').addEventListener('click', (e) => {
    zoom = 1;
    modal_image_content.style.cursor = 'default';
    modal_image_content.setAttribute('src', '');
    modal_image_content.removeEventListener('click', cb);
    modal_image_title.style.display = 'none';
    e.target.parentElement.style.display = 'none';
    modal_image_content.style['transform'] = 'scale(0.7)';
   });

   AllImages.forEach((element) => {
    element.addEventListener('click', (e) => {
     imageElement = e.target;
     let imageType = imageElement.src.substring(imageElement.src.length - 3);

     modal_image_content.setAttribute('src', imageElement.src);
     modal_container.style.display = 'flex';

     if (imageType == 'gif') {
      modal_image_title.style.display = 'block';
      modal_image_content.style.cursor = 'pointer';
      modal_image_content.addEventListener('click', cb);
     }
     console.dir(imageElement);
     if (imageElement.naturalWidth < 600) maximumZoom = 3.5;
     else maximumZoom = 1.5;
    });
   });
  } else {
   // Mobile image configuration
   AllImages.forEach((element) => {
    let imageGifUrl = element.src;
    let checkGif = imageGifUrl.substring(imageGifUrl.length - 3);

    if (checkGif == 'gif') {
     element.addEventListener('click', (e) => {
      e.target.src = '';
      e.target.src = imageGifUrl;
     });
    }
   });
  }
 }
}
