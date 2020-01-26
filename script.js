// ==UserScript==
// @name         Citation Machine AA Adblock
// @version      0.1
// @description  Block CitationMachine's "disable adblocker" thing
// @author       sanjaykdragon
// @match        http://www.citationmachine.net/*
// @grant        none
// ==/UserScript==

var should_run = true;

function get_element_by_xpath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function format_path(num) {
    var path = "/html/body/div[" + num.toString() + "]";
    return get_element_by_xpath(path);
}

function test_regex(to_test) {
    var regex_fn = /^_\w{8}-\w{4}-\w{4}-\w{4}-\w{12}$/;
    return regex_fn.test(to_test);
}

function delete_anti_adblock() {
    if(!should_run) {
        return;
    }

    var iter = 1;
    var element_to_delete = format_path(iter);
    while(element_to_delete != null && element_to_delete != undefined) {
        var element_id = element_to_delete.id.toString();
        if(test_regex(element_id)) { //should probably do this with regex instead
            console.log("Removed popup: " + element_id);
            element_to_delete.remove();
            should_run = false;
            return;
        }
        iter = iter + 1;
        element_to_delete = format_path(iter);
    }
}

(function() {
    'use strict';
    setInterval(delete_anti_adblock, 250);
})();
