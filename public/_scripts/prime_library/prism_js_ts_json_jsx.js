// ####################
//  Javascript
// ####################

Prism.languages.clike = {
 comment: [
  { pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0, greedy: !0 },
  { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 },
 ],
 string: { pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
 'class-name': { pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i, lookbehind: !0, inside: { punctuation: /[.\\]/ } },
 keyword: /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
 boolean: /\b(?:false|true)\b/,
 function: /\b\w+(?=\()/,
 number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
 operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
 punctuation_parentheses: /[()]/,
 punctuation_curlyBrackets: /[{}]/,
 punctuation_squareBrackets: /[[\]]/,
 punctuation_colons: /[:]/,
 punctuation_dots: /[.]/,
 punctuation_semiColons: /[;]/,
 punctuation_commas: /[,]/,
 //  punctuation: /[{}[\];(),.:]/,
};

// #################################
// HTML Markup
// #################################

(Prism.languages.markup = {
  comment: { pattern: /<!--(?:(?!<!--)[\s\S])*?-->/, greedy: !0 },
  prolog: { pattern: /<\?[\s\S]+?\?>/, greedy: !0 },
  doctype: {
   pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
   greedy: !0,
   inside: {
    'internal-subset': { pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/, lookbehind: !0, greedy: !0, inside: null },
    string: { pattern: /"[^"]*"|'[^']*'/, greedy: !0 },
    punctuation: /^<!|>$|[[\]]/,
    'doctype-tag': /^DOCTYPE/i,
    name: /[^\s<>'"]+/,
   },
  },
  cdata: { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, greedy: !0 },
  tag: {
   pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
   greedy: !0,
   inside: {
    tag: { pattern: /^<\/?[^\s>\/]+/, inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ } },
    'special-attr': [],
    'attr-value': {
     pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
     inside: {
      punctuation: [
       { pattern: /^=/, alias: 'attr-equals' },
       { pattern: /^(\s*)["']|["']$/, lookbehind: !0 },
      ],
     },
    },
    punctuation: /\/?>/,
    'attr-name': { pattern: /[^\s>\/]+/, inside: { namespace: /^[^\s>\/:]+:/ } },
   },
  },
  entity: [{ pattern: /&[\da-z]{1,8};/i, alias: 'named-entity' }, /&#x?[\da-f]{1,8};/i],
 }),
  (Prism.languages.markup.tag.inside['attr-value'].inside.entity = Prism.languages.markup.entity),
  (Prism.languages.markup.doctype.inside['internal-subset'].inside = Prism.languages.markup),
  Prism.hooks.add('wrap', function (a) {
   'entity' === a.type && (a.attributes.title = a.content.replace(/&amp;/, '&'));
  }),
  Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
   value: function (a, e) {
    var s = {};
    (s['language-' + e] = { pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i, lookbehind: !0, inside: Prism.languages[e] }), (s.cdata = /^<!\[CDATA\[|\]\]>$/i);
    var t = { 'included-cdata': { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, inside: s } };
    t['language-' + e] = { pattern: /[\s\S]+/, inside: Prism.languages[e] };
    var n = {};
    (n[a] = {
     pattern: RegExp(
      '(<__[^>]*>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)'.replace(/__/g, function () {
       return a;
      }),
      'i'
     ),
     lookbehind: !0,
     greedy: !0,
     inside: t,
    }),
     Prism.languages.insertBefore('markup', 'cdata', n);
   },
  }),
  Object.defineProperty(Prism.languages.markup.tag, 'addAttribute', {
   value: function (a, e) {
    Prism.languages.markup.tag.inside['special-attr'].push({
     pattern: RegExp('(^|["\'\\s])(?:' + a + ')\\s*=\\s*(?:"[^"]*"|\'[^\']*\'|[^\\s\'">=]+(?=[\\s>]))', 'i'),
     lookbehind: !0,
     inside: {
      'attr-name': /^[^\s=]+/,
      'attr-value': {
       pattern: /=[\s\S]+/,
       inside: {
        value: { pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/, lookbehind: !0, alias: [e, 'language-' + e], inside: Prism.languages[e] },
        punctuation: [{ pattern: /^=/, alias: 'attr-equals' }, /"|'/],
       },
      },
     },
    });
   },
  }),
  (Prism.languages.html = Prism.languages.markup),
  (Prism.languages.mathml = Prism.languages.markup),
  (Prism.languages.svg = Prism.languages.markup),
  (Prism.languages.xml = Prism.languages.extend('markup', {})),
  (Prism.languages.ssml = Prism.languages.xml),
  (Prism.languages.atom = Prism.languages.xml),
  (Prism.languages.rss = Prism.languages.xml);

// #############################
// javascript extend clike
// #############################

(Prism.languages.javascript = Prism.languages.extend('clike', {
 'class-name': [
  Prism.languages.clike['class-name'],
  { pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/, lookbehind: !0 },
 ],
 keyword: [
  { pattern: /((?:^|\})\s*)catch\b/, lookbehind: !0 },
  {
   pattern:
    /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
   lookbehind: !0,
  },
 ],
 function: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
 number: {
  pattern: RegExp(
   '(^|[^\\w$])(?:NaN|Infinity|0[bB][01]+(?:_[01]+)*n?|0[oO][0-7]+(?:_[0-7]+)*n?|0[xX][\\dA-Fa-f]+(?:_[\\dA-Fa-f]+)*n?|\\d+(?:_\\d+)*n|(?:\\d+(?:_\\d+)*(?:\\.(?:\\d+(?:_\\d+)*)?)?|\\.\\d+(?:_\\d+)*)(?:[Ee][+-]?\\d+(?:_\\d+)*)?)(?![\\w$])'
  ),
  lookbehind: !0,
 },
 operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/,
})),
 (Prism.languages.javascript['class-name'][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/),
 Prism.languages.insertBefore('javascript', 'keyword', {
  regex: {
   pattern: RegExp(
    '((?:^|[^$\\w\\xA0-\\uFFFF."\'\\])\\s]|\\b(?:return|yield))\\s*)/(?:(?:\\[(?:[^\\]\\\\\r\n]|\\\\.)*\\]|\\\\.|[^/\\\\\\[\r\n])+/[dgimyus]{0,7}|(?:\\[(?:[^[\\]\\\\\r\n]|\\\\.|\\[(?:[^[\\]\\\\\r\n]|\\\\.|\\[(?:[^[\\]\\\\\r\n]|\\\\.)*\\])*\\])*\\]|\\\\.|[^/\\\\\\[\r\n])+/[dgimyus]{0,7}v[dgimyus]{0,7})(?=(?:\\s|/\\*(?:[^*]|\\*(?!/))*\\*/)*(?:$|[\r\n,.;:})\\]]|//))'
   ),
   lookbehind: !0,
   greedy: !0,
   inside: {
    'regex-source': { pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/, lookbehind: !0, alias: 'language-regex', inside: Prism.languages.regex },
    'regex-delimiter': /^\/|\/$/,
    'regex-flags': /^[a-z]+$/,
   },
  },
  'function-variable': {
   pattern:
    /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
   alias: 'function',
  },
  parameter: [
   {
    pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
    lookbehind: !0,
    inside: Prism.languages.javascript,
   },
   { pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i, lookbehind: !0, inside: Prism.languages.javascript },
   { pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/, lookbehind: !0, inside: Prism.languages.javascript },
   {
    pattern:
     /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
    lookbehind: !0,
    inside: Prism.languages.javascript,
   },
  ],
  constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/,
 }),
 Prism.languages.insertBefore('javascript', 'string', {
  hashbang: { pattern: /^#!.*/, greedy: !0, alias: 'comment' },
  'template-string': {
   pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
   greedy: !0,
   inside: {
    'template-punctuation': { pattern: /^`|`$/, alias: 'string' },
    interpolation: {
     pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
     lookbehind: !0,
     inside: { 'interpolation-punctuation': { pattern: /^\$\{|\}$/, alias: 'punctuation' }, rest: Prism.languages.javascript },
    },
    string: /[\s\S]+/,
   },
  },
  'string-property': { pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m, lookbehind: !0, greedy: !0, alias: 'property' },
 }),
 Prism.languages.insertBefore('javascript', 'operator', {
  'literal-property': { pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m, lookbehind: !0, alias: 'property' },
 }),
 Prism.languages.markup &&
  (Prism.languages.markup.tag.addInlined('script', 'javascript'),
  Prism.languages.markup.tag.addAttribute(
   'on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)',
   'javascript'
  )),
 (Prism.languages.js = Prism.languages.javascript);

// ####################
//  Json
// ####################

(Prism.languages.json = {
 property: { pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/, lookbehind: !0, greedy: !0 },
 string: { pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/, lookbehind: !0, greedy: !0 },
 comment: { pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/, greedy: !0 },
 number: /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
 punctuation_parentheses: /[()]/,
 punctuation_curlyBrackets: /[{}]/,
 punctuation_squareBrackets: /[[\]]/,
 punctuation_colons: /[:]/,
 punctuation_dots: /[.]/,
 punctuation_semiColons: /[;]/,
 punctuation_commas: /[,]/,
//  punctuation: /[{}[\],]/,
 operator: /:/,
 boolean: /\b(?:false|true)\b/,
 null: { pattern: /\bnull\b/, alias: 'keyword' },
}),
 (Prism.languages.webmanifest = Prism.languages.json);

// ####################
//  JSX
// ####################

!(function (t) {
 var n = t.util.clone(t.languages.javascript),
  e = '(?:\\{<S>*\\.{3}(?:[^{}]|<BRACES>)*\\})';
 function a(t, n) {
  return (
   (t = t
    .replace(/<S>/g, function () {
     return '(?:\\s|//.*(?!.)|/\\*(?:[^*]|\\*(?!/))\\*/)';
    })
    .replace(/<BRACES>/g, function () {
     return '(?:\\{(?:\\{(?:\\{[^{}]*\\}|[^{}])*\\}|[^{}])*\\})';
    })
    .replace(/<SPREAD>/g, function () {
     return e;
    })),
   RegExp(t, n)
  );
 }
 (e = a(e).source),
  (t.languages.jsx = t.languages.extend('markup', n)),
  (t.languages.jsx.tag.pattern = a(
   '</?(?:[\\w.:-]+(?:<S>+(?:[\\w.:$-]+(?:=(?:"(?:\\\\[^]|[^\\\\"])*"|\'(?:\\\\[^]|[^\\\\\'])*\'|[^\\s{\'"/>=]+|<BRACES>))?|<SPREAD>))*<S>*/?)?>'
  )),
  (t.languages.jsx.tag.inside.tag.pattern = /^<\/?[^\s>\/]*/),
  (t.languages.jsx.tag.inside['attr-value'].pattern = /=(?!\{)(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s'">]+)/),
  (t.languages.jsx.tag.inside.tag.inside['class-name'] = /^[A-Z]\w*(?:\.[A-Z]\w*)*$/),
  (t.languages.jsx.tag.inside.comment = n.comment),
  t.languages.insertBefore('inside', 'attr-name', { spread: { pattern: a('<SPREAD>'), inside: t.languages.jsx } }, t.languages.jsx.tag),
  t.languages.insertBefore(
   'inside',
   'special-attr',
   {
    script: {
     pattern: a('=<BRACES>'),
     alias: 'language-javascript',
     inside: { 'script-punctuation': { pattern: /^=(?=\{)/, alias: 'punctuation' }, rest: t.languages.jsx },
    },
   },
   t.languages.jsx.tag
  );
 var s = function (t) {
   return t ? ('string' == typeof t ? t : 'string' == typeof t.content ? t.content : t.content.map(s).join('')) : '';
  },
  g = function (n) {
   for (var e = [], a = 0; a < n.length; a++) {
    var o = n[a],
     i = !1;
    if (
     ('string' != typeof o &&
      ('tag' === o.type && o.content[0] && 'tag' === o.content[0].type
       ? '</' === o.content[0].content[0].content
         ? e.length > 0 && e[e.length - 1].tagName === s(o.content[0].content[1]) && e.pop()
         : '/>' === o.content[o.content.length - 1].content || e.push({ tagName: s(o.content[0].content[1]), openedBraces: 0 })
       : e.length > 0 && 'punctuation' === o.type && '{' === o.content
       ? e[e.length - 1].openedBraces++
       : e.length > 0 && e[e.length - 1].openedBraces > 0 && 'punctuation' === o.type && '}' === o.content
       ? e[e.length - 1].openedBraces--
       : (i = !0)),
     (i || 'string' == typeof o) && e.length > 0 && 0 === e[e.length - 1].openedBraces)
    ) {
     var r = s(o);
     a < n.length - 1 && ('string' == typeof n[a + 1] || 'plain-text' === n[a + 1].type) && ((r += s(n[a + 1])), n.splice(a + 1, 1)),
      a > 0 && ('string' == typeof n[a - 1] || 'plain-text' === n[a - 1].type) && ((r = s(n[a - 1]) + r), n.splice(a - 1, 1), a--),
      (n[a] = new t.Token('plain-text', r, null, r));
    }
    o.content && 'string' != typeof o.content && g(o.content);
   }
  };
 t.hooks.add('after-tokenize', function (t) {
  ('jsx' !== t.language && 'tsx' !== t.language) || g(t.tokens);
 });
})(Prism);

// ################################
// TypeScript
// ################################

!(function (e) {
 (e.languages.typescript = e.languages.extend('javascript', {
  'class-name': {
   pattern:
    /(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,
   lookbehind: !0,
   greedy: !0,
   inside: null,
  },
  builtin: /\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\b/,
 })),
  e.languages.typescript.keyword.push(
   /\b(?:abstract|declare|is|keyof|readonly|require)\b/,
   /\b(?:asserts|infer|interface|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/,
   /\btype\b(?=\s*(?:[\{*]|$))/
  ),
  delete e.languages.typescript.parameter,
  delete e.languages.typescript['literal-property'];
 var s = e.languages.extend('typescript', {});
 delete s['class-name'],
  (e.languages.typescript['class-name'].inside = s),
  e.languages.insertBefore('typescript', 'function', {
   decorator: { pattern: /@[$\w\xA0-\uFFFF]+/, inside: { at: { pattern: /^@/, alias: 'operator' }, function: /^[\s\S]+/ } },
   'generic-function': {
    pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,
    greedy: !0,
    inside: { function: /^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/, generic: { pattern: /<[\s\S]+/, alias: 'class-name', inside: s } },
   },
  }),
  (e.languages.ts = e.languages.typescript);
})(Prism);

// ################################
// TypeScript and JSX
// ################################

!(function (e) {
 var a = e.util.clone(e.languages.typescript);
 (e.languages.tsx = e.languages.extend('jsx', a)), delete e.languages.tsx.parameter, delete e.languages.tsx['literal-property'];
 var t = e.languages.tsx.tag;
 (t.pattern = RegExp('(^|[^\\w$]|(?=</))(?:' + t.pattern.source + ')', t.pattern.flags)), (t.lookbehind = !0);
})(Prism);
