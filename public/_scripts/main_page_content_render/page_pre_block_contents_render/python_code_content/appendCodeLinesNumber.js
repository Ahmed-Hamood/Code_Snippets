// The following :
// add line of numbers on code
// ignore to prevent event on the first line

export default function appendCodeLinesNumber() {
 document.querySelectorAll('.python-line-num').forEach((el) => {
  let TextContent = el.nextElementSibling.textContent;
  let totalLines = 0;
  let dataHighlightNum = el.dataset.highlightNum;

  // split data-highlight-num attribute value "4,5,6" => ['4', '5', '6']
  if (dataHighlightNum) dataHighlightNum = dataHighlightNum.split(',');

  let lineBreaks = TextContent.match(/\n/gi) || [];
  let ListNumberElement = null;
  let getLineColor = '';
  let getLineNumber = '';
  totalLines = lineBreaks.length ? lineBreaks.length + 1 : 1;

  el.style['width'] = totalLines >= 1000 ? `${el.offsetWidth + 6}px` : "";

  for (var num = 1; num < totalLines; num++) {
   ListNumberElement = document.createElement('li');
   ListNumberElement.innerHTML = num;

   // here we loop thru dataHighlightNum and match its index with the current list Number
   // then we assign a class name of highlightLine
   if (dataHighlightNum) {
    dataHighlightNum.forEach((el, index) => {
     if (dataHighlightNum[0] == 'all') {
      ListNumberElement.className = 'highlight-line';
     } else {
      getLineNumber = dataHighlightNum[index];
      getLineColor = '';
      if (isNaN(dataHighlightNum[index])) {
       // Apply color highligh if data include color letter like "12g"
       getLineColor = dataHighlightNum[index].split('')[dataHighlightNum[index].length - 1]; // ['1', '2', 'g'] ==> 'g'
       getLineNumber = dataHighlightNum[index].split(''); // "12g" ==> ['1', '2', 'g']
       getLineNumber.pop(); // ==> ['1', '2']
       getLineNumber = getLineNumber.join(''); // ==> '12'
      }
      if (getLineNumber == num) {
       ListNumberElement.className = 'highlight-line ' + getLineColor;
       if (getLineColor == 'a') ListNumberElement.textContent = '+';
       if (getLineColor == 'm') ListNumberElement.textContent = '-';
      }
     }
    });
   }

   el.appendChild(ListNumberElement);
  }
 });
}
