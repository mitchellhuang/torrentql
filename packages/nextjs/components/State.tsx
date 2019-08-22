import React from 'react';
import { AlertCircle, Loader } from 'react-feather';
import colors from '../lib/colors';

interface IState {
  noPad?: boolean;
}

interface IEmptyState extends IState {
  message: string;
}

const LoadingState: React.FunctionComponent<IState> = ({
  noPad,
}) => (
  <div>
    <Loader size={30} />
    <h4 className="mt-2">Loading</h4>
    <style jsx>{`
      div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: ${noPad ? '0' : '15px 0'};
        color: ${colors.darkGray};
      }
    `}</style>
  </div>
);

const EmptyState: React.FunctionComponent<IEmptyState> = ({
  message,
  noPad,
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
        padding: ${noPad ? '0' : '15px 0'};
        color: ${colors.darkGray};
      }
    `}</style>
  </div>
);

export { LoadingState, EmptyState };
