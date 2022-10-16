export default function navToHashPos(refPos = null) {
 let urlSearchParams = new URLSearchParams(window.location.search);

 if (urlSearchParams.has('refPos') || refPos) {
  let getRef = refPos || urlSearchParams.get('refPos');
  let currentURL = location.href;
  let GetLinkPos = document.getElementById(`title-${getRef}`);
  const doc_content_render_container = document.getElementById('page-content-render-container');

  if (GetLinkPos) {
   setTimeout(() => {
    doc_content_render_container.scrollTo(0, GetLinkPos.offsetTop);
    GetLinkPos.classList.add('focus');
    setTimeout(() => {
     GetLinkPos.classList.remove('focus');
    }, 2500);
    window.history.pushState('page', null, currentURL);
   }, 2000);
  }
 }
}
