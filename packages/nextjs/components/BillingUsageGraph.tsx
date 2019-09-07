import React from 'react';
import { XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries } from 'react-vis';

const MINUTES_IN_HOUR = 60;
const MILLISECONDS_IN_MINUTE = 60000;

const generatePoints = (billingUsages, key) => {
  const points = [];
  const currTime = new Date().getTime();
  for (let idx = 0; idx < MINUTES_IN_HOUR; idx += 1) {
    const date1 = new Date(currTime - (MINUTES_IN_HOUR - idx + 1) * MILLISECONDS_IN_MINUTE);
    const date2 = new Date(currTime - (MINUTES_IN_HOUR - idx) * MILLISECONDS_IN_MINUTE);
    let sum = 0;
    billingUsages.forEach((billingUsage) => {
      const createdAt = new Date(billingUsage.createdAt);
      if (createdAt > date1 && createdAt <= date2) {
        sum += billingUsage[key] / 1000000;
      }
    });
    points[idx] = { x: date1, y: sum };
  }
  return points;
};

const BillingUsageGraph = ({ billingUsages, graphType }) => {
  return (
    <XYPlot
      margin={{ left: 65 }}
      width={300}
      height={300}
      xType={'time'}>
      <HorizontalGridLines />
      <LineSeries
        data={generatePoints(billingUsages, graphType)}/>
      <XAxis />
      <YAxis />
    </XYPlot>
  );
};

export default BillingUsageGraph;
