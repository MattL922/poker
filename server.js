var express = require("express"),
    https   = require("https"),
    qs      = require("querystring"),
    mysql   = require("mysql"),
    fs      = require("fs");

var appId       = fs.readFileSync("secret/app_id").toString(),
    appSecret   = fs.readFileSync("secret/app_secret").toString(),
    mysqlHost   = fs.readFileSync("secret/mysql_host").toString(),
    mysqlPort   = fs.readFileSync("secret/mysql_port").toString(),
    mysqlDbName = fs.readFileSync("secret/mysql_db_name").toString(),
    mysqlUser   = fs.readFileSync("secret/mysql_user").toString(),
    mysqlPw     = fs.readFileSync("secret/mysql_pw").toString();

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
        res.redirect("https://www.facebook.com/dialog/oauth?client_id=" + appId + "&redirect_uri=http://54.86.222.111:3000/auth");
    });

app.route("/auth")
    .get(function(req, res, next)
    {
        var code = req.query.code;
        console.log(code);
        https.get("https://graph.facebook.com/oauth/access_token?" + 
            "client_id=" + appId +
            "&redirect_uri=http://54.86.222.111:3000/auth" +
            "&client_secret=" + appSecret +
            "&code=" + code,
            function(token_response)
            {
                token_response.on("data", function(token_response_data)
                {
                    token_data = qs.parse(token_response_data.toString());
                    console.log(token_data);
                    https.get("https://graph.facebook.com/debug_token?" +
                        "input_token=" + token_data.access_token + "&" +
                        "access_token=" + appId + "|" + appSecret,
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
    host           : mysqlHost,
    port           : mysqlPort,
    database       : mysqlDbName,
    user           : mysqlUser,
    password       : mysqlPw
});

/* Start the server */

var server = app.listen("3000", function()
{
    console.log("listening on port %d...", server.address().port);
});

