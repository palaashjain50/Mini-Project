// 1.Install Node.js
// 2.Install express.js: npm install express
// 3.Install cheerio module: npm install cheerio
// 4.Install puppeteer module: npm install puppeteer
// 5.Install request-promise: npm install request-promise
// 6.Install body-parser: npm install body-parser
// Run app.js: node app.js and go live!

const express = require('express');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const request = require('request-promise');
const bodyParser = require('body-parser');
const { type } = require('os');
const { setDefaultResultOrder } = require('dns');
const fs = require('fs');

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

let ads_flag = 0;

//function to consider dynamic changes in an html file(to be used in 1mg scraping)
async function getArr(url) {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    // await page.goto(url, {waitUntil: 'networkidle0', timeout: 0});
    await page.setViewport({ width: 1600, height: 1200 });//1280 800 original values
    await page.goto(url, {waitUntil: 'networkidle0', timeout: 0});
    var imageElements = await page.$$('.style__product-image___1bkgA');
    if(imageElements.length==0){
        imageElements= await page.$$('.style__product-image___3weAd');
    }
    var srcArr=[], loopBreak=0;//to break out of the loop if 4 srcs have been obtained
    for(var imageElement of imageElements){
        if (ads_flag == 1)
        {
            if (imageElement === imageElements[2])
            {
                continue;
            }
        }
        loopBreak++;
        var innerhtml = await(await imageElement.getProperty('innerHTML')).jsonValue();
        innerhtml=JSON.stringify(innerhtml);
        var start=innerhtml.indexOf("https://");
        var end=innerhtml.indexOf(".jpg");
        if(end==-1){
            end=innerhtml.indexOf(".png");
        }
        innerhtml=innerhtml.slice(start,end+4);
        srcArr.push(innerhtml);
        if(loopBreak==4){
            break;
        }
    }
    // const srcValues = [];
    await browser.close();
    // for (const imageElement of imageElements) {
    //     const srcProperty = await imageElement.getProperty('src');
    //     const src = srcProperty._remoteObject.value; // get the value of the src property
    //     srcValues.push(src);
    // }
    // console.log(srcValues);
    // const html = await page.content(); // serialized HTML of page DOM.
    // return html;
    return srcArr;
}

//scraping
const app = express();

// app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

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


        var med = req.body.name;
        //console.log(med);
        //console.log(typeof(med));

        var url1 = `https://www.1mg.com/search/all?name=${med}`;
        //console.log('url1' ,url1);
        var customHeaderRequest1 = request.defaults({
        headers : {'Origin': 'https://www.1mg.com',
                    'Referer': url1,
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36'
                  }
        });
        customHeaderRequest1.get(url1, function(err, resp, body){
            var tata1mg, price, med_name, hyperLink;
            var $ = cheerio.load(body);
            // let med_name;
            var med_name1= $(".style__pro-title___3G3rr");
            let divs = $("div");
            let divHTML = divs.html();
            fs.writeFileSync('divHTML.txt', divHTML);
            console.log("Div HTML Code Stored");
            // console.log(med_name1[0].text);
            // console.log(typeof(med_name1));
            // console.log($(".style__pro-title___3G3rr"));
            // if(Object.keys(med_name1).length == 1)  {
            if(med_name1['length'] == 0) {
                    // RCIFAX, bilypsa
                    //dolo
                    //console.log('1');
                    med_name = $(".style__pro-title___3zxNC"); 
                    price = $('.style__price-tag___B2csA');
                    hyperLink = $(".style__horizontal-card___1Zwmt").children('a');
            } 
            else {
                    // Crocin
                    //console.log('2');
                    med_name = med_name1;
                    price = $('.style__price-tag___KzOkY'); 
                    hyperLink = $(".style__product-link___1hWpa");
            }
            var ads = $(".style__adBadge-text___2He6o");
            if (ads['length'] == 0)
            {
                tata1mg = {
                    medicines: [
                        $(med_name[0]).text(),
                        $(med_name[1]).text(),
                        $(med_name[2]).text(),
                        $(med_name[3]).text()
                    ],
                    prices: [
                        $(price[0]).text(),
                        $(price[1]).text(),
                        $(price[2]).text(),
                        $(price[3]).text()
                    ],
                    images: [],
                    hyperLinks: [
                        "https://www.1mg.com"+$(hyperLink[0]).attr('href'),
                        "https://www.1mg.com"+$(hyperLink[1]).attr('href'),
                        "https://www.1mg.com"+$(hyperLink[2]).attr('href'),
                        "https://www.1mg.com"+$(hyperLink[3]).attr('href')
                    ]
                };
            }
            else
            {
                ads_flag = 1;
                tata1mg = {
                    medicines: [
                        $(med_name[0]).text(),
                        $(med_name[1]).text(),
                        $(med_name[3]).text(),
                        $(med_name[4]).text()
                    ],
                    prices: [
                        $(price[0]).text(),
                        $(price[1]).text(),
                        $(price[3]).text(),
                        $(price[4]).text()
                    ],
                    images: [],
                    hyperLinks: [
                        "https://www.1mg.com"+$(hyperLink[0]).attr('href'),
                        "https://www.1mg.com"+$(hyperLink[1]).attr('href'),
                        "https://www.1mg.com"+$(hyperLink[3]).attr('href'),
                        "https://www.1mg.com"+$(hyperLink[4]).attr('href')
                    ]
                };
            }
            console.log(tata1mg.medicines);


            // Scraping from apollopharmacy
            var url3 = `https://www.apollopharmacy.in/search-medicines/${med}`;
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
                let hyperLink = $(".ProductCard_proDesMain__LWq_f");
                apollo = {
                    medicines: [
                        $(med_name[0]).text(),
                        $(med_name[1]).text(), 
                        $(med_name[2]).text(), 
                        $(med_name[3]).text()
                    ],
                    prices: [
                        $(price[0]).text(), 
                        $(price[1]).text(), 
                        $(price[2]).text(), 
                        $(price[3]).text()
                    ],
                    images: [
                        $(image[0]).children('img').attr('src'), 
                        $(image[1]).children('img').attr('src'), 
                        $(image[2]).children('img').attr('src'), 
                        $(image[3]).children('img').attr('src')
                    ],
                    hyperLinks: [
                        "https://www.apollopharmacy.in"+$(hyperLink[0]).attr('href'),
                        "https://www.apollopharmacy.in"+$(hyperLink[1]).attr('href'),
                        "https://www.apollopharmacy.in"+$(hyperLink[2]).attr('href'),
                        "https://www.apollopharmacy.in"+$(hyperLink[3]).attr('href')
                    ]
                }
                
                // Scraping from pharmeasy
                var url4 = `https://www.pharmeasy.in/search/all?name=${med}`;
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
                    let hyperLink = $(".ProductCard_medicineUnitWrapper__eoLpy.ProductCard_defaultWrapper__nxV0R");
                    let prices2 = $(".ProductCard_gcdDiscountContainer__CCi51");
                    // console.log($(prices2[0]).children('span').html());
                    pharmeasy = {
                        medicines: [
                            $(med_name[0]).text(),
                            $(med_name[1]).text(), 
                            $(med_name[2]).text(), 
                            $(med_name[3]).text()
                        ],
                        // prices: [
                        //     $(price[0]).text(), 
                        //     $(price[1]).text(), 
                        //     $(price[2]).text(), 
                        //     $(price[3]).text()
                        // ],
                        prices: [
                            $(prices2[0]).children('span').text(),
                            $(prices2[0]).children('span').text(),
                            $(prices2[0]).children('span').text(),
                            $(prices2[0]).children('span').text()
                        ],
                        images: [
                            getSrc($(image[0]).text()), 
                            getSrc($(image[1]).text()), 
                            getSrc($(image[2]).text()), 
                            getSrc($(image[3]).text())
                        ],
                        hyperLinks: [
                            "https://www.pharmeasy.in"+$(hyperLink[0]).attr('href'),
                            "https://www.pharmeasy.in"+$(hyperLink[1]).attr('href'),
                            "https://www.pharmeasy.in"+$(hyperLink[2]).attr('href'),
                            "https://www.pharmeasy.in"+$(hyperLink[3]).attr('href')
                        ]
                    };
                    //for scraping img srcs of 1mg
                    (async function scrape(){
                        
                        //disabling the for loop makes scraping much quicker at the cost of tata1mg images :(
                        //from here ------------------------------------------------------------------------------
                        // for(i=0; i<4; i++){
                            // if(tata1mg.medicines[i]!=""){
                                // var url1 = tata1mg.hyperLinks[i];
                                tata1mg.images = await getArr(url1);
                                // $ = cheerio.load(html);
                                // var image = $('.style__image___Ny-Sa.style__loaded___22epL');
                                // if(image['length']==0){
                                //     image = $('.Thumbnail__thumbnail-image-new___3rsF_');
                                // }
                                // console.log(image['length']);
                                // tata1mg.images.push($(image[0]).attr('src'));
                            // }
                        // }
                        // ---------------------------------------------------------------------------------- to here
                        res.json({tata1mg, apollo, pharmeasy});
                        //var arr=[tata1mg,apollo,pharmeasy];
                        //console.log(pharmeasy);
                        // var fs=require('fs');
                        // fs.writeFileSync('./html/med.json', JSON.stringify(arr, null, 2) , 'utf-8');

                    })();
                });
            });
      });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});


