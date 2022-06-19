const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemp.js');
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  'utf-8'
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

// console.log(slugify('Fresh Avacados', {lower:true}));
// const slugs = dataObj.map(el => slugify(el.productName, {lower:true}));
// console.log(slugs);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  //overview page
  if (pathname === '/overview' || pathname === '/') {
    const cardsHtml = dataObj
      .map((element) => replaceTemplate(tempCard, element))
      .join('');
    const output = tempOverview.replace(/{%PRODUCTCARDS%}/g, cardsHtml);

    res.writeHead(201, {
      'Content-Type': 'text/html',
    });
    res.end(output);
  }
  //product page
  else if (pathname === '/product') {
    const product = dataObj[query.id];
    const prodcutHtml = replaceTemplate(tempProduct, product);

    res.writeHead(201, {
      'Content-Type': 'text/html',
    });
    res.end(prodcutHtml);
  }

  //api
  else if (pathname === '/api') {
    res.writeHead(200, {
      'content-type': 'application/json',
    });
    res.end(data);

    //not foound
  } else {
    res.writeHead(404, {
      'content-type': 'text/html',
      'custom-header': 'you can customie your header',
    });
    res.end('<h1>bad request</h1>');
  }
});

server.listen(5000, '127.0.0.1', (err) => {
  if (err) console.log(err);
  console.log('Listening port on 5000');
});
