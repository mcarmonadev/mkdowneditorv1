var express = require("express")
var app = express()

var db = require("./database.js")

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var HTTP_PORT = 8000 
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, PATCH, DELETE'); 
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, content-type, Accept");
    next();
});



app.get("/initbd", (req, res, next) => {

        db.run(`CREATE TABLE IF NOT EXISTS  files (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            content text, 
            dateUpdate text
            )`,
        (err) => {
            if (err) {
                // Table already created
      			console.error(err.message)
                res.json({"init":"ERROR"})
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO files (name, content, dateUpdate) VALUES (?,?,?)'
                db.run(insert, ["Document 1","Contenido Priomer Archivo", (new Date()).toISOString()])
                db.run(insert, ["Document 2","2th file text is this", (new Date()).toISOString()])
                db.run(insert, ["Document 3","3trd", (new Date()).toISOString()])
                db.run(insert, ["Document 4","some fourth text is this", (new Date()).toISOString()])
                db.run(insert, ["Document 5","fifth position file markdown, bye!", (new Date()).toISOString()])
    			res.json({"init":"Ok"})
            }
        }); 
    

});

app.get("/api/files", (req, res, next) => {
    var sql = "select * from files"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});


app.get("/api/files/filebyname/:name", (req, res, next) => {
    var sql = "select * from files where name = ?"
    var params = [req.params.name]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        var resultBool = false;
        if(row!=null){resultBool=true;}
        res.json({
            "message":"success",
            "filename":req.params.name,
            "exists":resultBool
        })
      });
});

app.put('/api/file', function (req, res) {
    var errors=[]
    if (!req.body.filename){
        errors.push("No filename specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        name: req.body.filename,
        content: req.body.textContent
    }
    var sql ='INSERT INTO files (name, content, dateUpdate) VALUES (?,?,?)'
    var params =[data.name, data.content, (new Date()).toISOString()]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"insert error": err.message})
            return;
        }
        res.json({
            "message": "file creation done successfuly",
            "data": data,
            "id" : this.lastID
        })
    });
})



app.post('/api/file', function (req, res) {
    console.log('UPDATE FILE')
    console.log(req.body)
    //res.json({"message":"Ok"})
    var errors=[]
    /*if (!req.body.filename){
        errors.push("No filename specified");
    }*/
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
        var data = {
            idFile: req.body.idFile,
            content: req.body.textContent
        }
        db.run(
            'UPDATE files set  content = COALESCE(?,content)  WHERE id = ?',
            [data.content, data.idFile],
            function (err, result) {
                if (err){
                    res.status(400).json({"upadte error": res.message})
                    return;
                }
                res.json({
                    message: "success",
                    data: data,
                    changes: this.changes
                })
        });
})



app.get('/api/file/delete/:idFile', function (req, res) {
    console.log('DELETE FILE')
    var errors=[]
    if (!req.params.idFile){
        errors.push("No file id specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
        var fileId = req.params.idFile;
        db.run(
            'DELETE FROM files WHERE id = ?',
            fileId,
            function (err, result) {
                if (err){
                    res.status(400).json({"delete error": res.message})
                    return;
                }
                res.json({
                    message: "success",
                    idDeletedFile: fileId
                })
        });
})

// Default response for any other request
app.use(function(req, res){
    res.status(404);
});

      