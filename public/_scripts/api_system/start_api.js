import enable_create_new_main_subject_form from './api_forms/enable_create_new_main_subject_form.js';
import { api_html_create_form } from './api_html_forms/api_html_create_form.js';

export default function Startup_api() {
 let subject_form_container_blackBG = document.querySelector('.subject-form-container');
 let subject_form_input_content = document.querySelector('.subject-form-input-content');
 let create_new_subject_btn = document.querySelector('.create-new-subject-btn');
 let cancel_form_button = document.querySelector('.cancel-form-button');
 let bodyElement = document.body;

 console.log('API is loaded.....');

 let closeForm = () => {
  bodyElement.setAttribute('active-form', '');
  subject_form_input_content.innerHTML = '';
 };

 // Open create new main subject form
 create_new_subject_btn.addEventListener('click', (ev) => {
  bodyElement.setAttribute('active-form', 'create');
  subject_form_input_content.innerHTML = api_html_create_form;
  enable_create_new_main_subject_form();
 });

 //  Close any form
 cancel_form_button.addEventListener('click', (e) => {
  closeForm();
 });

 subject_form_container_blackBG.addEventListener('click', (ev) => {
  if (ev.target.className == 'subject-form-container') closeForm();
 });

 //  ----------------------------------------
 //  ----------------------------------------
 //  ----------------------------------------

 const options_menu_container = document.querySelector('.options-menu-container');

 let blank_modal = document.getElementById('blank-modal');

 let el_x = 0;
 let el_y = 0;
 let get_JSON_file_dir = '';

 document.querySelectorAll('.options-menu-btn').forEach((element) => {
  element.addEventListener('click', (btn) => {
   get_JSON_file_dir = btn.target.parentElement.getAttribute('json_file');
   getJSONFileAPI(get_JSON_file_dir);
   get_JSON_file_dir = '';
   //    console.log('button clicked....');

   //    bodyElement.setAttribute('blank-current-active', 'options-menu');

   //    el_x = btn.target.getBoundingClientRect().x;
   //    el_y = btn.target.getBoundingClientRect().y;

   //    options_menu_container.style['left'] = el_x + 15 + 'px';
   //    options_menu_container.style['top'] = el_y + 10 + 'px';

   //    options_menu_container.classList.remove('hide');
   //    options_menu_container.style['display'] = 'block';
   //    setTimeout(() => {
   //     blank_modal.classList.add('show-options');
   //    }, 100);
  });
 });
}

async function getJSONFileAPI(file_name) {
 if (file_name) {
  let result = await fetch('http://localhost:3331/open_subject_json_file', {
   headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
   },
   method: 'POST',
   body: JSON.stringify({ file_name }),
  });

  result = await result.json();

  if (result.status == 200) {
   console.log(result.msg);
  } else {
   console.log('subject open failed....');
  }
 } else {
  console.log('Error while sending vscode...');
 }
}
