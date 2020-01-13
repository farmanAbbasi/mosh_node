const mongoose= require('mongoose');

mongoose.connect('mongodb://localhost/test')
        .then(()=>console.log('connected to the db'))
        .catch(err=>console.log(err))

// const anySchema= new mongoose.Schema({
//     name: String,
//     author: String,
//     tags: [String],
//     date: { type: Date,default: Date.now},
//     isPublished: Boolean
//   });

  const anySchema= new mongoose.Schema({
    name: { 
        type: String,
        required: true,
        //these all validators are present in mongoose
        // minlength:5,
        // maxlength:50,
        // enum:['a','b','c'],
        // match:/pattern/
    },
    author: { type: String,required: true},
    tags: [String],
    date: { type: Date,default: Date.now},
    isPublished: Boolean
  });
  
  const AnyModelClass=mongoose.model('anymodel',anySchema)
  //we want a collection called anymodels so here we give a singular name anymodel
  //this function returns a class which is in this case AnyModel
  
  async function createCourse(){
    const anyModelObject= new AnyModelClass({
        //name: 'Angular 7',
        author: 'Farman Abbasi',
        tags:['Angular','MEAN','A7'],
        isPublished:true
      });
      try{
        //await anyModelObject.validate();  
         const result= await anyModelObject.save();
         console.log(result)
      }
      catch(e){
            console.log(e.message);
      }
     
  }
  createCourse();

  //querying 
  async function getCourses(){
      const any=await AnyModelClass
  .find({name: /.*Angular.*/})
  console.log(any)    
  }

  //getCourses()

  async function updateCourse(id){
    //update first
    //when dont know what to update
    const course= await AnyModelClass
    .update({_id: id},
            { $set : 
                { author: 'Farman'}
            });
            console.log(course)
    }
  
  //updateCourse("5e0de55def231676188177a0")
