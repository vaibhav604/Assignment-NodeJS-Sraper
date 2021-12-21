


const subpages=($,callback)=>{
    const links=new Set()
    $('.big-thumb >a').each((i,ele)=>{
        const link=$(ele).attr('href');
        links.add(link)
        // console.log(link);
    })
    // console.log(links);
    callback(undefined,links)
}

module.exports=subpages
