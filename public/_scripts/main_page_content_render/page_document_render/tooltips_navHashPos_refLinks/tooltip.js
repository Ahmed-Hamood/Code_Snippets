export default function tooltip() {
 const all_tooltips = document.querySelectorAll('tooltip');
 let contentRender = document.getElementById('page-content-wrapper');
 let blank_modal = document.getElementById('blank-modal');
 let body = document.body;

 if ([...all_tooltips].length != 0) {
  let tooltip_text = '';
  let keyword = '';
  let getTooltipModalElement = null;

  let format_text = (element) => {
   keyword = element.getAttribute('keyword');
   tooltip_text = element.getAttribute('desc');

   tooltip_text = tooltip_text.trim();

   tooltip_text = tooltip_text.replace(/\b([0-9]{1,2}|[A-Z])\b[\s]*[\.\-]/g, '$1.'); // replace 'A .' or  'A -' or 'A-' (with) =>  A. || "0-99 ." or "0-99 -" with => [0-99].
   tooltip_text = tooltip_text.replace(/\s([0-9A-Z])\./g, '<hr>$1.'); // add <hr> line break before 'A.' or '1.'
   tooltip_text = tooltip_text.replace(/([0-9A-Z])\./g, '<span>$1.</span>'); // style letter | number

   tooltip_text = tooltip_text.replace(/\s\-\s/g, ' <hr>- '); // replace ' - ' with ' <hr>- '
   tooltip_text = tooltip_text.replace(/\\-/g, '-'); // replace '\-' with '-' escape '-'
  };

  let tooltip_content = `
 <div class="tooltip-modal">
   <h1 class="tooltip-title"></h1>
   <p class="tooltip-content"></p>
 </div>
 `;

  contentRender.insertAdjacentHTML('afterbegin', tooltip_content);
  getTooltipModalElement = document.querySelector('.tooltip-modal');

  all_tooltips.forEach((element) => {
   element.setAttribute('keyword', element.textContent);
   format_text(element);

   // add tooltips to all
   if (window.innerWidth > 1000) {
    element.innerHTML = `${keyword}<div class="tooltiptext ${tooltip_text.includes('<hr>') ? 'left' : ''}">${tooltip_text}</div>`;
   }

   element.addEventListener('click', (ev) => {
    console.log(ev.target);
    if (ev.target.tagName == 'TOOLTIP' || ev.target.tagName == 'DIV') {
     element = ev.target.tagName == 'DIV' ? ev.target.parentElement : ev.target;
     console.log(element);
     format_text(element);
     if (tooltip_text.includes('<hr>')) getTooltipModalElement.children[0].classList.add('left');
     getTooltipModalElement.children[0].innerHTML = keyword;
     getTooltipModalElement.children[1].innerHTML = tooltip_text;
     getTooltipModalElement.classList.add('show');
     blank_modal.classList.add('show-tooltip');
     body.setAttribute('blank-current-active', 'tooltip');
    }
   });
  });
 }
}
