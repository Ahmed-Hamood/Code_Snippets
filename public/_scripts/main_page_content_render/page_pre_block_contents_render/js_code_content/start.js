import appendCodeContent from './appendCodeContent.js';
import appendCodeLinesNumber from './appendCodeLinesNumber.js';
import EnableBlockLockJSCodeContent from './EnableBlockLockJSCodeContent.js';
import EnableCopyClipboardJSCodeText from './EnableCopyClipboardJSCodeText.js';

export default function start_js_code() {
 appendCodeContent();
 appendCodeLinesNumber();
 EnableBlockLockJSCodeContent();
 EnableCopyClipboardJSCodeText();
}
