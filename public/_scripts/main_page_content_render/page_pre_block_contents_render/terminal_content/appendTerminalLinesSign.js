export default function appendTerminalLinesSign() {
 document.querySelectorAll('.command-line-sign').forEach((el) => {
  let TerminalContent = el.nextElementSibling.textContent;
  let getSign = el.dataset.sign;
  let totalLines = 1;
  let dataHighlightNum = el.dataset.highlightNum;

  // split data-highlight-num attribute value "4,5,6" => ['4', '5', '6']
  if (dataHighlightNum) dataHighlightNum = dataHighlightNum.split(',');

  let lineBreaks = TerminalContent.match(/\n/gi) || [];
  let ListNumberSpanElement = null;
  totalLines = lineBreaks.length ? lineBreaks.length + 1 : 1;

  for (var num = 1; num < totalLines; num++) {
   ListNumberSpanElement = document.createElement('li');
   ListNumberSpanElement.innerHTML = getSign;

   if (dataHighlightNum) {
    dataHighlightNum.forEach((el, index) => {
     if (dataHighlightNum[index] == num) {
      ListNumberSpanElement.className = 'highlight-line';
     }
    });
   }

   el.appendChild(ListNumberSpanElement);
  }
 });
}
