export default function appendCliContent() {
 let getAllCliElements = document.querySelectorAll('[cli-content]');

 if (getAllCliElements.length != 0) {
  let header_title = '';
  let username_cli = '';
  let pc_name_cli = '';
  let current_directory_cli = '';
  let user_type_cli = '';

  let cli_elements = [];
  let cli_line_content = '';

  getAllCliElements.forEach((element) => {
   header_title = element.getAttribute('title-header');

   username_cli = element.getAttribute('cli-username');
   pc_name_cli = element.getAttribute('cli-pc-name');
   current_directory_cli = element.getAttribute('cli-current-directory');
   user_type_cli = element.getAttribute('cli-user-type');

   cli_elements = element.children;
   cli_line_content = '';

   for (let i = 0; i < cli_elements.length; i++) {
    cli_line_content += getCliType_HTMLContent(cli_elements[i], { username_cli, pc_name_cli, current_directory_cli, user_type_cli });
   }

   element.className = 'cli-block cli-command cli-content pre-block';

   element.innerHTML = `
   <div class="cli-header">
    <h1 class="cli-title">${header_title}</h1>
   </div>
   <div class="cli-content"> 
      ${cli_line_content}
   </div>
   `;

   setTimeout(() => {
    element.style['display'] = 'block';
   }, 800);
  });
 }
}

function getCliType_HTMLContent(element, def_attr) {
 let text_content = '';
 let str_inline_text = '';
 let temp_username_cli = element.getAttribute('cli-username');
 let temp_pc_name_cli = element.getAttribute('cli-pc-name');
 let temp_current_directory_cli = element.getAttribute('cli-current-directory');
 let temp_user_type_cli = element.getAttribute('cli-user-type');

 if (element.getAttribute('line-type') == 'command') {
  text_content = element.getAttribute('line-val');
  temp_username_cli = temp_username_cli ? temp_username_cli : def_attr.username_cli;
  temp_pc_name_cli = temp_pc_name_cli ? temp_pc_name_cli : def_attr.pc_name_cli;
  temp_current_directory_cli = temp_current_directory_cli ? temp_current_directory_cli : def_attr.current_directory_cli;
  temp_user_type_cli = temp_user_type_cli ? temp_user_type_cli : def_attr.user_type_cli;

  text_content = text_content.replace(/</g, '&lt;');

  str_inline_text = `<span class="username_pc_style">${temp_username_cli}@${temp_pc_name_cli}</span>:<span class="directory_style">${temp_current_directory_cli}</span><span class="sign_style">${temp_user_type_cli}</span>`;

  return `
  <div class="cli-input-line-row">
   <p class="cli-prompt-line-text">${str_inline_text}</p>
   <p class="cli-command-input-text">${text_content}</p>
  </div>
  `;
  // --------------------------------------------------------------------------------------
 } else if (element.getAttribute('line-type') == 'output') {
  text_content = element.innerHTML.trim();

  return `
  <div class="cli-output-line-row"><pre class="cli-command-output-text">
  <code class="language-">
              ${text_content}</code></pre></div>
  `;
  // --------------------------------------------------------------------------------------
 } else if (element.getAttribute('line-type') == 'comment') {
  text_content = element.getAttribute('line-val');

  return `
  <div class="cli-comment-line-row">
    <p class="cli-comment-line-text"># ${text_content}</p>
  </div>
  `;
 }
}
