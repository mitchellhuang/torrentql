import React from 'react';
import classNames from 'classnames';

interface ITRow extends React.HTMLProps<HTMLDivElement> {
  header?: boolean;
  selected?: boolean;
}

const TRow: React.FunctionComponent<ITRow> = ({
  children,
  className,
  header,
  selected,
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
        box-sizing: border-box;
        color: var(--black);
        background-color: var(--white);
        cursor: pointer;
        outline: none;
        font-weight: 400;
        height: 40px;
        border-top: 1px solid var(--button-hover);
      }
      .row:not(.header):hover {
        background-color: var(--toolbar-gray);
      }
      .header {
        cursor: default;
        font-size: 16px;
        border-top: 0;
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
        padding: 0 10px;
        overflow: hidden;
      }
      .children {
        flex: 1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    `}</style>
  </div>
);

export { TRow, TCell };
