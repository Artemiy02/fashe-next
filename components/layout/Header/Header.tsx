import 'styles/header.scss';
import Logo from 'styles/icons/logo.png';
import authSelector from 'selectors/auth';
import Logout from 'styles/icons/logout.png';
import React, { FunctionComponent } from 'react';
import IconHeader from 'styles/icons/icon-header-01.png';
import RegisterIconHeader from 'styles/icons/register1.png';
import { logoutUser } from 'actions/Authorize';
import NavLink from 'components/common/NavLink';
import Link from 'next/link';

import { useDispatch, useSelector } from 'react-redux';
import CartIcon from './components/CartIcon';

const Header: FunctionComponent = () => {
  const dispatcher = useDispatch();

  const auth = useSelector(authSelector);

  const authLink = (
    <div className="header-icons">
      <button
        type="button"
        className="header-wrapicon1 dis-block"
        onClick={() => dispatcher(logoutUser())}>
        <img src={Logout} className="header-icon2 w-27" alt="LOGOUT" />
      </button>
      <span className="linedivide1" />
      <CartIcon />
    </div>
  );

  const guestLink = (
    <div className="header-icons">
      <Link href="/login">
        <img src={IconHeader} className="header-icon1" alt="Login" />
      </Link>
      <Link href="/register">
        <img
          src={RegisterIconHeader}
          className="header-icon1 p-l-10"
          alt="Register"
        />
      </Link>
    </div>
  );

  return (
    <header className="header1">
      <div className="container-menu-header">
        <div className="wrap_header">
          <Link
            href="/"
            //  className="logo"
          >
            <img src={Logo} alt="IMG-LOGO" />
          </Link>

          <div className="wrap_menu">
            <nav className="menu">
              <ul className="main_menu">
                <li>
                  <NavLink href="/">Home</NavLink>
                </li>

                <li>
                  <NavLink href="/shop">Shop</NavLink>
                </li>
              </ul>
            </nav>
          </div>
          {auth ? authLink : guestLink}
        </div>
      </div>
    </header>
  );
};

export default Header;
