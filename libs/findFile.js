var fs = require('fs');

var args = process.argv;
var filePath = args[2]||'./';
var fileName = args[3];
function findFile(path, fileName,cb){
   fs.readdir(path, function(err, files){
	  files.forEach(function(file){
		fs.stat(path+'/'+file, function(err,stat){
			if(stat.isFile() && file === fileName){
				 cb(path+'/'+file);
			}else if(stat.isDirectory()){
				findFile(path+'/'+file,fileName, cb);
			}
		});
	  });
});
}

findFile(filePath,fileName, function(filePath){
	console.log('Found file at:'+filePath);
});