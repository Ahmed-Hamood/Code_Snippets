export default function _ImageViewer() {
 let AllImages = document.querySelectorAll('#image');

 if (AllImages.length != 0) {
  // Image view Only open with computer but not mobiles
  let imageElement = null;
  let getImageType = '';
  let currentZoom = 1;
  let minimumZoom = 0.5;
  let maximumZoom = null; // set below - base on the image width

  let contentRender = document.getElementById('page-content-wrapper');
  let modal_container = null;
  let modal_image_content_wrapper = null;
  let modal_image_content = null;
  let modal_image_title = null;

  let modalContainer = `
  <div id="myModal" class="modal-image-view-container">
    <div class="modal-content-wrapper"> 
      <i class="svg close-svg close-modal-image-btn"></i>
      <img class="modal-image-content" src="" alt="">
      <div class="modal-image-title"> Click on GIF/Image Clip to Restart it. </div>
    </div>
  </div>
  `;

  // if mobile then disable image viewer and check if image of type GIF to active restart clip.
  if (window.innerWidth < 900) {
   let imageGifUrl = null;
   let checkGif = null;

   // Mobile image configuration
   AllImages.forEach((element) => {
    imageGifUrl = element.src;
    checkGif = imageGifUrl.substring(imageGifUrl.length - 3);

    if (checkGif.toUpperCase() == 'GIF') {
     element.addEventListener('click', (ev) => {
      ev.target.setAttribute('src', ev.target.src);
     });
    }
   });
   return;
  }

  // ===========================================================================
  // ===========================================================================
  // ===========================================================================

  contentRender.insertAdjacentHTML('afterbegin', modalContainer);

  modal_container = document.querySelector('.modal-image-view-container');
  modal_image_content_wrapper = document.querySelector('.modal-content-wrapper');
  modal_image_content = document.querySelector('.modal-image-content');
  modal_image_title = document.querySelector('.modal-image-title');

  // All listener callback

  let cb_gif_active = () => {
   modal_image_content.setAttribute('src', imageElement.src);
  };

  let cb_image_scroll_active = (event) => {
   console.log('Added.....');
   if (event.deltaY < 0) {
    if (currentZoom <= maximumZoom) {
     modal_image_content.style['transform'] = `scale(${(currentZoom += 0.3)})`;
    }
   }

   if (event.deltaY > 0) {
    if (currentZoom >= minimumZoom) {
     modal_image_content.style['transform'] = `scale(${(currentZoom -= 0.3)})`;
    }
   }
  };

  // All image methods

  let closeImageModalContainer = () => {
   modal_container.style['display'] = 'none';
  };

  let ActiveGIFImage = () => {
   modal_image_title.style.display = 'block';
   modal_image_content.style.cursor = 'pointer';
   modal_image_content.addEventListener('click', cb_gif_active);
  };

  let OpenImageAndAddListeners = (event) => {
   imageElement = event.target;
   maximumZoom = imageElement.naturalWidth < 600 ? 3.5 : 1.5;

   getImageType = imageElement.src.substring(imageElement.src.length - 3);

   modal_image_content.setAttribute('src', imageElement.src);
   modal_container.style.display = 'flex';

   if (getImageType.toUpperCase() == 'GIF') ActiveGIFImage();

   // Image zoom-In/Out while scrolling up/down
   modal_image_content_wrapper.addEventListener('wheel', cb_image_scroll_active);
  };

  let CloseAndResetImage = () => {
   currentZoom = 1;
   modal_image_content.style.cursor = 'default';
   modal_image_content.style = ''; // reset image
   modal_image_content.setAttribute('src', ''); // clear image url source
   modal_image_content.removeEventListener('click', cb_gif_active);
   modal_image_content_wrapper.removeEventListener('wheel', cb_image_scroll_active);
   modal_image_title.style.display = 'none';
   closeImageModalContainer();
  };

  // ############################################################

  // image opener - when click on an image open it and then add the scroll image wheel listener
  AllImages.forEach((element) => element.addEventListener('click', OpenImageAndAddListeners));
  // close image will reset image src and style and remove any listener.
  document.querySelector('.close-modal-image-btn').addEventListener('click', () => CloseAndResetImage());
 }
}
