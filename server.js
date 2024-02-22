const mongoose=require('mongoose');
const http=require('http');
const app=require('./app/index');

const server=http.createServer(app)

const PORT=process.env.PORT || '8080';

mongoose.connect("mongodb://127.0.0.1:27017/gest-projet")
.then(()=>{
    server.listen(PORT,()=>{
        console.log(`app listen in http://localhost:8080`);
    })
}).catch((e)=>{
    console.log("Erreur dans connexion à mongoose"+e);
})
