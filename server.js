const express = require('express')
const app = express()
const uuidv1 = require('uuid/v1'); 
const tableify = require('tableify');
const bodyParser = require('body-parser');
const webshot = require('webshot');
const multiline = require('multiline');
const _isEmpty = require('lodash.isempty')

var Jimp = require("jimp");

// create application/json parser
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const customCSS = multiline(()=>{/*
  *,
  *:before,
  *:after {
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
  }
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 1024px;
    height: 768px;
  } 
  body {
    font-family: Open Sans, sans-serif;
    font-size: 13px;
    margin: 20px;
    text-align: center;
    text-transform: uppercase;
    color: #000;
    background-color: transparent; color: #fff;
    background-size: cover;
    background-image: url("https://i.imgur.com/kL7S2sK.jpg");
    width: 100%;
    height: 100%;
  }

  h1 {
    font-size: 21px;
    margin: 1.5em 0;
  }

  table {
    overflow: hidden;
    width: auto;
    max-width: 100%;
    margin: 0 auto;
    border-collapse: collapse;
    border-spacing: 0;
    background-size: cover;
    background-image: url("https://i.imgur.com/kL7S2sK.jpg");
  }
  table td,
  table th {
    padding: 10px;
    position: relative;
    outline: 0;
    text-align: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    vertical-align: top;
    cursor: default;
  }
  table th {
    font-weight: bold;
  }
  table thead th {
    border-bottom-width: 2px;
  }
  table tbody th {
    text-align: left;
    white-space: nowrap;
  }
  table tbody > tr:hover td,
  table tbody > tr:hover th {
    background: #fffe96;
  }
  table td:hover:after,
  table thead th:not(:empty):hover:after {
    content: '';
    position: absolute;
    z-index: -2;
    top: -5000px;
    left: 0;
    width: 100%;
    height: 10000px;
    background: #fffe96;
  }
  table tbody > tr > td:hover {
    background: #fffd2d;
  }
*/});

app.use(express.static(__dirname + '/public'));
    
app.post('/createImage', jsonParser, (req, res) => {
  const { body } = req;
  const { table=[], title='' } = body;
  if (!_isEmpty(table)) {
    var html = tableify({
      [title]: table, 
    });
    var outName = `outfile${uuidv1()}.jpg`;
    var outfile = `${__dirname}/public/${outName}`;
    var options = {
      siteType: 'html',
      customCSS: customCSS,
    }
    var fileName = 'http://i.imgur.com/kL7S2sK.jpg';
    const imgTag = `<img src=${fileName}/>`;
    const date = table.find((item) => !!item.date);
    
    webshot(`<html><body>${imgTag}${html}</body></html>`, outfile, options, function(err) {
      console.log('err', err);
      res.json({ outname: outName });
    });
  }
}),  
app.get('/image/:imageId', (req, res) => {
  var fileName = req.params.imageId;
  var outFileName = `${__dirname}/public/${fileName}`;
  res.sendFile(outFileName, (e) => {
    console.log('e', e);
  });
});  
app.get('/background', (req, res) => {
  var fileName = __dirname + '/timereg_bg.jpg';
  var imageCaption = 'Week 3';
  var loadedImage;
  var outfile = `${__dirname}/public/outfile${uuidv1()}.jpg`;
  const query = req.query;
  Jimp.read(fileName)
      .then(function (image) {
          loadedImage = image;
          return Jimp.loadFont(Jimp.FONT_SANS_16_WHITE);
      })
      .then(function (font) {
          loadedImage.print(font, 10, 10, imageCaption)
                     .write(outfile, () => {
                       res.sendFile(outfile, (e) => {
                         console.log('e', e);
                       });  
                     });
      })
      .catch(function (err) {
          console.error(err);
      });
});

app.listen(process.env.PORT || 3001, () => console.log('Example app listening on port 3001!'))