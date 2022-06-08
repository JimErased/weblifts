import Head from 'next/head'
import {Bar} from 'react-chartjs-2'
import Chart from 'chart.js/auto';
import React, { useState } from 'react';
import json from '../lifts.json';

const exercises = Object.keys(json)
const exerciseCount = []

for (let i in json) {
  var count = Object.keys(json[i]).length
  exerciseCount.push(count)
}

function plotOneRM(exercise) {
  var oneRM = []
  var dates = []
  // console.log(exercise)

  var heighestWeight = 0
  if (exercises.includes(exercise)) {
    // console.log(exercise)
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

      // console.log(oneRM)
      // console.log(dates)

      const graphData = {
          exercise: exercise,
          labels: dates,
          datasets: [
            {
              label: 'Height Weight Lifted in Exercise',
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
          ],
          options: {
            hover: {
              mode: 'x'
            }
          }
      };
      return graphData
  } else {
      return
  }


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
    },
  ],
  options: {
    scaleShowValues: true,
    scales: {
      xAxes: [{
        ticks: {
          maxRotation: 90,
          minRotation: 30,
          padding: 1,
          autoSkip: false,
          fontSize: 10
        }
      }]
    }
  }
};

const bar = 'myBarGraph'
const myBarGraph = new Chart(bar, {
  type: 'bar',
  data: data,
  options: {
    maintainAspectRatio: false,
    responsive: true,
    onClick: function clickHandler(evt) {
      const points = this.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, true);
  
      if (points.length) {
          const firstPoint = points[0];
          const label = this.data.labels[firstPoint.index];
          const value = this.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];
          console.log("ONCLICK " + label)
          updateData(myChart, label)
      }
    }
  }
});

const ctx = 'myChart'
const myChart = new Chart(ctx, {
  type: 'line',
  data: plotOneRM(exercises[0]),
  options: {
    maintainAspectRatio: false,
    responsive: true
  }
});
var exerciseTitle = myChart.data.exercise

function updateData(chart, exerciseName) {
  // console.log(myChart)
  // console.log(exerciseName)
  // console.log(exercises[exerciseName])
  var newData = plotOneRM(exerciseName)
  // console.log(newData)
  chart.config.data = newData
  exerciseTitle = myChart.data.exercise
  var titleId = document.getElementById('chartTitle')
  titleId.innerText = exerciseTitle
  chart.update();
}

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Weblifts</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Welcome to <a href="https://jimerased.com">Weblifts</a>
        </h1>

        <p className="description">
          Graphing your gains.
        </p>

        <div className="grid">
         <canvas id="myBarGraph" width="800" height="600"></canvas>
        </div>
        <h2 id="chartTitle">{exerciseTitle}</h2>
        <div className="grid">
          <canvas id="myChart" width="800" height="600"></canvas>
        </div>
        <div className="grid">
         <button onClick={() => updateData(myChart, 2)}>Plot New Exercise</button>
        </div>
      </main>

      <footer>
        <a
          href="https://jimerased.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel" className="logo" />
        </a>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width:100%;
        }

        canvas{
          height: 600px;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 3rem;
          width:80%;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
