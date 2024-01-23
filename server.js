const exprees = require('express');
const app = exprees();

//declare route together

app.get('/', (req, res)=>{
res.send("Hello World")
})
app.listen(3000, ()=>{
console.log("The pot is running on port 3000");
});
