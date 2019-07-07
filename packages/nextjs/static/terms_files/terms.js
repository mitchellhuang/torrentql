(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["static/development/pages/terms.js"],{

/***/ "./node_modules/markdown-to-jsx/dist/esm.js":
/*!**************************************************!*\
  !*** ./node_modules/markdown-to-jsx/dist/esm.js ***!
  \**************************************************/
/*! exports provided: compiler, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compiler", function() { return compiler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Markdown; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var unquote__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! unquote */ "./node_modules/unquote/index.js");
/* harmony import */ var unquote__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(unquote__WEBPACK_IMPORTED_MODULE_1__);
var _extends=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a},_typeof=typeof Symbol=='function'&&typeof Symbol.iterator=='symbol'?function(a){return typeof a}:function(a){return a&&typeof Symbol=='function'&&a.constructor===Symbol&&a!==Symbol.prototype?'symbol':typeof a};function _objectWithoutProperties(a,b){var c={};for(var d in a)b.indexOf(d)>=0||Object.prototype.hasOwnProperty.call(a,d)&&(c[d]=a[d]);return c}var ATTRIBUTE_TO_JSX_PROP_MAP={accesskey:'accessKey',allowfullscreen:'allowFullScreen',allowtransparency:'allowTransparency',autocomplete:'autoComplete',autofocus:'autoFocus',autoplay:'autoPlay',cellpadding:'cellPadding',cellspacing:'cellSpacing',charset:'charSet',class:'className',classid:'classId',colspan:'colSpan',contenteditable:'contentEditable',contextmenu:'contextMenu',crossorigin:'crossOrigin',enctype:'encType',for:'htmlFor',formaction:'formAction',formenctype:'formEncType',formmethod:'formMethod',formnovalidate:'formNoValidate',formtarget:'formTarget',frameborder:'frameBorder',hreflang:'hrefLang',inputmode:'inputMode',keyparams:'keyParams',keytype:'keyType',marginheight:'marginHeight',marginwidth:'marginWidth',maxlength:'maxLength',mediagroup:'mediaGroup',minlength:'minLength',novalidate:'noValidate',radiogroup:'radioGroup',readonly:'readOnly',rowspan:'rowSpan',spellcheck:'spellCheck',srcdoc:'srcDoc',srclang:'srcLang',srcset:'srcSet',tabindex:'tabIndex',usemap:'useMap'},namedCodesToUnicode={amp:'&',apos:'\'',gt:'>',lt:'<',nbsp:'\xA0',quot:'\u201C'},DO_NOT_PROCESS_HTML_ELEMENTS=['style','script'],ATTR_EXTRACTOR_R=/([-A-Z0-9_:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|(?:\{((?:\\.|{[^}]*?}|[^}])*)\})))?/gi,AUTOLINK_MAILTO_CHECK_R=/mailto:/i,BLOCK_END_R=/\n{2,}$/,BLOCKQUOTE_R=/^( *>[^\n]+(\n[^\n]+)*\n*)+\n{2,}/,BLOCKQUOTE_TRIM_LEFT_MULTILINE_R=/^ *> ?/gm,BREAK_LINE_R=/^ {2,}\n/,BREAK_THEMATIC_R=/^(?:( *[-*_]) *){3,}(?:\n *)+\n/,CODE_BLOCK_FENCED_R=/^\s*(`{3,}|~{3,}) *(\S+)? *\n([\s\S]+?)\s*\1 *(?:\n *)+\n?/,CODE_BLOCK_R=/^(?: {4}[^\n]+\n*)+(?:\n *)+\n?/,CODE_INLINE_R=/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,CONSECUTIVE_NEWLINE_R=/^(?:\n *)*\n/,CR_NEWLINE_R=/\r\n?/g,FOOTNOTE_R=/^\[\^(.*)\](:.*)\n/,FOOTNOTE_REFERENCE_R=/^\[\^(.*)\]/,FORMFEED_R=/\f/g,GFM_TASK_R=/^\s*?\[(x|\s)\]/,HEADING_R=/^ *(#{1,6}) *([^\n]+)\n{0,2}/,HEADING_SETEXT_R=/^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/,HTML_BLOCK_ELEMENT_R=/^ *(?!<[a-z][^ >/]* ?\/>)<([a-z][^ >/]*) ?([^>]*)\/{0}>\n?(\s*(?:<\1[^>]*?>[\s\S]*?<\/\1>|(?!<\1)[\s\S])*?)<\/\1>\n*/i,HTML_CHAR_CODE_R=/&([a-z]+);/g,HTML_COMMENT_R=/^<!--.*?-->/,HTML_CUSTOM_ATTR_R=/^(data|aria|x)-[a-z_][a-z\d_.-]*$/,HTML_SELF_CLOSING_ELEMENT_R=/^ *<([a-z][a-z0-9:]*)(?:\s+((?:<.*?>|[^>])*))?\/?>(?!<\/\1>)(\s*\n)?/i,INTERPOLATION_R=/^\{.*\}$/,LINK_AUTOLINK_BARE_URL_R=/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,LINK_AUTOLINK_MAILTO_R=/^<([^ >]+@[^ >]+)>/,LINK_AUTOLINK_R=/^<([^ >]+:\/[^ >]+)>/,LIST_ITEM_END_R=/ *\n+$/,LIST_LOOKBEHIND_R=/(?:^|\n)( *)$/,CAPTURE_LETTER_AFTER_HYPHEN=/-([a-z])?/gi,NP_TABLE_R=/^(.*\|?.*)\n *(\|? *[-:]+ *\|[-| :]*)\n((?:.*\|.*\n)*)\n?/,PARAGRAPH_R=/^((?:[^\n]|\n(?! *\n))+)(?:\n *)+\n/,REFERENCE_IMAGE_OR_LINK=/^\[([^\]]*)\]:\s*(\S+)\s*("([^"]*)")?/,REFERENCE_IMAGE_R=/^!\[([^\]]*)\] ?\[([^\]]*)\]/,REFERENCE_LINK_R=/^\[([^\]]*)\] ?\[([^\]]*)\]/,SQUARE_BRACKETS_R=/(\[|\])/g,SHOULD_RENDER_AS_BLOCK_R=/(\n|^[-*]\s|^#|^ {2,}|^-{2,}|^>\s)/,TAB_R=/\t/g,TABLE_TRIM_PIPES=/(^ *\||\| *$)/g,TABLE_CENTER_ALIGN=/^ *:-+: *$/,TABLE_LEFT_ALIGN=/^ *:-+ *$/,TABLE_RIGHT_ALIGN=/^ *-+: *$/,TABLE_ROW_SPLIT=/ *\| */,TEXT_BOLD_R=/^([*_])\1((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1\1(?!\1)/,TEXT_EMPHASIZED_R=/^([*_])((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1(?!\1)/,TEXT_STRIKETHROUGHED_R=/^~~((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)~~/,TEXT_ESCAPED_R=/^\\([^0-9A-Za-z\s])/,TEXT_PLAIN_R=/^[\s\S]+?(?=[^0-9A-Z\s\u00c0-\uffff&;.()'"]|\d+\.|\n\n| {2,}\n|\w+:\S|$)/i,TRIM_NEWLINES_AND_TRAILING_WHITESPACE_R=/(^\n+|(\n|\s)+$)/g,HTML_LEFT_TRIM_AMOUNT_R=/^([ \t]*)/,UNESCAPE_URL_R=/\\([^0-9A-Z\s])/gi,LIST_BULLET='(?:[*+-]|\\d+\\.)',LIST_ITEM_PREFIX='( *)((?:[*+-]|\\d+\\.)) +',LIST_ITEM_PREFIX_R=/^( *)((?:[*+-]|\d+\.)) +/,LIST_ITEM_R=/( *)((?:[*+-]|\d+\.)) +[^\n]*(?:\n(?!\1(?:[*+-]|\d+\.) )[^\n]*)*(\n|$)/gm,LIST_R=/^( *)((?:[*+-]|\d+\.)) [\s\S]+?(?:\n{2,}(?! )(?!\1(?:[*+-]|\d+\.) (?!(?:[*+-]|\d+\.) ))\n*|\s*\n*$)/,LINK_INSIDE='(?:\\[[^\\]]*\\]|[^\\[\\]]|\\](?=[^\\[]*\\]))*',LINK_HREF_AND_TITLE='\\s*<?((?:[^\\s\\\\]|\\\\.)*?)>?(?:\\s+[\'"]([\\s\\S]*?)[\'"])?\\s*',LINK_R=/^\[((?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*)\]\(\s*<?((?:[^\s\\]|\\.)*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*\)/,IMAGE_R=/^!\[((?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*)\]\(\s*<?((?:[^\s\\]|\\.)*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*\)/,BLOCK_SYNTAXES=[BLOCKQUOTE_R,CODE_BLOCK_R,CODE_BLOCK_FENCED_R,HEADING_R,HEADING_SETEXT_R,HTML_BLOCK_ELEMENT_R,HTML_COMMENT_R,HTML_SELF_CLOSING_ELEMENT_R,LIST_ITEM_R,LIST_R,NP_TABLE_R,PARAGRAPH_R];function containsBlockSyntax(a){return BLOCK_SYNTAXES.some(function(b){return b.test(a)})}function slugify(a){return a.replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/g,'a').replace(/[çÇ]/g,'c').replace(/[ðÐ]/g,'d').replace(/[ÈÉÊËéèêë]/g,'e').replace(/[ÏïÎîÍíÌì]/g,'i').replace(/[Ññ]/g,'n').replace(/[øØœŒÕõÔôÓóÒò]/g,'o').replace(/[ÜüÛûÚúÙù]/g,'u').replace(/[ŸÿÝý]/g,'y').replace(/[^a-z0-9- ]/gi,'').replace(/ /gi,'-').toLowerCase()}function parseTableAlignCapture(a){if(TABLE_RIGHT_ALIGN.test(a))return'right';return TABLE_CENTER_ALIGN.test(a)?'center':TABLE_LEFT_ALIGN.test(a)?'left':null}function parseTableHeader(a,b,c){var d=a[1].replace(TABLE_TRIM_PIPES,'').trim().split(TABLE_ROW_SPLIT);return d.map(function(a){return b(a,c)})}function parseTableAlign(a){var b=a[2].replace(TABLE_TRIM_PIPES,'').trim().split(TABLE_ROW_SPLIT);return b.map(parseTableAlignCapture)}function parseTableCells(a,b,c){var d=a[3].trim().split('\n');return d.map(function(a){return a.replace(TABLE_TRIM_PIPES,'').split(TABLE_ROW_SPLIT).map(function(a){return b(a.trim(),c)})})}function parseTable(a,b,c){c.inline=!0;var d=parseTableHeader(a,b,c),e=parseTableAlign(a,b,c),f=parseTableCells(a,b,c);return c.inline=!1,{align:e,cells:f,header:d,type:'table'}}function getTableStyle(a,b){return a.align[b]==null?{}:{textAlign:a.align[b]}}function normalizeAttributeKey(a){var b=a.indexOf('-');return b!==-1&&a.match(HTML_CUSTOM_ATTR_R)===null&&(a=a.replace(CAPTURE_LETTER_AFTER_HYPHEN,function(a,b){return b.toUpperCase()})),a}function attributeValueToJSXPropValue(a,b){return a==='style'?b.split(/;\s?/).reduce(function(a,b){var c=b.slice(0,b.indexOf(':')),d=c.replace(/(-[a-z])/g,function(a){return a[1].toUpperCase()});return a[d]=b.slice(c.length+1).trim(),a},{}):a==='href'?sanitizeUrl(b):(b.match(INTERPOLATION_R)&&(b=b.slice(1,b.length-1)),b==='true'||b!=='false'&&b)}function normalizeWhitespace(a){return a.replace(CR_NEWLINE_R,'\n').replace(FORMFEED_R,'').replace(TAB_R,'    ')}function parserFor(a){function b(d,e){for(var f=[],g='';d;)for(var l=0;l<c.length;){var h=c[l],j=a[h],k=j.match(d,e,g);if(k){var i=k[0];d=d.substring(i.length);var m=j.parse(k,b,e);m.type==null&&(m.type=h),f.push(m),g=i;break}l++}return f}var c=Object.keys(a);return  true&&c.forEach(function(b){var c=a[b].order; false||typeof c=='number'&&isFinite(c)||console.warn('markdown-to-jsx: Invalid order for rule `'+b+'`: '+c)}),c.sort(function(b,c){var d=a[b].order,e=a[c].order;return d===e?b<c?-1:1:d-e}),function(a,c){return b(normalizeWhitespace(a),c)}}function inlineRegex(a){return function(b,c){return c.inline?a.exec(b):null}}function simpleInlineRegex(a){return function(b,c){return c.inline||c.simple?a.exec(b):null}}function blockRegex(a){return function(b,c){return c.inline||c.simple?null:a.exec(b)}}function anyScopeRegex(a){return function(b){return a.exec(b)}}function reactFor(a){return function b(c,d){if(d=d||{},Array.isArray(c)){for(var e=d.key,f=[],g=!1,h=0;h<c.length;h++){d.key=h;var j=b(c[h],d),k=typeof j=='string';k&&g?f[f.length-1]+=j:f.push(j),g=k}return d.key=e,f}return a(c,b,d)}}function sanitizeUrl(a){try{var b=decodeURIComponent(a);if(b.match(/^\s*javascript:/i))return  true&&console.warn('Anchor URL contains an unsafe JavaScript expression, it will not be rendered.',b),null}catch(b){return  true&&console.warn('Anchor URL could not be decoded due to malformed syntax or characters, it will not be rendered.',a),null}return a}function unescapeUrl(a){return a.replace(UNESCAPE_URL_R,'$1')}function parseInline(a,b,c){var d=c.inline||!1,e=c.simple||!1;c.inline=!0,c.simple=!0;var f=a(b,c);return c.inline=d,c.simple=e,f}function parseSimpleInline(a,b,c){var d=c.inline||!1,e=c.simple||!1;c.inline=!1,c.simple=!0;var f=a(b,c);return c.inline=d,c.simple=e,f}function parseBlock(a,b,c){return c.inline=!1,a(b+'\n\n',c)}function parseCaptureInline(a,b,c){return{content:parseInline(b,a[1],c)}}function captureNothing(){return{}}function renderNothing(){return null}function ruleOutput(a){return function(b,c,d){return a[b.type].react(b,c,d)}}function cx(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return b.filter(Boolean).join(' ')}function get(a,b,c){for(var d=a,e=b.split('.');e.length&&(d=d[e[0]],d!==void 0);)e.shift();return d||c}function getTag(a,b){var c=get(b,a);return c?typeof c=='function'||(typeof c=='undefined'?'undefined':_typeof(c))==='object'&&'render'in c?c:get(b,a+'.component',a):a}var PARSE_PRIORITY_MAX=1,PARSE_PRIORITY_HIGH=2,PARSE_PRIORITY_MED=3,PARSE_PRIORITY_LOW=4,PARSE_PRIORITY_MIN=5;function compiler(a,b){function d(a,c){for(var d=get(b.overrides,a+'.props',{}),e=arguments.length,g=Array(e>2?e-2:0),h=2;h<e;h++)g[h-2]=arguments[h];return f.apply(void 0,[getTag(a,b.overrides),_extends({},c,d,{className:cx(c&&c.className,d.className)||void 0})].concat(g))}function c(a){var c=!1;b.forceInline?c=!0:!b.forceBlock&&(c=SHOULD_RENDER_AS_BLOCK_R.test(a)===!1);var e=k(j(c?a:a.replace(TRIM_NEWLINES_AND_TRAILING_WHITESPACE_R,'')+'\n\n',{inline:c})),f=void 0;return e.length>1?f=c?d('span',{key:'outer'},e):d('div',{key:'outer'},e):e.length===1?(f=e[0],typeof f=='string'&&(f=d('span',{key:'outer'},f))):f=d('span',{key:'outer'}),f}function e(a){var b=a.match(ATTR_EXTRACTOR_R);return b?b.reduce(function(a,b,d){var e=b.indexOf('=');if(e!==-1){var f=normalizeAttributeKey(b.slice(0,e)).trim(),g=unquote__WEBPACK_IMPORTED_MODULE_1___default()(b.slice(e+1).trim()),h=ATTRIBUTE_TO_JSX_PROP_MAP[f]||f,i=a[h]=attributeValueToJSXPropValue(f,g);(HTML_BLOCK_ELEMENT_R.test(i)||HTML_SELF_CLOSING_ELEMENT_R.test(i))&&(a[h]=react__WEBPACK_IMPORTED_MODULE_0___default.a.cloneElement(c(i.trim()),{key:d}))}else a[ATTRIBUTE_TO_JSX_PROP_MAP[b]||b]=!0;return a},{}):void 0}b=b||{},b.overrides=b.overrides||{},b.slugify=b.slugify||slugify,b.namedCodesToUnicode=b.namedCodesToUnicode?_extends({},namedCodesToUnicode,b.namedCodesToUnicode):namedCodesToUnicode;var f=b.createElement||react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;if(true){if(typeof a!='string')throw new Error('markdown-to-jsx: the first argument must be\n                             a string');if(Object.prototype.toString.call(b.overrides)!=='[object Object]')throw new Error('markdown-to-jsx: options.overrides (second argument property) must be\n                             undefined or an object literal with shape:\n                             {\n                                htmltagname: {\n                                    component: string|ReactComponent(optional),\n                                    props: object(optional)\n                                }\n                             }')}var g=[],h={},i={blockQuote:{match:blockRegex(BLOCKQUOTE_R),order:PARSE_PRIORITY_HIGH,parse:function d(a,b,c){return{content:b(a[0].replace(BLOCKQUOTE_TRIM_LEFT_MULTILINE_R,''),c)}},react:function e(a,b,c){return d('blockquote',{key:c.key},b(a.content,c))}},breakLine:{match:anyScopeRegex(BREAK_LINE_R),order:PARSE_PRIORITY_HIGH,parse:captureNothing,react:function e(a,b,c){return d('br',{key:c.key})}},breakThematic:{match:blockRegex(BREAK_THEMATIC_R),order:PARSE_PRIORITY_HIGH,parse:captureNothing,react:function e(a,b,c){return d('hr',{key:c.key})}},codeBlock:{match:blockRegex(CODE_BLOCK_R),order:PARSE_PRIORITY_MAX,parse:function c(a){var b=a[0].replace(/^ {4}/gm,'').replace(/\n+$/,'');return{content:b,lang:void 0}},react:function e(a,b,c){return d('pre',{key:c.key},d('code',{className:a.lang?'lang-'+a.lang:''},a.content))}},codeFenced:{match:blockRegex(CODE_BLOCK_FENCED_R),order:PARSE_PRIORITY_MAX,parse:function b(a){return{content:a[3],lang:a[2]||void 0,type:'codeBlock'}}},codeInline:{match:simpleInlineRegex(CODE_INLINE_R),order:PARSE_PRIORITY_LOW,parse:function b(a){return{content:a[2]}},react:function e(a,b,c){return d('code',{key:c.key},a.content)}},footnote:{match:blockRegex(FOOTNOTE_R),order:PARSE_PRIORITY_MAX,parse:function b(a){return g.push({footnote:a[2],identifier:a[1]}),{}},react:renderNothing},footnoteReference:{match:inlineRegex(FOOTNOTE_REFERENCE_R),order:PARSE_PRIORITY_HIGH,parse:function b(a){return{content:a[1],target:'#'+a[1]}},react:function e(a,b,c){return d('a',{key:c.key,href:sanitizeUrl(a.target)},d('sup',{key:c.key},a.content))}},gfmTask:{match:inlineRegex(GFM_TASK_R),order:PARSE_PRIORITY_HIGH,parse:function b(a){return{completed:a[1].toLowerCase()==='x'}},react:function e(a,b,c){return d('input',{checked:a.completed,key:c.key,readOnly:!0,type:'checkbox'})}},heading:{match:blockRegex(HEADING_R),order:PARSE_PRIORITY_HIGH,parse:function e(a,c,d){return{content:parseInline(c,a[2],d),id:b.slugify(a[2]),level:a[1].length}},react:function f(a,b,c){var e='h'+a.level;return d(e,{id:a.id,key:c.key},b(a.content,c))}},headingSetext:{match:blockRegex(HEADING_SETEXT_R),order:PARSE_PRIORITY_MAX,parse:function d(a,b,c){return{content:parseInline(b,a[1],c),level:a[2]==='='?1:2,type:'heading'}}},htmlBlock:{match:anyScopeRegex(HTML_BLOCK_ELEMENT_R),order:PARSE_PRIORITY_HIGH,parse:function l(a,b,c){var d=a[3].match(HTML_LEFT_TRIM_AMOUNT_R),f=d[1],g=new RegExp('^'+f,'gm'),h=a[3].replace(g,''),i=containsBlockSyntax(h)?parseBlock:parseInline,j=a[1].toLowerCase(),k=DO_NOT_PROCESS_HTML_ELEMENTS.indexOf(j)!==-1;return{attrs:e(a[2]),content:k?a[3]:i(b,h,c),noInnerParse:k,tag:k?j:a[1]}},react:function e(a,b,c){return d(a.tag,_extends({key:c.key},a.attrs),a.noInnerParse?a.content:b(a.content,c))}},htmlComment:{match:anyScopeRegex(HTML_COMMENT_R),order:PARSE_PRIORITY_HIGH,parse:function a(){return{}},react:renderNothing},htmlSelfClosing:{match:anyScopeRegex(HTML_SELF_CLOSING_ELEMENT_R),order:PARSE_PRIORITY_HIGH,parse:function b(a){return{attrs:e(a[2]||''),tag:a[1]}},react:function e(a,b,c){return d(a.tag,_extends({},a.attrs,{key:c.key}))}},image:{match:simpleInlineRegex(IMAGE_R),order:PARSE_PRIORITY_HIGH,parse:function b(a){return{alt:a[1],target:unescapeUrl(a[2]),title:a[3]}},react:function e(a,b,c){return d('img',{key:c.key,alt:a.alt||void 0,title:a.title||void 0,src:sanitizeUrl(a.target)})}},link:{match:inlineRegex(LINK_R,!1),order:PARSE_PRIORITY_LOW,parse:function d(a,b,c){return{content:parseSimpleInline(b,a[1],c),target:unescapeUrl(a[2]),title:a[3]}},react:function e(a,b,c){return d('a',{key:c.key,href:sanitizeUrl(a.target),title:a.title},b(a.content,c))}},linkAngleBraceStyleDetector:{match:inlineRegex(LINK_AUTOLINK_R),order:PARSE_PRIORITY_MAX,parse:function b(a){return{content:[{content:a[1],type:'text'}],target:a[1],type:'link'}}},linkBareUrlDetector:{match:inlineRegex(LINK_AUTOLINK_BARE_URL_R),order:PARSE_PRIORITY_MAX,parse:function b(a){return{content:[{content:a[1],type:'text'}],target:a[1],title:void 0,type:'link'}}},linkMailtoDetector:{match:inlineRegex(LINK_AUTOLINK_MAILTO_R),order:PARSE_PRIORITY_MAX,parse:function d(a){var b=a[1],c=a[1];return AUTOLINK_MAILTO_CHECK_R.test(c)||(c='mailto:'+c),{content:[{content:b.replace('mailto:',''),type:'text'}],target:c,type:'link'}}},list:{match:function f(a,b,c){var d=LIST_LOOKBEHIND_R.exec(c),e=b._list||!b.inline;return d&&e?(a=d[1]+a,LIST_R.exec(a)):null},order:PARSE_PRIORITY_HIGH,parse:function j(a,b,c){var d=a[2],e=d.length>1,f=e?+d:void 0,g=a[0].replace(BLOCK_END_R,'\n').match(LIST_ITEM_R),h=!1,i=g.map(function(a,d){var e=LIST_ITEM_PREFIX_R.exec(a)[0].length,f=new RegExp('^ {1,'+e+'}','gm'),i=a.replace(f,'').replace(LIST_ITEM_PREFIX_R,''),j=d===g.length-1,k=i.indexOf('\n\n')!==-1,l=k||j&&h;h=l;var m=c.inline,n=c._list;c._list=!0;var o;l?(c.inline=!1,o=i.replace(LIST_ITEM_END_R,'\n\n')):(c.inline=!0,o=i.replace(LIST_ITEM_END_R,''));var p=b(o,c);return c.inline=m,c._list=n,p});return{items:i,ordered:e,start:f}},react:function f(a,b,c){var e=a.ordered?'ol':'ul';return d(e,{key:c.key,start:a.start},a.items.map(function(a,e){return d('li',{key:e},b(a,c))}))}},newlineCoalescer:{match:blockRegex(CONSECUTIVE_NEWLINE_R),order:PARSE_PRIORITY_LOW,parse:captureNothing,react:function a(){return'\n'}},paragraph:{match:blockRegex(PARAGRAPH_R),order:PARSE_PRIORITY_LOW,parse:parseCaptureInline,react:function e(a,b,c){return d('p',{key:c.key},b(a.content,c))}},ref:{match:inlineRegex(REFERENCE_IMAGE_OR_LINK),order:PARSE_PRIORITY_MAX,parse:function b(a){return h[a[1]]={target:a[2],title:a[4]},{}},react:renderNothing},refImage:{match:simpleInlineRegex(REFERENCE_IMAGE_R),order:PARSE_PRIORITY_MAX,parse:function b(a){return{alt:a[1]||void 0,ref:a[2]}},react:function e(a,b,c){return d('img',{key:c.key,alt:a.alt,src:sanitizeUrl(h[a.ref].target),title:h[a.ref].title})}},refLink:{match:inlineRegex(REFERENCE_LINK_R),order:PARSE_PRIORITY_MAX,parse:function d(a,b,c){return{content:b(a[1],c),fallbackContent:b(a[0].replace(SQUARE_BRACKETS_R,'\\$1'),c),ref:a[2]}},react:function e(a,b,c){return h[a.ref]?d('a',{key:c.key,href:sanitizeUrl(h[a.ref].target),title:h[a.ref].title},b(a.content,c)):d('span',{key:c.key},b(a.fallbackContent,c))}},table:{match:blockRegex(NP_TABLE_R),order:PARSE_PRIORITY_HIGH,parse:parseTable,react:function f(a,b,e){return d('table',{key:e.key},d('thead',null,d('tr',null,a.header.map(function(c,f){return d('th',{key:f,style:getTableStyle(a,f)},b(c,e))}))),d('tbody',null,a.cells.map(function(c,f){return d('tr',{key:f},c.map(function(f,g){return d('td',{key:g,style:getTableStyle(a,g)},b(f,e))}))})))}},text:{match:anyScopeRegex(TEXT_PLAIN_R),order:PARSE_PRIORITY_MIN,parse:function c(a){return{content:a[0].replace(HTML_CHAR_CODE_R,function(a,c){return b.namedCodesToUnicode[c]?b.namedCodesToUnicode[c]:a})}},react:function b(a){return a.content}},textBolded:{match:simpleInlineRegex(TEXT_BOLD_R),order:PARSE_PRIORITY_MED,parse:function d(a,b,c){return{content:b(a[2],c)}},react:function e(a,b,c){return d('strong',{key:c.key},b(a.content,c))}},textEmphasized:{match:simpleInlineRegex(TEXT_EMPHASIZED_R),order:PARSE_PRIORITY_LOW,parse:function d(a,b,c){return{content:b(a[2],c)}},react:function e(a,b,c){return d('em',{key:c.key},b(a.content,c))}},textEscaped:{match:simpleInlineRegex(TEXT_ESCAPED_R),order:PARSE_PRIORITY_HIGH,parse:function b(a){return{content:a[1],type:'text'}}},textStrikethroughed:{match:simpleInlineRegex(TEXT_STRIKETHROUGHED_R),order:PARSE_PRIORITY_LOW,parse:parseCaptureInline,react:function e(a,b,c){return d('del',{key:c.key},b(a.content,c))}}},j=parserFor(i),k=reactFor(ruleOutput(i)),l=c(a);return g.length&&l.props.children.push(d('footer',{key:'footer'},g.map(function(a){return d('div',{id:a.identifier,key:a.identifier},a.identifier,k(j(a.footnote,{inline:!0})))}))),l}function Markdown(a){var b=a.children,c=a.options,d=_objectWithoutProperties(a,['children','options']);return react__WEBPACK_IMPORTED_MODULE_0___default.a.cloneElement(compiler(b,c),d)}if(true){var PropTypes=__webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");Markdown.propTypes={children:PropTypes.string.isRequired,options:PropTypes.object}}

//# sourceMappingURL=esm.js.map

/***/ }),

/***/ "./node_modules/next/dist/build/webpack/loaders/next-client-pages-loader.js?page=%2Fterms&absolutePagePath=%2FUsers%2Fjofsky%2FDesktop%2Ftorrentql%2Fpackages%2Fnextjs%2Fpages%2Fterms.tsx!./":
/*!*************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-client-pages-loader.js?page=%2Fterms&absolutePagePath=%2FUsers%2Fjofsky%2FDesktop%2Ftorrentql%2Fpackages%2Fnextjs%2Fpages%2Fterms.tsx ***!
  \*************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


    (window.__NEXT_P=window.__NEXT_P||[]).push(["/terms", function() {
      var page = __webpack_require__(/*! ./pages/terms.tsx */ "./pages/terms.tsx")
      if(true) {
        module.hot.accept(/*! ./pages/terms.tsx */ "./pages/terms.tsx", function() {
          if(!next.router.components["/terms"]) return
          var updatedPage = __webpack_require__(/*! ./pages/terms.tsx */ "./pages/terms.tsx")
          next.router.update("/terms", updatedPage.default || updatedPage)
        })
      }
      return { page: page.default || page }
    }]);
  

/***/ }),

/***/ "./node_modules/object-assign/index.js":
/*!***************************************************************************************************!*\
  !*** delegated ./node_modules/object-assign/index.js from dll-reference dll_7aff549c98b978433226 ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! dll-reference dll_7aff549c98b978433226 */ "dll-reference dll_7aff549c98b978433226"))("./node_modules/object-assign/index.js");

/***/ }),

/***/ "./node_modules/prop-types/checkPropTypes.js":
/*!*********************************************************************************************************!*\
  !*** delegated ./node_modules/prop-types/checkPropTypes.js from dll-reference dll_7aff549c98b978433226 ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! dll-reference dll_7aff549c98b978433226 */ "dll-reference dll_7aff549c98b978433226"))("./node_modules/prop-types/checkPropTypes.js");

/***/ }),

/***/ "./node_modules/prop-types/factoryWithTypeCheckers.js":
/*!************************************************************!*\
  !*** ./node_modules/prop-types/factoryWithTypeCheckers.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/prop-types/node_modules/react-is/index.js");
var assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");

var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
var checkPropTypes = __webpack_require__(/*! ./checkPropTypes */ "./node_modules/prop-types/checkPropTypes.js");

var has = Function.call.bind(Object.prototype.hasOwnProperty);
var printWarning = function() {};

if (true) {
  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (true) {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if ( true && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning(
              'You are manually calling a React.PropTypes validation ' +
              'function for the `' + propFullName + '` prop on `' + componentName  + '`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!ReactIs.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (true) {
        if (arguments.length > 1) {
          printWarning(
            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
          );
        } else {
          printWarning('Invalid argument supplied to oneOf, expected an array.');
        }
      }
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);
        if (type === 'symbol') {
          return String(value);
        }
        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
       true ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : undefined;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // falsy value can't be a Symbol
    if (!propValue) {
      return false;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),

/***/ "./node_modules/prop-types/index.js":
/*!******************************************!*\
  !*** ./node_modules/prop-types/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (true) {
  var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/prop-types/node_modules/react-is/index.js");

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(/*! ./factoryWithTypeCheckers */ "./node_modules/prop-types/factoryWithTypeCheckers.js")(ReactIs.isElement, throwOnDirectAccess);
} else {}


/***/ }),

/***/ "./node_modules/prop-types/lib/ReactPropTypesSecret.js":
/*!*******************************************************************************************************************!*\
  !*** delegated ./node_modules/prop-types/lib/ReactPropTypesSecret.js from dll-reference dll_7aff549c98b978433226 ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! dll-reference dll_7aff549c98b978433226 */ "dll-reference dll_7aff549c98b978433226"))("./node_modules/prop-types/lib/ReactPropTypesSecret.js");

/***/ }),

/***/ "./node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.8.2
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (true) {
  (function() {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;

var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace;
var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' ||
  // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE);
}

/**
 * Forked from fbjs/warning:
 * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
 *
 * Only change is we use console.warn instead of console.error,
 * and do nothing when 'console' is not supported.
 * This really simplifies the code.
 * ---
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var lowPriorityWarning = function () {};

{
  var printWarning = function (format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.warn(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  lowPriorityWarning = function (condition, format) {
    if (format === undefined) {
      throw new Error('`lowPriorityWarning(condition, format, ...args)` requires a warning ' + 'message argument');
    }
    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

var lowPriorityWarning$1 = lowPriorityWarning;

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;
    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;
          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;
              default:
                return $$typeof;
            }
        }
      case REACT_LAZY_TYPE:
      case REACT_MEMO_TYPE:
      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
}

// AsyncMode is deprecated along with isAsyncMode
var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;

var hasWarnedAboutDeprecatedIsAsyncMode = false;

// AsyncMode should be deprecated
function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true;
      lowPriorityWarning$1(false, 'The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
    }
  }
  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

exports.typeOf = typeOf;
exports.AsyncMode = AsyncMode;
exports.ConcurrentMode = ConcurrentMode;
exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.isValidElementType = isValidElementType;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
  })();
}


/***/ }),

/***/ "./node_modules/prop-types/node_modules/react-is/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/prop-types/node_modules/react-is/index.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-is.development.js */ "./node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js");
}


/***/ }),

/***/ "./node_modules/react/index.js":
/*!*******************************************************************************************!*\
  !*** delegated ./node_modules/react/index.js from dll-reference dll_7aff549c98b978433226 ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! dll-reference dll_7aff549c98b978433226 */ "dll-reference dll_7aff549c98b978433226"))("./node_modules/react/index.js");

/***/ }),

/***/ "./node_modules/unquote/index.js":
/*!***************************************!*\
  !*** ./node_modules/unquote/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var reg = /[\'\"]/

module.exports = function unquote(str) {
  if (!str) {
    return ''
  }
  if (reg.test(str.charAt(0))) {
    str = str.substr(1)
  }
  if (reg.test(str.charAt(str.length - 1))) {
    str = str.substr(0, str.length - 1)
  }
  return str
}


/***/ }),

/***/ "./pages/terms.tsx":
/*!*************************!*\
  !*** ./pages/terms.tsx ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! markdown-to-jsx */ "./node_modules/markdown-to-jsx/dist/esm.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);



var termsAndConditions = function termsAndConditions() {
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "# Terms and Conditions"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("hr", null), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "## Traffic Usage"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "All account plans come with a predetermined amount of traffic allowance. We monitor all accounts and may suspend services in case of overusage."), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "## Server Abuse"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "Any attempt to undermine or cause harm to a server or customer of torrentql is strictly prohibited. As our customer you are responsible for all your accounts. Should you violate the Terms of Services outlined within, your account will be cancelled without the option of refund."), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "## Refusal of Service"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "We reserve the right to refuse, cancel or suspend service, at our sole discretion."), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "All sub-networks, distributive hosting sites and dedicated servers of torrentql must adhere to the above policies, with the exception of system resources in respect to dedicated servers."), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "## Billing"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "By the Account Activation, torrentql shall either:"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "Debit the client\u2019s credit card and give an allotted virtual credit (when such information has been provided by the client); or recieve payment"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "#### Torrentql shall be entitled to immediately terminate this agreement for clients failure to make timely payments or if invalid payment methods are provided. You will be provided with an invoice on a monthly basis. All credit cards are billed automatically on a monthly basis. It is the client\u2019s responsibility to ensure that they have sufficient credit to cover this transaction. In the event that there is insufficient credit, we will send an e-mail notification, at which point we will need to be provided with another credit card account number within 24 hours. If we do not receive a response within 24 hours, the account, and all accounts under that account plan, will be suspended, and no refunds shall be given."), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "(3) Filing a dispute/chargeback for any paid sum will void any rights to hold a service with torrentql - All active services will be terminated without the option of getting a refund."), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "## Service Fees"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "Certain services carry a setup fee charged by torrentql to client, which must be paid by client in order to have use of said services. If client terminates this agreement, client shall be responsible for any and all outstanding fees owed to torrentql and agrees to pay any and all fees incurred by client. Because the services are provided on a monthly basis, the client will be responsible for service fees incurred each month, regardless of when client provides notice of termination. Thus, for example, if the client provides notice of termination on the 15th day of a particular month, the client will be responsible for service fees for the entire month, and such fees will not be pro-rated or refunded."), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "## Money back guarantee & refund policy"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "You have 14 days from the date of delivery to request refund. After that period we do not generally refund cancelled contracts. For example, if your contract is quarterly and you request a refund after two months, no refunds will be admitted. No refunds are issued for setup charges, add-on charges, domain-registrations, add-on purchases, SSL certificates or overage charges. Refunds are limited to one (1) per client account. In case of AUP violations, any and all refunds are forfeit."), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "## Account Deactivations"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "Any account deactivated due to non-payment will require a reactivation fee of \u20AC10.00 prior to reactivation. Excepted from this is \u2018Premium Seedboxes\u2019 , \u2018Mini seedboxes\u2019 and \u2019Storage slots\u2019."), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "## Cancellation Refunds"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "We do not refund partial monthly fees to accounts. We require 3 days notice for a cancellation for \u2018Dedicated Seedboxes\u2019 and \u2018Dedicated Servers\u2019."), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "## Limitation of Liability"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "torrentql shall not be responsible for any claimed damages, including incidental and consequential damages, which may arise from seedbox.ios servers going off-line or being unavailable for any reason whatsoever. Furthermore, torrentql shall not be responsible for any claimed damages, including incidental or consequential damages, resulting from the corruption or deletion of any web site from one of torrentql \u2018 servers. All damages shall be limited to the immediate termination of service."), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "## Violations"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "Violations of these Acceptable Use Policies should be referred to abuse [at] torrentql. All complaints will be investigated promptly. Failure to follow any term or condition will be grounds for immediate account deactivation."), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "## Disclaimer"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "torrentql cannot be held liable for system down time, crashes or data loss. We cannot be held liable for any predicated estimate of profits which a client would have gained if their site was functioning. Certain services provided by torrentql are resold. Thus, certain equipment, routing, software and programming used by torrentql are not directly owned or written by torrentql. Moreover, torrentql holds no responsibility for the use of our clients\u2019 accounts. Failure to comply with any terms or conditions will result in the automatic deactivation of the account in question. We reserve the right to remove any account, without advance notice for any reason without restitution, as torrentql sees fit."), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "## Account Activation"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "By activating your account with torrentql, you agree to the above policies and disclaimer. Upon requesting activation of an account, you are required to accept these policies, guidelines and disclaimer, and a copy of your acceptance is forwarded along with your activation request to be maintained with your account information."), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "NOTICE: If you sign up for an account and fail to comply with these terms, no refunds will be given. We will, however, advise you by e-mail or phone prior to taking any action to provide you with an opportunity to correct the problem."), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "## Server Uptime Guarantee"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "Although torrentql has an excellent record for reliability, we do not offer an uptime guarantee. However, our network and servers are monitored continuously, and are rarely down except for scheduled maintenance and hardware and software upgrades."), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "torrentql reserves the right to amend any or all of the above policies, guidelines and disclaimer without notification. We also retain the right to increase any pricing and make changes to our account plans without notification."), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "## Acceptable Use Policy"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "As a provider of web site hosting and other Internet-related services, torrentql offers its customer (also known as \u201CSubscribers\u201D) and their customers and users the means to acquire and disseminate a wealth of public, private, commercial and non-commercial information. torrentql respects that the Internet provides a forum for free and open discussion and dissemination of information. However, when there are competing interests at issue, torrentql reserves the right to take certain preventive or corrective actions. In order to protect these competing interests, torrentql has developed an Acceptable Use Policy (\u201CAUP\u201D), which supplements and explains certain terms of each customer\u2019s respective service agreement, and is intended as a guide to the customer\u2019s rights and obligations when using torrentql\u2019 services. This AUP will be revised from time to time."), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "One important aspect of the Internet is that no one party owns or controls it. This fact accounts for much of the Internet\u2019s openness and value, but it also places a high premium on the judgment and responsibility of those who use it, both in the information they acquire and in the information they disseminate to others. When subscribers obtain information through the Internet, they must keep in mind that torrentql cannot monitor, verify, warrant or vouch for the accuracy and quality of the information they acquire. For this reason, the subscriber must exercise his or her best judgment in relying on information obtained from the Internet, and also should be aware that some material posted to the Internet may be sexually explicit or otherwise offensive. Because torrentql cannot monitor or censor the Internet, and will not attempt to do so, torrentql cannot accept any responsibility for injury to its subscribers resulting from inaccurate, unsuitable, offensive or illegal Internet communications."), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "When subscribers disseminate information from the Internet, they must keep in mind that torrentql does not review, edit, censor or take responsibility for any information its subscribers may create. When users place information on the Internet, they have the same liability as other authors for copyright infringement, defamation and other harmful speech. Also, because the information created is carried over torrentql\u2019 network and may reach a large number of people, including both subscribers and non-subscribers of torrentql, subscribers\u2019 postings to the Internet may affect other subscribers and may affect torrentql\u2019 goodwill, business, reputation or operations. For these reasons, subscribers violate torrentql policy and the Service Agreement when they, their customers, affiliates or subsidiaries engage in the following prohibited activities:"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "## Spamming:"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "torrentql has a zero tolerancy policy against spamming, in case of torrentql's service being used for sending out spam, will result in termination of the service. Sending unsolicited bulk and/or commercial information over the Internet. It is not only harmful because of its negative impact on consumer attitudes toward torrentql, but also because it can overload torrentql\u2019 network and disrupt service to torrentql\u2019 subscribers. Also, maintaining an open SMTP relay is prohibited. When a complaint is received, torrentql will investigate and shutdown the account that is SPAMing. A $250 charge for violating this policy will be charged to the person initiating the SPAM. Furthermore torrentql reserves the right to prosecute for this violation. A $1.00 charge will be assessed PER EMAIL sent should torrentql choose to pursue and prosecute."), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "## Obscene Speech or Materials:"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "Using torrentql\u2019 network to advertise, transmit, store, post, display, or otherwise make available child pornography or obscene speech or material is prohibited. torrentql is required by law to notify law enforcement agencies when it becomes aware of the presence of child pornography on or being transmitted through its network."), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "## Defamatory or Abusive Language:"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "Using torrentql\u2019 network as a means to transmit or post negative, defamatory, harassing, abusive or threatening language."), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "## Forging of Headers:"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "Forging or misrepresenting message headers, whether in whole or in part, to mask the originator of the message."), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "## Filehosts/Streaming sites:"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "Hosting a public filesharing site or streaming site which negatively hurt the reputation of torrentql"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "## Illegal or Unauthorized Access to Other Computers or Networks:"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "Accessing, illegally or without authorization, computers, accounts or networks belonging to another party, or attempting to penetrate security measures of another individual\u2019s system (often known as \u201Chacking\u201D). Also, any activity that may be used as a precursor to an attempted system penetration (i.e., port scan, stealth scan or other information-gathering activity)."), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "## Distribution of Internet Viruses, Worms, Trojan Horses or Other Destructive Activities:"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "Distributing information regarding the creation of and sending Internet viruses, worms, Trojan horses, pinging, flooding, mail bombing or denial of service attacks. Also, activities that disrupt the use of or interfere with the ability of others to effectively use the network or any connected network, system, service or equipment."), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "## Facilitation a Violation of this AUP:"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "Advertising, transmitting or otherwise making available any software, program, product or service that is designed to violate this AUP, which includes the facilitation of the means to spam, initiation of pinging, flooding, mail bombing, denial of service attacks and piracy of software."), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "## Other Illegal Activities:"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "Engaging in activities that are determined to be illegal, including, but not limited to, advertising, transmitting or otherwise making available ponzi schemes, pyramid schemes, fraudulently charging credit cards and pirating software."), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "## Other Activities:"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "Engaging in activities, whether lawful or unlawful, that torrentql determines to be harmful to its subscribers, operations, reputation, goodwill or customer relations."), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "## Public Trackers:"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "Public Trackers are allowed on our seedboxes."), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "As we have pointed out, the responsibility for avoiding harmful activities just described rests primarily with the subscriber. torrentql will not, as an ordinary practice, monitor the communications of its subscribers to ensure that the comply with torrentql\u2019 policy or applicable law. However, when torrentql becomes aware of harmful activities, it may take any action to stop the harmful activity, including, but not limited to, removal of information, shutting down a web site, implementing screening software designed to block offending transmissions, denying access to the Internet, or any other action deemed appropriate by torrentql."), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "torrentql is also aware that many of its subscribers are themselves providers of Internet services, and that information reaching torrentql\u2019 facilities from those subscribers may have originated from a customer of the subscriber or from another third party. torrentql does not require its subscribers who offer Internet services to monitor or censor transmissions or web sites created by customers of its subscribers. torrentql reserves the right to directly take action against a customer of its subscribers. Also, torrentql may take action against the torrentql\u2019 subscriber because of activities of a customer of the subscriber, even though the action may affect other customers of the subscriber. Similarly, torrentql anticipates that subscribers who offer Internet services will cooperate with torrentql in any corrective or preventive action that torrentql deems necessary. Failure to cooperate with such corrective or preventive measures is a violation of torrentql policy."), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "torrentql will not intentionally monitor private electronic mail messages sent or receive by its subscribers, unless required to do so by law, governmental authority or when public safety is at stake. torrentql may, however, monitor its service electronically to determine that its facilities are operating satisfactorily. Also, torrentql may disclose information, including, but not limited to, information concerning a subscriber, a transmission made using our network, or a web site, in order to comply with a court order, subpoena, summons, discovery request, warrant, statute, regulation or governmental request. torrentql assumes not obligation to inform the subscriber that subscriber information has been provided and, in some cases, may be prohibited by law from giving such notice. Finally, torrentql may disclose subscriber information or information transmitted over its network where necessary to protect torrentql and others from harm, or where such disclosure is necessary to the proper operation of the system. However, torrentql will never sell information to other services or outside companies."), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "torrentql expects that its subscribers who provide Internet services to others will comply fully with all applicable laws concerning the privacy of online communications. A subscriber\u2019s failure to comply with those laws will violate torrentql policy. Finally, torrentql wishes to emphasize that, in signing the Service Agreement, subscribers indemnify torrentql for any violation of the Service Agreement, law or torrentql policy resulting in loss to torrentql or the bringing of any claim against torrentql by any third party. This means that, if torrentql is sued because of a subscribers or customer of a subscriber\u2019s activity, the subscriber will be responsible for payment of any damages awarded against torrentql, plus costs and reasonable attorney\u2019s fees."), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(markdown_to_jsx__WEBPACK_IMPORTED_MODULE_0__["default"], null, "We hope this AUP is helpful in clarifying the obligations of Internet users, including torrentql and its subscribers, as responsible members of the Internet. Any complaints about a subscriber\u2019s violation of this AUP should be sent to mail [@] torrentql."));
};

/* harmony default export */ __webpack_exports__["default"] = (termsAndConditions);

/***/ }),

/***/ 2:
/*!*****************************************************************************************************************************************************!*\
  !*** multi next-client-pages-loader?page=%2Fterms&absolutePagePath=%2FUsers%2Fjofsky%2FDesktop%2Ftorrentql%2Fpackages%2Fnextjs%2Fpages%2Fterms.tsx ***!
  \*****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! next-client-pages-loader?page=%2Fterms&absolutePagePath=%2FUsers%2Fjofsky%2FDesktop%2Ftorrentql%2Fpackages%2Fnextjs%2Fpages%2Fterms.tsx! */"./node_modules/next/dist/build/webpack/loaders/next-client-pages-loader.js?page=%2Fterms&absolutePagePath=%2FUsers%2Fjofsky%2FDesktop%2Ftorrentql%2Fpackages%2Fnextjs%2Fpages%2Fterms.tsx!./");


/***/ }),

/***/ "dll-reference dll_7aff549c98b978433226":
/*!*******************************************!*\
  !*** external "dll_7aff549c98b978433226" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = dll_7aff549c98b978433226;

/***/ })

},[[2,"static/runtime/webpack.js"]]]);
//# sourceMappingURL=terms.js.map