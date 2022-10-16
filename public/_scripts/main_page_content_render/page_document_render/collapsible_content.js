export default function Collapsible_content() {
 let allCollapsible = document.querySelectorAll('.Collapsible-title');

 if (allCollapsible.length != 0) {
  allCollapsible.forEach((el) => {
   el.addEventListener('click', () => {
    let content = el.nextElementSibling;

    el.classList.toggle('active');

    if (el.classList.contains('active')) {
     content.style.height = '100%';
     content.style.maxHeight = '100%';
     content.style['margin-bottom'] = '30px';
     content.style['border-bottom'] = '2px dashed #404040';
    } else {
     content.style.maxHeight = '0px';
     content.style.height = '0px';
     content.style['margin-bottom'] = '0px';
     content.style['border-bottom'] = '';
    }
   });
  });
 }
}
