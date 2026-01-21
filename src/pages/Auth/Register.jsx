import React from 'react';
import { useForm } from 'react-hook-form';
import UseAuth from '../../hooks/UseAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from './SocialLogin';
import axios from 'axios';
import Useaxiossecuire from '../../hooks/Useaxiossecuire';

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const { registeruser, updateuserprofile } = UseAuth();
    const axiosSecure = Useaxiossecuire();
    const location = useLocation();
    const navigate = useNavigate();

    // PrivateRoute থেকে আসা path
    const from = location.state?.from?.pathname || '/';

    const handleregistration = (data) => {
  const profileimg = data.photo[0];

  registeruser(data.email, data.password)
    .then(result => {
      console.log(result.user);

      const formdata = new FormData();
      formdata.append('image', profileimg);

      const image_api_url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_img}`;

      axios.post(image_api_url, formdata)
        .then(res => {
          console.log('after image load', res.data.data.url);

          // create user in database
          const userinfo = {
            email: data.email, // ✅ fixed
            displayName: data.name,
            photoURL: res.data.data.url
          };

          axios.post('http://localhost:3000/users', userinfo)
            .then(res => {
              if (res.data.insertedId) { // ✅ fixed spelling
                console.log('user is created');
              }
            });

          const userprofile = {
            displayName: data.name,
            photoURL: res.data.data.url
          };

          updateuserprofile(userprofile)
            .then(() => {
              console.log('user profile updated done');
              navigate(from, { replace: true });
            })
            .catch(error => {
              console.log(error);
            });
        });
    })
    .catch(error => {
      console.log(error);
    });
};


    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
                <form onSubmit={handleSubmit(handleregistration)} noValidate>
                    <fieldset className="fieldset">

                        <label className="label">Name</label>
                        <input
                            type="text"
                            {...register('name', { required: true })}
                            className="input"
                            placeholder="Your Name"
                        />
                        {errors.name && <p className="text-red-600">Name is required</p>}

                        <label className="label">Photo</label>
                        <input
                            type="file"
                            {...register('photo', { required: true })}
                            className="file-input"
                        />
                        {errors.photo && <p className="text-red-600">Photo is required</p>}

                        <label className="label">Email</label>
                        <input
                            type="email"
                            {...register('email', { required: true })}
                            className="input"
                            placeholder="Email"
                        />
                        {errors.email && <p className="text-red-600">Email is required</p>}

                        <label className="label">Password</label>
                        <input
                            type="password"
                            {...register('password', {
                                required: true,
                                minLength: 6,
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/
                            })}
                            className="input"
                            placeholder="Password"
                        />

                        {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                        {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be at least 6 characters</p>}
                        {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have 1 uppercase, 1 lowercase, 1 digit & 1 special character</p>}

                        <button type="submit" className="btn btn-neutral mt-4">
                            Register
                        </button>

                    </fieldset>

                    <p>
                        Already have an account?{' '}
                        <Link className="text-blue-700" to="/login">
                            Login
                        </Link>
                    </p>
                </form>

                <SocialLogin />
            </div>
        </div>
    );
};

export default Register;
