export default function appendStyleSheetContent() {
 let AllQuery = document.querySelectorAll("[css-content]");

 if ([...AllQuery].length != 0) {
  AllQuery.forEach((el) => {
   let dataTitle = el.getAttribute('title-header') || 'Example';
   let highlightCssByNumber = el.getAttribute('line-num') || '0';
   let styleSheetContent = el.firstElementChild.innerHTML.trim() || null;

   let vsCodeElement = '';

   el.className = 'css-block css-code css-content pre-block';

   if (el.hasAttribute('no-title-header')) dataTitle = null;

   styleSheetContent = styleSheetContent ?? 'Nothing Here...';

   styleSheetContent = styleSheetContent.replace(/</g, '&lt;');

   // #################################################################################################################
   el.innerHTML = `
    <div class="block-header" style="${dataTitle ? '' : 'padding: 4px'}">
      <div class="block-title" style="${dataTitle ? '' : 'display: none'}"> ${dataTitle}</div> 
      <i title="copy" class="copyCssTextClipboard svg copy-svg " style="${dataTitle ? '' : 'top:0.8rem'}"> </i>
      <span class="text-lang" title="Unlock Content" style="${dataTitle ? '' : 'display: none'}">CSS</span>
      <i class="svg vscode-svg vscode-svg-btn" ext-name="css" style="${dataTitle ? 'top:5.2rem' : 'top:3.1rem'}"></i>
    </div>
    <div class="block-content">
    <div class="css-line-num" data-highlight-num="${highlightCssByNumber}"></div> 
      <pre>
        <code class="language-css">
                    ${styleSheetContent}</code></pre></div>`;
  });
 }
}
