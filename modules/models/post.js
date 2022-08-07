const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamps = require("mongoose-timestamp");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const PostSchema = new Schema({
  title: { type: String, required: true },
  tag: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
});
//
PostSchema.plugin(timestamps);
PostSchema.plugin(aggregatePaginate);
//
module.exports = mongoose.model("Post", PostSchema);
