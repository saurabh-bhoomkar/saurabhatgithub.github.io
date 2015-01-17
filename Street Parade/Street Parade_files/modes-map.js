var c_cppMode = ace.require("ace/mode/c_cpp").Mode
var clojureMode = ace.require("ace/mode/clojure").Mode
var coffeeMode = ace.require("ace/mode/coffee").Mode
var csharpMode = ace.require("ace/mode/csharp").Mode
var cssMode = ace.require("ace/mode/css").Mode
var groovyMode = ace.require("ace/mode/groovy").Mode
var htmlMode = ace.require("ace/mode/html").Mode
var javaMode = ace.require("ace/mode/java").Mode
var javascriptMode = ace.require("ace/mode/javascript").Mode
var jsonMode = ace.require("ace/mode/json").Mode
var ocamlMode = ace.require("ace/mode/ocaml").Mode
var perlMode = ace.require("ace/mode/perl").Mode
var phpMode = ace.require("ace/mode/php").Mode
var pythonMode = ace.require("ace/mode/python").Mode
var rubyMode = ace.require("ace/mode/ruby").Mode
var scadMode = ace.require("ace/mode/scad").Mode
var scalaMode = ace.require("ace/mode/scala").Mode
var scssMode = ace.require("ace/mode/scss").Mode
var svgMode = ace.require("ace/mode/svg").Mode
var textileMode = ace.require("ace/mode/textile").Mode
var xmlMode = ace.require("ace/mode/xml").Mode
var textMode = ace.require("ace/mode/text").Mode;

var ace_modes = {
    62: new textMode(),
    35: new javascriptMode(),
    4: new pythonMode(),
    116: new pythonMode(),
    29: new phpMode(),
    10: new javaMode(),
    17: new rubyMode(),
    1: new c_cppMode(),
    11: new c_cppMode(),
    34: new c_cppMode(),
    41: new c_cppMode(),
    3: new perlMode(),
    111: new clojureMode(),
    8: new ocamlMode(),
    27: new csharpMode(),
    39: new scalaMode()
};
