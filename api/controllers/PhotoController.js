/**
 * PhotoController
 *
 * @description :: Server-side logic for managing Photos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	upload: function  (req, res) {
		if(req.method === 'GET')
			return res.json({'status':'GET not allowed'});						
		//	Call to /upload via GET is error
		
		//Use this to upload to custom folder
		//If you don't want this remove {dirname: ''}
		//There are other options also .Check at skipper docs		

		req.file('uploadFile').upload({
			dirname: '../../assets/images',
		  saveAs: function(file, cb) {
		    cb(null, file.filename);
		  }
		}, function(err, uploadedFiles) {
		  console.log(err);
		  if (err) return res.serverError(err);								
	    	//	IF ERROR Return and send 500 error with error			
        
		Photo.create({name: uploadedFiles[0].filename,path: '../images/'+ uploadedFiles[0].filename}).exec(function(err,model){
		if(err){
			res.send("No se pudo guardar el archivo");
		}
		else{
		 			  
		  Photo.find().exec(function(err,data){
			if(err) return next(err);				 
			return res.view('Photo/viewgallery',{
				items:data
			});
		});

		}

		});

	    	console.log(uploadedFiles);
	    	//res.json({status:200,file:files});
	    	//This will print the details including new file name upload path etc
	    });		
		
	},

	getgallery: function(req,res){

		Photo.find().exec(function(err,data){
			if(err) return next(err);
				
			return res.view('Photo/viewgallery',{
				items:data
			});
		});
	},

};

