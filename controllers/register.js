
const handleRegister=(req,res, pool,bcrypt)=>{
    const {name, email, password}= req.body;
    
    const hash=bcrypt.hashSync(password);
    const INSERT_USER_DATA=`INSERT INTO user (Fullname, Email) VALUES ('${name}','${email}')`
    const SELECT_NEW_USER=`SELECT * FROM user WHERE Email= "${email}"`
    const LOGIN_USER=`INSERT INTO login (Login_hash,Login_email) VALUES ('${hash}','${email}')`
    
    //validation
    if (!email||!name||!password){
       return res.status(400).json('invalid entry')

    }
    
    pool.getConnection(function(err, connection) {
        connection.query(LOGIN_USER, function (error, result) {
            if (error) {
                connection.release();
                return res.send(error)
            }
        });
    
        connection.query(INSERT_USER_DATA, (err, results)=>{
            if(err){
                connection.release();
                return res.send("Registration Failed")
            }else{
            connection.query(SELECT_NEW_USER, (err, results)=>{
                if(err){
                    connection.release();
                    return res.send("Failed Generate Registration")}
                else
                    {
                        connection.release();
                        return res.json(results[0])}
                    });
                }
            });
        });
       
    }

    module.exports={
        handleRegister: handleRegister
    }