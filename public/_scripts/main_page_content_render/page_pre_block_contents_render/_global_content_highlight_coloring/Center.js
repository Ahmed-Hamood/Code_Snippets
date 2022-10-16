import python_highlight from './_python-highlight.js';
import npm_highlight from './_npm-highlight.js';

export default function Run_Highlight_Coloring() {
 let HtmlCode = document.querySelector('.html-code');
 let CssCode = document.querySelector('.css-code');
 let JsCode = document.querySelector('.js-code'); // react, json and typescript
 //  let CLICommand = document.querySelector('.cli-command');

 let PythonCode = [...document.querySelectorAll('.python-code pre code')];
 let NpmCommand = [...document.querySelectorAll('.npm-command pre')];

 if (HtmlCode || CssCode || JsCode) {
  window.Prism.highlightAll();
 }

 if (PythonCode.length != 0) {
  window.Prism.highlightAll();
  python_highlight(PythonCode);
 }

 if (NpmCommand.length != 0) {
  npm_highlight(NpmCommand);
 }

 // here we are going to style sign character
}

 