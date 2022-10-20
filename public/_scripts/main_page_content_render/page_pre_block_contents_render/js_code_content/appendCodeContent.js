export default function appendCodeContent() {
 let AllQuery = document.querySelectorAll(['[js-content]', '[js-jsx-content]', '[json-content]', '[ts-content]', '[ts-jsx-content]']);

 if ([...AllQuery].length != 0) {
  AllQuery.forEach((el) => {
   let dataTitle = el.getAttribute('title-header') || 'Example';
   let highlightCodeByNumber = el.getAttribute('line-num') || '0';
   let codeContent = el.firstElementChild.innerHTML.trim() || null;
   let language_type = '';
   let lineBreaks = [];

   if (codeContent) {
    lineBreaks = codeContent.match(/\n/gi) || [];
   }
   // set lock position if we have a single line code only
   let lockPosition = lineBreaks.length == 0 ? 'top: 0.7rem;right:2.4rem;' : 'top: 2.9rem;';

   let svgLockElement = '';
   let codeLangElement = '';
   let copyJSCodeClipboard = '';
   let vsCodeElement = '';

   let text_lang = '';
   let ext_name = '';

   if (el.hasAttribute('js-content')) {
    language_type = 'language-javascript js';
    el.className = 'js-block js-code js-content pre-block';
    text_lang = 'Javascript';
    ext_name = 'js';
   } else if (el.hasAttribute('ts-content')) {
    language_type = 'language-typescript js';
    el.className = 'js-block js-code ts-content pre-block';
    text_lang = 'TypeScript';
    ext_name = 'ts';
   } else if (el.hasAttribute('js-jsx-content')) {
    language_type = 'language-jsx js';
    el.className = 'js-block js-code js-jsx-content pre-block';
    text_lang = 'Javascript/React';
    ext_name = 'jsx';
   } else if (el.hasAttribute('ts-jsx-content')) {
    language_type = 'language-tsx js';
    el.className = 'js-block js-code ts-jsx-content pre-block';
    text_lang = 'TypeScript/React';
    ext_name = 'tsx';
   } else if (el.hasAttribute('json-content')) {
    language_type = 'language-json json';
    el.className = 'js-block js-code json-content pre-block';
    text_lang = 'JSON';
    ext_name = 'json';
   } else {
   }

   if (el.hasAttribute('no-title-header')) dataTitle = null;
   if (el.hasAttribute('no-line-num')) highlightCodeByNumber = null;

   if (highlightCodeByNumber && dataTitle) {
    svgLockElement = `<i class="svg lock-svg js-lock-btn" style="top: 0.65rem;"></i>`;
    codeLangElement = `<span class="text-lang" title="Unlock Content" style="margin-right: 25px;">${text_lang}</span>`;
    copyJSCodeClipboard = `<i title="copy" class="copyJSCodeClipboard svg copy-svg" style="top: 3.2rem;"></i>`;
    vsCodeElement = ` <i class="svg vscode-svg vscode-svg-btn" title="Open with vscode" ext-name="${ext_name}" style="top: 5.4rem;"></i>`;
   } else if (!highlightCodeByNumber && dataTitle) {
    svgLockElement = `<i class="svg lock-svg js-lock-btn" style="display: none"></i>`;
    codeLangElement = `<span class="text-lang" title="Unlock Content" style='margin-right: 0; margin-right: 0;'>${text_lang}</span>`;
    copyJSCodeClipboard = `<i title="copy" class="copyJSCodeClipboard svg copy-svg" style="top: 3.2rem;"> </i>`;
    vsCodeElement = ` <i class="svg vscode-svg vscode-svg-btn" title="Open with vscode" ext-name="${ext_name}" style="top: 5.4rem;"></i>`;
   } else if (highlightCodeByNumber && !dataTitle) {
    codeLangElement = `<span class="text-lang" title="Unlock Content" style='display: none'>${text_lang}</span>`;
    svgLockElement = `<i class="svg lock-svg js-lock-btn" style="${lockPosition} height: 25px; width: 25px;"></i>`;
    copyJSCodeClipboard = `<i title="copy" class="copyJSCodeClipboard svg copy-svg" style="top: 0.8rem;"></i>`;
    vsCodeElement = ` <i class="svg vscode-svg vscode-svg-btn" title="Open with vscode" ext-name="${ext_name}" style="top: 5.2rem;"></i>`;
   } else if (!highlightCodeByNumber && !dataTitle) {
    svgLockElement = `<i class="svg lock-svg js-lock-btn" style="display: none"></i>`;
    codeLangElement = `<span class="text-lang" title="Unlock Content" style='display: none'>${text_lang}</span>`;
    copyJSCodeClipboard = `<i title="copy" class="copyJSCodeClipboard svg copy-svg" style="top: 0.8rem;"></i>`;
    vsCodeElement = ` <i class="svg vscode-svg vscode-svg-btn" title="Open with vscode" ext-name="${ext_name}" style="top: 3.2rem;"></i>`;
   }

   if (lineBreaks.length < 3) vsCodeElement = '';

   codeContent = codeContent ?? 'Nothing Here...';
   codeContent = codeContent.replace(/</g, '&lt;');

   // #################################################################################################################
   el.innerHTML = `
    <div class="block-header" style="${dataTitle ? '' : 'padding: 0'}">
      <div class="block-title" style="${dataTitle ? '' : 'display: none'}"> ${dataTitle} </div> 
      ${codeLangElement}
      ${copyJSCodeClipboard}
      ${svgLockElement}
      ${vsCodeElement}
    </div>
    <div class="block-content">
    <div class="js-line-num" data-highlight-num="${highlightCodeByNumber}" style="${highlightCodeByNumber ? '' : 'display: none'}" pointer-event="on"> </div> 
      <pre style="${highlightCodeByNumber ? '' : 'user-select: text;'}">
        <code class="${language_type}">
                    ${codeContent}</code></pre></div>`;
  });
 }
}
