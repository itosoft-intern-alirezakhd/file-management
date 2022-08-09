const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp')
const aggregatePaginate = require('mongoose-aggregate-paginate-v2')


const FileSchema = new Schema({
  slug : {type : String ,unique : true},
  title: { type: String, required: true , trim : true  },
  text: { type: String, required: true  },
  format: { type: String , default : 'txt' , trim : true},
  isPrivate : {type : Boolean , required : true , default : false,  trim : true},
  password: { type: String , default : '' },
  expired: { type: Date},
  userId: { type: Schema.Types.ObjectId, ref: "User" }
})
//
FileSchema.plugin(timestamps)
FileSchema.plugin(aggregatePaginate)


//
module.exports = mongoose.model('File', FileSchema);
