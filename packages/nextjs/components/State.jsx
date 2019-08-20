import React from 'react';
import { AlertCircle, Loader } from 'react-feather';

const LoadingState = () => (
  <div>
    <Loader size={30} />
    <h4 className="mt-2">Loading</h4>
    <style jsx>{`
      div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 15px 0;
        color: var(--dark-gray);
      }
    `}</style>
  </div>
);

const EmptyState = ({
  message
}) => (
  <div>
    <AlertCircle size={30} />
    <h4 className="mt-2">{message}</h4>
    <style jsx>{`
      div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 15px 0;
        color: var(--dark-gray);
      }
    `}</style>
  </div>
);

export { LoadingState, EmptyState };
