const js_highlight = (code) => {
 let data = null;
 let jsKeywords =
  /\b(async|await|break|case|catch|class|const|continue|debugger|default|do|else|enum|export|extends|false|finally|for|function|if|implements|in|instanceof|interface|let)(?=[^\w])/g;
 let jsKeywords2 = /\b(new|null|package|private|protected|public|super|switch|static|this|throw|try|true|typeof|var|void|while|with|yield)(?=[^\w])/g;

 let jsKeywords3 = /\b(return|import|from|export|default|require|as)(?=[^\w])/g;
 let jsKeywords4 = /\b(require)(?=[^\w])/g;

 let jsArrayMethods = /\b(some|every|reduce|map|flat|filter|forEach|findIndex|find|sort|concat|fill|includes|reverse|flatMap)(?=[^\w])/g;
 let jsProperties = /\b(document|window|Array|String|Object|Number|typeof|instanceof)(?=[^\w])/g; // Array() | Array | Array$ | Array[] | Array<>
 let jsVanillaMethods = /\b(getElementsBy(TagName|ClassName|Name)|getElementById)(?=[^\w])/g; // getElementsByTagName() | getElementsByTagName
 
 code.forEach((el) => {
  data = code.innerHTML;
  data = el.innerHTML;

  // data = data.replace(/(\/\/\s.*)/g, '<jsComment>$1</jsComment>'); // comment

  // data = data.replace(
  //  /\${(.*?)}/g,
  //  '<jsDollarSignColor>$</jsDollarSignColor><CurlyBracketStringExpColor>{</CurlyBracketStringExpColor><jsExpressionString>$1</jsExpressionString><CurlyBracketStringExpColor>}</CurlyBracketStringExpColor>'
  // ); // ${####}

  // // #########################################
  // // ##### match Object content = { name: value }
  // // #########################################

  // // match object keys --> <key>: value
  // data = data.replace(/\s([a-zA-Z_$]+[0-9]*[a-zA-Z_$]*)[\s]*\: /g, ' <JSObjectLiteralColorKey>$1</JSObjectLiteralColorKey>: '); // don't add \s at the end
  // // match object values --> key: <value>
  // data = data.replace(/\:[\s]{0,1}([a-zA-Z_$]+[0-9]*[a-zA-Z_$]*)/g, ': <JSObjectPropertyValue>$1</JSObjectPropertyValue>'); // name: <property>

  // // #########################################
  // // #########################################

  // data = data.replace(/import { ([\w\,\s]+) }/g, 'import { <JsPropertyImport>$1</JsPropertyImport> }'); // import { #### }
  // data = data.replace(/export { ([\w\,\s]+) }/g, 'export { <JsPropertyImport>$1</JsPropertyImport> }'); // export { #### }
  // data = data.replace(/\, { ([\w\,\s]+) }/g, ', { <JsPropertyImport>$1</JsPropertyImport> }'); // , { #### }
  // data = data.replace(/import[\s]([a-zA-Z_$]+[0-9]*[a-zA-Z_$]*)[\s]from/g, 'import <JsPropertyImport>$1</JsPropertyImport> from'); // import #### from
  // data = data.replace(/import[\s]([a-zA-Z_$]+[0-9]*[a-zA-Z_$]*)\,/g, 'import <JsPropertyImport>$1</JsPropertyImport>,'); // import ####,
  // data = data.replace(/default ([a-zA-Z_$]+[0-9]*[a-zA-Z_$]*)\;/g, 'default <JsPropertyImport>$1</JsPropertyImport>;'); // default ####

  // data = data.replace(/\b([A-Z_]{3,})\b/g, '<jsVariableNameColor>$1</jsVariableNameColor>'); // DB_USER

  // data = data.replace(/([a-zA-Z_$]+[0-9]*[a-zA-Z_$]*)(?:\.)/g, '<jsPropertyColor>$1</jsPropertyColor>.'); // ##.##.##.abc
  // data = data.replace(/(?:\.)([a-zA-Z_$]+[0-9]*[a-zA-Z_$]*)(\s|\)|\;|\,)/g, '.<jsPropertyColor>$1</jsPropertyColor>$2'); // abc.abc.abc.###

  // data = data.replace(/const[\s]*\[([\w\,\s]+)\]/g, 'const [<jsPropertyColor>$1</jsPropertyColor>]'); // const [##]

  // // match the NOT operator before variable - !##
  // data = data.replace(/!([a-zA-Z_\$]+)/g, '!<jsPropertyColor>$1</jsPropertyColor>'); // !##

  // // #########################################
  // // #### Match variable Name of Arrow Function and parameter between parentheses  ####
  // // #########################################

  // // match variable that is assigned to an empty arrow function --> let #### = () => { }
  // data = data.replace(
  //  /(let|const)[\s]+([a-zA-Z_$]+[0-9]*[a-zA-Z_$]*)[\s]+[\=][\s]+[\(][\)][\s]=/g,
  //  '$1 <jsVariableNameFunctionColor>$2</jsVariableNameFunctionColor> = () ='
  // );

  // // match variable that is assigned to a single parameter arrow function --> let #### = data => { }
  // data = data.replace(
  //  /(let|const)[\s]+([a-zA-Z_$]+[0-9]*[a-zA-Z_$]*)[\s]+[\=][\s]+([a-zA-Z_$]+[0-9]*[a-zA-Z_$]*)[\s]=/g,
  //  '$1 <jsVariableNameFunctionColor>$2</jsVariableNameFunctionColor> = $3 ='
  // );

  // // match variable that is assigned to arrow function with parentheses for parameters --> let #### = (data, ...) => { }
  // data = data.replace(/(let|const)[\s]+([a-zA-Z_$]+[0-9]*[a-zA-Z_$]*)[\s]+[\=][\s]+(?=[\(])/g, '$1 <jsVariableNameFunctionColor>$2</jsVariableNameFunctionColor> = ');

  // // #########################################
  // // ## Match variable names after let, const, return and before ++, --#####
  // // #########################################

  // // match variable name after let and const --> const ### | let ###
  // data = data.replace(/(const|let|var)[\s]+([a-zA-Z\_]+\s\=)/g, '$1 <jsVariableNameColor>$2</jsVariableNameColor>');

  // // match variable name before =
  // data = data.replace(/([a-zA-Z\_]+)[\s]\=[\s]/g, '<jsVariableNameColor>$1</jsVariableNameColor> = ');

  // // match function call name --> ####() { } or function ###()
  // data = data.replace(/\b([a-zA-Z_$]+[0-9]*[a-zA-Z_$]*)([\s]?)(?=[\(])\b/g, '<jsFunctionNameColor>$1</jsFunctionNameColor>$2');

  // // match variable name after return keyword --> return abc
  // data = data.replace(/return[\s]*([a-zA-Z_$]+[0-9]*[a-zA-Z_$]*)/g, 'return <jsPropertyColor>$1</jsPropertyColor>');

  // // a++, a--
  // data = data.replace(/([a-zA-Z_$]+)([\+\-]{2,})/g, '<jsKeyword4Color>$1</jsKeyword4Color>$2');

  // // #########################################
  // // ### Match words - Target words variables and parameters of text - jsPropertyColor style
  // // #########################################

  // // match variable array access --> ######[]
  // data = data.replace(/([a-zA-Z_$]+[0-9]*[a-zA-Z_$]*)(?=[\[](.*?)[\]])/g, '<jsPropertyColor>$1</jsPropertyColor>');

  // // match array spread word variable  ...####
  // data = data.replace(/\.\.\.([a-zA-Z_$]+[0-9]*[a-zA-Z_$]*)/g, '...<jsPropertyColor>$1</jsPropertyColor>');

  // // match word after equal= --> let total = ###;
  // data = data.replace(/[\s]+[=][\s]+([a-zA-Z_$]+[0-9]*[a-zA-Z_$]*)/g, ' = <jsVariableNameColor>$1</jsVariableNameColor>');

  // // match word after +,-,*,/ --> let total = 1 + # + # - 6;
  // data = data.replace(/([\s]?)([\+\-\*\/])[\s]+([a-zA-Z_$]+[0-9]*[a-zA-Z_$]*)/g, '$1$2 <jsPropertyColor>$3</jsPropertyColor>');

  // // match word before ; --> let total = 1 + #;
  // data = data.replace(/([\s]+)([a-zA-Z_$]+[0-9]*[a-zA-Z_$]*)[\;]/g, '$1<jsPropertyColor>$2</jsPropertyColor>;');

  // // match word before +,-,*,/ -->  ## + ;
  // data = data.replace(/([a-zA-Z\_\$]+)\s([\-\+\*\/])\s/g, '<jsVariableNameColor>$1</jsVariableNameColor> $2 ');

  // // match word after comma --> { ABC, #, # }
  // data = data.replace(/[\,][\s]?([a-zA-Z_$]+[0-9]*[a-zA-Z_$]*)(?=\,)/g, ', <jsPropertyColor>$1</jsPropertyColor>');
  // data = data.replace(/[\{][\s]([a-zA-Z_$]+[0-9]*[a-zA-Z_$]*)/g, '{ <jsPropertyColor>$1</jsPropertyColor>');
  // data = data.replace(/([a-zA-Z_$]+[0-9]*[a-zA-Z_$]*[\s][\}])/g, '<jsPropertyColor>$1</jsPropertyColor>');

  // // match word after comma with equal --> (Abc, # = ABC,  )
  // data = data.replace(/[\,][\s]?([a-zA-Z_$]+[0-9]*[a-zA-Z_$]*)[\s]?\=/g, ', <jsPropertyColor>$1</jsPropertyColor> =');

  // // match word after ([#, abc  with jsPropertyColor style
  // data = data.replace(/([\[\(])(?=[^\"\'\`\&\[])([\s]?[[a-zA-Z_$]+[0-9]*[a-zA-Z_$]*)[\s]*(?=[\,\]\)\;\s])/g, '$1<jsPropertyColor>$2</jsPropertyColor>');
  // // match word before #]), abc  with jsPropertyColor style
  // data = data.replace(/[\s]?([a-zA-Z_$]+[0-9]*[a-zA-Z_$]*)(?=[^\"\'\`])(\]|\))/g, ' <jsPropertyColor>$1</jsPropertyColor>$2');

  // // match var word before +=, -+, *=, /= --> ## +=, -+, *=, /=
  // data = data.replace(/([a-zA-Z_$]+[0-9]*[a-zA-Z_$]*)[\s]+((\+|\-|\*|\/|\%)\=)/g, '<jsPropertyColor>$1</jsPropertyColor> $2');

  // // match var word after +=, -+, *=, /= --> +=, -+, *=, /= ##
  // data = data.replace(/[\s]+((\+|\-|\*|\/|\%)\=)[\s]+([a-zA-Z_$]+[0-9]*[a-zA-Z_$]*)/g, '$1 <jsPropertyColor>$2</jsPropertyColor>');

  // // match word after ||, ==, !==, <=, &&, ||, <, >, <=, >=
  // data = data.replace(
  //  /[\s]+(&amp;&amp;|\|\||\=\=\=|\=\=|\!\=|\!\=\=|\&gt\;|\&lt\;|\&gt\;\=|\&lt\;\=)[\s]+([a-zA-Z_$]+[0-9]*[a-zA-Z_$]*)/g,
  //  ' $1 <jsPropertyColor>$2</jsPropertyColor>'
  // );
  // // match word before ||, ==, !==, <=, &&, ||, <, >, <=, >=
  // data = data.replace(
  //  /[\s]+([a-zA-Z_$]+[0-9]*[a-zA-Z_$]*)[\s](&amp;&amp;|\|\||\=\=\=|\=\=|\!\=|\!\=\=|\&gt\;|\&lt\;|\&gt\;\=|\&lt\;\=)[\s]+/g,
  //  ' <jsPropertyColor>$1</jsPropertyColor> $2 '
  // );

  // // ##############################################################################
  // // ### Match Digits - Target 123 1.23 that come after ([,+-*/= and return - jsDigitColor style
  // // ##############################################################################

  // // match digit after equal= --> let total = # + 2 + 3;
  // data = data.replace(/[\s]+[=][\s]?([0-9\.]+)/g, ' = <jsDigitColor>$1</jsDigitColor>');

  // // match digit after +,-,*,/ --> let total = 1 + # + # - 6;
  // data = data.replace(/([\s]?)([\+\-\*\/])[\s]([0-9\.]+)/g, '$1$2 <jsDigitColor>$3</jsDigitColor>');

  // // match digit after comma --> 1, #, #
  // data = data.replace(/([\s]?)([\,])[\s]?([0-9\.]+)/g, '$1$2 <jsDigitColor>$3</jsDigitColor>');

  // // match digits after ([#, 2  with jsDigitColor style
  // data = data.replace(/([\[\(])(?=[^\"\&])([0-9\.]+)(?=[\,\]\)\;\s])/g, '$1<jsDigitColor>$2</jsDigitColor>');
  // // match digits before 2, #)]  with jsDigitColor style
  // data = data.replace(/([\s]+)([0-9\.]+)(?=[^\"\'])(\]|\))/g, '$1<jsDigitColor>$2</jsDigitColor>$3');

  // // match digit before ; --> let total = 1 + #;
  // data = data.replace(/([\s]+)([0-9\.]+)[\;]/g, '$1<jsDigitColor>$2</jsDigitColor>;');

  // // match digit after +=, -+, *=, /= --> +=, -+, *=, /= ##
  // data = data.replace(/[\s]?((\+|\-|\*|\/|\%)\=)[\s]+([0-9\.]+)/g, ' $1 <jsDigitColor>$3</jsDigitColor>');

  // // match digit after comma --> +, -
  // data = data.replace(/(\-|\+)([0-9\.]+)/g, '$1<jsDigitColor>$2</jsDigitColor>');

  // // match digits after return keyword --> return 12345
  // data = data.replace(/return[\s]*([0-9\.]+)/g, 'return <jsDigitColor>$1</jsDigitColor>');

  // // match digit that come after : --> number: <number>
  // data = data.replace(/\:\s([0-9]+)/g, ': <jsDigitColor>$1</jsDigitColor>');

  // // match digit after ||, ==, !==, <=, &&, ||, <, >, <=, >=
  // data = data.replace(/[\s]+(&amp;&amp;|\|\||\=\=\=|\=\=|\!\=|\!\=\=|\&gt\;|\&lt\;|\&gt\;\=|\&lt\;\=)[\s]*([0-9\.]+)/g, ' $1 <jsDigitColor>$2</jsDigitColor>');

  // // match digit before ||, ==, !==, <=, &&, ||, <, >, <=, >=
  // data = data.replace(/([0-9\.]+)[\s]+(&amp;&amp;|\|\||\=\=\=|\=\=|\!\=|\!\=\=|\&gt\;|\&lt\;|\&gt\;\=|\&lt\;\=)[^\/]([\s]*)/g, '<jsDigitColor>$1</jsDigitColor> $2 $3');

  // // #########################################
  // // #########################################
  // // #########################################

  // data = data.replace(jsKeywords, '<jsKeywordColor>$1</jsKeywordColor>');
  // data = data.replace(jsKeywords2, '<jsKeywordColor>$1</jsKeywordColor>');
  // data = data.replace(jsKeywords3, '<jsKeyword3Color>$1</jsKeyword3Color>');
  // data = data.replace(jsKeywords4, '<jsKeyword4Color>$1</jsKeyword4Color>');

  // data = data.replace(jsProperties, '<jsPropertyColor>$1</jsPropertyColor>');
  // data = data.replace(jsVanillaMethods, '<jsFunctionNameColor>$1</jsFunctionNameColor>');
  // data = data.replace(jsArrayMethods, '<jsArrayMethod>$1</jsArrayMethod>');

  // data = data.replace(/(true|false)/g, '<JsBooleanColor>$1</JsBooleanColor>');

  // data = data.replace(/\"(.*?)\"/g, '<jsString>"$1"</jsString>'); //  "#########"
  // data = data.replace(/\'(.*?)\'/g, "<jsString>'$1'</jsString>"); //  '#########'
  // data = data.replace(/`(.*?)`/gs, '<jsStringExp>`$1`</jsStringExp>'); //  `#########`

  el.innerHTML = data;
 });
};

export default js_highlight;

