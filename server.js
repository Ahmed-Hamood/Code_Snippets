const express = require('express');
const reload = require('reload');
// const { JsonDB, Config } = require('node-json-db');
const app = express();
const fs = require('fs');

var exec = require('child_process').exec;

const PORT = process.env.PORT || 3331;

app.use(express.json());

app.use((req, res, next) => {
  console.log('Request IP incoming: ' + req.ip);
  console.log('Request URL: ' + req.url);

 //  if (req.ip != '::1' && req.ip != '::ffff:127.0.0.1' && !req.ip.startsWith('::ffff:192.168.0')) return res.send('UnAuthorize Access');

 next();
});

app.use(
 express.static(__dirname + '/public', {
  setHeaders: (res, path) => {
   res.set({
    'Cache-Control': path.endsWith('.png') ? 'public, max-age: 3600' : '',
   });
  },
 })
);

app.post('/open_page', (req, res) => {
 let { page_path } = req.body;

 if (page_path == '/') page_path = '/Docs/index.html';

 console.log(`code -n ./public${page_path}`);

 // 1. open vscode with your newly created file
 exec(`code -n "./public${page_path}"`);

 res.json({
  msg: 'your page is opened in vscode',
  status: 200,
 });
});

app.get('/get_all_icons', async (req, res) => {
 // list all files in the directory
 let data = [];
 await fs.readdirSync('./public/_images/subject_icons').forEach((file) => {
  data.push(file);
 });

 return res.json({
  data,
 });
});

app.post('/open_vs', async (req, res) => {
 let { code, extname } = req.body;

 console.log('Open code');

 // 1. create "./vs_temp" if does not exist
 if (await !fs.existsSync('./vs_temp')) {
  await fs.mkdirSync('./vs_temp');
 }

 // 2. Remove everything inside "./vs_temp"
 await fs.readdirSync('./vs_temp').forEach(async (file) => {
  await fs.rmSync('./vs_temp/' + file);
 });

 // 3. Create a new file.ext with our code content
 await fs.writeFileSync(`./vs_temp/tmp_file.${extname}`, code);

 // 4. open vscode with your newly created file
 exec(`code -n ./vs_temp/tmp_file.${extname}`);

 // 5. In new window, open your folder and your file highlighted
 // exec(`code -n ./vs_temp ./vs_temp/tmp_file.${extname}`);

 res.json({
  msg: 'your code is opened in vscode',
  status: 200,
 });
});

// open subject file structure
app.post('/open_subject_json_file', async (req, res) => {
 let { file_name } = req.body;

 console.log(`./public/Subjects_list/${file_name}`);

 console.log('subject json active');

 // 1. check "./vs_temp" if does not exist
 if (await !fs.existsSync('./public/Subjects_list')) {
  console.log('Subjects_list does not exist.....');
 }

 // 2. open vscode with your newly created file
 exec(`code -n "./public/Subjects_list/${file_name}"`);

 res.json({
  msg: 'your subject folder is opened in vscode',
  status: 200,
 });
});

app.get('/open_icon_images_folder', (req, res) => {
 exec(`start ${__dirname}\\public\\_images\\subject_icons`);

 return res.json({
  msg: '_images folder is opened..',
  status: 200,
 });
});

// list all subjects
app.get('/get_all_subjects_List', async (req, res) => {
 // list all files in the directory
 let data = [];
 await fs.readdirSync('./public/Subjects_list').forEach((file) => {
  data.push(file);
 });

 return res.json({
  data,
 });
});

// read subject file
app.post('/get_all_subjects_List', async (req, res) => {
 let { file_name } = req.body;
 // list all files in the directory
 fs.readFile(`./public/Subjects_list/${file_name}`, 'utf8', (err, data) => {
  if (err) {
   console.error(err);
   return;
  }
  console.log(data);
  return res.json({
   data,
  });
 });

 //  return res.json({
 //   data,
 //  });
});

app.listen(PORT, () => {
 console.log(`server is running on ${PORT}`);
});

reload(app);
