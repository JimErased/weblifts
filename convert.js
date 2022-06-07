const csvFilePath='/usb/hdd/Share/hevy/workout_data.csv'
const jsonFilePath='./weblifts/lifts.json'
const fs = require('fs');
const csv=require('csvtojson')
var newJson = {}

csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
    console.log("CSV retried, starting conversion:")
    var totalLifts = 0

    for (let i in jsonObj) {
        var date = jsonObj[i]["start_time"]
        var excercise = jsonObj[i]["exercise_title"]
        var setIndex = jsonObj[i]["set_index"]
        var weight = jsonObj[i]["weight_kg"]
        var reps = jsonObj[i]["reps"]

        date = date.replace(/\s+/g, '')

        if (newJson[excercise] == undefined) {
            newJson[excercise] = {
                [date]: {}
            }
        }

        if (newJson[excercise][date] == undefined) {
            newJson[excercise][date] = {
                [setIndex]: {}
            }
        }

        if (newJson[excercise][date][setIndex] == undefined) {
            newJson[excercise][date][setIndex] = {
                    weight: weight,
                    reps: reps
            }
        }

        if (setIndex == 0) {
            newJson[excercise][date][setIndex] = {
                weight: weight,
                reps: reps
            }
        }

        totallifts = i
    }

    var lifts = JSON.stringify(newJson, null, 2)

    fs.writeFile(jsonFilePath, lifts, err => {
        if (err) {
          console.error(err);
        }
        // file written successfully
        console.log("File updated with " + totaLifts + " lifts")
      });
})