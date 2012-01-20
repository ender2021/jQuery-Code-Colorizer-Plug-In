(function($) {
    $.colorerUtility = {};

    $.colorerUtility.Options = {
        target: 'target',
        indentDepth: 10,
        width: 450,
        classes: {
            line: 'colorer-line',
            altLine: 'colorer-altLine',
            cssAttr: 'colorer-cssAttr',
            cssValue: 'colorer-cssValue',
            attribute: 'colorer-attribute',
            equal: 'colorer-equal',
            quote: 'colorer-quote',
            tag: 'colorer-tag',
            bracket: 'colorer-bracket',
            cssIdentifier: 'colorer-cssIdentifier',
            lineCount: 'colorer-lineCount',
            separator: 'colorer-separator',
            indent: 'colorer-indent',
            comment: 'colorer-comment',
            jsKeyWord: 'colorer-jsKeyWord',
            jsString: 'colorer-jsString'
        }
    };

    $.fn.colorMyCode = function(language, options) {
        $.extend($.colorerUtility.Options, options || {});
        $('#' + $.colorerUtility.Options.target).addClass('colorer-target');
        $(this).each(function() {
            var code = $.colorerUtility.initialSetup($(this).html());
            if (language === 'html') {
                code = $.colorerUtility.colorizeHtml(code);
            } else if (language === 'css') {
                code = $.colorerUtility.colorizeCss(code);
            } else if (language === 'javascript') {
                code = $.colorerUtility.colorizeJavascript(code);
            }
            $.colorerUtility.containResult(code);
        });
        return this;
    };

    //this function retrieves the markup and applies the custom indent tags
    $.colorerUtility.initialSetup = function(contents) {
        var pattern = /<\!--\[code\]([\s\S]+)\[code\]-->/;
        var result = contents.match(pattern);
        var toReturn = result[0].replace(pattern, '$1');
        return toReturn.replace(/\{{3}line-([0-9+])\}{3}([\s\S]+?)\{{3}\/line-\1\}{3}/g, '{{{' + $.colorerUtility.Options.classes.indent + '$1}}}$2{{{/' + $.colorerUtility.Options.classes.indent + '$1}}}');
    };

    $.colorerUtility.colorizeJavascript = function(js) {
        var toReturn = js;

        toReturn = $.colorerUtility.tagComments(toReturn, '/*', '*/');

        toReturn = toReturn.replace(/(\W)break(\W)/gi, '$1{{{' + $.colorerUtility.Options.classes.jsKeyWord + '}}}break{{{\/' + $.colorerUtility.Options.classes.jsKeyWord + '}}}$2');
        toReturn = toReturn.replace(/(\W)case(\W)/gi, '$1{{{' + $.colorerUtility.Options.classes.jsKeyWord + '}}}case{{{\/' + $.colorerUtility.Options.classes.jsKeyWord + '}}}$2');
        toReturn = toReturn.replace(/(\W)catch(\W)/gi, '$1{{{' + $.colorerUtility.Options.classes.jsKeyWord + '}}}try{{{\/' + $.colorerUtility.Options.classes.jsKeyWord + '}}}$2');
        toReturn = toReturn.replace(/(\W)continue(\W)/gi, '$1{{{' + $.colorerUtility.Options.classes.jsKeyWord + '}}}continue{{{\/' + $.colorerUtility.Options.classes.jsKeyWord + '}}}$2');
        toReturn = toReturn.replace(/(\W)debugger(\W)/gi, '$1{{{' + $.colorerUtility.Options.classes.jsKeyWord + '}}}debugger{{{\/' + $.colorerUtility.Options.classes.jsKeyWord + '}}}$2');
        toReturn = toReturn.replace(/(\W)default(\W)/gi, '$1{{{' + $.colorerUtility.Options.classes.jsKeyWord + '}}}default{{{\/' + $.colorerUtility.Options.classes.jsKeyWord + '}}}$2');
        toReturn = toReturn.replace(/(\W)delete(\W)/gi, '$1{{{' + $.colorerUtility.Options.classes.jsKeyWord + '}}}delete{{{\/' + $.colorerUtility.Options.classes.jsKeyWord + '}}}$2');
        toReturn = toReturn.replace(/(\W)do(\W)/gi, '$1{{{' + $.colorerUtility.Options.classes.jsKeyWord + '}}}do{{{\/' + $.colorerUtility.Options.classes.jsKeyWord + '}}}$2');
        toReturn = toReturn.replace(/(\W)else(\W)/gi, '$1{{{' + $.colorerUtility.Options.classes.jsKeyWord + '}}}else{{{\/' + $.colorerUtility.Options.classes.jsKeyWord + '}}}$2');
        toReturn = toReturn.replace(/(\W)false(\W)/gi, '$1{{{' + $.colorerUtility.Options.classes.jsKeyWord + '}}}false{{{\/' + $.colorerUtility.Options.classes.jsKeyWord + '}}}$2');
        toReturn = toReturn.replace(/(\W)final(\W)/gi, '$1{{{' + $.colorerUtility.Options.classes.jsKeyWord + '}}}final{{{\/' + $.colorerUtility.Options.classes.jsKeyWord + '}}}$2');
        toReturn = toReturn.replace(/(\W)finally(\W)/gi, '$1{{{' + $.colorerUtility.Options.classes.jsKeyWord + '}}}finally{{{\/' + $.colorerUtility.Options.classes.jsKeyWord + '}}}$2');
        toReturn = toReturn.replace(/(\W)for(\W)/gi, '$1{{{' + $.colorerUtility.Options.classes.jsKeyWord + '}}}for{{{\/' + $.colorerUtility.Options.classes.jsKeyWord + '}}}$2');
        toReturn = toReturn.replace(/(\W)function(\W)/gi, '$1{{{' + $.colorerUtility.Options.classes.jsKeyWord + '}}}function{{{\/' + $.colorerUtility.Options.classes.jsKeyWord + '}}}$2');
        toReturn = toReturn.replace(/(\W)if(\W)/gi, '$1{{{' + $.colorerUtility.Options.classes.jsKeyWord + '}}}if{{{\/' + $.colorerUtility.Options.classes.jsKeyWord + '}}}$2');
        toReturn = toReturn.replace(/(\W)in(\W)/gi, '$1{{{' + $.colorerUtility.Options.classes.jsKeyWord + '}}}in{{{\/' + $.colorerUtility.Options.classes.jsKeyWord + '}}}$2');
        toReturn = toReturn.replace(/(\W)int(\W)/gi, '$1{{{' + $.colorerUtility.Options.classes.jsKeyWord + '}}}int{{{\/' + $.colorerUtility.Options.classes.jsKeyWord + '}}}$2');
        toReturn = toReturn.replace(/(\W)instanceof(\W)/gi, '$1{{{' + $.colorerUtility.Options.classes.jsKeyWord + '}}}instanceof{{{\/' + $.colorerUtility.Options.classes.jsKeyWord + '}}}$2');
        toReturn = toReturn.replace(/(\W)new(\W)/gi, '$1{{{' + $.colorerUtility.Options.classes.jsKeyWord + '}}}new{{{\/' + $.colorerUtility.Options.classes.jsKeyWord + '}}}$2');
        toReturn = toReturn.replace(/(\W)null(\W)/gi, '$1{{{' + $.colorerUtility.Options.classes.jsKeyWord + '}}}null{{{\/' + $.colorerUtility.Options.classes.jsKeyWord + '}}}$2');
        toReturn = toReturn.replace(/(\W)return(\W)/gi, '$1{{{' + $.colorerUtility.Options.classes.jsKeyWord + '}}}return{{{\/' + $.colorerUtility.Options.classes.jsKeyWord + '}}}$2');
        toReturn = toReturn.replace(/(\W)switch(\W)/gi, '$1{{{' + $.colorerUtility.Options.classes.jsKeyWord + '}}}switch{{{\/' + $.colorerUtility.Options.classes.jsKeyWord + '}}}$2');
        toReturn = toReturn.replace(/(\W)this(\W)/gi, '$1{{{' + $.colorerUtility.Options.classes.jsKeyWord + '}}}this{{{\/' + $.colorerUtility.Options.classes.jsKeyWord + '}}}$2');
        toReturn = toReturn.replace(/(\W)throw(\W)/gi, '$1{{{' + $.colorerUtility.Options.classes.jsKeyWord + '}}}throw{{{\/' + $.colorerUtility.Options.classes.jsKeyWord + '}}}$2');
        toReturn = toReturn.replace(/(\W)true(\W)/gi, '$1{{{' + $.colorerUtility.Options.classes.jsKeyWord + '}}}true{{{\/' + $.colorerUtility.Options.classes.jsKeyWord + '}}}$2');
        toReturn = toReturn.replace(/(\W)typeof(\W)/gi, '$1{{{' + $.colorerUtility.Options.classes.jsKeyWord + '}}}typeof{{{\/' + $.colorerUtility.Options.classes.jsKeyWord + '}}}$2');
        toReturn = toReturn.replace(/(\W)var(\W)/gi, '$1{{{' + $.colorerUtility.Options.classes.jsKeyWord + '}}}var{{{\/' + $.colorerUtility.Options.classes.jsKeyWord + '}}}$2');
        toReturn = toReturn.replace(/(\W)void(\W)/gi, '$1{{{' + $.colorerUtility.Options.classes.jsKeyWord + '}}}void{{{\/' + $.colorerUtility.Options.classes.jsKeyWord + '}}}$2');
        toReturn = toReturn.replace(/(\W)while(\W)/gi, '$1{{{' + $.colorerUtility.Options.classes.jsKeyWord + '}}}while{{{\/' + $.colorerUtility.Options.classes.jsKeyWord + '}}}$2');
        toReturn = toReturn.replace(/(\W)with(\W)/gi, '$1{{{' + $.colorerUtility.Options.classes.jsKeyWord + '}}}with{{{\/' + $.colorerUtility.Options.classes.jsKeyWord + '}}}$2');

        //mark single-quote strings
        var sStringPatternGlobal = /'(.+?)'/g;
        var sStringPatternSingle = /'(.+?)'/;
        var stringCount;
        var currentString;

        var singleStrings = toReturn.match(sStringPatternGlobal);
        if (singleStrings) {
            stringCount = 0;
            while (stringCount < singleStrings.length) {
                singleStrings[stringCount] = singleStrings[stringCount].replace(sStringPatternGlobal, '$1');
                singleStrings[stringCount] = singleStrings[stringCount].replace(/"/g, '&quot;');
                singleStrings[stringCount] = singleStrings[stringCount].replace(new RegExp('\{{3}' + $.colorerUtility.Options.classes.jsKeyWord + '\}{3}(\w+?)\{{3}\/' + $.colorerUtility.Options.classes.jsKeyWord + '\}{3}', 'g'), '$1');
                stringCount++;
            }
            currentString = 0;
            while (currentString < singleStrings.length) {
                toReturn = toReturn.replace(sStringPatternSingle, '{{{' + $.colorerUtility.Options.classes.jsString + '}}}&#39;' + singleStrings[currentString] + '&#39;{{{/' + $.colorerUtility.Options.classes.jsString + '}}}');
                currentString++;
            }
        }
        //mark double-quote strings
        var dStringPatternGlobal = /"(.+?)"/g;
        var dStringPatternSingle = /"(.+?)"/;

        var doubleStrings = toReturn.match(dStringPatternGlobal);
        if (doubleStrings) {
            stringCount = 0;
            while (stringCount < doubleStrings.length) {
                doubleStrings[stringCount] = doubleStrings[stringCount].replace(dStringPatternGlobal, '$1');
                doubleStrings[stringCount] = doubleStrings[stringCount].replace(new RegExp('\\{{3}(' + $.colorerUtility.Options.classes.jsKeyWord + '|' + $.colorerUtility.Options.classes.jsString + ')\\}{3}(\\w+?)\\{{3}\/(' + $.colorerUtility.Options.classes.jsKeyWord + '|' + $.colorerUtility.Options.classes.jsString + ')\\}{3}', 'g'), '$2');
                stringCount++;
            }
            currentString = 0;
            while (currentString < doubleStrings.length) {
                toReturn = toReturn.replace(dStringPatternSingle, '{{{' + $.colorerUtility.Options.classes.jsString + '}}}&quot;' + doubleStrings[currentString] + '&quot;{{{/' + $.colorerUtility.Options.classes.jsString + '}}}');
                currentString++;
            }
        }
        //remove coloring from comments
        var commentsPatternGlobal = new RegExp('\\{{3}' + $.colorerUtility.Options.classes.comment + '\\}{3}([\\s\\S]+?)\\{{3}\/' + $.colorerUtility.Options.classes.comment + '\\}{3}', 'g');
        var commentsPatternSingle = new RegExp('\\{{3}' + $.colorerUtility.Options.classes.comment + '\\}{3}([\\s\\S]+?)\\{{3}\/' + $.colorerUtility.Options.classes.comment + '\\}{3}');

        var comments = toReturn.match(commentsPatternGlobal);
        if (comments) {
            var commentCount = 0;
            while (commentCount < comments.length) {
                comments[commentCount] = comments[commentCount].replace(commentsPatternGlobal, '$1');
                comments[commentCount] = comments[commentCount].replace(new RegExp('\\{{3}(' + $.colorerUtility.Options.classes.jsString + '|' + $.colorerUtility.Options.classes.jsKeyWord + ')\\}{3}', 'g'), '');
                comments[commentCount] = comments[commentCount].replace(new RegExp('\\{{3}\/(' + $.colorerUtility.Options.classes.jsString + '|' + $.colorerUtility.Options.classes.jsKeyWord + ')\\}{3}', 'g'), '');
                commentCount++;
            }
            var currentComment = 0;
            while (currentComment < comments.length) {
                toReturn = toReturn.replace(commentsPatternSingle, '<' + $.colorerUtility.Options.classes.comment + '>' + comments[currentComment] + '</' + $.colorerUtility.Options.classes.comment + '>');
                currentComment++;
            }
            toReturn = toReturn.replace(new RegExp('<' + $.colorerUtility.Options.classes.comment + '>([\\s\\S]+?)<\/' + $.colorerUtility.Options.classes.comment + '>', 'g'), '{{{' + $.colorerUtility.Options.classes.comment + '}}}$1{{{/' + $.colorerUtility.Options.classes.comment + '}}}');
        }
        return toReturn;
    };

    $.colorerUtility.colorizeCss = function(css) {
        var toReturn = css;
        var cssIdentifierPatternGlobal = /(\}{3}|\s)([a-zA-Z0-9\.#-]+?)([a-zA-Z0-9,\:\s\.#-]+?)(\{)/g;
        var cssAttrValuePairGlobal = /(\}{3}|\{|;|\s)([a-zA-Z-]+?)\:(\s?)([^;}]+)([\};\s])/g;
        var colonRemoverPattern = /\{{3}colorer-cssIdentifier\}{3}(.+?)\:(.+?)\{{3}\/colorer-cssIdentifier\}{3}/;

        toReturn = toReturn.replace(cssIdentifierPatternGlobal, '$1{{{' + $.colorerUtility.Options.classes.cssIdentifier + '}}}$2$3{{{/' + $.colorerUtility.Options.classes.cssIdentifier + '}}}$4');
        while (colonRemoverPattern.test(toReturn)) {
            toReturn = toReturn.replace(colonRemoverPattern, '{{{colorer-cssIdentifier}}}$1&#58;$2{{{/colorer-cssIdentifier}}}');
        }
        while (cssAttrValuePairGlobal.test(toReturn)) {
            toReturn = toReturn.replace(cssAttrValuePairGlobal, '$1{{{' + $.colorerUtility.Options.classes.cssAttr + '}}}$2{{{/' + $.colorerUtility.Options.classes.cssAttr + '}}}:$3{{{' + $.colorerUtility.Options.classes.cssValue + '}}}$4{{{/' + $.colorerUtility.Options.classes.cssValue + '}}}$5');
        }
        return toReturn;
    };

    $.colorerUtility.colorizeHtml = function(html) {
        var toReturn = html;

        var jsTagsPatternGlobal = /<script\s([^>]*?)type\="text\/javascript"([^>]*?)>([\s\S]+?)<\/script>/g;
        var jsTagsPatternSingle = /<script\s([^>]*?)type\="text\/javascript"([^>]*?)>([\s\S]+?)<\/script>/;

        var jsTags = toReturn.match(jsTagsPatternGlobal);
        if (jsTags) {
            jsCount = 0;
            while (jsCount < jsTags.length) {
                jsTags[jsCount] = jsTags[jsCount].replace(jsTagsPatternGlobal, '$3');
                jsTags[jsCount] = $.colorerUtility.colorizeJavascript(jsTags[jsCount]);
                jsCount++;
            }
            var currentJsTag = 0;
            while (currentJsTag < jsTags.length) {
                toReturn = toReturn.replace(jsTagsPatternSingle, '{{{' + $.colorerUtility.Options.classes.bracket + '}}}&lt;{{{/' + $.colorerUtility.Options.classes.bracket + '}}}{{{' + $.colorerUtility.Options.classes.tag + '}}}script{{{/' + $.colorerUtility.Options.classes.tag + '}}} $1type="text/javascript"$2{{{' + $.colorerUtility.Options.classes.bracket + '}}}&gt;{{{/' + $.colorerUtility.Options.classes.bracket + '}}}' + jsTags[currentJsTag] + '</script>');
                currentJsTag++;
            }
        }

        toReturn = $.colorerUtility.tagComments(toReturn, '&lt;&#33;--', '--&gt;');

        //define patterns for marking style attributes
        var styleAttrPatternGlobal = /style\="([^"]+)"/g;
        var styleAttrPatternSingle = /style\="([^"]+)"/;
        var attributesPattern = /("|;)([a-zA-Z-\s]+?)\:([^;"]+?)(;|")/;
        //create an array of all the style attributes
        var styleAtts = toReturn.match(styleAttrPatternGlobal);
        //tag the attribute/value pairs in all the style attributes
        if (styleAtts) {
            var styleCount = 0;
            while (styleCount < styleAtts.length) {
                while (attributesPattern.test(styleAtts[styleCount])) {
                    styleAtts[styleCount] = styleAtts[styleCount].match(/"[^"]+?"/)[0];
                    styleAtts[styleCount] = styleAtts[styleCount].replace(attributesPattern, '$1{{{' + $.colorerUtility.Options.classes.cssAttr + '}}}$2{{{/' + $.colorerUtility.Options.classes.cssAttr + '}}}:{{{' + $.colorerUtility.Options.classes.cssValue + '}}}$3{{{/' + $.colorerUtility.Options.classes.cssValue + '}}}$4');
                }
                styleAtts[styleCount] = styleAtts[styleCount].replace(/"/g, '');
                styleCount++;
            }
            //replace style attributes with custom tagged attributes
            var currentAttr = 0;
            while (styleAttrPatternSingle.test(toReturn)) {
                toReturn = toReturn.replace(styleAttrPatternSingle, '{{{' + $.colorerUtility.Options.classes.attribute + '}}}style{{{/' + $.colorerUtility.Options.classes.attribute + '}}}{{{' + $.colorerUtility.Options.classes.equal + '}}}={{{/' + $.colorerUtility.Options.classes.equal + '}}}{{{' + $.colorerUtility.Options.classes.quote + '}}}"{{{/' + $.colorerUtility.Options.classes.quote + '}}}' + styleAtts[currentAttr] + '{{{' + $.colorerUtility.Options.classes.quote + '}}}"{{{/' + $.colorerUtility.Options.classes.quote + '}}}');
                currentAttr++;
            }
        }

        var styleTagsPatternGlobal = /<style\s([^>]+?)>([\s\S]+?)<\/style>/g;
        var styleTagsPatternSingle = /<style\s([^>]+?)>([\s\S]+?)<\/style>/;

        var styleTags = toReturn.match(styleTagsPatternGlobal);
        if (styleTags) {
            styleCount = 0;
            while (styleCount < styleTags.length) {
                styleTags[styleCount] = styleTags[styleCount].replace(styleTagsPatternGlobal, '$2');
                styleTags[styleCount] = $.colorerUtility.colorizeCss(styleTags[styleCount]);
                styleCount++;
            }
            var currentTag = 0;
            while (currentTag < styleTags.length) {
                toReturn = toReturn.replace(styleTagsPatternSingle, '{{{' + $.colorerUtility.Options.classes.bracket + '}}}&lt;{{{/' + $.colorerUtility.Options.classes.bracket + '}}}{{{' + $.colorerUtility.Options.classes.tag + '}}}style{{{/' + $.colorerUtility.Options.classes.tag + '}}} $1{{{' + $.colorerUtility.Options.classes.bracket + '}}}&gt;{{{/' + $.colorerUtility.Options.classes.bracket + '}}}' + styleTags[currentTag] + '</style>');
                currentTag++;
            }
        }

        //tag quoted strings
        toReturn = toReturn.replace(/\="([^\n\"]+)"/g, '={{{' + $.colorerUtility.Options.classes.quote + '}}}"$1"{{{/' + $.colorerUtility.Options.classes.quote + '}}}');
        //tag HTML attributes
        toReturn = toReturn.replace(/(\s){1}([a-zA-Z]+)\=/g, ' {{{' + $.colorerUtility.Options.classes.attribute + '}}}$2{{{/' + $.colorerUtility.Options.classes.attribute + '}}}{{{' + $.colorerUtility.Options.classes.equal + '}}}={{{/' + $.colorerUtility.Options.classes.equal + '}}}');
        //tag HTML start tag names
        toReturn = toReturn.replace(/(<)([a-zA-Z]+)/g, '$1{{{' + $.colorerUtility.Options.classes.tag + '}}}$2{{{/' + $.colorerUtility.Options.classes.tag + '}}}');
        //tag HTML end tag names
        toReturn = toReturn.replace(/(<\/)([a-zA-Z]+)(>)/g, '$1{{{' + $.colorerUtility.Options.classes.tag + '}}}$2{{{/' + $.colorerUtility.Options.classes.tag + '}}}$3');
        //tag the beginning of close brackets
        toReturn = toReturn.replace(/<\//g, '{{{' + $.colorerUtility.Options.classes.bracket + '}}}&lt;/{{{/' + $.colorerUtility.Options.classes.bracket + '}}}');
        //tag self-closed brackets
        toReturn = toReturn.replace(/\/>/g, '{{{' + $.colorerUtility.Options.classes.bracket + '}}}/&gt;{{{/' + $.colorerUtility.Options.classes.bracket + '}}}');
        //tag remaining open brackets
        toReturn = toReturn.replace(/</g, '{{{' + $.colorerUtility.Options.classes.bracket + '}}}&lt;{{{/' + $.colorerUtility.Options.classes.bracket + '}}}');
        //tag remaining close brackets
        toReturn = toReturn.replace(/>/g, '{{{' + $.colorerUtility.Options.classes.bracket + '}}}&gt;{{{/' + $.colorerUtility.Options.classes.bracket + '}}}');
        return toReturn;
    };

    $.colorerUtility.tagComments = function(coms, commentStart, commentEnd) {
        var toReturn = coms;
        //mark comments
        var commentsPatternGlobal = new RegExp('<' + $.colorerUtility.Options.classes.comment + '>([\\s\\S]+?)<\/' + $.colorerUtility.Options.classes.comment + '>', 'g');
        var commentsPatternSingle = new RegExp('<' + $.colorerUtility.Options.classes.comment + '>([\\s\\S]+?)<\/' + $.colorerUtility.Options.classes.comment + '>');

        var comments = toReturn.match(commentsPatternGlobal);
        if (comments) {
            var commentCount = 0;
            while (commentCount < comments.length) {
                comments[commentCount] = comments[commentCount].replace(commentsPatternGlobal, '$1');
                comments[commentCount] = comments[commentCount].replace(/</g, '&lt;');
                comments[commentCount] = comments[commentCount].replace(/>/g, '&gt;');
                comments[commentCount] = comments[commentCount].replace(/"/g, '&quot;');
                comments[commentCount] = comments[commentCount].replace(/'/g, '&#39;');
                comments[commentCount] = comments[commentCount].replace(/\=/g, '&#61;');
                comments[commentCount] = comments[commentCount].replace(new RegExp('(\\{{3}' + $.colorerUtility.Options.classes.indent + '[0-9]+\\}{3})', 'g'), '$1{{{' + $.colorerUtility.Options.classes.comment + '}}}');
                comments[commentCount] = comments[commentCount].replace(new RegExp('(\\{{3}\/' + $.colorerUtility.Options.classes.indent + '[0-9]+\\}{3})', 'g'), '{{{/' + $.colorerUtility.Options.classes.comment + '}}}$1');
                commentCount++;
            }
            var currentComment = 0;
            while (currentComment < comments.length) {
                toReturn = toReturn.replace(commentsPatternSingle, '{{{' + $.colorerUtility.Options.classes.comment + '}}}' + commentStart + comments[currentComment] + commentEnd + '{{{/' + $.colorerUtility.Options.classes.comment + '}}}');
                currentComment++;
            }
        }
        return toReturn;
    };

    $.colorerUtility.containResult = function(coloredCode) {
        var code = coloredCode;
        //replace indent tags with table row/cell
        code = code.replace(new RegExp('\\{{3}' + $.colorerUtility.Options.classes.indent + '([0-9]+)\\}{3}([\\s\\S]+?)\\{{3}\/' + $.colorerUtility.Options.classes.indent + '\\1\\}{3}', 'g'), '<tr><td valign="top" class="' + $.colorerUtility.Options.classes.indent + '$1">$2</td></tr>');
        //replace custom open tags with classed spans
        code = code.replace(/\{{3}([a-zA-Z0-9-]+)\}{3}/g, '<span class="$1">');
        //replace custom close tags with close spans
        code = code.replace(/\{{3}\/([a-zA-Z0-9-]+)\}{3}/g, '</span>');
        //eliminate newlines
        code = code.replace(/\n/g, '');
        var tableClass = $.colorerUtility.Options.target + $('#' + $.colorerUtility.Options.target + ' table[class^=' + $.colorerUtility.Options.target + ']').size();
        //wrap the result in a table
        code = '<table class="' + tableClass + '" width="' + $.colorerUtility.Options.width + '" cellspacing="0">' + code + '</table>';
        //append the prettified markup to the target
        $('#' + $.colorerUtility.Options.target).append(code);
        //create striped effect
        $('#' + $.colorerUtility.Options.target + ' table.' + tableClass + ' tr:has(td[class^=' + $.colorerUtility.Options.classes.indent + '])').filter(':even').addClass($.colorerUtility.Options.classes.line).end().filter(':odd').addClass($.colorerUtility.Options.classes.altLine);
        //apply indentation
        var i = 0;
        while (i <= $.colorerUtility.Options.indentDepth) {
            $('.' + $.colorerUtility.Options.classes.indent + i).css({ 'padding-left': i * 10 + 'px' });
            i++;
        }
        //add line numbering
        var lineNum = '';
        $('#' + $.colorerUtility.Options.target + ' table.' + tableClass + ' tr').each(function(j) {
            lineNum = '';
            if (j < 100) {
                lineNum = '0' + j + '.';
            }
            if (j < 10) {
                lineNum = '0' + lineNum;
            }
            $(this).prepend('<td valign="top" width="1%" class="' + $.colorerUtility.Options.classes.lineCount + '">' + lineNum + '</td><td valign="top" width="1%" class="' + $.colorerUtility.Options.classes.separator + '">|</td>');
        });
    };
})(jQuery);