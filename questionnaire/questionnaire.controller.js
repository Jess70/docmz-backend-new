const question = require("./question.model");
const practice = require("../doctor/practice.model");

const addQuestion = async (req, res) => {
  console.log("I came in here");
  let options = JSON.parse(req.body.option);
  console.log(req.body);
  // let children = JSON.parse(req.body.children);
  let qus = new question({
    ...req.body,
    option: options,
    superQuestion: req.body.superQuestion || false,
    speciality: req.body.specialty || "NA",
    category:req.body.category
    // title: req.body.title,
    // option: options,
    // speciality: req.body.speciality || "NA",
    // superQuestion: req.body.superQuestion || false,
    // parent: req.body.parent || "",
    // optionText: req.body.optionText || ""
  });
  console.log(options);
  if (req.body.parent === undefined) {
    qus
      .save()
      .then(question => {
        practice
          .findByIdAndUpdate(req.body.id, { $push: { question: qus._id } })
          .then(result => {
            res.status(200).json({
              status: true,
              message: "successfully added question",
              data: question
            });
          })
          .catch(err => {
            res.status(500).json({
              status: false,
              message: err
            });
          });
        // let data = new questionnaire({
        // 	author: "aman",
        // 	title: "something",
        // 	question: qus._id
        // });
        // data
        // 	.save()
        // 	.then(() => {
        // 		res.json({
        // 			message: "question saved successfully",
        // 			code: 0
        // 		});
        // 	})
        // 	.catch(err => {
        // 		res.json({
        // 			message: err,
        // 			code: 1
        // 		});
        // 	});
      })
      .catch(err => {
        res.status(500).json({
          status: false,
          message: err
        });
      });
  } else {
    qus
      .save()
      .then(() => {
        question
          .findOneAndUpdate(
            { _id: req.body.parent, "option._id": req.body.optionId },
            {
              $push: { "option.$.linkedQuestion": qus._id }
            }
          )
          .then((data) => {
            res.json({
              status: true,
              message: "all done succesfully added with link",
               data
            });
          })
          .catch(err => {
            res.json({
              status: false,
              message: err
            });
          });
      })
      .catch(err => {
        res.json({
          status: false,
          message: err
        });
      });
  }
  // res.send("I am here in addQuestion");
};

const updateQuestion = async (req, res) => {
  // let d = await question.findOne({ _id: req.body.id });
  // console.log(d);
  // res.send(d);
  if (typeof req.body.option === "string") {
    req.body.option = JSON.parse(req.body.option);
  }

  question
    .findOneAndUpdate({ _id: req.body.id }, req.body)
    .then(result => {
      res.status(200).json({
        message: "question updated successfully",
        status: true,
        data: result
      });
    })
    .catch(err => {
      res.status(500).json({
        message: err,
        status: false
      });
    });
};

const getQuestion = (req, res) => {
  console.log("getQuestions");
  // question
  // 	.findById("5e96f129e06d8c066f009951")
  // 	.populate({
  // 		path: "option.linkedQuestion",
  // 		populate: {
  // 			path: "option.linkedQuestion",
  // 			populate: "option.linkedQuestion",
  // 		},
  // 	})
  // 	.then((result) => {
  // 		res.json({
  // 			message: "Success message",
  // 			code: 0,
  // 			data: result,
  // 		});
  // 	})
  // 	.catch((err) => {
  // 		res.json({
  // 			message: err,
  // 			code: 1,
  // 		});
  // 	});

  practice
    .findById(req.body.id)
    .select("question")
    .then(async result => {
      let data = [];
      for await (const doc of result.question) {
        let d = await question.findById(doc).populate({
          path: "option.linkedQuestion",
          populate: {
            path: "option.linkedQuestion",
            populate: "option.linkedQuestion"
          }
        });
        data.push(d);
      }
      res.status(200).json({
        status: true,
        message: "successfully",
        question: data
      });
    })
    .catch(err => {
      res.status(500).json({
        status: false,
        message: err
      });
    });
  // practice
  // 	.findOne({ _id: req.body.id })
  // 	.select("question")
  // 	.then(result => {
  // 		console.log(result);
  // 		question
  // 			.findOne({ _id: result.question })
  // 			.populate({
  // 				path: "option.linkedQuestion",
  // 				populate: "option.linkedQuestion"
  // 			})
  // 			.populate({ path: "children", populate: "children" })
  // 			.then(result => {
  // 				res.json({
  // 					message: "Success",
  // 					code: 0,
  // 					data: result
  // 				});
  // 			})
  // 			.catch(err => {
  // 				res.json({
  // 					message: err,
  // 					code: 1
  // 				});
  // 			});
  // 	})
  // 	.catch(err => {
  // 		res.json({
  // 			message: err,
  // 			code: 1
  // 		});
  // 	});
};

const deleteRoot = (req, res) => {
  practice
    .findOneAndUpdate(
      { _id: req.body.docId },
      { $pull: { question: req.body.questionId } },
      { new: true }
    )
    .then(result => {
      console.log(result);
      res.status(200).json({
        status: true,
        message: "Delete root question"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        status: false,
        message: err
      });
    });
};

const deleteQuestion = async (req, res) => {
  let d1 = await question.deleteOne({ _id: req.body.id });

  let d2 = await question.findOneAndUpdate(
    { _id: req.body.parent, "option._id": req.body.optionId },
    {
      $pull: { "option.$.linkedQuestion": req.body.id }
    }
  );

  Promise.all([d1, d2])
    .then(result => {
      // console.log(result);
      res.status(200).json({
        status: true,
        message: "successfully deleted question"
      });
    })
    .catch(err => {
      res.status(500).json({
        status: false,
        message: err
      });
    });

  // question
  // 	.deleteOne({ _id: req.body.id })
  // 	.then(() => {
  // 		res.status(200).json({
  // 			message: "successfully deleted question"
  // 		});
  // 	})
  // 	.catch(err => {
  // 		res.status(500).json({
  // 			message: err
  // 		});
  // 	});
};

module.exports = {
  addQuestion,
  getQuestion,
  updateQuestion,
  deleteQuestion,
  deleteRoot
};
