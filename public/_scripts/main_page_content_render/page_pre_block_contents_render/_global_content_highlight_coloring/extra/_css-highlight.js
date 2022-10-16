const css_highlight = (code) => {
 //  let HtmlElementTagSelectors = /\b(h(1|2|3|4|5)|p|pre|li)(\s|\:)/g;

 //  let PseudoClasses =
 //   /:(hover|link|visited|active|focus|first-child|last-child|checked|disabled|optional|out-of-range|read-only|read-write|required|root|target|valid|empty|first-of-type|last-of-type|in-range|invalid|lang|not|nth-child|nth-last-child|nth-last-of-type|nth-of-type|only-of-type|only-child)(\s|\,)/g;
 //  let PseudoClassesMultipleColon = /::(after|before|first-letter|first-line|selection)(\s|\,)/g;

 //  let cssPropertyValues = /\b(auto|absolute|relative|hidden|block|sticky|none|solid|center|all|pointer|default)(\,|\;|\s)/g;

 //  let cssPropertyColorValues = /\b(red|green|blue|yellow|black|pink|gray)(\;|\,)/g;

 //  let cssPropertyFontsValues = /\b(Consolas|monospace|sans-serif)(\;|\,)/gi;

 //  let cssFlexPropertyValues = /\b(flex|row|space-between|nowrap)(\;|\s)/g;

 //  let cssPropertyValuesSet = /\b(rgba|rgb|var|min)(?=[^\w])/g; // setValue()

 //  let cssProperties2 = /\b(media|keyframes|var)(?=[^\w])\b/gm;

 code.forEach((el) => {
  let data = code.innerHTML;
  data = el.innerHTML;

  // data = data.replace(/\b([0-9]+[0-9]*)\b/g, '<pyDigit>$1</pyDigit>');

  // class and id names - Html element tags - Pseudo classes

  // match class Name selector - .###
  //data = data.replace(/([\.][a-zA-Z\-\_]+[0-9\-\_]*)/g, '<cssClassColor>$1</cssClassColor>');
  // match Html tag elements
  //data = data.replace(HtmlElementTagSelectors, '<cssHtmlTagColor>$1</cssHtmlTagColor>$3');
  //data = data.replace(PseudoClasses, '<cssPseudoClasses>:$1</cssPseudoClasses>$2');
  //data = data.replace(PseudoClassesMultipleColon, '<cssPseudoClasses>::$1</cssPseudoClasses>$2');

  // match Propert Names before : - ####: value
  //data = data.replace(/([a-zA-Z]+[\-\_]*[a-zA-Z]*[\-\_]*[a-zA-Z]*):\s/g, '<cssPropertyName>$1</cssPropertyName>: ');

  // match numbers with units - 12px 50%
  //data = data.replace(/([0-9\.]+(%|px|rem|em|vh|vw|pc|pt|cm|mm|in|ex|ch|vmin|vmax|ms|\s))/g, '<cssDigitWithUnitsColor>$1</cssDigitWithUnitsColor>');

  // match numbers without units - 12;
  //data = data.replace(/\s([0-9\.]+)\;/g, ' <cssDigitWithUnitsColor>$1</cssDigitWithUnitsColor>;');

  //data = data.replace(/(\(|\s)([0-9\.]+)(\,|\))/g, '$1<cssDigitWithUnitsColor>$2</cssDigitWithUnitsColor>$3');

  // match HEX color #fffff
  //data = data.replace(/(#[A-Za-z0-9]+)/g, '<cssHEXColor>$1</cssHEXColor>');

  // match property values
  //data = data.replace(cssPropertyValues, '<cssPropertyValue>$1</cssPropertyValue>$2'); //  property values

  //data = data.replace(cssPropertyColorValues, '<cssPropertyValue>$1</cssPropertyValue>$2'); //  property color values
  //data = data.replace(cssPropertyFontsValues, '<cssPropertyValue>$1</cssPropertyValue>$2'); //  property color values

  //data = data.replace(cssFlexPropertyValues, '<cssPropertyValue>$1</cssPropertyValue>$2'); //  property values
  //data = data.replace(cssPropertyValuesSet, '<cssPropertyValuesSetColor>$1</cssPropertyValuesSetColor>'); //  property values

  //data = data.replace(/(\-\-[a-zA-Z0-9\-]+)/g, '<cssPropertyVarValue>$1</cssPropertyVarValue>'); //  property var values

  // ############################################################################################################################
  // ############################################################################################################################
  // ############################################################################################################################
  // ############################################################################################################################
  // ############################################################################################################################

  // match comment
  //data = data.replace(/\/[*](.*)[*]\//gm, '<cssCommentColor>/*$1*/</cssCommentColor>'); // '#########'
  // match string bewtween '#####'
  //data = data.replace(/\'(.*?)\'/g, "<cssStringColor>'$1'</cssStringColor>"); //  '#########'
  // match string bewtween "#####"
  //data = data.replace(/\"(.*?)\"/g, '<cssStringColor>"$1"</cssStringColor>'); //  '#########'
  // { or }
  //data = data.replace(/({|})/g, '<cssCurlyBracketsColor>$1</cssCurlyBracketsColor>');
  // [ or ]
  //data = data.replace(/(\[|\])/g, '<cssCurlyBracketsColor>$1</cssCurlyBracketsColor>'); // [ or ]
  // ( or )
  //data = data.replace(/(\(|\))/g, '<cssParenthesesColor>$1</cssParenthesesColor>'); // ( or )

  el.innerHTML = data;
 });
};

export default css_highlight;
