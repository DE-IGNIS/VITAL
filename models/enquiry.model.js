let mongoose = require("mongoose");

let userEnquirySchema = mongoose.Schema({
  floor: {
    type: Number,
    required: true,
  },
  cabin: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  school: {
    type: String,
    required: true,
  },
});

let enquiryModel1 = mongoose.model("academicBlock1", userEnquirySchema);
let enquiryModel2 = mongoose.model("academicBlock2", userEnquirySchema);

module.exports = {
  enquiryModel1,
  enquiryModel2,
};