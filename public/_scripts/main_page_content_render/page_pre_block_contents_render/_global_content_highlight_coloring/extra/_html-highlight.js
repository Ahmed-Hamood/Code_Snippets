const html_highlight = code => {
 let strReg = /"(.*?)"/g

 // html
 let htmlKeyword = /(&lt;[^\&]*&gt;)/g
 let htmlAttributes = /\s(html|lang|charset|http-equiv|content|name|id|class|src)(?=[^\w])/g
 let htmlAttributesNoValue = /\s(crossorigin)(?=[^\w])/g
 let htmlComment = /&lt;!--(.*?)--&gt;/gm; // <!-- -->
 // let htmlKeyword2 = /(&lt;|(&gt;))/g;
 let equalSign = /=/g // { or }

 let cssComment = /(\/\*.*\*\/)/g

 code.forEach(el => { 
  let data = code.innerHTML
  data = el.innerHTML
  data = data.replace(strReg, '<htmlString>"$1"</htmlString>')
  data = data.replace(equalSign, '<htmlEqualSignColor>=</htmlEqualSignColor>')
  
  data = data.replace(htmlKeyword, "<htmlTagColor>$1</htmlTagColor>")
  data = data.replace(htmlAttributes, " <htmlAttributeColor>$1</htmlAttributeColor>")
  data = data.replace(htmlAttributesNoValue, " <htmlAttributesNoValue>$1</htmlAttributesNoValue>")
  data = data.replace(cssComment, "<cssCommentColor>$1</cssCommentColor>")
  data = data.replace(htmlComment, "<htmlComment>###$1###</htmlComment>")
  
  

  data = data.replace(/&lt;/g, "<htmlAngleBracketsColor>&lt;</htmlAngleBracketsColor>")
  data = data.replace(/&gt;/g, "<htmlAngleBracketsColor>&gt;</htmlAngleBracketsColor>")

  el.innerHTML = data
 })
}

export default html_highlight
