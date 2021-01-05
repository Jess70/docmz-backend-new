const readXlsxFile = require("read-excel-file/node");
const Practise = require("./doctor/practice.model");
const faker = require("faker");
const fs = require("fs");

const path = require("path");
const availability = require("./doctor/availability.controller");
// const fs = require('fs');
//joining path of directory
// const directoryPath = path.join(__dirname, 'Documents');
//passsing directoryPath and callback function
// fs.readdir("/home/dev-aman7/Desktop/xl/media", function(err, files) {
// 	//handling error
// 	if (err) {
// 		return console.log("Unable to scan directory: " + err);
// 	}
// 	//listing all files using forEach
// 	files.forEach(function(file) {
// 		// Do whatever you want to do with the file
// 		console.log(file);
// 	});
// });

// console.log(__filename);
// fs.readFile("/home/dev-aman7/Desktop/xl/media/image1.jpeg", function(
// 	err,
// 	data[i]
// ) {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		var newPath = __dirname + "/public/image123.jpeg";
// 		fs.writeFile(newPath, data[i], function(err) {
// 			console.log(err);
// 		});
// 	}
// 	console.log(data[i]);
// });
// File path.
readXlsxFile("doclist.xlsx").then(async data => {
  console.log(data);
  let i = 0;
  for (let i = 1; i < data.length; i++) {
    console.log(i);
    if (data[i] !== undefined && data[i][0] !== null) {
      let file = fs.readFileSync(
        "/home/dev-aman7/Desktop/xl/media/image" + data[i][0] + ".jpeg"
      );

      let imageName = "image" + Date.now() + ".jpeg";

      let newPath = __dirname + "/public/doctors/image/" + imageName;

      let d2 = fs.writeFileSync(newPath, file);

      console.log(data[i]);

      let doc = {
        npi: faker.random.number(),
        name: data[i][2],
        phone: data[i][3],
        email: data[i][4],
        payToAddress: data[i][5],
        picture: ["/doctors/image/image" + data[i][0] + ".jpeg"],
        city: faker.address.city()
      };

      console.log("doctor");
      let doctor = new Practise(doc);
      let d = await doctor
        .save()
        .then(result => {
          console.log("in doctor");
          availability.getTimeSlots(result._id);
          // console.log(result);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
});
