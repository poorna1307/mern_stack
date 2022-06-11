const exp=require('express') //express module returns a function.
const userApp=require('./APIS/userAPI')
const productApp=require('./APIS/productAPI')
//creating the server...
const app=exp()


//creating a mongoclient..
const mdbClient=require('mongodb').MongoClient
//Database connection...
const Database="mongodb+srv://poorna_1307:chandu13@poorna.zv57ipv.mongodb.net/?retryWrites=true&w=majority"
//calling connect method on mongoclient with database url
mdbClient.connect(Database)
    .then((client)=>{
        //get DB object
        let dbObj=client.db("DemoDB");
        //get collections
       let userCollectionObj= dbObj.collection("usercollection");
       let productCollectionObj=dbObj.collection("productcollection");
       //sharing collection objs with apis
       app.set("userCollectionObj",userCollectionObj)
       app.set("productCollectionObj",productCollectionObj)
       console.log("Database connected successfully")
    })
    .catch(err=>console.log("Error occured in DB",err))



app.use('/user-api',userApp)
app.use('/product-api',productApp)
app.listen(4000,()=>console.log("Server listening on port 4000..."))

app.use((request,response,next)=>{
    response.send({message:`The path ${request.url} is invalid..`})
})
app.use((error,request,response,next)=>{
    response.send({message:`Error Occured`,reason:error.message})
})