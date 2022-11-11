export default function read_time_calculation(text) {
 const mainTitle = document.querySelector('.main-title');

 if (!mainTitle) return;

 const wpm = 225;
 const wordsLength = text.trim().split(/\s+/).length;
 const getTime = Math.ceil(wordsLength / wpm);

 if (wordsLength / wpm > 0.1) {
  mainTitle.insertAdjacentHTML('afterend', `<span class="min-read"> ${getTime} ${getTime == 1 ? 'minute or less' : 'minutes'} read time</span>`);
 }
}
