(function(a){if(typeof exports=="object"&&typeof module=="object"){a(require("../../lib/codemirror"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror"],a)}else{a(CodeMirror)}}})(function(a){a.defineMode("dtd",function(e){var d=e.indentUnit,g;function c(j,k){g=k;return j}function i(m,k){var j=m.next();if(j=="<"&&m.eat("!")){if(m.eatWhile(/[\-]/)){k.tokenize=b;return b(m,k)}else{if(m.eatWhile(/[\w]/)){return c("keyword","doindent")}}}else{if(j=="<"&&m.eat("?")){k.tokenize=f("meta","?>");return c("meta",j)}else{if(j=="#"&&m.eatWhile(/[\w]/)){return c("atom","tag")}else{if(j=="|"){return c("keyword","seperator")}else{if(j.match(/[\(\)\[\]\-\.,\+\?>]/)){return c(null,j)}else{if(j.match(/[\[\]]/)){return c("rule",j)}else{if(j=='"'||j=="'"){k.tokenize=h(j);return k.tokenize(m,k)}else{if(m.eatWhile(/[a-zA-Z\?\+\d]/)){var l=m.current();if(l.substr(l.length-1,l.length).match(/\?|\+/)!==null){m.backUp(1)}return c("tag","tag")}else{if(j=="%"||j=="*"){return c("number","number")}else{m.eatWhile(/[\w\\\-_%.{,]/);return c(null,null)}}}}}}}}}}function b(m,l){var k=0,j;while((j=m.next())!=null){if(k>=2&&j==">"){l.tokenize=i;break}k=(j=="-")?k+1:0}return c("comment","comment")}function h(j){return function(n,l){var m=false,k;while((k=n.next())!=null){if(k==j&&!m){l.tokenize=i;break}m=!m&&k=="\\"}return c("string","tag")}}function f(k,j){return function(m,l){while(!m.eol()){if(m.match(j)){l.tokenize=i;break}m.next()}return k}}return{startState:function(j){return{tokenize:i,baseIndent:j||0,stack:[]}},token:function(m,l){if(m.eatSpace()){return null}var k=l.tokenize(m,l);var j=l.stack[l.stack.length-1];if(m.current()=="["||g==="doindent"||g=="["){l.stack.push("rule")}else{if(g==="endtag"){l.stack[l.stack.length-1]="endtag"}else{if(m.current()=="]"||g=="]"||(g==">"&&j=="rule")){l.stack.pop()}else{if(g=="["){l.stack.push("[")}}}}return k},indent:function(k,j){var l=k.stack.length;if(j.match(/\]\s+|\]/)){l=l-1}else{if(j.substr(j.length-1,j.length)===">"){if(j.substr(0,1)==="<"){l}else{if(g=="doindent"&&j.length>1){l}else{if(g=="doindent"){l--}else{if(g==">"&&j.length>1){l}else{if(g=="tag"&&j!==">"){l}else{if(g=="tag"&&k.stack[k.stack.length-1]=="rule"){l--}else{if(g=="tag"){l++}else{if(j===">"&&k.stack[k.stack.length-1]=="rule"&&g===">"){l--}else{if(j===">"&&k.stack[k.stack.length-1]=="rule"){l}else{if(j.substr(0,1)!=="<"&&j.substr(0,1)===">"){l=l-1}else{if(j===">"){l}else{l=l-1}}}}}}}}}}}if(g==null||g=="]"){l--}}}return k.baseIndent+l*d},electricChars:"]>"}});a.defineMIME("application/xml-dtd","dtd")});