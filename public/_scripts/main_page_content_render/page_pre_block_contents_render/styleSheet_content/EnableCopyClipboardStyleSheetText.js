export default function EnableCopyClipboardStyleSheetText() {
 document.querySelectorAll('.copyCssTextClipboard').forEach((el) => {
  el.addEventListener('click', () => {
   if (!el.classList.contains('copied')) {
    // target pre code content text
    let codeText = el.parentElement.nextElementSibling.children[1].textContent;

    if (!navigator.clipboard) {
     let inputElement = document.createElement('textarea');
     document.body.appendChild(inputElement);
     inputElement.value = codeText;
     inputElement.select();
     document.execCommand('copy');
     inputElement.parentNode.removeChild(inputElement);
    } else {
     navigator.clipboard
      .writeText(codeText)
      .then(() => console.log('Text Copied.....'))
      .catch(() => {
       throw 'Error While copy';
      });
    }

    el.classList.add('copied');
    el.classList.add('check-svg');
    el.classList.remove('copy-svg');
    el.style['opacity'] = '1';

    setTimeout(() => {
     el.classList.remove('copied');
     el.classList.remove('check-svg');
     el.classList.add('copy-svg');
     el.style['opacity'] = '';
    }, 5000);
   }
  });
 });
}
