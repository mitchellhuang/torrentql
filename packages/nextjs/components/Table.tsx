import React from 'react';
import classNames from 'classnames';
import colors from '../lib/colors';

interface ITRow extends React.HTMLProps<HTMLDivElement> {
  height?: number;
  header?: boolean;
  selected?: boolean;
  pointer?: boolean;
  hover?: boolean;
  bold?: boolean;
  noPad?: boolean;
}

const TRow: React.FunctionComponent<ITRow> = ({
  children,
  className,
  header,
  selected,
  height,
  pointer,
  hover,
  bold,
  noPad,
  onClick,
}) => (
  <div
    className={classNames('row', { header, selected, [className]: className })}
    onClick={onClick}
    onKeyPress={onClick as any}
    role="button"
    tabIndex={0}
  >
    {children}
    <style jsx>{`
      .row {
        display: flex;
        flex-direction: row;
        min-width: 1000px;
        box-sizing: border-box;
        color: ${colors.black};
        background-color: ${colors.white};
        cursor: ${pointer ? 'pointer' : 'default'};
        outline: none;
        font-weight: ${bold ? 600 : 400};
        height: ${height ? height : 38}px;
        border-top: 1px solid ${colors.border};
        padding: ${noPad ? '0' : '0 15px'};
      }
      .row:hover {
        background-color: ${hover ? colors.dashboardBg : colors.white};
      }
      .header {
        font-size: 16px;
        border-color: transparent;
      }
    `}</style>
  </div>
);

interface ITRow extends React.HTMLProps<HTMLDivElement> {
  children: any;
  flex?: number;
}

const TCell: React.FunctionComponent<ITRow> = ({ flex, children }) => (
  <div className="t-cell">
    <span className="children">
      {children}
    </span>
    <style jsx>{`
      .t-cell {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;
        flex: ${flex || 1};
        overflow: auto;
      }
      .t-cell:not(:last-child) {
        margin-right: 10px;
      }
      .children {
        flex: 1;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    `}</style>
  </div>
);

export { TRow, TCell };
