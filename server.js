const express = require('express');
const path = require('path');
const app = express();
const fs=require('fs');
const res = require('express/lib/response');
const req = require('express/lib/request');
const port=3000;

app.use(express.urlencoded({extended: true}));

app.listen(port, ()=>{console.log('életjel')});

app.get('/', function (req, res) {
    res.status(200).sendFile(path.join(__dirname+'/index.html'));
  });

  app.get('/adatok', (req, res) =>{
    fs.readFile('adatok.txt', (err, data)=>{
        if(err){
            res.status(500).send('Hiba a fájl megnyitásakor!')
        }
        else{
            var content = data.toString().trim();
            var records = content.split('\n');

            var str = '<table border="1"><thead><tr><th></th><th></th><th></th><th></th><th></th></tr></thead>'
            var i = 0

            records.forEach(record =>{
                str += '<tr><td>' + i + '</td>'
                var datas = record.split('|')
                datas.forEach(data =>{
                    str += '<td>' + data + '</td>'
                })
                str += '</tr>'
            });
            str+= '</tbody></table>'
            res.status(200).send(str);
        }
    })
})
  
  app.post('/senddata', (req, res)=>{
    var Nev = req.body.Nev
    var kor = req.body.kor
    var osztaly = req.body.osztaly
    var Lakcime = req.body.Lakcime

    fs.appendFile('adatok.txt', `${Nev}|${kor}|${osztaly}|${Lakcime}\n`, (err)=>{
        if(err){
            res.status(500).send('Hiba a fájl mentése közben')
        } else{
            res.status(200).send('Adatok elmentve')
        }
    })
})