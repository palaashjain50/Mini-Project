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

//function to process strings to get src of img(to be used in pharmeasy scraping)
function getSrc(string){
    if(string==""){
        return null;
    }
    string=string.split(" ")[2];
    string=string.replace("src=","");
    string=string.replaceAll("\"","");
    return string;
}

//scraping
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
            let image = $('.style__pro-title___3zxNC');
            tata1mg = {
                medicines: [$(med_name[0]).text(),
                            $(med_name[1]).text(), 
                            $(med_name[2]).text(), 
                            $(med_name[3]).text()],
                prices: [$(price[0]).text(), 
                        $(price[1]).text(), 
                        $(price[2]).text(), 
                        $(price[3]).text()],
                images: [$(image[0]).text(), 
                        $(image[1]).text(), 
                        $(image[2]).text(), 
                        $(image[3]).text()]
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
                let image = $(".ProductCard_bigAvatar__KUsDb");
                apollo = {
                    medicines: [$(med_name[0]).text(),
                                $(med_name[1]).text(), 
                                $(med_name[2]).text(), 
                                $(med_name[3]).text()],
                    prices: [$(price[0]).text(), 
                            $(price[1]).text(), 
                            $(price[2]).text(), 
                            $(price[3]).text()],
                    images: [$(image[0]).children('img').attr('src'), 
                            $(image[1]).children('img').attr('src'), 
                            $(image[2]).children('img').attr('src'), 
                            $(image[3]).children('img').attr('src')]
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
                    let image = $(".ProductCard_medicineImgDefault__Q8XbJ noscript");
                    pharmeasy = {
                        medicines: [$(med_name[0]).text(),
                                    $(med_name[1]).text(), 
                                    $(med_name[2]).text(), 
                                    $(med_name[3]).text()],
                        prices: [$(price[0]).text(), 
                                $(price[1]).text(), 
                                $(price[2]).text(), 
                                $(price[3]).text()],
                        images: [getSrc($(image[0]).text()), 
                                getSrc($(image[1]).text()), 
                                getSrc($(image[2]).text()), 
                                getSrc($(image[3]).text())]
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


