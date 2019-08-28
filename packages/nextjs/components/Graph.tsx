import React from 'react';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries} from 'react-vis';
import { useQuery } from '@apollo/react-hooks';
import { GET_BILLING_USAGE_QUERY } from '../apollo/queries';

const Graph = () => {
  const { data: { getBillingUsage } } = useQuery(GET_BILLING_USAGE_QUERY);
  console.log(getBillingUsage);
  let points;
  if (getBillingUsage) {
    points = getBillingUsage.map((billingUsage) => ({
      x: new Date(billingUsage.createdAt).getTime(),
      y: billingUsage.diskUsage / 100000000,
    }));
  }
  return (
    <XYPlot
      width={300}
      height={300}>
      <HorizontalGridLines />
      <LineSeries
        data={points || [
          {x: 1, y: 10},
          {x: 2, y: 5},
          {x: 3, y: 15}
        ]}/>
      <XAxis />
      <YAxis />
    </XYPlot>
  );
};

export default Graph;
