export default function appendCodeContent() {
 let AllQuery = document.querySelectorAll('[python-content]');

 AllQuery.forEach((el) => {
  let dataTitle = el.getAttribute('title-header') || 'Example';
  let highlightCodeByNumber = el.getAttribute('line-num') || '0';
  let codeContent = el.firstElementChild.innerHTML.trim() || null;
  let lineBreaks = [];

  if (codeContent) {
   lineBreaks = codeContent.match(/\n/gi) || [];
  }
  // set lock position if we have a single line code only
  let lockPosition = lineBreaks.length == 0 ? 'top: 3rem;right:0.4rem;' : 'top: 2.9rem;';

  let svgLockElement = '';
  let codeLangElement = '';
  let copyPythonCodeClipboard = '';
  let vsCodeElement = '';

  if (el.hasAttribute('python-content')) el.className = 'python-block python-code python-content pre-block';

  if (el.hasAttribute('no-title-header')) dataTitle = null;
  if (el.hasAttribute('no-line-num')) highlightCodeByNumber = null;

  if (highlightCodeByNumber && dataTitle) {
   codeLangElement = `<span class="text-lang" title="Unlock Content" style='margin-right: 25px;'>Python</span>`;
   svgLockElement = `<i class="svg lock-svg python-lock-btn" style="top: 0.6rem;"></i>`;
   copyPythonCodeClipboard = `<i title="copy" class="copyPythonCodeClipboard svg copy-svg" style="top: 3.2rem;"></i>`;
   vsCodeElement = ` <i class="svg vscode-svg vscode-svg-btn" ext-name="py" style="top: 5.5rem;"></i>`;
  } else if (!highlightCodeByNumber && dataTitle) {
   svgLockElement = `<i class="svg lock-svg python-lock-btn" style="display: none"></i>`;
   codeLangElement = `<span class="text-lang" title="Unlock Content" style=''>Python</span>`;
   copyPythonCodeClipboard = `<i title="copy" class="copyPythonCodeClipboard svg copy-svg" style="top: 3.2rem;"> </i>`;
   vsCodeElement = ` <i class="svg vscode-svg vscode-svg-btn" ext-name="py" style="top: 5.5rem;"></i>`;
  } else if (highlightCodeByNumber && !dataTitle) {
   codeLangElement = `<span class="text-lang" title="Unlock Content" style='display: none'>Python</span>`;
   svgLockElement = `<i class="svg lock-svg python-lock-btn" style="${lockPosition} height: 25px; width: 25px;"></i>`;
   copyPythonCodeClipboard = `<i title="copy" class="copyPythonCodeClipboard svg copy-svg" style="top: 0.8rem;"></i>`;
   vsCodeElement = ` <i class="svg vscode-svg vscode-svg-btn" ext-name="py" style="top: 5.2rem;"></i>`;
  } else if (!highlightCodeByNumber && !dataTitle) {
   svgLockElement = `<i class="svg lock-svg python-lock-btn" style="display: none"></i>`;
   codeLangElement = `<span class="text-lang" title="Unlock Content" style='display: none'>Python</span>`;
   copyPythonCodeClipboard = `<i title="copy" class="copyPythonCodeClipboard svg copy-svg" style="top: 0.8rem;"></i>`;
   vsCodeElement = ` <i class="svg vscode-svg vscode-svg-btn" ext-name="py" style="top: 3rem;"></i>`;
  }

  codeContent = codeContent ?? 'Nothing Here...';
  if (lineBreaks.length < 3) vsCodeElement = '';

  codeContent = codeContent.replace(/</g, '&lt;');

  el.innerHTML = `
    <div class="block-header" style="${dataTitle ? '' : 'padding: 0'}">
      <div class="block-title" style="${dataTitle ? '' : 'display: none'}"> ${dataTitle} </div> 
      ${codeLangElement}
      ${copyPythonCodeClipboard}
      ${svgLockElement}
      ${vsCodeElement}
    </div>
    <div class="block-content">
    <div class="python-line-num" data-highlight-num="${highlightCodeByNumber}" style="${highlightCodeByNumber ? '' : 'display: none'}" pointer-event="on"> </div> 
      <pre style="${highlightCodeByNumber ? '' : 'user-select: text;'}">
        <code class="language-python">
                    ${codeContent}</code></pre></div>`;
 });

 // #################################################################################################################
}
