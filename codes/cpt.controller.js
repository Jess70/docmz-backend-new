const db = require('_helpers/db'),
    indexCpt = db.indexCpt,
    cpt = db.Cpt,
    ICD10 = db.ICD10,
    ICD10Index = db.ICD10Index,
    Speciality = db.Speciality,
    express = require('express'),
    app = express(),
    request = require('request'),
    csvParser = require('csv-parse'),
    fs = require('fs');

let filePathForCpt = "./codes/cpt.csv"
let filePathForCptIndex = "./codes/cptIndex.csv"
let filePathForICD10 = "./codes/icd10.csv"
let filePathForICD10Index = "./codes/icd10Index.csv"
let filePathForDiseases = "./codes/diseases.csv"


//Function to upload the CPT codes from the CSV file to the MongoDb Database 
function parseCsvForCpt(req, res) {

    let duplicate = 0;
    let entries = 0;
    fs.readFile(filePathForCpt, {
        encoding: 'utf-8'
    }, async function (err, csvData) {
        if (err) {
            console.log(err);
        }

        csvParser(csvData, {
            delimiter: ','
        }, async function (err, data) {
            if (err) {
                console.log(err);
            } else {
                let count = data.length;
                let mapper = new Promise((resolve, reject) => {
                    data.map(el => {
                        let Cpt = new cpt({
                            codeCategory: el[0],
                            cptCode: el[1],
                            codeDescription: el[2]
                        })
                        Cpt.save(function (err) {
                            if (err) {
                                if (err.name === 'MongoError' && err.code === 11000) {
                                    // Duplicate username
                                    duplicate++;

                                } else {

                                    // Some other error
                                    entries++;

                                }
                            }


                        })
                    })

                    if (count === (entries + duplicate)) {

                        resolve();
                    }

                })

                mapper.then(res.json({
                    success: true
                }))


            }
        })
    });

}

//Function to upload the Index CPT codes from the CSV file to the MongoDb Database 
function parseCsvForCptIndex(req, res) {

    let duplicate = 0;
    let entries = 0;
    fs.readFile(filePathForCptIndex, {
        encoding: 'utf-8'
    }, async function (err, csvData) {
        if (err) {
            console.log(err);
        }

        csvParser(csvData, {
            delimiter: ','
        }, async function (err, data) {
            if (err) {
                console.log(err);
            } else {
                let count = data.length;
                let mapper = new Promise((resolve, reject) => {

                    data.map(el => {
                        let Cpt = new indexCpt({
                            productCode: el[0],
                            operativeProcedure: el[1],
                            procedureDescription: el[2]

                        })

                        Cpt.save(function (err) {
                            if (err) {
                                if (err.name === 'MongoError' && err.code === 11000) {
                                    // Duplicate username
                                    duplicate++;

                                } else {

                                    // Some other error
                                    entries++;

                                }
                            }


                        })
                    })

                    if (count === (entries + duplicate)) {

                        resolve();
                    }

                })

                mapper.then(res.json({
                    success: true
                }))


            }
        })
    });

}

//Function to upload the ICD10 Codes 
function parseCsvForICD10(req, res) {

    let duplicate = 0;
    let entries = 0;
    fs.readFile(filePathForICD10, {
        encoding: 'utf-8'
    }, async function (err, csvData) {
        if (err) {
            console.log(err);
        }

        csvParser(csvData, {
            delimiter: ','
        }, async function (err, data) {
            if (err) {
                console.log(err);
            } else {
                let count = data.length;
                let mapper = new Promise((resolve, reject) => {
                    data.map(el => {
                        let Cpt = new ICD10({
                            productCodeCategory: el[0],
                            pcsCode: el[1],
                            procedureDescription: el[2]
                        })
                        Cpt.save(function (err) {
                            if (err) {
                                if (err.name === 'MongoError' && err.code === 11000) {
                                    // Duplicate username
                                    duplicate++;

                                } else {

                                    // Some other error
                                    entries++;

                                }
                            }


                        })
                    })

                    if (count === (entries + duplicate)) {

                        resolve();
                    }

                })

                mapper.then(res.json({
                    success: true
                }))


            }
        })
    });

}

//Function to upload the index ICD10 Codes
function parseCsvForICD10Index(req, res) {

    let duplicate = 0;
    let entries = 0;
    fs.readFile(filePathForICD10Index, {
        encoding: 'utf-8'
    }, async function (err, csvData) {
        if (err) {
            console.log(err);
        }

        csvParser(csvData, {
            delimiter: ','
        }, async function (err, data) {
            if (err) {
                console.log(err);
            } else {
                let count = data.length;
                let mapper = new Promise((resolve, reject) => {

                    data.map(el => {
                        let Cpt = new ICD10Index({
                            productCodeCategory: el[0],
                            operativeProcedure: el[1],
                            procedureDescription: el[2]

                        })

                        Cpt.save(function (err) {
                            if (err) {
                                if (err.name === 'MongoError' && err.code === 11000) {
                                    // Duplicate username
                                    duplicate++;

                                } else {

                                    // Some other error
                                    entries++;

                                }
                            }


                        })
                    })

                    if (count === (entries + duplicate)) {

                        resolve();
                    }

                })

                mapper.then(res.json({
                    success: true
                }))


            }
        })
    });

}

//Function to add the diseases to the database 
function parseCsvForDiseases(req, res) {

    let duplicate = 0;
    let entries = 0;
    fs.readFile(filePathForDiseases, {
        encoding: 'utf-8'
    }, async function (err, csvData) {
        if (err) {
            console.log(err);
        }

        csvParser(csvData, {
            delimiter: ','
        }, async function (err, data) {
            if (err) {
                console.log(err);
            } else {
                let count = data.length;
                // console.log(data)
                let mapper = new Promise((resolve, reject) => {

                    data.map(el => {
                        
                        let arrayData = [].concat(el)
                        let modifiedArray = arrayData.splice(0,1)
                        let diseases = arrayData.slice()
                      
                        let Cpt = new Speciality({
                            speciality: el[0],
                            diseases

                        })

                        Cpt.save(function (err) {
                            if (err) {
                                if (err.name === 'MongoError' && err.code === 11000) {
                                    // Duplicate username
                                    duplicate++;

                                } else {

                                    // Some other error
                                    entries++;

                                }
                            }


                        })
                    })

                    if (count === (entries + duplicate)) {

                        resolve();
                    }

                })

                mapper.then(res.json({
                    success: true
                }))


            }
        })
    });

}

//Function to list all the diseases name along with speiclaity name
function getAllDiseases(req, res){
    Speciality.find().then((data) => res.json({status: true, data})).catch((error) => res.json({status: false, error}))
}



//Exporting all the functions
module.exports = {
    parseCsvForCpt,
    parseCsvForCptIndex,
    parseCsvForICD10,
    parseCsvForICD10Index,
    parseCsvForDiseases,
    getAllDiseases

};
