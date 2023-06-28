
const handleSignin=(req,res,pool,bcrypt)=>{
    
    const {password,email}= req.body
  

     //validation
     if (!email||!password){
        release
        return res.status(400).json('invalid entry missing feild')
     }
    
    const SELECT_LOGIN=`SELECT * FROM login WHERE Login_email='${email}'`
    const SIGNIN_USER=`SELECT * FROM user WHERE Email='${email}'`
      
    pool.getConnection(function(err, connection) {
        connection.query(SELECT_LOGIN,(err, results)=>{
                if(err){
                    connection.release();
                    return res.send(err)
                }else{
                // Loading hash from password DB.
                   const isValid= bcrypt.compareSync(password,results[0].Login_hash)
                if(isValid){
                    connection.query(SIGNIN_USER, (err,results)=>{
                            if(err){
                                connection.release();
                                return res.send("Signin Failed...")
                            }else{
                                res.json(results[0])
                                connection.release();
                            }
                        })
                        }else{
                        return res.send("Login Failed")
                    }   
                    }
                });
          }); 
}

    module.exports={
    handleSignin:handleSignin
    }