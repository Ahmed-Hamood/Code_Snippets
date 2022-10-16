export default function view_code_in_vscode() {
 const sendVSCode = async (code, extname) => {
  if (code != '' && extname != '') {
   let result = await fetch('http://localhost:3331/open_vs', {
    headers: {
     Accept: 'application/json',
     'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ code, extname }),
   });

   result = await result.json();

   if (result.status == 200) {
    console.log(result.msg);
   } else {
    console.log('vscode fetching failed....');
   }
  } else {
   console.log('Error while sending vscode...');
  }
 };

 //  #############################################################
 //  #############################################################
 //  #############################################################

 // enable vscode opener on each block
 document.querySelectorAll('.vscode-svg-btn').forEach((element) => {
  element.addEventListener('click', (el) => {
   console.log('Enter vscode..');
   let codeText = el.target.parentElement.nextElementSibling.children[1].children[0].textContent;
   let get_ext_name = el.target.getAttribute('ext-name');
   sendVSCode(codeText, get_ext_name);
   el.target.classList.add('disable-btn');
   setTimeout(() => el.target.classList.remove('disable-btn'), 5000);
  });
 });
}
