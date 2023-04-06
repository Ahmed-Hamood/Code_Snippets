// The following :
// add line of numbers on code
// ignore to prevent event on the first line

export default function appendStyleSheetLinesNumber() {
 document.querySelectorAll('.css-line-num').forEach((el) => {
  let codeContent = el.nextElementSibling.textContent;
  let totalLines = 0;
  let dataHighlightNum = el.dataset.highlightNum;

  // split data-highlight-num attribute value "4,5,6" => ['4', '5', '6']
  if (dataHighlightNum) dataHighlightNum = dataHighlightNum.split(',');

  let lineBreaks = codeContent.match(/\n/gi) || [];
  let ListNumberElement = null;

  totalLines = lineBreaks.length ? lineBreaks.length + 1 : 1;

  if (totalLines >= 1000) {
   el.style['width'] = `${el.offsetWidth + 42}px`;
  } else if (totalLines >= 100) {
   el.style['width'] = `${el.offsetWidth + 32}px`;
  } else {
   el.style['width'] = '';
  }

  for (var num = 1; num < totalLines; num++) {
   ListNumberElement = document.createElement('li');
   ListNumberElement.innerHTML = num;
   if (dataHighlightNum) {
    dataHighlightNum.forEach((el, index) => {
     if (dataHighlightNum[index] == num) {
      ListNumberElement.className = 'highlight-line';
     }
    });
   }

   el.appendChild(ListNumberElement);
  }
 });
}
