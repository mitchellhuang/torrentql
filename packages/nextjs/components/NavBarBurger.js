import React from 'react';

const NavBarBurger = ({ open }) => {
  return (
    <div>
      <a className={open ? 'nav-toggle active' : 'nav-toggle'} href="#">
        <span />
      </a>
      <style jsx>{`
        .nav-toggle span, .nav-toggle span:before, .nav-toggle span:after {
          cursor: pointer;
          border-radius: 1px;
          height: 1.5px;
          width: 35px;
          background: black;
          position: absolute;
          display: block;
          content: '';
        }
        .nav-toggle span:before {
          top: -10px;
        }
        .nav-toggle span:after {
        bottom: -10px;
        }
        .nav-toggle span, .nav-toggle span:before, .nav-toggle span:after {
          transition: all 500ms ease-in-out;
        }
        .nav-toggle.active span {
          background-color: transparent;
        }
        .nav-toggle.active span:before, .nav-toggle.active span:after {
          top: 0;
        }
        .nav-toggle.active span:before {
          transform: rotate(45deg);
        }
        .nav-toggle.active span:after {
          transform: rotate(-45deg);
        }
        @media(min-width: 768px) {
          .nav-toggle {
            visibility: hidden;
            height: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default NavBarBurger;
