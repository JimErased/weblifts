// Import React and the chart logic

import React from 'react'
import {Bar} from 'react-chartjs-2'
import Chart from 'chart.js/auto';
import {updateData} from './index'

// Get the data from the lifts JSON file
import json from '../lifts.json';

const exercises = Object.keys(json)
const exerciseCount = []

// Get the total of each exercise performed
for (let i in json) {
    var count = Object.keys(json[i]).length
    exerciseCount.push(count)
}

const data = {
    labels: exercises,
    datasets: [
      {
        label: 'Number of Lifts',
        backgroundColor: 'rgba(11,227,210 )',
        borderColor: 'rgb(72, 66, 245)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,0,54,0.4)',
        hoverBorderColor: 'rgb(0,88,101)',
        data: exerciseCount
      }
    ]
  };

export default () => (
    <div id="graph">
      <h2>Total Lifts</h2>
      <Bar
        data={data}
        width={1000}
        height={600}
        options={{
          maintainAspectRatio: true,
          responsive: false,
          onClick: function clickHandler(evt) {
            const points = this.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, true);
        
            if (points.length) {
                const firstPoint = points[0];
                const label = this.data.labels[firstPoint.index];
                const value = this.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];
                updateData(myChart, label)
            }
          }
        }}
      />
    </div>
  );