const _json_highlight = (JSONText) => {
 JSONText.forEach((el) => {
  let data = JSONText.innerHTML;
  data = el.innerHTML;

  data = data.replace(/(true|false)/g, '<JsBooleanColor>$1</JsBooleanColor>');

  data = data.replace(/\s([0-9]+)/g, ' <jsDigitColor>$1</jsDigitColor>');

  data = data.replace(/[\^]/g, '<JSONCaretSign>^</JSONCaretSign>'); // ### :

  data = data.replace(/\"(.*?)\"(?=[\:])/g, '<JSONKey>"$1"</JSONKey>'); // ### :
  data = data.replace(/[\:]\s[\"](.*?[^\\])\"/g, ': <JSONValue>"$1"</JSONValue>'); //  : ###
  data = data.replace(/\"\"/g, '<JSONValue>""</JSONValue>'); // ""

  data = data.replace(/([\{|\}])/g, '<JSONCurlyBracket>$1</JSONCurlyBracket>'); // { | }
  data = data.replace(/([\[|\]])/g, '<JSONBracket>$1</JSONBracket>'); // [ | ]
  el.innerHTML = data;
 });
};

export default _json_highlight;
