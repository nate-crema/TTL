module.exports = function(app, fs, path, crypto, preorder, getIP) {
    app.get("/", function(req, res) {
        res.render("intro.html");
    });

    app.get('/main', function(req, res) {
        res.render("main.html");
    });

    app.get("/album", function(req, res) {
        res.render("album.html");  
    });

    app.get("/albumlist", function(req, res) {
        res.render("albumlist.html");  
    });

    app.post("/album/purchase", function(req, res) {

        console.log(req.body);

        const newobj = new preorder();
        newobj.ip = getIP(req).clientIp;
        newobj.name = req.body.name;
        newobj.num = req.body.num;
        newobj.amount = req.body.amount;
        newobj.phonenum = req.body.phonenum;
        newobj.payment = req.body.payment;

        newobj.save((err) => {
            if(err){
                console.error(err);
                res.json({result: 0});
                res.end("false");
            } else {
                res.end("true");
            }
            
        })
    });
}