var express = require("express");
var https   = require("https");
var qs      = require("querystring");
var mysql   = require("mysql");

var app = express();

/* Routes */

app.route("/")
    .all(function(req, res, next)
    {
        res.sendfile("index.html");
    });

app.route("/login")
    .get(function(req, res, next)
    {
        res.redirect("https://www.facebook.com/dialog/oauth?client_id=1475927505974436&redirect_uri=http://54.86.222.111:3000/auth");
    });

app.route("/auth")
    .get(function(req, res, next)
    {
        var code = req.query.code;
        console.log(code);
        https.get("https://graph.facebook.com/oauth/access_token?" + 
            "client_id=1475927505974436" +
            "&redirect_uri=http://54.86.222.111:3000/auth" +
            "&client_secret=c02f95728a4ba8da65406203b6cbcff4" +
            "&code=" + code,
            function(token_response)
            {
                token_response.on("data", function(token_response_data)
                {
                    token_data = qs.parse(token_response_data.toString());
                    console.log(token_data);
                    https.get("https://graph.facebook.com/debug_token?" +
                        "input_token=" + token_data.access_token + "&" +
                        "access_token=1475927505974436|c02f95728a4ba8da65406203b6cbcff4",
                        function(inspect_response)
                        {
                            inspect_response.on("data", function(inspect_response_data)
                            {
                                inspect_data = JSON.parse(inspect_response_data.toString());
                                console.log("user_id: " + inspect_data.data.user_id);
                pool.query("SELECT user_name FROM users WHERE fb_user_id=" + inspect_data.data.user_id + " LIMIT 1;",
                    function(err, rows, fields)
                    {
                        if(err) throw err;
                        if(rows.length)
                        {
                            res.sendfile("logged_in.html");
                        }
                        else
                        {
                            res.send("You have not created a username yet");
                        }
                    }
                );
                                //res.sendfile("logged_in.html");
                            });
                        }
                    ).on("error", function(e)
                    {
                        console.log("error: " + e.message);
                    });
                });
            }
        ).on("error", function(e) {
            console.log("error: " + e.message);
        });
    });

/* Create a MySQL connection pool */

var pool  = mysql.createPool({
    connectionLimit: 10,
    host           : 'pokerdb.c3is6eogon4r.us-east-1.rds.amazonaws.com',
    port           : '3306',
    database       : 'poker_db',
    user           : 'pokerdbmaster',
    password       : 'masterpassword'
});

/* Start the server */

var server = app.listen("3000", function()
{
    console.log("listening on port %d...", server.address().port);
});

