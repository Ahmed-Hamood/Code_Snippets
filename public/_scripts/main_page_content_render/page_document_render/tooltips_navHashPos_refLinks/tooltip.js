export default function tooltip() {
 console.log('tooltip is running');

 const all_tooltips = document.querySelectorAll('tooltip');
 let contentRender = document.getElementById('page-content-wrapper');
 let blank_modal = document.getElementById('blank-modal');
 let body = document.body;

 let tooltip_text = '';
 let textContent = '';
 let mb_tooltip_content = null;

 let tooltip_content = `
 <div class="mb-tooltip-content">
   <h1></h1>
   <p></p>
 </div>
 `;

 let format_text = (element) => {
  textContent = element.textContent;
  tooltip_text = element.getAttribute('text');
  tooltip_text = tooltip_text.trim(); 
  

  tooltip_text = tooltip_text.replace(/([0-9A-Z])[\s]*[\.\-]/g, '$1.'); // replace 'A .' or  'A -' or 'A-' (with) =>  A.
  tooltip_text = tooltip_text.replace(/\s([0-9A-Z])\./g, '<hr>$1.'); // add <hr> line break before 'A.' or '1.'
  tooltip_text = tooltip_text.replace(/([0-9A-Z])\./g, '<span>$1.</span>'); // style letter | number
 };

 if (all_tooltips.length != 0) {
  contentRender.insertAdjacentHTML('afterbegin', tooltip_content);
  mb_tooltip_content = document.querySelector('.mb-tooltip-content');
 }

 all_tooltips.forEach((element) => {
  if (window.innerWidth < 1000) {
   element.addEventListener('click', (ev) => {
    format_text(ev.target);

    if (tooltip_text.includes('<hr>')) mb_tooltip_content.children[0].classList.add('left');
    mb_tooltip_content.children[0].innerHTML = textContent;
    mb_tooltip_content.children[1].innerHTML = tooltip_text;
    mb_tooltip_content.classList.add('show');
    blank_modal.classList.add('show-tooltip');
    body.setAttribute('blank-current-active', 'tooltip');
   });
  } else {
   format_text(element);
   element.innerHTML = `${textContent}<span class="tooltiptext ${tooltip_text.includes('<hr>') ? 'left' : ''}">${tooltip_text}</span>`;
  }
 });
}
