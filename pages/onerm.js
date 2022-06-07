import React from 'react'
import json from '../lifts.json';
import {Line} from 'react-chartjs-2';
const exercises = Object.keys(json)

function plotOneRM(exercise) {
    var oneRM = []
    var dates = []

    var heighestWeight = 0
    if (exercises.includes(exercise)) {
        dates = Object.keys(json[exercise])
        for (let workout in json[exercise]) {
            //console.log(json[exercise][workout])
            // 1RM = first in index
            if (json[exercise][workout][0]["weight"] == '') {
                heighestWeight = 0
            } else {
                heighestWeight = json[exercise][workout][0]["weight"]
            }
            //console.log(heighestWeight)
            
            for (let set in json[exercise][workout]) {
                //if  current is > 1rm change
                if(json[exercise][workout][set]["weight"] > heighestWeight) {
                    heighestWeight = json[exercise][workout][set]["weight"]
                }

            }
            // Push to Array
            oneRM.push(heighestWeight)

        }

        oneRM = oneRM.reverse()
        dates = dates.reverse()

        const graphData = {
            exercise: exercise,
            labels: dates,
            datasets: [
              {
                label: exercises,
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: oneRM
              }
            ]
        };
        return graphData
    } else {
        return
    }


}

// Set default
var data = plotOneRM(exercises[0])
console.log(data)

export {plotOneRM, json, exercises}
export default () => (
    <div>
      <h2>{data['exercise']}</h2>
      <Line
        data={data}
        width={1000}
        height={600}
        options={{
            maintainAspectRatio: true,
            responsive: false
          }}
      />
    </div>
  );

//TESTING:
/*
var randomExercise = Math.floor(Math.random() * exercises.length)

var datum = plotOneRM(exercises[randomExercise])
console.log(datum)
*/