//fileupload 

var express     =       require("express");
var bodyParser =        require("body-parser");
var multer      =       require('multer');
var app =       express();
var path = require('path');
var dateFormat = require('dateformat');
var bodyParsear =       require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var http = require('http');

app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");

});

app.post('/fileUpload', function(req,res){
var storage     =       multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads/');
  },

  filename: function (req, file, callback) {
callback(null, dateFormat(new Date(), "yymmddHHMM") +"-" + Math.ceil(Math.random() * 1000000) + "-" + req.body.email + path.extname(file.originalname));
}
});
app.use('/uploads', express.static(path.join(__dirname, './uploads')));
var upload = multer({ storage : storage }).array('File',100);
        upload(req,res,function(err) {
                var newName;
		var oldName;
		var filesArr = [];
		
                console.log(req.files);
                var email = req.body.email;
                if(err) {
                        return res.end("Error uploading file.");
                }

		function filesObj(newName, oldName){
		this.newName = newName;
		this.oldName = oldName;
		}
		
                for (i in req.files){
                newName = "http://18.222.207.124:3000/" + req.files[i].path;
		oldName = req.files[i].originalname;
		filesArr.push(new filesObj(newName, oldName));
		
                }
		res.write(JSON.stringify(filesArr));

        res.end();
        });
});

app.listen(3000,function(){
    console.log("Working on port 3000");
});
