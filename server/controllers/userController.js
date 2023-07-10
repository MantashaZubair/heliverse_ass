const userModels = require("../models/userModels")

//create user controller
    const createUserController = async(req,res)=>{
   
       try {
        const {first_name ,last_name ,email, password, gender, domain, avatar, available}= req.body
        const user =  new userModels({first_name ,last_name,email,password,gender,domain,avatar, available})
        await user.save()
        res.status(200).send({
            success:true,
            message:"create user",
           user
          }) 
       } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"internal server error",
           error:error
          }) ;
       }
        }


//create many users
const createManyUserController = async (req, res)=>{
    
    try {
      await userModels.insertMany(req.body);
      res.status(201).json("succcess");
    } catch (error) {
        console.error('Error inserting users:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
}





//get All User Controller 
const ITEM_PER_PAGE= 20       
    const getUserController = async(req,res)=>{
        const page = parseInt(req.query.page) || 1;
       
        //put all query in here
        const query={}
        try {
            const skip = (page-1) * ITEM_PER_PAGE;
            const count = await userModels.estimatedDocumentCount(query)
            const user = await userModels.find(query).skip(skip).limit(ITEM_PER_PAGE).sort({createdAt: -1})
            const pagecount = Math.floor(count / ITEM_PER_PAGE)
            res.status(200).json({
               pagination:{
                 count,
                 pagecount
               },
               user,
               
              }) 
           } catch (error) {
            console.log(error)
            res.status(500).json({
                success:false,
                message:"internal server error",
               error:error
              }) ;
           }
        }


// get single user controller        
    const getSingleUserController= async(req,res)=>{
        try {
            const user = await userModels.findById(req.params.id) 
            res.status(200).send({
              success:true,
              message:"get single user",
              user,
            })  
          } catch (error) {
              console.log(error)
              res.status(500).send({
                  success:false,
                  message:"internal server error",
                 error:error
                }) ; 
          }
        }
// update user controller        
    const updateUserController = async(req,res)=>{
        try {
            const {id}=req.params
            
            const {first_name ,last_name ,email, password, gender, domain, avatar, available}= req.body  
            const user = await userModels.findByIdAndUpdate(
                id,
                {first_name ,last_name ,email, password, gender, domain, avatar, available},
                { new: true }
            )
            if(user){
                res.status(200).json({
                    success:true,
                    message:"update user",
                    user,
                  })   
            }else {
                    res.status(404).json({ error: 'User not found' });
                  }
            
        } catch (error) {
            console.log(error)
              res.status(500).json({
                  success:false,
                  message:"internal server error",
                 error:error
                }) ;  
        }
        }


        // const updateUserController = async(req,res)=>{
        // try {
        //     const {id}=req.params
            
          
        //     if(user){
        //         res.status(200).json({
        //             success:true,
        //             message:"update user",
        //             user,
        //           })   
        //     }else {
        //             res.status(404).json({ error: 'User not found' });
        //           }
            
        // } catch (error) {
        //     console.log(error)
        //       res.status(500).json({
        //           success:false,
        //           message:"internal server error",
        //          error:error
        //         }) ;  
        // }
        // }
// delete user controller        
    const deleteUserController = async(req,res)=>{
       try {
        const {id}= req.params
        const user = await userModels.findByIdAndDelete(id)
        if(user){
            res.status(200).json({
                success:true,
                message:'User deleted successfully',
                user,
              })
        }else {
            res.status(404).json({ error: 'User not found' });
          }
       } catch (error) {
        console.log(error)
              res.status(500).json({
                  success:false,
                  message:"internal server error",
                 error:error
                })
       }
        }

module.exports={createUserController,createManyUserController,getUserController,getSingleUserController,updateUserController,deleteUserController}
