const mongoose = require('mongoose');

const BannerSchema = mongoose.Schema({
    name:String,   
    link:String,
    status:String,
    desktopImage:String,
    mobileImage:String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Banner', BannerSchema);