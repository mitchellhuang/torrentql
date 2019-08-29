import React from 'react';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries} from 'react-vis';
import { useQuery } from '@apollo/react-hooks';
import { GET_BILLING_USAGE_QUERY } from '../apollo/queries';

const generatePoints = (billingUsages) => {
  const points = [];
  for (let idx = 0; idx < 60; idx += 1) {
    const date1 = new Date(new Date().getTime() - (60 - idx) * 60000);
    const date2 = new Date(new Date().getTime() - (60 - idx - 1) * 60000);
    let sum = 0;
    billingUsages.forEach((billingUsage) => {
      const createdAt = new Date(billingUsage.createdAt);
      if (createdAt > date1 && createdAt <= date2) {
        console.log('eggs');
        sum += billingUsage.diskUsage;
      }
    });
    points[idx] = { x: date1, y: sum };
  }
  console.log(points);
  return points;
};

const Graph = () => {
  const { data: { getBillingUsage } } = useQuery(GET_BILLING_USAGE_QUERY);
  console.log(getBillingUsage);
  let points;
  if (getBillingUsage) {
    points = getBillingUsage.map((billingUsage) => ({
      x: new Date(billingUsage.createdAt).getTime(),
      y: billingUsage.diskUsage / 100000,
    }));
  }
  return (
    <XYPlot
      width={300}
      height={300}
      xType={'time'}>
      <HorizontalGridLines />
      <LineSeries
        data={points && generatePoints(getBillingUsage)}/>
      <XAxis />
      <YAxis />
    </XYPlot>
  );
};

export default Graph;
