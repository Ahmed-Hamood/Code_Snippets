import appendTerminalContent from './appendTerminalContent.js';
import appendTerminalLinesSign from './appendTerminalLinesSign.js';
import EnableCopyClipboardTerminalText from './EnableCopyClipboardTerminalText.js';

export default function start_terminal_code() {
 appendTerminalContent();
 appendTerminalLinesSign();
 EnableCopyClipboardTerminalText();
}
