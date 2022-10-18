export default function appendHyperHyperTextContent() {
 document.querySelectorAll('[html-content]').forEach((el) => {
  let dataTitle = el.getAttribute('title-header') || 'An Example';
  let highlightLineByNumber = el.getAttribute('line-num') || '0';
  let HyperTextContent = el.firstElementChild.innerHTML.trim() || null;
  let svgLockElement = '';
  let HyperTextLangElement = '';
  let copyHyperTextClipboard = '';
  let vsCodeElement = '';

  let lineBreaks = [];

  if (HyperTextContent) {
   lineBreaks = HyperTextContent.match(/\n/gi) || [];
  }

  let lockPosition = lineBreaks.length < 2 ? 'top: 0.9rem;right:2.4rem;' : 'top: 2.9rem;';

  el.className = 'html-block html-code html-content pre-block';

  if (el.hasAttribute('no-title-header')) dataTitle = null;
  if (el.hasAttribute('no-line-num')) highlightLineByNumber = null;

  if (highlightLineByNumber && dataTitle) {
   svgLockElement = `<i class="svg lock-svg hyperText-lock-btn" style="top: 0.55rem;"></i>`;
   HyperTextLangElement = `<span class="text-lang" title="Unlock Content" style="margin-right: 25px">HTML</span>`;
   copyHyperTextClipboard = `<i title="copy" class="copyHyperTextClipboard svg copy-svg" style="top: 3.2rem;"></i>`;
   vsCodeElement = ` <i class="svg vscode-svg vscode-svg-btn" ext-name="html" style="top: 5.4rem;"></i>`;
  } else if (!highlightLineByNumber && dataTitle) {
   svgLockElement = `<i class="svg lock-svg hyperText-lock-btn" style="display: none"></i>`;
   HyperTextLangElement = `<span class="text-lang" title="Unlock Content">HTML</span>`;
   copyHyperTextClipboard = `<i title="copy" class="copyHyperTextClipboard svg copy-svg" style="top: 3.2rem;"> </i>`;
   vsCodeElement = ` <i class="svg vscode-svg vscode-svg-btn" ext-name="html" style="top: 5.4rem;"></i>`;
  } else if (highlightLineByNumber && !dataTitle) {
   HyperTextLangElement = `<span class="text-lang" title="Unlock Content" style='display: none'>HTML</span>`;
   svgLockElement = `<i class="svg lock-svg hyperText-lock-btn" style="${lockPosition}"></i>`;
   copyHyperTextClipboard = `<i title="copy" class="copyHyperTextClipboard svg copy-svg" style="top: 0.9rem;"> </i>`;
   vsCodeElement = ` <i class="svg vscode-svg vscode-svg-btn" ext-name="html" style="top: 5.2rem;"></i>`;
  } else if (!highlightLineByNumber && !dataTitle) {
   svgLockElement = `<i class="svg lock-svg hyperText-lock-btn" style="display: none"></i>`;
   HyperTextLangElement = `<span class="text-lang" title="Unlock Content" style='display: none'>HTML</span>`;
   copyHyperTextClipboard = `<i title="copy" class="copyHyperTextClipboard svg copy-svg" style="top: 0.8rem;"></i>`;
   vsCodeElement = ` <i class="svg vscode-svg vscode-svg-btn" ext-name="html" style="top: 3.2rem;"></i>`;
  }

  HyperTextContent = HyperTextContent ?? 'Nothing Here...';
  if (lineBreaks.length < 3) vsCodeElement = '';

  HyperTextContent = HyperTextContent.replace(/\</g, '&lt;');

  // #################################################################################################################
  el.innerHTML = `
    <div class="block-header" style="${dataTitle ? '' : 'padding: 0'}">
      <div class="block-title" style="${dataTitle ? '' : 'display: none'}"> ${dataTitle}</div> 
      ${HyperTextLangElement}
      ${copyHyperTextClipboard}
      ${svgLockElement}
      ${vsCodeElement}
    </div>
    <div class="block-content">
    <div class="hyperText-line-num" data-highlight-num="${highlightLineByNumber}" style="${highlightLineByNumber ? '' : 'display: none'}" pointer-event="on"> </div> 
      <pre style="${highlightLineByNumber ? '' : 'user-select: text;'}">
        <code class="language-html">${HyperTextContent}</code>
      </pre>
    </div>
  `;
 });
}
