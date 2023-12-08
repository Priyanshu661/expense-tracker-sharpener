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
            return res.status(400).json({ message: "User already exists" });
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
        return res.status(400).json({ message: "server error" });
    }
}


const login=async(req,res)=>{
    try{

        const {email,password}=req.body;

        const user=await User.findOne({
            where:{
                email:email
            }
        })

        if(!user){
            return res.status(404).json({ message: "User not found" });
        }

        if(user.password !==password){
            return res.status(401).json({ message: "(User not authorized" });
        }


        return res.status(200).json({message:"Login Successfull"})

    }
    catch(e){
        console.log(e)
        return res.status(400).json({ message: "Server Error" });
    }
}


module.exports={
    signup,
    login
}