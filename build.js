// 把 artifact 版（无 html/head/body 外壳）打包成可直接托管的 index.html
const fs = require("fs");
const src = fs.readFileSync("niulai.html", "utf8");

// artifact 文件开头是 <title>/<link>/<style>，之后才是 <div id="app">
const split = src.indexOf('<div id="app">');
if (split < 0) throw new Error('找不到 <div id="app">');
const headPart = src.slice(0, split).trim();
const bodyPart = src.slice(split);

const icon =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">' +
  '<rect width="64" height="64" rx="14" fill="#7FA855"/>' +
  '<ellipse cx="32" cy="36" rx="20" ry="17" fill="#E8B96A"/>' +
  '<path d="M17 22Q13 14 15 8Q23 11 29 20Z" fill="#EFE3C8" stroke="#2E2A22" stroke-width="2"/>' +
  '<path d="M47 22Q51 14 49 8Q41 11 35 20Z" fill="#EFE3C8" stroke="#2E2A22" stroke-width="2"/>' +
  '<ellipse cx="25" cy="33" rx="5" ry="5.5" fill="#FFFDF6" stroke="#2E2A22" stroke-width="1.6"/>' +
  '<ellipse cx="39" cy="33" rx="5" ry="5.5" fill="#FFFDF6" stroke="#2E2A22" stroke-width="1.6"/>' +
  '<circle cx="25" cy="34" r="2.4" fill="#2E2A22"/><circle cx="39" cy="34" r="2.4" fill="#2E2A22"/>' +
  '<ellipse cx="32" cy="45" rx="11" ry="8" fill="#F3D9AC" stroke="#2E2A22" stroke-width="1.8"/></svg>';

const out = `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover,maximum-scale=1">
<meta name="description" content="会说话的牛来：一只会说牛语的小牛犊，摸它、喂它、给它打扮，还能带它跑酷赚草币。">
<meta name="theme-color" content="#BFE0E8">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta property="og:title" content="会说话的牛来">
<meta property="og:description" content="摸它、喂它、给它打扮，还能带它跑酷赚草币。">
<link rel="icon" href="data:image/svg+xml,${encodeURIComponent(icon)}">
<style>
:root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px);}
html,body{height:100%;}
body{margin:0;font:14px/1.5 system-ui,-apple-system,sans-serif;background:#faf9f7;}
img{max-width:100%;}
[hidden]{display:none!important;}
</style>
${headPart}
</head>
<body>
${bodyPart}
</body>
</html>
`;

fs.writeFileSync("index.html", out);
console.log("index.html " + (out.length / 1024).toFixed(1) + "KB");
