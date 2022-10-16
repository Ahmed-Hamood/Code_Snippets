// The following :
// copy code block when click on copy button
export default function EnableCopyClipboardPythonCodeText() {
 document.querySelectorAll('.copyPythonCodeClipboard').forEach((el) => {
  el.addEventListener('click', () => {
   if (!el.classList.contains('copied')) {
    // target pre code content text
    let codeNumList = el.parentElement.nextElementSibling.children[0];
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

    codeNumList.children[0].style['pointer-events'] = 'none';

    setTimeout(() => {
     codeNumList.children[0].style['pointer-events'] = '';
    }, 500);

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
