"use strict";

const fs = require('fs');
const assets = {};

// Load dongsupport json
assets.support = require('./support.json');

// Load sound filenames
assets.sounds = null;
fs.readdir('assets/sounds/', function (err, files) {
    if (err)
        throw err;
    assets.sounds = files;
    console.log('sounds loaded');
});

// Dong responses
assets.dongs = [
    "Ohh whoops ooh... I dropped my monster condom, that I use for my MAGNUM DONG!",
    "http://i.imgur.com/ueLDY8u.jpg",
    "http://s2.quickmeme.com/img/01/01bce94521ab10aef394ed4521271b9b868f2c310997d3b7928d15267095eb10.jpg",
    "https://i.imgflip.com/18iruo.jpg",
    "https://img.ifcdn.com/images/5435413eb358630b61129821ba9a35c98eb1b81c7cd415eaf9d8dd689515feb2_3.jpg",
    "http://66.media.tumblr.com/6e50ed9a00131c7e8e73a50ce7198840/tumblr_o5c8quk2of1uy57v5o1_1280.jpg",
    "https://i.ytimg.com/vi/B6AZryW6Vlk/maxresdefault.jpg",
    "https://66.media.tumblr.com/cd0a5db038f684087200b476e6292d08/tumblr_o5qyhkbQNv1vqutcko1_500.jpg"
];

// Many Keks
assets.keks = [
    "http://i2.kym-cdn.com/photos/images/newsfeed/001/111/422/7a9.jpg",
    "http://i3.kym-cdn.com/photos/images/original/001/023/759/257.jpg",
    "http://i0.kym-cdn.com/photos/images/masonry/001/023/762/343.jpg",
    "http://i.imgur.com/o50ZXMb.png",
    "http://i.imgur.com/54Zofhc.png",
    "http://i.imgur.com/j8qqccK.png",
    "http://i.imgur.com/iUIaETV.png",
    "https://i.imgur.com/pWiy4L7.jpg"
];

module.exports = assets;