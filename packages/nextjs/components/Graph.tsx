import React from 'react';
import { VictoryChart, VictoryLine } from 'victory';
import { useQuery } from '@apollo/react-hooks';
import { BILLING_USAGE_QUERY } from '../apollo/queries';

const Graph = () => {
  const data = useQuery(BILLING_USAGE_QUERY);
  console.log(data);
  return (
    <VictoryChart animate={{
      duration: 1700,
      onLoad: { duration: 200 },
    }}>
      <VictoryLine
        data={[
          { x: 1, y: 2 },
          { x: 2, y: 3 },
          { x: 3, y: 5 },
          { x: 4, y: 4 },
          { x: 5, y: 6 },
        ]}
      />
    </VictoryChart>
  );
}

export default Graph;
