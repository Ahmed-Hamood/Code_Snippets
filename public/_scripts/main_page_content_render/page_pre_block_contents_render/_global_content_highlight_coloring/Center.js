import python_highlight from './_python-highlight.js';
import npm_highlight from './_npm-highlight.js';

export default async function Run_Highlight_Coloring() {
 let HtmlCode = document.querySelector('.html-code');
 let CssCode = document.querySelector('.css-code');
 let JsCode = document.querySelector('.js-code'); // react, json and typescript
 let PyCode = document.querySelector('.python-code');

 let PythonCode = [...document.querySelectorAll('.python-code pre code')];
 let NpmCommand = [...document.querySelectorAll('.npm-command pre')];

 try {
  if (HtmlCode || CssCode) await import('../../../prime_library/prism_html_css.js');
  if (JsCode) await import('../../../prime_library/prism_js_ts_json_jsx.js');
  if (PyCode) await import('../../../prime_library/prism_python.js');

  if (HtmlCode || CssCode || JsCode || PyCode) window.Prism.highlightAll();

  if (PythonCode.length != 0) python_highlight(PythonCode);
  if (NpmCommand.length != 0) npm_highlight(NpmCommand);

 } catch (err) {
  console.error(err);
 }

 // here we are going to style sign character
}
