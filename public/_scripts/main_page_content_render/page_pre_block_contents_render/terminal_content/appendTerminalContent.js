export default function appendTerminalContent() {
 document.querySelectorAll('[terminal-content]').forEach((el) => {
  let dataTitle = el.getAttribute(' title-header') || 'Example';
  let TextContent = el.firstElementChild.innerHTML.trim() || null;
  let highlightTerminalByNumber = el.getAttribute('line-num') || '0';
  let getPreferredSign = el.getAttribute('preferred-sign') || '>';

  el.className = 'terminal-block npm-command terminal-content pre-block';

  if (el.hasAttribute('no-title-header')) dataTitle = null;

  TextContent = TextContent ?? 'Nothing Here...';

  TextContent = TextContent.replace(/</g, '&lt;');

  // #################################################################################################################
  el.innerHTML = `
      <div class="block-header"  style="${dataTitle ? '' : 'padding: 0'}">
        <div class="block-title" style="${dataTitle ? '' : 'display: none'}"> - ${dataTitle}</div> 
        <i title="copy" class="copyTerminalClipboard svg copy-svg " style="${dataTitle ? '' : 'top:0.8rem'}"> </i>
        <span class="text-lang" title="Unlock Content" style="${dataTitle ? '' : 'display: none'}">Terminal</span>
      </div>
  
      <div class="block-content">
      <div class="command-line-sign" data-sign="${getPreferredSign}" data-highlight-num="${highlightTerminalByNumber}" > </div> 
<pre>
  ${TextContent}
</pre>
    </div>
    `;
 });
}
