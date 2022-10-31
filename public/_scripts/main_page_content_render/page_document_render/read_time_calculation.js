export default function read_time_calculation() {
 const mainTitle = document.querySelector('.main-title');
 let page_content = document.getElementById('page-content-wrapper');
 
 const text = page_content.innerText;
 const wpm = 225;
 const words = text.trim().split(/\s+/).length;
 let min_msg = 'minutes';
 console.log(words / wpm);
 const time = Math.ceil(words / wpm);

 if (time == 1) min_msg = 'minute or less';
 mainTitle.insertAdjacentHTML('afterend', `<span class="min-read"> ${time} ${min_msg} read time</span>`);
}
