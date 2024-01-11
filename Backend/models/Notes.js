const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const NotesSchema= new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
        // ref:'user',
        // ref:'user'
    },
    title:{type:String,required:[true,"title is required"]},
    description:{type:String,required:true,unique:true},
    tag:{type:String,required:[true,"tag is required"],default:"General"},
    date:{
        type:Date,
        default:Date.now
    }
})
module.exports = mongoose.model("notes",NotesSchema);