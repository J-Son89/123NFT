import React, { useMemo } from "react";
import { orderBy } from 'lodash'
import styles from './BarChart.module.css'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const backgroundColors = [
  'rgba(250, 125, 9,1)',
  'rgba(255, 99, 132, 0.2)',
  'rgba(255, 159, 64, 0.2)',
  'rgba(255, 205, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(201, 203, 207, 0.2)']


const getDataFromEntries = (trait, entries) => {
  const labels = orderBy(entries, ([x, y]) => y, 'desc').map(([x, y]) => x)
  const values = orderBy(entries, ([x, y]) => y, 'desc').map(([x, y]) => y)

  return ({
    labels: labels,
    datasets: [{
      data: values,
      label: trait,
      backgroundColor: backgroundColors[0]
    }]

  })
}

export function BarChart({ trait, tableData }) {
  const data = useMemo(() => {
    return getDataFromEntries(trait, Object.entries(tableData[trait]));
  }, [tableData]);



  return (
    <Bar
      width={'fill-available'}
      height={'auto'}
      options={{
        plugins: {
          legend: {
            position: 'top',
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          }
        }
      }}

      data={data}
      type='bar'
    />
  );
}
