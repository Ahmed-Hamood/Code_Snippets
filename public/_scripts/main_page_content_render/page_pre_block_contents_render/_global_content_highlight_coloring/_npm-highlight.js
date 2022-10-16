const npm_highlight = (code) => {
 let data = null;
 let npmComment = /(\/\/ .*)/g;

 let npmKeyword = /\b(npm|npx)(?=[^\w])\b/g;
 //  let allNpmKeywords =
 //   /[\s](access|adduser|audit|bin|bugs|cache|ci|completion|config|dedupe|deprecate|diff|dist-tag|docs|doctor|edit|exec|explain|explore|find-dupes|fund|help|help-search|hook|init|install|i|install-ci-test|install-test|link|logout|ls|org|outdated|owner|pack|ping|pkg|prefix|profile|prune|publish|rebuild|repo|restart|root|run-script|search|set-script|shrinkwrap|star|stars|start|stop|team|test|token|uninstall|unpublish|unstar|update|version|view|whoami)[\s]/g;

 let KeywordsAfterNpm = /\b(npm|npx)\s(install|init|start|run|i|create\-react\-app)(?=[^\w])\b/g;

 let GitKeywords = /\bgit\s(add|commit|init|status|ls-files|config|mv|rm|--version|diff|difftool|config)(?=[^\w])\b/g;
 let LinuxUnixCommands = /\b(cd|echo|ls|rm|mv|pwd|mkdir)(?=[^\w])\b/g;

 let otherKeywords = /\b(code)(?=[^\w])\b/g;

 let KeywordStartWithDoubleDash = /(\s--\w+)/g;
 let KeywordStartWithSingleDash = /(\s-\w+)/g;
 let dot = /\s\./g;
 let BetweenAngleBrackets = /&lt;(.*?)&gt;/g;

 code.forEach((el) => {
  data = code.innerHTML;
  data = el.innerHTML;

  data = data.replace(/\"(.*?)\"/g, '<npmString>"$1"</npmString>');

  data = data.replace(KeywordStartWithDoubleDash, '<npmOptionColor>$1</npmOptionColor>'); // --save
  data = data.replace(KeywordStartWithSingleDash, '<npmOptionColor>$1</npmOptionColor>'); // -save

  data = data.replace(KeywordsAfterNpm, '<npmKeywordColor>$1</npmKeywordColor> <AllNpmKeywordsColor>$2</AllNpmKeywordsColor>');

  data = data.replace(GitKeywords, '<GitColor>git</GitColor> <GitKeywordsColor>$1</GitKeywordsColor>');

  data = data.replace(LinuxUnixCommands, '<LinuxUnixColor>$1</LinuxUnixColor>');
  data = data.replace(otherKeywords, '<otherNpmKeywordsColor>$1</otherNpmKeywordsColor>');

  data = data.replace(
   BetweenAngleBrackets,
   '<npmAngleBracketColor><</npmAngleBracketColor><wordBetweenAngleBrackets>$1</wordBetweenAngleBrackets><npmAngleBracketColor>></npmAngleBracketColor>'
  );

  data = data.replace(dot, ' <npmDotColor>.</npmDotColor>'); // .

  data = data.replace(npmComment, '<npmComment>$1</npmComment>');

  el.innerHTML = data;
 });
};

export default npm_highlight;
