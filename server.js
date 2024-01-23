const exprees = require('express');
const  mongoose= require('mongoose');
const Product= require('./models/productmodel')
const app = exprees();

//declare route together
app.use(exprees.json())
app.use(exprees.urlencoded({extended:false}))
app.get('/', (req, res)=>{
res.send("Hello World")
})
//Lets'fetch data from the Databases
app.get('/products', async(req, res)=>{
    try{
        const products = await Product.find({}) // you will get all products
        res.status(200).json(products)

    }catch(error){
        res.status(500).json({message:error.message})
    }

})

// Get Product using different ids
app.get('/products/:id', async(req, res)=>{
    try{
        const {id}= req.params;
        const product = await Product.findById(id) // you will get all products
        res.status(200).json(product)

    }catch(error){
        res.status(500).json({message:"No product found"});
    }
})

// Lets Create arsources in Databases
app.post('/product', async(req, res) =>{
    try{

     const product= await Product.create(req.body)
     // Sending response back to the user
     res.status(200).send(product) 
    }catch(error)
    {
        console.log(error.message);
        return res.status(500).send('Internal Server Error')
    }
})


// Update the Product we will use  PUT
app.put('/products/:id', async(req, res) =>{
    try{
    const { id } = req.params;
    const product= await Product.findByIdAndUpdate(id, req.body);
    // Product was not found
    if(!product) return res.status(404).json({message:`Cannot find this product ${id}`});
    const updatedproduct= await Product.findById(id);
      res.status(200).json(updatedproduct);

}catch(error)
    {
        console.log(error.message);
        return res.status(500).send('Internal Server Error')
    }
})

// delete a Product

app.delete('/products/:id', async(req, res) => {
    try{
   const {id}= req.params;
   const product =await Product.findByIdAndDelete(id)

   if(!product) return res.status(404).json({message:`Cannot find this product ${id}`});
   res.status(200).json(product)
    }catch(error)
    {
        console.log(error.message);
        return res.status(500).send('Internal Server Error')
    }

})
mongoose.set("strictQuery", false)
mongoose.connect('mongodb+srv://admin:ZdlPYNNN6ecHUWJh@nodeapi.hk2uwkm.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(()=>{
    app.listen(3000, ()=>{
        console.log("The pot is running on port 3000");
        });
    console.log("Database is connected");
}).catch(()=>{
  console.log("There is error");  
})
