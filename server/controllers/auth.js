const User = require("../models/User");


const signup=async(req,res)=>{
    try{

        const {name,email,phone,password}=req.body;

        console.log(req.body);


        const user=await User.findOne({
            where:{
                email:email
            }
        })

        if(user){
            return res.status(400).json({error:"User already exists"})
        }


        const newUser=new User({
            name,
            email,
            phone,
            password
        })

        await newUser.save()

        return res.status(200).json({message:"Account Created"})


    }
    catch(e){
        console.log(e)
        return res.status(400).json({error:"server error"})
    }
}


module.exports={
    signup
}