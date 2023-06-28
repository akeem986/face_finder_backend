
const handleApiCall=(req, res, Clarifai)=>{

    input=req.body.input
    //validation
    if (!input){
        return res.status(400).json('invalid url')
    }

    //Configuring clarifai api
    const app = new Clarifai.App({
        apiKey: 'API KEY HERE'
        });
        app.models.predict("API KEY HERE", input)
        .then(data=> res.json(data)).catch(err=> res.status(400).json('API call error'))
}

const handleEntries=(req, res, pool)=>{
 
    const {id}= req.body

    pool.getConnection(function(err, connection) {
    const SELECT_ENTRY=`SELECT * FROM user WHERE Id= '${id}'`
    connection.query(SELECT_ENTRY, (err, results)=>{
        if(err){
            connection.release();
            return res.send(err)
        }else{
           const newEntry= results[0].entries+1;
           
           const UPDATE_ENTRY=`UPDATE user SET entries='${newEntry}' WHERE Id= '${id}'`
           connection.query(UPDATE_ENTRY, (err)=>{
                if(err){
                    connection.release();
                    return res.send(err)
                }
        });
        const newVal= results[0].entries+1; 
        res.json(newVal);
        connection.release();
        }  
    });
});
}

module.exports={
    handleEntries: handleEntries,
    handleApiCall: handleApiCall
}