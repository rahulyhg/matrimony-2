
//var ProfileInfoModel = require('../app/models/ProfileInfo');
var VendorInfoModel = require('../app/models/vendorInfo');
var CountersModel = require('../app/models/counters');
var OtpModel = require('../app/models/otp');
var Firebase = require("firebase");
var AWS = require('aws-sdk');
var multer = require('multer');
var multerS3 = require('multer-s3');
var s3Stream = require('s3-upload-stream')(new AWS.S3());
var path = require('path');
var PDF = require('pdfkit'); 
var fs = require('fs'); 
var gm = require('gm').subClass({imageMagick: true});
var htmlConvert = require('html-convert');
var pictureTube = require('picture-tube');
var convert = htmlConvert();
var pdfrequest = require('request');
var Client = require('node-rest-client').Client;
var client = new Client();
var options = multer.diskStorage({ destination : 'public/images/logo/' ,
  filename: function (req, file, cb) {
    cb(null,"photo" +  Date.now() + path.extname(file.originalname));
  }
});
// Load the SDK and UUID

// Create an S3 client
var s3 = new AWS.S3();

//var upload = multer({ storage: options });
var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'madhuve',
        acl: 'public-read',
        key: function (req, file, cb) {
            console.log(file);
            cb(null, req.params.id + '/' + 'main' + Date.now() + path.extname(file.originalname)); //use Date.now() for unique file keys
        }
    })
});
var upload2 = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'madhuve',
        acl: 'public-read',
        key: function (req, file, cb) {
            console.log(file);
            cb(null, req.params.id + '/' + 'logo' + Date.now() + path.extname(file.originalname)); //use Date.now() for unique file keys
        }
    })
  });
var securecustomerkey = 'EjR7tUPWx7WhsVs9FuVO6veFxFISIgIxhFZh6dM66rs';
var securevendorkey = 'ORql2BHQq9ku8eUX2bGHjFmurqG84x2rkDQUNq9Peelw';
var secureadminkey = 'tk0M6HKn0uzL%2FcWMnq3jkeF7Ao%2BtdWyYEJqPDl0P6Ac';
var securewebkey = 'RN4CDXkqltLF%2FWloegKujIhiaSWBrgCzQXqI9cyWpT0';
var version_value_1 = '1';
var client_key_vendor = 'tunga';
var client_key_customer = 'bhoomika';
var client_key_admin = 'gajanuru';
var client_key_web = 'pickcock';
Firebase.initializeApp({
  serviceAccount: {
  "type": "service_account",
  "project_id": "project-8598805513533999178",
  "private_key_id": "82abba7994a0894b4b38ee0c66d05cf80dd99efc",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCGKNGc8VwvoTrX\njusnjmbMAmjTjBJ/2Tu/gzktQxfoY0mIe31NUufw0mnBQYOJakU1FORvw8USn3QM\nNCu8h1UvfhvkUVI/FjAdEcuBh+PFOULqFWYlalK3560qvGlE6xHnftgLQC/LI9R4\nmO0moRLBrQ2Oq2JVUwIE58xiXgw5WyMxnZ4IS1kons5UmutUw3QtRMfvwLHrkV/z\na8oP6XPXeECp7FWrvtF53PYFLRurL1bFQsSNwHFw8su8BhEhjpXXD1SDKyEpnz4E\nr8P2wTS1116mrVkNXWyY0rV7fyBvqeh/oH0AZVOzDCueFkT3Q2eZJcGUnGp9uTCb\nExXNIws/AgMBAAECggEAST2LgYR6cT4x43AQjJ2/HOzL0YGMr+MmLR00X7NbH/Dk\nOfBAra/vE5erSGe9qY0sjxgCxck4kzwdnHP21IuFQ9Iy4+hJYEt6pMQMN4C6Jfdm\nwmhARXjQA7ok3UnSpl82fQzQYQP/k4TR/6xs+0O/+5+/4P1LR41zcr4g5Cq3va9l\n4W37dOgaYCUSprWXFQtD5kztcOYNeyuPGg7IYIL/xBo8mqaH49wAf1SureSJauKK\ndEc8hq4FuR9VAWlISV4GBZ4w6DL+N2KrOFbwBiqbt6IASoh7p6k2H+beExmKCpeG\nUDORBsuMRNsYFvQDmS8q6XwYjX4TVh/Agp7jv+DaEQKBgQDorbsL+f+/GZQQ1+ds\nSMQdhvOLXpO8Oh7eAjTTY3K/UNTKCkEoTkam51Bv4O4b/qIXKbcqRyTfqbW9e/mb\nuY0SK/+2N0XTo3X71jJDRKE+Zls1j2/slaDeiUzRxXIF+J0SIgEV5hPbEGNYdGuK\niDP0Mr82GQ998kyKcMBIqG8yZQKBgQCTmzKhmt7GmwCWnxZlvc1yB1nII2r+L1CT\nVQudMgNyWLAF3XtVXC6mntGhEdzcygvB/AOwusMI60duCgZK/+x0JNdyLKvFkmeT\nh4djfppGSjwtzzW1geBgJQnyWdoBv/q6Z68Ms3NSexTODbfC2qfBpR27oECZr4Hz\n7P45S+Fa0wKBgDfBKYj9JuNL5ccDdVjlNtk8dS94Qj5gTvUz4iSlN+HQJK0lN+fI\nmfV0iDnG1EexBHY4cMOYuKU/rWTySCWgmMU59dRb+kd0a9kkwnaMA3dIX6K99Dvk\nvt+UVuwNO/1iTYEC1O/Cag+cJbIUc5CGgqyJXHhCGQw8+0pRKkI+2iZhAoGAD5Qw\nyteyrZmMfVk7Hu/icCeQdUwvrbZGtdYjDKtLq9TqdyQCMWcyUUmv7GUbP35fsVCs\n/wknLpjOiDGsqlvKlBOTXayTUJ38KpkCVCD3nXWWVmtpSsfza5JdM2QCW27swqHQ\n2vFRuaHd90WBYKJ9VDXeJoBqcQ4SFDGuP1Pf7BsCgYEA0bVl9WMaIAe8V6AtwYjz\nLx1KRQ3mZWwXdEBitciQhnDeutMgaExkwCJHag6VGfOljNe/JtgCEzqWWh0rvFzi\nUn2WZA/kcqByHIQzVqJwhFkVjRzS5/qVrTvZw0xu2HVQD4iV6OHRMS3TeIUbGqOK\ngFYR4uhQAX6sXvXp4uU16bs=\n-----END PRIVATE KEY-----\n",
  "client_email": "khaanavali@project-8598805513533999178.iam.gserviceaccount.com",
  "client_id": "110281937967415310229",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://accounts.google.com/o/oauth2/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/khaanavali%40project-8598805513533999178.iam.gserviceaccount.com"
},
  databaseURL: "https://project-8598805513533999178.firebaseio.com"
});




var rootRef = Firebase.database().ref();


module.exports = function(app, passport) {



function checkVendorApiAunthaticated(request,type)
{
  console.log("checkVendorApiAunthaticated 1");
  console.log(request.headers);
  console.log(request.headers.version);
  var version = parseInt(request.headers.version);
  console.log(version);
  var ret = false; 
  if(request.headers.securekey == secureadminkey && request.headers.client == client_key_admin)
  {
    console.log("checkVendorApiAunthaticated admin");
    ret = true;
  }
  else if(request.headers.securekey == securewebkey &&
          request.headers.version == version_value_1 && 
          request.headers.client == client_key_web)
  {
    console.log("checkVendorApiAunthaticated web pass");
    ret = true;
  }
  else if(type == 1)
  {
    console.log("checkVendorApiAunthaticated vendor");
    if(request.headers.securekey == securevendorkey &&
            request.headers.version == version_value_1 && 
            request.headers.client == client_key_vendor)
    {
      console.log("checkVendorApiAunthaticated vendor pass");
      ret = true;
    }
  }
  else if(type == 2)
  {
    console.log("checkVendorApiAunthaticated cust");
    if(request.headers.securekey == securecustomerkey &&
            request.headers.version == version_value_1 && 
            request.headers.client == client_key_customer)
    {
      console.log("checkVendorApiAunthaticated cust pass");
      ret = true;
    }
  }
  else
  {
    console.log("checkVendorApiAunthaticated not auth");
    ret = false;
  }
  return ret;
}
function getNextSequence(name,result)
{
   
    var ret = CountersModel.findOneAndUpdate(
            { _id: name },
            { $inc: { sequence: 1 }} ,
        function( err, order ) 
        {
        if( !err ) {
            console.log("no error");
            console.log(order);
            ret2 = order;
            result(order);
           // return order;
         
        } else {
            console.log( err );
           result(err);
        }
    });

}

app.get('/vendor_logout', function(req, res) {
    var redirect_url = '/';
    req.logout();
    res.redirect(redirect_url);
});
app.get('/login', function (req, res) {
    res.render('login', { user : req.user });
});
app.get('/', function (req, res) {
    res.render('login', { user : req.user });
});
app.get('/admin_signup', function(req, res) {
    res.render('admin_signup', { });
});
app.get('/aboutme', function(req, res) {
    res.render('aboutme', { user : req.user });
});
app.get('/add_profile', function (req, res) {
    res.render('add_profile', { user : req.user });
});
app.get('/profile/:position/:gender/:community/:age', function (req, res) {
    //res.render('profile', { user : req.user,
    //  position:req.params.position });
    console.log(req.params.position);
    console.log(req.params.gender);
    console.log(req.params.community);
    console.log(req.params.age);
    res.render('profile', { user : req.user,
      position:req.params.position,
      gender:req.params.gender,
      community:req.params.community,
      age:req.params.age });
});
app.get('/profile_list', function (req, res) {

    res.render('profile_list', { user : req.user });
});
app.post('/login', function(req, res, next) {
    console.log('post /login');
      console.log(req.body);
  passport.authenticate('local-login', function(err, user, info) {
   
    if (err) {
         console.log("error in login 0");
        return next(err); }
    if (!user) {
         var redirect_url = '/';
           if(req.body.role == 'vendor') 
            {
                redirect_url = '/profile_list';
                return res.redirect(redirect_url); 
            } 
            
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      console.log(req.body.role);
      var redirect_url = '/';
      if(req.body.role == 'vendor') 
      {
          redirect_url = '/profile_list';
         return res.redirect(redirect_url);
      }
     
    });
  })(req, res, next);
});

app.post('/signup', function(req, res, next) {
console.log(req.body);
  // if(req.body.adminpassword != "devknvl")
  // {
     
  //     console.log("password mimatchmatch");
  //    return res.send('ERROR');
  // }
  // else 
  if(req.body.password != req.body.password2)
  {
     
      console.log("password mimatchmatch");
     return res.send('ERROR');
  }
  else
  {
    console.log("password match");
  }
  console.log('/signup');
    passport.authenticate('local-signup', function(err, user, info) {
     console.log(req.body);
      if (err) { 
        return next(err); }
      if (!user) { 
          var redirect_url = '/';
              if(req.body.role == 'vendor') 
              {
                  redirect_url = '/admin_signup';
              } 
              return res.redirect(redirect_url); 
       }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        console.log(req.body.role);
        var redirect_url;
        if(req.body.role == 'vendor') 
        {
          redirect_url = '/aboutme';
          registerVendor(req, res, next);
          return res.redirect(redirect_url);
        }
        else
        {
          return res.redirect(redirect_url);
        }
      });
    })(req, res, next);
});

function registerVendor(req, res, next) {
  console.log("/registerVendor");
  var hotel_id = "M";
  var res = getNextSequence('vendor',function(data) {

    hotel_id = hotel_id + data.sequence;
    console.log(hotel_id);

      var vendorInfo = new VendorInfoModel({
        username:req.body.email,
        id:hotel_id
           });

      vendorInfo.save( function( err ) {
        if( !err ) {
              console.log( 'registerVendor created' );
              console.log(req.body.email);
                  req.session.save(function (err) {
                    if (err) {
                        console.log( 'registerVendor save error' );
                      return next(err);
                    }
                    console.log( 'registerVendor save complete' );
                  });
              return ;
              } else {
                console.log( 'registerVendor error' );
                console.log( err );
                return response.send('ERROR');
              }
        });
    });
};

app.post( '/v1/vendor/info/:id', function( req, res ) {
// if(checkVendorApiAunthaticated(req,1) == false && req.isAuthenticated() == false)
// {
//   return res.send("Not aunthiticated").status(403);
// }
  console.log("VendorInfo post");
  console.log(req.body);
            storeVendorInfo(req,res,function(req,res){
           console.log("storeVendorInfo success");
           
        });

  });
function storeVendorInfo(request,response,callback,param)
{
console.log("storeVendorInfo");
console.log(request.params.id);

 VendorInfoModel.update({ 'username':request.params.id},
      {
        email: req.body.email,
        name:req.body.name,
        phone: req.body.phone, 
        address:{
          addressLine1:request.body.Address1,
          addressLine2:request.body.Address2,
          street:request.body.street, 
          LandMark:request.body.Landmark, 
          areaName:request.body.Areaname,
          city:request.body.City, 
          zip:request.body.zip, 
          latitude:request.body.latitude,
          longitude:request.body.longitude }
      },
       function( err ) {
        if( !err ) {
            console.log( 'storeVendorInfo created' );
            callback(request,response);
            return ;
        } else {
         console.log( 'storeVendorInfo error' );
            console.log( err );
            return response.send('ERROR');
        }
    });
}


app.post( '/v1/vendor/logo/:id', upload.single('file'),function( req, res ) {
  console.log(req.params.id);
  console.log(req.files);
  console.log(req.file);
  console.log(req.file.path);
  console.log("VendorLogo post");
  console.log(req.body);
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file 
  var sampleFile;
  sampleFile = req.file;
 var destination  = req.file.destination;

  // Use the mv() method to place the file somewhere on your server 
  sampleFile.mv('/public/images/logo/filename.jpg', function(err) {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.send('File uploaded!');
    }
  });
  VendorInfoModel.update({ 'username':req.params.id},
      {
        $set: { "logo": req.file.path } ,
       
      },
       function( err ) {
        if( !err ) {
            console.log( 'updated logo created' );
           
            return res.send('created');;
        } else {
         console.log( 'updated logo error' );
            console.log( err );
            return res.send('ERROR');
        }
    });
});

app.post( '/v1/profile/:id', function( request, response ) {

  console.log(request.body);
 // console.log(request.user.local.email);
  // if(checkVendorApiAunthaticated(request,2) == false && request.isAuthenticated() == false)
  // {
  //   return response.send("Not aunthiticated").status(403);
  // }
  var res = getNextSequence('profile',function(data) {
    var order_id = "M1" ;
    order_id = order_id + "P";
    order_id = order_id + data.sequence;
    console.log(order_id);
    var indiantime = new Date();
    indiantime.setHours(indiantime.getHours() + 5);
    indiantime.setMinutes(indiantime.getMinutes() + 30);
    var dc;
    return VendorInfoModel.update({ 'username':request.params.id},
       { $addToSet: {profiles: {$each:[{
            id:order_id,
            name: request.body.name,
            email: request.body.email,
            phone: request.body.phone ,
            dob: indiantime, 
             gender: request.body.gender, 
             occupation: request.body.occupation, 
             education: request.body.education, 
             summary: request.body.summary,
             date:indiantime,
             community:request.body.cast,
             address:{
               addressLine1:request.body.Address1,
               addressLine2:request.body.Address2,
               street:request.body.street, 
               LandMark:request.body.Landmark, 
               areaName:request.body.Areaname,
               city:request.body.City 
             }
          }], }}},
       function( err, order ) {
       if( !err ) {
           console.log("no error");
           console.log(order);
            console.log("no error2 ");
           return response.send('Success');
       } else {
           console.log( err );
           return response.send('ERROR');
       }
   });
        console.log('post order');
    });
 });


app.post( '/v1/profile2/:id', upload.single('file'),function( request, response ) {

  console.log(request.body);
  console.log(request.body.data);
  var receivedData =  JSON.parse(request.body.data);
  console.log(receivedData);
  console.log(receivedData.name);
  console.log(request.params.id);
   console.log(request.body.data.name);
  console.log(request.files);
  console.log(request.file);
  console.log(request.file.path);
  console.log("VendorLogo post");
 
var url2 = request.file.location;
console.log(url2);


  var res = getNextSequence('profile',function(data) {
    var order_id = "M1" ;
    order_id = order_id + "P";
    order_id = order_id + data.sequence;
    console.log(order_id);




    createProfile(request,order_id,url2,receivedData,function(profile_url){


    var dc;
    return VendorInfoModel.update({ 'username':request.params.id},
       { $addToSet: {profiles: {$each:[{
            id:order_id,
            name: receivedData.name,
            email: receivedData.email,
            phone: receivedData.phone ,
            gender: receivedData.gender, 
            occupation: receivedData.occupation, 
            education: receivedData.education, 
            summary: receivedData.summary,
            community:receivedData.cast,
            father:{
                    name:receivedData.fathername,
                    occupation:receivedData.fatheroccupation},
            mother:{
                    name:receivedData.fathername,
                    occupation:receivedData.fatheroccupation},
            mothertongue:receivedData.mothertongue,
            income:receivedData.income,
            gothra:receivedData.gothra,
            star:receivedData.star,
            rashi:receivedData.rashi,
            height:receivedData.height,
            weight:receivedData.weight,
            origin:receivedData.origin,
            dob:receivedData.dob,
            age:receivedData.age,
            logo:url2,
            profileLogo:profile_url,
            address:{
             addressLine1:receivedData.Address1,
             addressLine2:receivedData.Address2,
             street:receivedData.street, 
             LandMark:receivedData.Landmark, 
             areaName:receivedData.Areaname,
             city:receivedData.city 
            }
          }], }}},
       function( err, order ) {
       if( !err ) {
           console.log("no error");
           console.log(order);

            console.log("no error2 ");
           return response.send('Success');
       } else {
           console.log( err );
           return response.send('ERROR');
       }
      });
        console.log('post order');
      });
    });
 });
app.get( '/v1/profile/all', function( request, response ) {
    console.log('/v1/profile/all');
  return VendorInfoModel.find(function( err, order ) {
        if( !err ) {
            return response.send( order );
        } else {
            console.log( err );
            return response.send('ERROR');
        }
    });

});
app.get( '/v1/profile/info/:id', function( request, response ) {
    console.log('/v1/profile/info');
    console.log(request.params.id);
     
  return VendorInfoModel.find({ 'username':request.params.id},
      function( err, vendorinfo ) {
        if( !err ) {
             console.log("no error");
             var profile_array ;
            if(vendorinfo.length > 0)
              profile_array = vendorinfo[0].profiles;
            else
              profile_array =  vendorinfo ;
            return response.send(profile_array);
        } else {
            console.log( err );
            return response.send('ERROR');
        }
    });
});
app.get( '/v1/profile/info/:id/:gender/:community/:minage/:maxage', function( request, response ) {
    console.log('/v1/profile/info');
    console.log(request.params.id);
     console.log(request.params.gender);
     console.log(request.params.community);
     console.log(request.params.minage);
     console.log(request.params.maxage);
  return VendorInfoModel.find({ 'username':request.params.id},
      function( err, vendorinfo ) {
        if( !err ) {
             console.log("no error");
             var profile_array ;
              var ret_profile_array = [];
            if(vendorinfo.length > 0)
            {
              profile_array = vendorinfo[0].profiles;
             console.log('test 1');
             
              for (var j = 0; j < profile_array.length; j++) {
                
                if((profile_array[j].gender == request.params.gender 
                  || request.params.gender == 'all') &&
                  (profile_array[j].community == request.params.community ||
                   request.params.community == 'all') &&
                   (profile_array[j].age >= request.params.minage && 
                    profile_array[j].age <= request.params.maxage)) 
                {
                  
                  ret_profile_array.push(profile_array[j])
                }
              }
            }
            else
            {
              ret_profile_array =  vendorinfo ;
            }

            return response.send(ret_profile_array);
        } else {
            console.log( err );
            return response.send('ERROR');
        }
    });
});
app.post( '/v1/admin/counters/:id', function( request, response ) {
    console.log("post /v1/admin/counters");
  //   if(checkVendorApiAunthaticated(request,0) == false)
  // {
  //   return response.send("Not aunthiticated").status(403);
  // }
    console.log(request.params.id);
     //var dd = {'cityName':"dvg",'subAreas':[{'name':"rajajinagar"},{'name':"vijaynagar"}]};
     var dd = {_id:request.params.id,
                sequence:0};
      var counters = new CountersModel(
         dd);
        return counters.save(function( err) {
        if( !err ) {
            console.log("no error");
            console.log(counters);
            return response.send(counters);
        } else {
            console.log( err );
            return response.send('ERROR');
        }
    });
});

app.post( '/v1/profile/logo/:id', upload.single('file'),function( req, res ) {
  console.log(req.params.id);
  console.log(req.files);
  console.log(req.file);
  console.log(req.file.path);
  console.log("VendorLogo post");
  console.log(req.body);
var url2 = req.protocol + '://' + req.get('host') +'\\' + req.file.path;
console.log(url2);
  VendorInfoModel.update({ 'id':req.params.id},
      {
         $addToSet: {logo: {$each:[{url: url2}] }}
       
      },
       function( err ) {
        if( !err ) {
            console.log( 'updated logo created' );
           
            return res.send('created');;
        } else {
         console.log( 'updated logo error' );
            console.log( err );
            return res.send('ERROR');
        }
    });
});



app.post( '/v1/profile/pdf/:id', function( request, response ) {
    console.log("post /v1/profile/pdf");
  doc = new PDF();
  doc.pipe(fs.createWriteStream('public/images/pdf/pdftesting_file.pdf'));
//Now this is the code snippet to get the image using the url
  console.log("post /v1/profile/pdf 2");
            pdfrequest({
                url: 'http://localhost:3000/public/images/logo/M1P2.jpg',
                encoding: null // Prevents Request from converting response to string
              }, function(err, response, body) {
              if (err){ 
                 console.log("post /v1/profile/pdf 3");
                throw err;
              }

              console.log("post /v1/profile/pdf 4");
              doc.image(body,10, 10,{height:250,width:250});
              doc.text('HOLIDAYS - 125 Fortime',80,165,{align:'center'})
              doc.text('Hello this is a demo file',100,200)
              console.log("post /v1/profile/pdf 5");

              doc.end();  
              console.log("post /v1/profile/pdf 6");
             
    });

});


  app.post( '/v1/profile/image/:id', function( request, response ) {
      console.log("post /v1/profile/image");

     var input =  'public/images/pdf/ramya.jpg';
     var output =  'public/images/pdf/r2.jpg';
     var writeStream = fs.createWriteStream(output);
     var Readable = require('stream').Readable


    var src1  = '<!DOCTYPE html><html><head><style>body {    background-color: #93B874;}</style></head><body><img src="http://localhost:3000/public/images/pdf/ramya.jpg"width="300" height="500"><h1>Dayasudhan kuruva</h1></body></html>';
    var s = new Readable
    s.push(src1)    // the string you want
    s.push(null) ;
    s.pipe(convert({format:'jpeg'}))
      .pipe(writeStream);
//https://www.npmjs.com/package/s3-write-stream
       return response.send("Success");
  });
  function createProfile( request,order_id,path,receivedData, result ) {
    console.log(order_id);
    console.log(path);
      console.log("post /v1/profile/image");
var logopath = "https://madhuve.s3.amazonaws.com/test3/logo1486565810761.png";
// var input = 'public/images/logo/';
// input  = input + path;
   
    var output = request.params.id + '/' + 'profile' + Date.now() + '.jpg';
     console.log(output);
 
var name = "daya";

    var src1  = '<!doctype html>\
<html>\
<head>\
    <title>Sample Matrimony Page</title>\
    <style>\
        .jumbotron {\
            padding-top: 5px;\
            padding-bottom: 5px;\
            margin-bottom: 5px;\
            color: inherit;\
            background-color: #1BBC9B;\
        }\
        h1 {\
            font-size: 24px;\
            text-align: center;\
            color: #ffffff;\
        }\
         .container {\
            width: 100%;\
            height: auto;\
            margin: 0px auto;\
        }\
        .clearfix:before,\
        .clearfix:after {\
            display: table;\
            content: " ";\
        }\
        .clearfix:after {\
            clear: both;\
        }\
        .panel {\
            background-color: #fff;\
            border: 1px solid black;\
            border-radius: 4px;\
            width: 1000px;\
            margin: 0px auto;\
            float: none;\
        }\
        .panel-image {\
            padding: 5px;\
            width: 400px;\
            box-sizing: border-box;\
        }\
        .panel-image img {\
            max-width: 100%;\
        }\
        .panel-information {\
            padding: 5px;\
            width: 600px;\
            box-sizing: border-box;\
        }\
        .panel-heading {\
            color: #3c763d;\
            background-color: #dff0d8;\
            float: left;\
            width: 100%;\
            text-align: center;\
        }\
        .panel-heading h2 {\
            font-size: 22px;\
        }\
        .panel-body {\
        }\
        .pull-left {\
            float: left;\
        }\
        .pull-right {\
            float: right;\
        }\
        .table {\
            border-collapse: collapse;\
            width: 100%;\
        }\
        td {\
            border: 1px solid #dddddd;\
            text-align: left;\
            padding: 8px;\
            font-size: 28px;\
        }\
        tr:nth-child(even) {\
            background-color: #eeeeee;\
        }\
        body{\
          background-color: #eeeeee;\
          }\
    </style>\
</head>\
<body>\
    <div class="container clearfix">\
        <div class="panel clearfix">\
            <div class="panel-image pull-left">\
                <img src="' + path + '" height= 500 />\
                <img src="' + logopath + '" height= 100 />\
            </div>\
            <div class="panel-information pull-left">\
                <div class="panel-body">\
                    <table class="table">\
                        <tbody>\
                            <tr>\
                                <td><b>Name</b></td>'
                                +'<td>' + receivedData.name + '</td>\
                            </tr>\
                            <tr>\
                                <td><b>Cast</b></td>'
                                +'<td>' + receivedData.cast + '</td>\
                            </tr>\
                            <tr>\
                                <td><b>DOB</b></td>'
                               +'<td>' + receivedData.dob + '</td>\
                            </tr>\
                            <tr>\
                                <td><b>Education</b></td>'
                                +'<td>' + receivedData.education + '</td>\
                            </tr>\
                            <tr>\
                                <td><b>Mother Tongue</b></td>'
                                +'<td>' + receivedData.mothertongue + '</td>\
                            </tr>\
                            <tr>\
                                <td><b>Occupation</b></td>'
                                +'<td>' + receivedData.occupation + '</td>\
                            </tr>\
                            <tr>\
                                <td><b>Salary</b></td>'
                               +'<td>' + receivedData.income + '  per annum'+ '</td>\
                            </tr>\
                            <tr>\
                                <td><b>Gothra</b></td>'
                                +'<td>' + receivedData.gothra + '</td>\
                            </tr>\
                            <tr>\
                                <td><b>Star</b></td>'
                                +'<td>' + receivedData.star + '</td>\
                            </tr>\
                            <tr>\
                                <td><b>Rashi</b></td>'
                               +'<td>' + receivedData.rashi + '</td>\
                            </tr>\
                            <tr>\
                                <td><b>Height</b></td>'
                               +'<td>' + receivedData.height + '</td>\
                            </tr>\
                            <tr>\
                                <td><b>Weight</b></td>'
                               +'<td>' + receivedData.weight + '</td>\
                            </tr>\
                            <tr>\
                                <td><b>Residence</b></td>'
                               +'<td>' + receivedData.city + '</td>\
                            </tr>\
                        </tbody>\
                    </table>\
                </div>\
            </div>\
        </div>\
    </div>\
</body>\
</html>';

var upload = s3Stream.upload({
  Bucket: "madhuve",
  Key: output,
  ACL: "public-read"
});
//
  //  var writeStream = fs.createWriteStream(output);
    var Readable = require('stream').Readable
    var s = new Readable
    s.push(src1)    // the string you want
    s.push(null) ;

    s.pipe(convert({format:'jpeg',width: 1000, height: 600}))
      .pipe(upload);
    var ret_url = "https://madhuve.s3.amazonaws.com/" + output;
    result(ret_url);
     //  return response.send("Success");
  };

//Delete a menu item
app.delete( '/v1/profile/:id/:profileid', function( request, response ) {
     console.log('delete /v1/profile/:id/:profileid');
    
     console.log(request.params.id);
     console.log(request.params.profileid);
        return VendorInfoModel.update( { 'username':request.params.id},
          { $pull: {profiles: {"id": request.params.profileid }}},
          function( err ) {
            if( !err ) {
                console.log( 'profile removed' );
                return response.send( 'Successfully removed' );
            } else {
                console.log( err );
                return response.send('ERROR');
            }
        });
    //});
});



app.post( '/v1/aws/s3/createbucket', function( request, response ) {
    console.log("/v1/aws/s3/test");

    // Create a bucket and upload something into it
    var bucketName = 'node-sdk-sample2';
   
    // Create params for S3.createBucket
    var bucketParams = {
      Bucket : 'madhuve',
      ACL : 'public-read'
    };

    // call S3 to create the bucket
    s3.createBucket(bucketParams, function(err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data.Location);
      }
    });
});


app.get('/sign-s3', function(req, res) {
 var bucketName = 'matrimony';
var keyName = 'hello_world123.txt';
var params = {Bucket: bucketName, Key: keyName, Body: 'Hello World devraj!'};
  s3.putObject(params, function(err, data) {
    if (err)
      console.log(err)
    else
      console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
  });

    // var params = {Bucket: 'devraj', Key: 'key', Body: 'body'};
    // var url = s3.getSignedUrl('putObject', params);
    // console.log('The URL is', url);
     });

app.post( '/v1/vendor/update/:id', upload2.single('file'), function( req, res ) {
  console.log('/v1/vendor/update/:id');
var url2 = req.file.location;
var receivedData =  JSON.parse(req.body.data);
console.log(url2);
  VendorInfoModel.update({ 'username':req.params.id},
      {
        $set: {
                name: receivedData.name, 
                email: receivedData.email,
                phone: receivedData.phone,
                logo:url2} 
      },
       function( err ) {
        if( !err ) {
            console.log( 'updated isopen created' );
           
            return res.send('created');;
        } else {
    console.log( 'updated isopen error' );     
               console.log( err );     
               return res.send('ERROR');     
           }    
           });    
 });

var nodemailer = require("nodemailer");

var TO_ADDRESS = 'dayasudhankg@gmail.com';
var FROM_ADDRESS = 'kuruvatechnologies@gmail.com';

// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: 'Gmail',
    auth: {
        user: 'kuruvatechnologies@gmail.com',
        pass: 'jayammafromsidlipura'
    }
});
// var sendMail = function(toAddress, subject, content, next){
//   var mailOptions = {
//     from: "SENDERS NAME <" + FROM_ADDRESS + ">",
//     to: toAddress,
//     replyTo: fromAddress,
//     subject: subject,
//     html: content
//   };

//   smtpTransport.sendMail(mailOptions, next);
// };
app.get( '/v1/email/:path', function( req, res ) {
  console.log("Email sending");
var path = req.params.path;
path = 'https://s3.amazonaws.com/madhuve/test3/profile1486566499745.jpg'
var image_html = '<!DOCTYPE html>\
                  <html>\
                  <body>\
                 <img src="' + path + '"/>\
                  </body>\
                  </html>';

  var mailOptions = {
    from: "Matrimony <" + FROM_ADDRESS + ">",
    to: TO_ADDRESS,
    replyTo: FROM_ADDRESS,
    subject: 'subject',
    html: image_html
  };

smtpTransport.sendMail(mailOptions,function(err, response){
        if(err){
          console.log('ERROR!');
          console.log(err);
          return res.send('ERROR');
        }
        console.log('Email sent!');
        res.send("Email sent!");
      });

});


};


// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
    {
      console.log("isLoggedIn");
        return next();
    }
    else
    {
       console.log("not loggedin isLoggedIn");
    }

    res.redirect('/');
}




//module.exports = router;
