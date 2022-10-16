//  ###################################################################
//  ######################### HTML #####################################
//  ###################################################################

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

//  ###################################################################
//  ######################### Css #####################################
//  ###################################################################

!(function (s) {
 var e = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
 (s.languages.css = {
  comment: /\/\*[\s\S]*?\*\//,
  atrule: {
   pattern: RegExp('@[\\w-](?:[^;{\\s"\']|\\s+(?!\\s)|' + e.source + ')*?(?:;|(?=\\s*\\{))'),
   inside: {
    rule: /^@[\w-]+/,
    'selector-function-argument': {
     pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
     lookbehind: !0,
     alias: 'selector',
    },
    keyword: { pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/, lookbehind: !0 },
   },
  },
  url: {
   pattern: RegExp('\\burl\\((?:' + e.source + '|(?:[^\\\\\r\n()"\']|\\\\[^])*)\\)', 'i'),
   greedy: !0,
   inside: { function: /^url/i, punctuation: /^\(|\)$/, string: { pattern: RegExp('^' + e.source + '$'), alias: 'url' } },
  },
  selector: { pattern: RegExp('(^|[{}\\s])[^{}\\s](?:[^{};"\'\\s]|\\s+(?![\\s{])|' + e.source + ')*(?=\\s*\\{)'), lookbehind: !0 },
  string: { pattern: e, greedy: !0 },
  property: { pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i, lookbehind: !0 },
  important: /!important\b/i,
  function: { pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i, lookbehind: !0 },
  punctuation: /[(){};:,]/,
 }),
  (s.languages.css.atrule.inside.rest = s.languages.css);
 var t = s.languages.markup;
 t && (t.tag.addInlined('style', 'css'), t.tag.addAttribute('style', 'css'));
})(Prism);

//  ###################################################################
//  ######################### Css Selectors #####################################
//  ###################################################################

!(function (e) {
 var a,
  n = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
 (e.languages.css.selector = {
  pattern: e.languages.css.selector.pattern,
  lookbehind: !0,
  inside: (a = {
   'pseudo-element': /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/,
   'pseudo-class': /:[-\w]+/,
   class: /\.[-\w]+/,
   id: /#[-\w]+/,
   attribute: {
    pattern: RegExp('\\[(?:[^[\\]"\']|' + n.source + ')*\\]'),
    greedy: !0,
    inside: {
     punctuation: /^\[|\]$/,
     'case-sensitivity': { pattern: /(\s)[si]$/i, lookbehind: !0, alias: 'keyword' },
     namespace: { pattern: /^(\s*)(?:(?!\s)[-*\w\xA0-\uFFFF])*\|(?!=)/, lookbehind: !0, inside: { punctuation: /\|$/ } },
     'attr-name': { pattern: /^(\s*)(?:(?!\s)[-\w\xA0-\uFFFF])+/, lookbehind: !0 },
     'attr-value': [n, { pattern: /(=\s*)(?:(?!\s)[-\w\xA0-\uFFFF])+(?=\s*$)/, lookbehind: !0 }],
     operator: /[|~*^$]?=/,
    },
   },
   'n-th': [
    { pattern: /(\(\s*)[+-]?\d*[\dn](?:\s*[+-]\s*\d+)?(?=\s*\))/, lookbehind: !0, inside: { number: /[\dn]+/, operator: /[+-]/ } },
    { pattern: /(\(\s*)(?:even|odd)(?=\s*\))/i, lookbehind: !0 },
   ],
   combinator: />|\+|~|\|\|/,
   punctuation: /[(),]/,
  }),
 }),
  (e.languages.css.atrule.inside['selector-function-argument'].inside = a),
  e.languages.insertBefore('css', 'property', { variable: { pattern: /(^|[^-\w\xA0-\uFFFF])--(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*/i, lookbehind: !0 } });
 var r = { pattern: /(\b\d+)(?:%|[a-z]+(?![\w-]))/, lookbehind: !0 },
  i = { pattern: /(^|[^\w.-])-?(?:\d+(?:\.\d+)?|\.\d+)/, lookbehind: !0 };
 e.languages.insertBefore('css', 'function', {
  operator: { pattern: /(\s)[+\-*\/](?=\s)/, lookbehind: !0 },
  hexcode: { pattern: /\B#[\da-f]{3,8}\b/i, alias: 'color' },
  color: [
   {
    pattern:
     /(^|[^\w-])(?:AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGr[ae]y|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGr[ae]y|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGr[ae]y|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gr[ae]y|Green|GreenYellow|HoneyDew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGr[ae]y|LightGreen|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGr[ae]y|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|RebeccaPurple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGr[ae]y|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Transparent|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen)(?![\w-])/i,
    lookbehind: !0,
   },
   {
    pattern: /\b(?:hsl|rgb)\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\)\B|\b(?:hsl|rgb)a\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*(?:0|0?\.\d+|1)\s*\)\B/i,
    inside: { unit: r, number: i, function: /[\w-]+(?=\()/, punctuation: /[(),]/ },
   },
  ],
  entity: /\\[\da-f]{1,8}/i,
  unit: r,
  number: i,
 });
})(Prism);

// #########################
// CSS rgba()
// #########################

!(function () {
 if ('undefined' != typeof Prism && 'undefined' != typeof document) {
  var n = /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/g,
   r = /^#?((?:[\da-f]){3,4}|(?:[\da-f]{2}){3,4})$/i,
   o = [
    function (n) {
     var o = r.exec(n);
     if (o) {
      for (var s = (n = o[1]).length >= 6 ? 2 : 1, e = n.length / s, t = 1 == s ? 1 / 15 : 1 / 255, i = [], a = 0; a < e; a++) {
       var c = parseInt(n.substr(a * s, s), 16);
       i.push(c * t);
      }
      return (
       3 == e && i.push(1),
       'rgba(' +
        i
         .slice(0, 3)
         .map(function (n) {
          return String(Math.round(255 * n));
         })
         .join(',') +
        ',' +
        String(Number(i[3].toFixed(3))) +
        ')'
      );
     }
    },
    function (n) {
     var r = new Option().style;
     return (r.color = n), r.color ? n : void 0;
    },
   ];
  Prism.hooks.add('wrap', function (r) {
   if ('color' === r.type || r.classes.indexOf('color') >= 0) {
    for (var s, e = r.content, t = e.split(n).join(''), i = 0, a = o.length; i < a && !s; i++) s = o[i](t);
    if (!s) return;
    var c = '<span class="inline-color-wrapper"><span class="inline-color" style="background-color:' + s + ';"></span></span>';
    r.content = c + e;
   }
  });
 }
})();
