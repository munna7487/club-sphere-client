import React from 'react';
import { useForm } from 'react-hook-form';
import UseAuth from '../../hooks/UseAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from './SocialLogin';

const Login = () => {

    // 🔴 CHANGE 1: watch add করা হয়েছে email ধরার জন্য
    const { register, handleSubmit, formState: { errors }, watch } = useForm();

    // 🔴 CHANGE 2: resetPassword নেওয়া হয়েছে
    const { signinuser, resetPassword } = UseAuth();

    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    // 🔴 CHANGE 3: email value ধরা
    const email = watch('email');

    const handlelogin = (data) => {
        signinuser(data.email, data.password)
            .then(result => {
                console.log(result.user);
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.log(error);
            });
    };

    // 🔴 CHANGE 4: forgot password handler
    const handleForgotPassword = () => {
        if (!email) {
            alert('আগে email লিখো');
            return;
        }

        resetPassword(email)
            .then(() => {
                alert('Password reset email পাঠানো হয়েছে 📩');
            })
            .catch(error => {
                console.log(error.message);
            });
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="card bg-base-100 w-full max-w-sm shadow-2xl">

                <h3 className="text-blue-600 text-3xl text-center mt-4">
                    Welcome Back
                </h3>
                <h3 className="text-blue-600 text-2xl text-center mb-4">
                    Please Login
                </h3>

                <form className="card-body" onSubmit={handleSubmit(handlelogin)}>
                    <fieldset className="fieldset">

                        {/* Email */}
                        <label className="label">Email</label>
                        <input
                            type="email"
                            {...register('email', { required: true })}
                            className="input"
                            placeholder="Email"
                        />
                        {errors.email && (
                            <p className="text-red-600">Email is required</p>
                        )}

                        {/* Password */}
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

                        {errors.password?.type === 'required' && (
                            <p className="text-red-600">Password is required</p>
                        )}
                        {errors.password?.type === 'minLength' && (
                            <p className="text-red-600">
                                Password must be at least 6 characters
                            </p>
                        )}
                        {errors.password?.type === 'pattern' && (
                            <p className="text-red-600">
                                Password must have 1 uppercase, 1 lowercase, 1 digit & 1 special character
                            </p>
                        )}

                        {/* 🔴 CHANGE 5: anchor বাদ দিয়ে button + onClick */}
                        <div>
                            <button
                                type="button"
                                onClick={handleForgotPassword}
                                className="link link-hover"
                            >
                                Forgot password?
                            </button>
                        </div>

                        <button type="submit" className="btn btn-neutral mt-4">
                            Login
                        </button>
                    </fieldset>

                    <p className="mt-3 text-center">
                        New to club?{' '}
                        <Link className="text-blue-700" to="/register">
                            Register
                        </Link>
                    </p>
                </form>

                <SocialLogin />
            </div>
        </div>
    );
};

export default Login;
