const express=require('express');
const router=express.Router();
const httpService=require('./http-service');

//using callback approach
//note in this case the return should be a callback 
//so see the http-service.js
router.get('/callback',(req,res)=>{
let data= httpService.getSomethingFromCallback(function(d){
    console.log(d)
    res.send(d)
})
});

//using normal .then approach of promise
router.get('/promise1/:id?', (req, res)=>{
    const id=req.params.id;
    if (!id) return res.status(400).send('Please provide a valid id')
    let data= httpService.getSomethingFromPromise1(id);
    data.then(resu=>{
        console.log(resu)
        res.send(resu)
    })
    .catch((error)=>{
       console.log('There is an error ',error )
       res.send(error)
    });
});

//using async await approach of promise
router.get('/promise2', async (req, res)=>{
    let data= await httpService.getSomethingFromPromise2();
    console.log(data)
    res.send(data)
});

router.post('/post',async (req,res)=>{
    let data =await httpService.postSomethingFromPromise(req.body);
    console.log(data)
    res.send(data)
});

module.exports=router;


// router.get('/promise1/:id?', (req, res)=>{
//     const id=req.params.id;
//     if (!id) return res.status(400).send('Please provide a valid id')
//     let data= httpService.getSomethingFromPromise1(id);
//     data.then((resu=>tester(resu.id)))
//     .then(data=>
//         {console.log(data,'the response of the promise is then again thened to send the output')
//         res.send(data)
//     })
  
//     .catch((error)=>{
//        console.log('There is an error ',error )
//        res.send(error)
//     });
    
// });
// function tester(id) {
//     return new Promise((resolve, reject) => {
//       resolve(['repoWithId'])
//     })

// }