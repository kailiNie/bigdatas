/*
 * Globalize Culture zh-CN
 *
 * http://github.com/jquery/globalize
 *
 * Copyright Software Freedom Conservancy, Inc.
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * This file was generated by the Globalize Culture Generator
 * Translation: bugs found in this file need to be fixed in the generator
 */

(function( window, undefined ) {
    
    var Globalize;
    
    if ( typeof require !== "undefined" &&
        typeof exports !== "undefined" &&
        typeof module !== "undefined" ) {
        // Assume CommonJS
        Globalize = require( "globalize" );
    } else {
        // Global variable
        Globalize = window.Globalize;
    }
    
    Globalize.addCultureInfo( "zh-CN", "default", {
        name: "zh-CN",
        englishName: "Chinese (China)",
        nativeName: "中国语 (中国)",
        language: "zh",
        numberFormat: {
            "NaN": "NaN (非数値)",
            negativeInfinity: "负无穷",
            positiveInfinity: "正无穷",
            percent: {
                pattern: ["-n%","n%"]
            },
            currency: {
                pattern: ["-$n","$n"],
                decimals: 0,
                symbol: "¥"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["日","一","二","三","四","五","六"],
                    namesAbbr: ["日","一","二","三","四","五","六"],
                    namesShort: ["日","一","二","三","四","五","六"]
                },
                months: {
                    names: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月",""],
                    namesAbbr: ["1","2","3","4","5","6","7","8","9","10","11","12",""]
                },
                AM: ["上午","上午","上午"],
                PM: ["下午","下午","下午"],
                eras: [{"name":"公历","start":null,"offset":0}],
                patterns: {
                    d: "yyyy/MM/dd",
                    D: "yyyy'年'M'月'd'日'",
                    t: "H:mm",
                    T: "H:mm:ss",
                    f: "yyyy'年'M'月'd'日' H:mm",
                    F: "yyyy'年'M'月'd'日' H:mm:ss",
                    M: "M'月'd'日'",
                    Y: "yyyy'年'M'月'"
                }
            }
        }
    });
    
    }( this ));