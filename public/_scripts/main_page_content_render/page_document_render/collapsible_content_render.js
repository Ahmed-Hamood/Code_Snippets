export default function collapsible_content_render() {
 let AllQuery = document.querySelectorAll('[Collapse-content]');
 let getAllCollapsible = [];

 if ([...AllQuery].length != 0) {
  let title_header = '';
  let Collapse_content = '';

  AllQuery.forEach((element) => {
   title_header = element.getAttribute('title-header') || 'Click For More Information...';
   Collapse_content = element.innerHTML
   element.className = 'Collapsible-container';

   element.innerHTML = `
   <p class="Collapsible-title"> ${title_header} </p>
   <div class="Collapsible-content">
    ${Collapse_content.trim() || "<p class='text center red'>[No Content]</p>"}
   </div>
   `;
  });
 }

 getAllCollapsible = document.querySelectorAll('.Collapsible-title');

 if ([...getAllCollapsible].length != 0) {
  getAllCollapsible.forEach((el) => {
   el.addEventListener('click', () => {
    el.parentElement.classList.toggle('opened');
   });
  });
 }
}
