const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const subpages = require('./utils/subpages.js');
const getData = require('./utils/getData.js');
const mongodb = require('./mongodb.js');



const sections=['','sports','business']
console.log('Scrapping started!');

sections.forEach(ele => {
    const url="https://www.firstpost.com/"+encodeURIComponent(ele);
    request.get({url,gzip:true},(error,response,html)=>{
        if(!error && response.statusCode===200){
            const $=cheerio.load(html);
            subpages($,(error,links)=>{
                if(error){
                    return console.log(error);
                }
                links.forEach(url => {
                    if(url){
                        getData(url,(error,res)=>{
                            if(error){
                                return console.log(error);
                            }
                            const data={
                                title:res.title,
                                image:res.image,
                                content:res.content,
                                urls:res.urls,
                            }
                            mongodb.add(data,(error,response)=>{
                                if(error){
                                    console.log(error);
                                }else{
                                    console.log(response);
                                }
    
                            })  
                        })
                    }              
                }); 
            })    
        }else{
            console.log(error);
        } 
    
    })
});


//To delete DB

// mongodb.deleteDB(true,(error,response)=>{
//     if(error){
//         console.log(error);
//     }else{
//         console.log(response);
//     }
// })  



