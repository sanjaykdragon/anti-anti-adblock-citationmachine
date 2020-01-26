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

function delete_anti_adblock() {
    if(!should_run) {
        return;
    }

    var element_to_delete = get_element_by_xpath("/html/body/div[9]");
    if(element_to_delete != null)
    {
        console.log("Removed popup.");
        element_to_delete.remove();
        should_run = false;
    }
}

(function() {
    'use strict';
    setInterval(delete_anti_adblock, 250);
})();
