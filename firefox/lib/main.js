var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");

var button = buttons.ActionButton({
  id: "prose-link",
  label: "Visit prose.io",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: handleClick
});

function handleClick(state) {
  tabs.open("http://prose.io/");
}

pageMod.PageMod({
  include: "*.github.com",
  contentScriptFile: data.url("prose.js")
});

var pageMod = require("sdk/page-mod").PageMod({
  include: "*",
  contentStyleFile: data.url("prose.css")
});
