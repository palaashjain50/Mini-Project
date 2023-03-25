// 1.Install Node.js
// 2.Install express.js: npm install express
// 3.Install cheerio module: npm install cheerio
// 4.Install request-promise: npm install request-promise
// 5.Install body-parser: npm install body-parser
// Run app.js: node app.js and go live!

const express = require('express');
const cheerio = require('cheerio');
const request = require('request-promise');
const bodyParser = require('body-parser');
const { type } = require('os');

const app = express();

app.use(bodyParser.urlencoded({extended : true}));

app.post('/', async (req, res) => {
      
    // var med = 'Lisinopril';
    // Scraping from tata1mg
    // res.send(`Medicine name:${req.body.name}`);
    // med = req.body.name;
    // console.log(med);
    // console.log(med);
    // console.log('POST/');
    // console.dir(req.body);
    // res.writeHead(200, {'Content-Type': 'text/html'});
    // res.end('thanks');


        var med = req.body;
        //console.log(med);
        //console.log(typeof(med));

        var url1 = `https://www.1mg.com/search/all?name=${med['name']}`;
        //console.log('url1' ,url1);
        var customHeaderRequest1 = request.defaults({
        headers : {'Origin': 'https://www.1mg.com',
                    'Referer': url1,
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36'
                  }
        });
        customHeaderRequest1.get(url1, function(err, resp, body){
            var tata1mg, price, med_name;
            const $ = cheerio.load(body);
            // let med_name;
            var med_name1= $(".style__pro-title___3G3rr"); 
            // console.log(med_name1[0].text);
            // console.log(typeof(med_name1));
            // console.log($(".style__pro-title___3G3rr"));
            // if(Object.keys(med_name1).length == 1)  {
            if(med_name1['length'] == 0) {
                    // RCIFAX, bilypsa
                    //console.log('1');
                    med_name = $(".style__pro-title___3zxNC"); 
                    price = $('.style__price-tag___B2csA');
            } 
            else {
                    // Crocin
                    //console.log('2');
                    med_name = med_name1;
                    price = $('.style__price-tag___KzOkY'); 
            }
            tata1mg = {
                medicine1: $(med_name[0]).text(),
                price1: $(price[0]).text(),
                medicine2: $(med_name[1]).text(),
                price2: $(price[1]).text(),
                medicine3: $(med_name[2]).text(),
                price3: $(price[2]).text()
            }
            
            // Scraping from apollopharmacy
            var url3 = `https://www.apollopharmacy.in/search-medicines/${med['name']}`;
            var customHeaderRequest3 = request.defaults({
            headers : {'Origin': 'https://www.apollopharmacy.in/', 
                        'Referer': url3,
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36'
                        }
            });
            customHeaderRequest3.get(url3, function(err, resp, body){
                var apollo;
                const $ = cheerio.load(body);
                let med_name = $(".ProductCard_productName__f82e9"); 
                let price = $(".ProductCard_priceGroup__V3kKR"); 
                apollo = {
                    medicine1: $(med_name[0]).text(),
                    price1: $(price[0]).text(),
                    medicine2: $(med_name[1]).text(),
                    price2: $(price[1]).text(),
                    medicine3: $(med_name[2]).text(),
                    price3: $(price[2]).text()
                }
                
                // Scraping from pharmeasy
                var url4 = `https://www.pharmeasy.in/search/all?name=${med['name']}`;
                var customHeaderRequest4 = request.defaults({
                    headers : {'Origin': 'https://www.pharmeasy.in',
                            'Referer': url4,
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36'
                            }
                });
                customHeaderRequest4.get(url4, function(err, resp, body){
                    let $ = cheerio.load(body);
                    var pharmeasy;
                    let med_name = $(".ProductCard_medicineName__8Ydfq"); 
                    let price = $(".ProductCard_ourPrice__yDytt"); 
                    pharmeasy = {
                        medicine1: $(med_name[0]).text(),
                        price1: $(price[0]).text(),
                        medicine2: $(med_name[1]).text(),
                        price2: $(price[1]).text(),
                        medicine3: $(med_name[2]).text(),
                        price3: $(price[2]).text()
                    }
                    //res.json({tata1mg, apollo, pharmeasy});
                    var arr=[tata1mg,apollo,pharmeasy];
                    //console.log(pharmeasy);
                    var fs=require('fs');
                    fs.writeFileSync('med.json', JSON.stringify(arr, null, 2) , 'utf-8');
                });
            });
      });
});


app.listen(3000, () => {
  console.log('Server started on port 3000');
});


