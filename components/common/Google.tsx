import React, { FunctionComponent } from 'react';
import GoogleLogin from 'react-google-login';
import { socialLoginUser } from 'actions/Authorize';
import { useDispatch } from 'react-redux';

interface IGoogleProps {
  buttonText: string
}

const Google: FunctionComponent<IGoogleProps> = ({ buttonText }) => {
  const dispatch = useDispatch();

  const responseGoogle = (response: any) => {
    const user = {
      id: response.profileObj.googleId,
      name: response.profileObj.name,
      email: response.profileObj.email,
    };

    dispatch(socialLoginUser(user, 'google'));
  };


  return (
    <GoogleLogin
      clientId={process.env.GOOGLE_CLIENT_ID}
      buttonText={buttonText}
      onSuccess={responseGoogle}
      onFailure={() => {}}
      cookiePolicy="single_host_origin"
    />
  );
};

export default Google;
