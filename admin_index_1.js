let express = require("express");
let mongoose = require("mongoose");
const { Mongoose } = require("mongoose");
const {enquiryModel1} = require("./models/enquiry.model");

require("dotenv").config();

let app = express();

app.use(express.json());

// connect to mongoose
app.post("/api/faculty-insert/1", (req, res) => {
  let { floor, cabin, name, email, school } = req.body;

  let enquiry = new enquiryModel1({
    floor: floor,
    cabin: cabin,
    name: name,
    email: email,
    school: school,
  });
  enquiry
    .save()
    .then(() => {
      res.status(201).send({
        status: "success",
        msg: "Enquiry Saved",
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        msg: "Error while saving enquiry",
        error: err.message,
      });
    });
});

app.get("/api/faculty-list/1", async (req, res) => {
  let enquiryList = await enquiryModel1.find();
  res.status(200).json({
    msg: "Enquiry List",
    data: enquiryList,
  });
});

app.delete("/api/faculty-delete/1/:id", async (req, res) => {
  let enquiryId = req.params.id;

  let delEnquiry = await enquiryModel1.deleteOne({ _id: enquiryId });
  res.send({
    status: 1,
    msg: "Enquiry Deleted",
    id: enquiryId,
    delRes: delEnquiry,
  });
});

app.put("/api/faculty-update/1/:id", async (req, res) => {
  let enquiryId = req.params.id;
  let { floor, cabin, name, email, school } = req.body;

  let updateObj = {
    floor: floor,
    cabin: cabin,
    name: name,
    email: email,
    school: school,
  };
  let updateRes = await enquiryModel1.updateOne({ _id: enquiryId }, updateObj);

  res.send({
    status: 1,
    msg: "Enquiry Updated",
    response: updateRes,
  });
});

mongoose.connect(process.env.DBURL).then(() => {
  console.log("Connected to MongoDB");
  app.listen(process.env.PORT, () => {
    console.log("Server-Mongoose-listening on " + process.env.PORT);
  });
});
