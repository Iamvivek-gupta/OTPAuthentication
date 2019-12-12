// importing npm packages 

const Express = require('express');
const BodyParser = require('body-parser');
const Speakeasy = require('speakeasy');


// configure express FrameWork

const app = Express();

//using packages
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended : true}));




//creating Routers
app.post('/totp-secret', (req, res, next) =>{
    var secret = Speakeasy.generateSecret({length : 20});
    res.send({"secret": secret.hex});
});


//generating 6 Digit OTP
app.post('/totp-generate', (req, res, next) =>{
    res.send({
        "Token" : Speakeasy.totp({
            "secret" : req.body.secret,
            "encoding" : "base32"
        }),
        "remaining" : (30 - Math.floor((new Date().getTime() / 1000.0 % 30)))
    });
});

//verification Token and Secret
app.post('/totp-validate', (req, res, next) =>{
    res.send({
        "valid" : Speakeasy.totp.verify({
            "secret" : req.body.secret,
            "encoding" : "base32",
            "Token" : req.body.Token,
            "window": 0
        })
    });
});

// initailing port
Port = 3000;
app.listen(Port, () =>{
    console.log('server start listening'  + Port + 'port')
})
