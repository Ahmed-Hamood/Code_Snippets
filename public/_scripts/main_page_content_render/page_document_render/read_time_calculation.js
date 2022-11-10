export default function read_time_calculation(text) {
 const mainTitle = document.querySelector('.main-title');
//  const getAllTitleInSubject = document.querySelectorAll(['.sub-title', '.sub-sub-title', '.sub-sub-sub-title']);
 //  const page_content_wrapper = document.getElementById('page-content-wrapper');

//  if (!mainTitle || [...getAllTitleInSubject].length == 0) return;
 if (!mainTitle) return;

 const wpm = 225;
 const wordsLength = text.trim().split(/\s+/).length;
 const getTime = Math.ceil(wordsLength / wpm);

 mainTitle.insertAdjacentHTML('afterend', `<span class="min-read"> ${getTime} ${getTime == 1 ? 'minute or less' : 'minutes'} read time</span>`);
}
