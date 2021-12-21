const request = require("request");
const cheerio = require('cheerio');


const getData=(url,callback)=>{
    request.get({url,gzip:true},(error,response,html)=>{
        if(!error && response.statusCode===200){
            const $=cheerio.load(html);
            callback(undefined,{
                title: getTitle($),
                image:getImage($),
                content:getContent($),
                urls:getUrls($),
            })
        }else{
            callback('Unable to get Information',undefined)
        } 
    
    })
}

const getTitle=($)=>{
    let title;
    $('.article-sect').each((i,ele)=>{
        title=$(ele)
            .find('.inner-main-title')
            .text()
            .replace(/\s\s+/g, ' ');
        // console.log(title);
    })
    return title
}

const getImage=($)=>{
    return $('.article-sect').find('img').attr('data-src')
}

const getContent=($)=>{
    let content="";
    $('.article-full-content ').each((i,ele)=>{
        let temp=($(ele).text().trim().replace(/\s\s+/g, ''))
        content=content+temp+"\n";
    })
    return content
}

const getUrls=($)=>{
    let urls=[]
    $('*').each((i,ele)=>{
        const link=$(ele)
            .find('a')
            .attr('href')
        if(link){
           urls.push(link)
        }
    })
    return [...new Set(urls)]
}

module.exports=getData
