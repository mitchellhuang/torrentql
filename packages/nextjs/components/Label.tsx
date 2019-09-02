import React from 'react';
import Color from 'color';
import colors from '../lib/colors';

interface ILabel {
  color?: Color;
}

const Label: React.FunctionComponent<ILabel> = ({
  children,
  color,
}) => (
  <div>
    {children}
    <style jsx>{`
      div {
        display: inline-block;
        padding: 5px;
        color: ${colors.white};
        background-color: ${color || colors.gray};
        border-radius: 5px;
      }
    `}</style>
  </div>
);

export default Label;
