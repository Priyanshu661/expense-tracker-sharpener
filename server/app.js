const express=require("express")
const bodyParser=require("body-parser")
const cors=require("cors");
const sequilize = require("./database/db");


const app=express();

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}));

const authRoutes=require("./routes/auth");


app.use("/auth",authRoutes)




sequilize.sync().then((res)=>{
app.listen(5000, () => {
  console.log("port is running on 5000");
});
 console.log("db connected");
}).catch((e)=>{
    console.log(e)
})




