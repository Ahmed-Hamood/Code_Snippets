export default function read_time_calculation() {
 const mainTitle = document.querySelector('.main-title');
 const getAllTitleInSubject = document.querySelectorAll(['.sub-title', '.sub-sub-title', '.sub-sub-sub-title']);
 const page_content_wrapper = document.getElementById('page-content-wrapper');

 if (!mainTitle || [...getAllTitleInSubject].length == 0) return;

 let text = '';
 let getTime = 0;
 const wpm = 225;
 let wordsLength = 0;

 text = page_content_wrapper.innerText;

 wordsLength = text.trim().split(/\s+/).length;
 getTime = Math.ceil(wordsLength / wpm);

 mainTitle.insertAdjacentHTML('beforeend', `<span class="min-read"> ${getTime} ${getTime == 1 ? 'minute or less' : 'minutes'} read time</span>`);
}
