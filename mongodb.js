const mongodb = require('mongodb');
const MongoClient=mongodb.MongoClient;

const connectionURL='mongodb://127.0.0.1:27017'
const databaseName='news-scrapper'


const add=(document,callback)=>{
    MongoClient.connect(connectionURL,{ useNewUrlParser:true},(error,client)=>{
        if(error){
            callback('Unable to connect Database',undefined);
        }
        
        const db=client.db(databaseName)
        if(!document.title || document.title==="")
        {
            callback(undefined,"Failed to fetch title")
        }
        else{
            db.collection('news').insertOne(document,(error,result)=>{
                if(error){
                    callback('Unable to insert data',undefined);
                }
                client.close();
                callback(undefined,result);
                
            })
        }
    })
}


const deleteDB=(t,callback)=>{
    MongoClient.connect(connectionURL,{ useNewUrlParser:true},(error,client)=>{
        if(error){
            callback('Unable to connect Database',undefined);
        }
        
        const db=client.db(databaseName)
        db.dropDatabase((err,res)=>{
            if(err){
                callback('Unable to delete DB',undefined);
            }
            callback(undefined,'Operation Sucess? '+res);
            client.close()
        })
        
    })
}


module.exports={
    add,deleteDB
}
