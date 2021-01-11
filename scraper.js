// Node libraries
const axios = require('axios').default;
const fs = require('fs') , filename = "knownLinks.txt";

// initialize array from knownLinks
var knownLinks = fs.readFile(filename).toString().split("\n");

/**
 * Scrapes a link and returns true if the link is a rick roll or contains a rick roll
 * @param {string} link Link to look for a rick roll in or to check if it's a rick roll
 * @returns {boolean} True if a rick roll was detected
 */
function searchForRick(link) {
    // variables
    var foundLinks = [];

    // check the initial link and return if it's a rick roll
    if (checkLink(link)) return true;

    // scrape link for any potential rick rolls within it
    axios.get(link)
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function (response) {
            // scrape all embedded links on a page
            foundLinks = response.toString().split('src=')
        });
    
    // filter links stored in foundLinks and check if they are in known links
    for (link in foundLinks) {
        // find index of second quote (end of src tag)
        // example: src="https://www.youtube.com/embed/tgbNymZ7vqY"
        var secondQuoteIndex = link.indexOf("\"", 4);

        // filter all extraneous data out of link
        link = link.substring(6, secondQuoteIndex);

        // check if link is in knownLinks and return true if it is
        if (checkLink(link)) return true;
    }

    // return false if none of the embedded video links are rick rolls
    return false;
};

/**
 * Compares a link to the links in knownLinks
 * @param {*} link Link to be compared to the link in known links.
 * @returns {boolean} 
 */
function checkLink(link) {
    if (link in knownLinks) return true;
    return false;
};