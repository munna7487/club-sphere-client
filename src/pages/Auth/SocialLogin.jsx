import React from 'react';
import UseAuth from '../../hooks/UseAuth';
import { useLocation, useNavigate } from 'react-router';
import Useaxiossecuire from '../../hooks/Useaxiossecuire';

const SocialLogin = () => {
  const { signingoogle } = UseAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiossecure = Useaxiossecuire();

  // PrivateRoute থেকে আসা path
  const from = location.state?.from?.pathname || '/';

  const handlesignin = () => {
    signingoogle()
      .then(result => {
        const user = result.user;

        // create user in database
        const userinfo = {
          email: user.email,
          displayName: user.displayName, // ✅ fixed
          photoURL: user.photoURL        // ✅ fixed
        };

        axiossecure.post('/users', userinfo)
          .then(() => {
            navigate(from, { replace: true });
          });
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <p className="text-center">OR</p>
      <div className="flex justify-center my-1.5 mx-6">
        <button
          onClick={handlesignin}
          className="w-full btn bg-white text-black border-[#e5e5e5]"
        >
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff" />
              <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" />
              <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57" />
              <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73" />
              <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" />
            </g>
          </svg>
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
