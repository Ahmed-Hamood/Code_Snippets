import appendCodeContent from './appendCodeContent.js';
import appendCodeLinesNumber from './appendCodeLinesNumber.js';
import EnableBlockLockPythonCodeContent from './EnableBlockLockPythonCodeContent.js';
import EnableCopyClipboardPythonCodeText from './EnableCopyClipboardPythonCodeText.js';

export default function start_python_code() {
 appendCodeContent();
 appendCodeLinesNumber();
 EnableBlockLockPythonCodeContent();
 EnableCopyClipboardPythonCodeText();
}
