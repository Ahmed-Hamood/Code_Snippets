const react_highlight = (code) => {
 let ReactProperties = /\b(React|ReactDOM)(?=[^\w])/g;

 let JSXTags = /(&lt;[\/]*)([^\&]*)&gt;/g;
 let HTMLAttribute = /(\s[a-zA-Z]+[\-]?[a-zA-Z]+)=/g;
 let JSXAttribute = /\b(ref)(?=[^\w])/g;

 let wordsStartWithOnEvent = /(on\w+)=/g;

 let allSetStates = null;
 let storeStates = [];

 code.forEach((el) => {
  let data = code.innerHTML;

  // get all states where matches set(####)
  allSetStates = el.innerHTML.matchAll(/\bset([A-Z]+[a-z]*[0-9]*)\b/g);
  // make sure there is no duplicate state names inside storeStates match = [ setCount, Count ]
  for (let match of allSetStates) {
   storeStates.indexOf(match[1].toLowerCase()) === -1 ? storeStates.push(match[1].toLowerCase()) : null;
  }

  data = el.innerHTML;

  // match all states
  if (storeStates.length != 0) 
  data = data.replace(new RegExp(`\\b(${storeStates.join('|')})\\b`, 'g'), '<reactStateVariable>$1</reactStateVariable>');

  // match components like <Comp> and <Comp />
  data = data.replace(/&lt;([A-Z]+[a-zA-Z]+)([\s]*)(\/\&gt;)?/g, '&lt;<reactComponentColor>$1</reactComponentColor>$2$3');

  // match component only like </Comp>
  data = data.replace(/&lt;[\/]([A-Z]+[a-zA-Z]+)&gt;/g, '<reactBrackets>&lt;/</reactBrackets><reactComponentColor>$1</reactComponentColor><reactBrackets>&gt;</reactBrackets>');

  // match component props attribute <Comp prop1={ prop2=" >
  data = data.replace(/([a-zA-Z_$]+[0-9]*[a-zA-Z_$]*)\=(?=\{|\")/g, '<reactJSXAttribute>$1</reactJSXAttribute>=');

  // data = data.replace(/\s=\&gt;\s/g, '__'); // change => into __
  // data = data.replace(JSXTags, '<reactBrackets>$1</reactBrackets><reactJSXTag>$2</reactJSXTag><reactBrackets>></reactBrackets>');
  // data = data.replace(/\_\_/g, ' <white>=></white> '); // change __ into =>

  data = data.replace(/(&lt;)([a-z0-9]+)(&gt;)/g, '<reactBrackets>$1</reactBrackets><reactJSXTag>$2</reactJSXTag><reactBrackets>$3</reactBrackets>'); // <div>
  data = data.replace(/(\&lt;)([a-z0-9]+)/g, '<reactBrackets>$1</reactBrackets><reactJSXTag>$2</reactJSXTag>'); // <button ..
  data = data.replace(/(\&lt;\/)([a-z0-9]+)(\&gt;)/g, '<reactBrackets>$1</reactBrackets><reactJSXTag>$2</reactJSXTag><reactBrackets>$3</reactBrackets>'); // </button>

  data = data.replace(/\s=\&gt;\s/g, '__'); // change => into __

  data = data.replace(/\/\&gt;/g, '<reactBrackets>/></reactBrackets>'); // />
  data = data.replace(/\&lt;/g, '<reactBrackets><</reactBrackets>'); // <
  data = data.replace(/([^\=])\&gt;/g, '$1<reactBrackets>></reactBrackets>'); // >

  data = data.replace(/\_\_/g, ' <reactArrowSign>=></reactArrowSign> '); // change __ into =>

  //  ###################################################################################################################################

  data = data.replace(wordsStartWithOnEvent, '<reactJSXAttribute>$1</reactJSXAttribute>=');

  data = data.replace(HTMLAttribute, '<reactHTMLAttribute>$1</reactHTMLAttribute>=');
  data = data.replace(JSXAttribute, '<reactJSXAttribute>$1</reactJSXAttribute>');

  data = data.replace(ReactProperties, '<jsPropertyColor>$1</jsPropertyColor>');

  // wrap all your text lines around ### lines ### - to make sure that other coloring won't mixed with the original text color
  data = data.replace(/\#\#\#[\s]*([\w\D\s]+)[\s]*\#\#\#/g, '<reactTextColor>$1</reactTextColor>'); // ## text line 1,2,3 here ##
  data = data.replace(/(\/\*.*\*\/)/g, '<jsComment>$1</jsComment>'); // comment

  el.innerHTML = data;
 });
};

export default react_highlight;
