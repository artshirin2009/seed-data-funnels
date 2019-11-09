var Profile = require('./models/profile');
var Funnel = require('./models/funnel');
var Screenshot = require('./models/screenshot');
var mongoose = require('mongoose');

var mongoOptions = {
    useUnifiedTopology: true, 
    keepAlive: 1,
    connectTimeoutMS: 30000,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 5000,
    useNewUrlParser: true
};

mongoose.connect('mongodb://127.0.0.1:27017/Funnelsmap', mongoOptions, function (err) {
    if (err) throw err;
    console.log('Successfully connected');
});
Promise.all(
    [
        Profile.find({
            photoUrl: /^\/public.*$/
        }).exec()
        .then(arrToChange => {
            arrToChange.map(obj => {
                let oldUrl = obj.photoUrl.slice(7);
                Profile.findOneAndUpdate({
                    _id: obj._id
                }, {
                    photoUrl: `45.61.48.153${oldUrl}`
                }, {
                    new: true,
                    useFindAndModify: false
                }).exec()
                console.log(obj.photoUrl)
            })
        }),
        Funnel.find({
            funnelBackground: /^\/public.*$/
        }).exec()
        .then(arrToChange => {
            arrToChange.map(obj => {
                let oldUrl = obj.funnelBackground.slice(7);
                Funnel.findOneAndUpdate({
                    _id: obj._id
                }, {
                    funnelBackground: `45.61.48.153${oldUrl}`
                }, {
                    new: true,
                    useFindAndModify: false
                }).exec()
                console.log(obj.funnelBackground)
            })
        })
    ]
).then(() => {
    exit();
    console.log('Done ...')
})



function exit() {
    mongoose.disconnect();
}