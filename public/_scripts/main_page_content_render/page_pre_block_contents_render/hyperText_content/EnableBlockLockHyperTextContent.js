export default function EnableBlockLockHyperTextContent() {
 document.querySelectorAll('.hyperText-lock-btn').forEach((element) => {
  element.addEventListener('click', (el) => {
   if (el.target.parentElement.nextElementSibling.children[0].getAttribute('pointer-event') == 'on') {
    el.target.parentElement.nextElementSibling.children[0].style['pointer-events'] = 'none';
    el.target.parentElement.nextElementSibling.children[1].style['user-select'] = 'text';
    el.target.parentElement.nextElementSibling.children[0].setAttribute('pointer-event', 'off');
    el.target.classList.add('unlock-svg');
   } else {
    el.target.parentElement.nextElementSibling.children[0].style['pointer-events'] = 'auto';
    el.target.parentElement.nextElementSibling.children[0].setAttribute('pointer-event', 'on');
    el.target.parentElement.nextElementSibling.children[1].style['user-select'] = 'none';
    el.target.classList.remove('unlock-svg');
   }
  });

  if (window.innerWidth < 900) {
   element.classList.add('unlock-svg');
   element.parentElement.nextElementSibling.children[0].style['pointer-events'] = 'none';
   element.parentElement.nextElementSibling.children[0].setAttribute('pointer-event', 'off');
   element.parentElement.nextElementSibling.children[1].style['user-select'] = 'text';
  }
 });
}
