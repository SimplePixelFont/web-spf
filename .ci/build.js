const fs = require("fs");
const path = require("path");

const pkgJS = fs.readFileSync("./pkg/web_spf.js", "utf8");

const patch = fs.readFileSync("./js/patch.js", "utf8");

const combined = `${pkgJS}\n${patch}`;

fs.writeFileSync("./pkg/web_spf.js", combined);
console.log("Patch complete!");
