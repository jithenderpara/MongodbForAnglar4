var utils = require('./utils/util');
var config = require('./config');
var port = config.serverport || 3000;
utils.createApp().listen(port,function(){
    console.log("server is running!..."+port)
});

