import build_js_block from './js_code_content/start.js';
import build_python_block from './python_code_content/start.js';
import build_HTML_block from './hyperText_content/start.js';
import build_css_block from './styleSheet_content/start.js';
import build_terminal_block from './terminal_content/start.js';
import build_cli_block from './cli_content/start.js';

import Run_Highlight_Coloring from './_global_content_highlight_coloring/Center.js';
import view_code_in_vscode from './_view_code_in_vscode.js';

export default function start() {
 let preBlock_EventPointer = null;

 build_js_block();
 build_python_block();
 build_HTML_block();
 build_css_block();
 build_terminal_block();
 build_cli_block();

 setTimeout(() => {
  Run_Highlight_Coloring();
 }, 400);

 if (window.innerWidth > 700) {
  view_code_in_vscode();
 }

 // can't initialize variable here bz pre_block need to wait for each block render
 // Here double click tp expand code content height
 document.querySelectorAll('.pre-block').forEach((element) => {
  element.addEventListener('dblclick', (ev) => {
   element.classList.toggle('full-height');
  });

  // mouse middle click to enable and disable point event on num
  // On double/middle click tp disable code-num-list pointer event
  // so we can manually highlight line for copy and drag code  content horizontal
  element.addEventListener('mouseup', (el) => {
   preBlock_EventPointer = element.children[1].children[0];
   if (el.button == 1) {
    if (preBlock_EventPointer.getAttribute('pointer-event') == 'on') {
     preBlock_EventPointer.style['pointer-events'] = 'none';
     setTimeout(() => {
      preBlock_EventPointer.style['pointer-events'] = 'auto';
     }, 3000);
    }
   }
  });
  // -----------------------------------------------------------------
 });
}
