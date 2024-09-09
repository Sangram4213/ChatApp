export const logInUser =async(req,res)=>{
   try {
    const {fullName,userName,password,confirmPassword,gender} = req.body;
    
   } catch (error) {
     
   }
}

export const signUpUser =(req,res)=>{
    console.log("Signin");
}

export const logOutUser =(req,res)=>{
    console.log("LogOut");
}