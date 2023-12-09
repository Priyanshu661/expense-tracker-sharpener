const User = require("../models/User");

const bcrypt=require("bcrypt")

const jwt=require("jsonwebtoken")


const signup=async(req,res)=>{
    try{

        const {name,email,phone,password}=req.body;



        const user=await User.findOne({
            where:{
                email:email
            }
        })

       const hashedPassword=await  bcrypt.hash(password,10);


        if(user){
            return res.status(400).json({ message: "User already exists" });
        }


        const newUser = new User({
          name,
          email,
          phone,
          password: hashedPassword,
        });

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

        console.log(req.headers.Authorization)

        const user=await User.findOne({
            where:{
                email:email
            }
        })

        if(!user){
            return res.status(404).json({ message: "User not found" });
        }


        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return res.status(401).json({ message: "User not authorized" });
        }

        const token = await jwt.sign({ userId: user.id }, "thisismysecretkey");


        return res.status(200).json({message:"Login Successfull",token})

    }
    catch(e){
        console.log(e)
        return res.status(400).json({ message: "Server Error" });
    }
}


const addExpense=async(req,res)=>{
    try{

        const {amount,description,category}=req.body;



    }
    catch(e){
         console.log(e);
         return res.status(400).json({ message: "Server Error" });
    }
}


module.exports={
    signup,
    login
}