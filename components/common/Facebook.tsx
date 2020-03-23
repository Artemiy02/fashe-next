import React, { FunctionComponent } from 'react';
import FacebookLogin from 'react-facebook-login';
import { useDispatch } from 'react-redux';
import { socialLoginUser } from 'actions/Authorize';

interface IFacebookProps {
  textButton: string;
}

const Facebook: FunctionComponent<IFacebookProps> = ({ textButton }) => {
  const dispatch = useDispatch();

  const responseFacebook = (response: any) => {
    const user = {
      id: response.id,
      name: response.name,
      email: response.email
    };

    response.status === 'connected' && dispatch(socialLoginUser(user, 'facebook'));
  };

  return (
    <FacebookLogin
      appId={process.env.FACEBOOK_CLIENT_ID}
      fields="name,email"
      callback={responseFacebook}
      cssClass="fb-btn"
      icon="fa fa-facebook"
      textButton={textButton}
    />
  );
};

export default Facebook;
