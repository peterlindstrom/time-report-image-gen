const express = require('express')
const app = express()
const uuidv1 = require('uuid/v1');
var Jimp = require("jimp");
app.use(express.static(__dirname + '/public'));
    
app.get('/background', (req, res) => {
  var fileName = __dirname + '/timereg_bg.jpg';
  var imageCaption = 'Week 3';
  var loadedImage;
  var outfile = `${__dirname}/public/outfile${uuidv1()}.jpg`;
  
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

app.listen(3000, () => console.log('Example app listening on port 3000!'))