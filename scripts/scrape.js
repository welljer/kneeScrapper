"use strict";

var axios = require("axios");
var cheerio = require("cheerio");

var scrape = function (cb) {
    axios("http://www.thrashermagazine.com/")  
    .then((html) => {
        var $ = cheerio.load(html);
        var articles = [];
        var junkDrawer = $('.page-content-container');
        console.log(html);

        $(".page-content-container").each(function (html) {
            var head = $(this).children(".page-content").text().trim();
            console.log(head);
            var sum = $(this).children(".post-list").text().trim();
            console.log(sum);
            if (head && sum){
                var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                
                var dataToAdd = {
                    headline: headNeat,
                    summary: sumNeat
                };
                
                articles.push(dataToAdd);
            }
        });
        cb(articles);
    });
};

module.exports = scrape;