import React from 'react';
import { PortalWithState } from 'react-portal';
import Foco from 'react-foco';

import { totalPriceSelector, totalCountSelector } from 'selectors/totatPrice';
import getCartProductsSelector from 'selectors/cartProducts';
import cartIconHeader from 'styles/icons/icon-header-02.png';
import { useSelector } from 'react-redux';
import { cartState } from 'reducers/cart';
import CartHeaderItem from './CartHeaderItem';

const CartIcon = () => {
  const goods: cartState = useSelector(getCartProductsSelector);

  const total = useSelector(totalPriceSelector);
  const totalCount = useSelector(totalCountSelector);

  return (
    <PortalWithState closeOnEsc>
      {({ openPortal, closePortal, portal }) => (
        <>
          <div className="header-wrapicon2">
            <img
              src={cartIconHeader}
              className="header-icon1"
              alt="ICON"
              onClick={openPortal}
            />
            <span className="header-icons-noti">{totalCount}</span>
          </div>
          <Foco onClickOutside={closePortal}>
            {portal(
              <div className="header-cart header-dropdown show-header-dropdown">
                <ul className="header-cart-wrapitem">
                  {goods.map(p => (
                    <CartHeaderItem key={p._id} id={p._id} {...p} openPortal={openPortal} />
                  ))}
                </ul>

                <div className="header-cart-total">
Total: $
                  {total}
                </div>
              </div>
            )}
          </Foco>
        </>
      )}
    </PortalWithState>
  );
};

export default CartIcon;
