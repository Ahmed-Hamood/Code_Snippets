const python_highlight = (code) => {
 let data = null;

//  let pythonTopKeyword = /\b(def|class|not)(?=[^\w])\b/g;
//  let pythonOtherKeyword =
//   /\b(if|elif|import|from|assert|pass|continue|global|break|try|except|raise|finally|return|for|while|or|and|as|is|in|with|yield|del|async])(?=[^\w])\b/g;

 code.forEach((el) => {
  data = code.innerHTML;

  data = el.innerHTML;

   data = data.replace(/\{([0-9]+|[a-zA-Z]+)\}/g, '<span class="CurlyInString">{</span><span class="PlaceHolder">$1</span><span class="CurlyInString">}</span>'); // {#####}
   data = data.replace(/\{\}/g, '<span class="CurlyInString">{</span><span class="CurlyInString">}</span>'); // {#####}
   data = data.replace(/\bf"/g, '<span class="CurlyInString">f</span>"'); // {#####}
  //data = data.replace(/\</g, '&lt;'); // < --> &lt;

  //data = data.replace(/(\#[\s]*.*)/g, '<pyComment>$1</pyComment>'); // comment

  //data = data.replace(/f\"/g, '<pyFormatF>f</pyFormatF>"'); //  "#########"

  //data = data.replace(/\'(.*?)\'/g, "<pyString>'$1'</pyString>"); //  '#########'
  //data = data.replace(/\"(.*?)\"/g, '<pyString>"$1"</pyString>'); //  "#########"

  //data = data.replace(/\b([0-9]+[0-9]*)\b/g, '<pyDigit>$1</pyDigit>');

  //data = data.replace(/\b(True|False)(?=[^\w])\b/g, '<pyTrueFalse>$1</pyTrueFalse>');

  // function name --> fun_name()
  //data = data.replace(/\b([a-zA-Z_]+[0-9]*[a-zA-Z_]*)(?=[\(])\b/g, '<pyFunctionName>$1</pyFunctionName>');
  // variable call --> element1.element2.
  //data = data.replace(/\b([a-zA-Z_]+[0-9]*[a-zA-Z_]*)(?=[\.])\b/g, '<pyVariable>$1</pyVariable>');
  // variable call --> variable_name =
  //data = data.replace(/([a-zA-Z_]+[0-9]*[a-zA-Z_$]*)\s\=\s/g, '<pyVariable>$1</pyVariable> = ');
  // variable call --> variable_name:
  //data = data.replace(/([a-zA-Z_]+[0-9]*[a-zA-Z_$]*)\:/g, '<pyVariable>$1</pyVariable>:');
  //data = data.replace(/\:[\s]([a-zA-Z_]+[0-9]*[a-zA-Z_$]*)/g, ': <pyVariable>$1</pyVariable>');
  // digit value assigned to variable
  // data = data.replace(/=\s([0-9]+[\.]*[0-9]*)/g, '= <pyDigit>$1</pyDigit>');
  // variable value assigned to variable --> var = var
  // data = data.replace(/=\s([a-zA-Z_]+[0-9]*[a-zA-Z_]*)/g, '= <pyVariable>$1</pyVariable>');

  // variable value assigned to variable --> +|-|*|/ var
  // data = data.replace(/([\+\-\*])([\s]*)([a-zA-Z_]+[0-9]*[a-zA-Z_]*)/g, '$1$2<pyVariable>$3</pyVariable>');
  // variable value assigned to variable --> var +|-|*|/
  // data = data.replace(/([a-zA-Z_]+[0-9]*[a-zA-Z_]*)([\s]*)([\+\-\*])/g, '<pyVariable>$1</pyVariable>$2$3');

  // variable name list --> my_list[]
  // data = data.replace(/\b([a-zA-Z_]+[0-9]*[a-zA-Z_]*)(?=[\[])\b/g, '<pyVariable>$1</pyVariable>');

  // data = data.replace(/\b\(([a-zA-Z_]+[0-9]*[a-zA-Z_]*)(?=[\(])\b/g, '<pyFunctionName>$1</pyFunctionName>');

  // parameters var
  // data = data.replace(/(\(|\[|\{)([a-zA-Z_]+[0-9]*[a-zA-Z_]*)(\)|]|\}])/g, '$1<pyVariable>$2</pyVariable>$3'); //  {[(var)]}
  // data = data.replace(/(\(|\[|\{)([a-zA-Z_]+[0-9]*[a-zA-Z_]*)\,/g, '$1<pyVariable>$2</pyVariable>,'); //  [(var,
  // data = data.replace(/\s([a-zA-Z_]+[0-9]*[a-zA-Z_]*)\,/g, ' <pyVariable>$1</pyVariable>,'); //  var,
  // data = data.replace(/\,\s([a-zA-Z_]+[0-9]*[a-zA-Z_]*)(\)|\]|\}])/g, ', <pyVariable>$1</pyVariable>$2'); //  , var)]}
 
  // data = data.replace(/([a-zA-Z_]+[0-9]*[a-zA-Z_]*)\=([a-zA-Z_]+[0-9]*[a-zA-Z_]*)/g, '<pyVariable>$1</pyVariable>=<pyVariable>$2</pyVariable>'); //  (var=kfjng)
  // data = data.replace(/([a-zA-Z_]+[0-9]*[a-zA-Z_]*)\=/g, '<pyVariable>$1</pyVariable>='); //  (var=)

  // color variable inside placeholder
  // data = data.replace(/\{([a-zA-Z_]+[0-9]*[a-zA-Z_$]*)\}/g, '{<pyVariable>$1</pyVariable>}'); // {var_name}
  // data = data.replace(/\{([0-9]+)\}/g, '{<pyDigit>$1</pyDigit>}'); // {number}

  //  data = data.replace(/\{(.*?)\}/g, '<pyCurlyInString>{</pyCurlyInString><pyPlaceHolder>$1</pyPlaceHolder><pyCurlyInString>}</pyCurlyInString>'); // {#####}


  // data = data.replace(/([a-zA-Z_]+[0-9]*[a-zA-Z_]*) for/g, '<pyVariable>$1</pyVariable> for'); //  ### for
  // data = data.replace(/for ([a-zA-Z_]+[0-9]*[a-zA-Z_]*)/g, 'for <pyVariable>$1</pyVariable>'); //  for ###
  // data = data.replace(/\b([a-zA-Z_]+[0-9]*[a-zA-Z_]*)[\s]in\b/g, '<pyVariable>$1</pyVariable> in'); //  ### in
  // data = data.replace(/in[\s]([a-zA-Z_]+[0-9]*[a-zA-Z_]*)(\:|\]|\))/g, 'in <pyVariable>$1</pyVariable>$2'); //  in ##:|]|)
  // data = data.replace(/\b([a-zA-Z_]+[0-9]*[a-zA-Z_]*)[\s]if\b/g, '<pyVariable>$1</pyVariable> if'); //  ### if
  // data = data.replace(/\bif[\s]([a-zA-Z_]+[0-9]*[a-zA-Z_]*)\b/g, 'if <pyVariable>$1</pyVariable>'); // if ###
  // data = data.replace(/\belif[\s]([a-zA-Z_]+[0-9]*[a-zA-Z_]*)\b/g, 'elif <pyVariable>$1</pyVariable>'); // elif ###
  // data = data.replace(/\band[\s]([a-zA-Z_]+[0-9]*[a-zA-Z_]*)\b/g, 'and <pyVariable>$1</pyVariable>'); // and ###
  // data = data.replace(/\bor[\s]([a-zA-Z_]+[0-9]*[a-zA-Z_]*)\b/g, 'or <pyVariable>$1</pyVariable>'); // and ###
  // data = data.replace(/\breturn[\s]([a-zA-Z_]+[0-9]*[a-zA-Z_]*)\b/g, 'return <pyVariable>$1</pyVariable>'); // return ###

  // // data = data.replace(/(\[|\])(.*?)/g, '<pyBracket>$1</pyBracket>'); // [ | ]
  
  // data = data.replace(pythonTopKeyword, '<pyTopKeyword>$1</pyTopKeyword>');
  // data = data.replace(pythonOtherKeyword, '<pyOtherKeyword>$1</pyOtherKeyword>');
  // data = data.replace(/lambda/g, '<pyOrange>lambda</pyOrange>');
  el.innerHTML = data;
 });
};

export default python_highlight;
