import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/auth-context';
import { NavLink, useNavigate } from 'react-router-dom';
import AuthenticationPage from './AuthenticationPage';
import Field from '../components/field/Field';
import { Label } from '../components/label';
import { Input } from '../components/input';
import { Button } from '../components/button';
import { useForm } from 'react-hook-form';
import { IconEyeClose, IconEyeOpen } from '../components/icon';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-app/firebase-config';

const schema = yup.object({
    email: yup.string().email("Please enter a valid email").required("Please enter your email"),
    password: yup.string().min(8, "Your password must be at least 8 characters").required("Please enter your password")
})

const SignIn = () => {

    const [togglePassword, setTogglePassword] = useState(false);

    const { userInfo } = useAuth();
    const navigate = useNavigate();
    const {handleSubmit, control, formState: {isValid, isSubmitting, errors}} = useForm({
        mode: "onChange",
        resolver: yupResolver(schema)
    });

    const handleSignIn = async (values) => {
        if (!isValid) return;
        await signInWithEmailAndPassword(auth, values.email, values.password);
        navigate("/");
      };

    useEffect(() => {
        document.title = "Login Page";
        if (userInfo?.email) navigate("/");
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [userInfo]);

    useEffect(() => {
        const arrErrors = Object.values(errors)
        if (arrErrors.length > 0) {
            toast.error(arrErrors[0]?.message)
        }
    }, [errors])

    return (
        <AuthenticationPage>
            <form onSubmit={handleSubmit(handleSignIn)}>
                <Field>
                    <Label className="label" htmlFor="email">Email address</Label>
                    <Input type="email" name="email" className="email" placeholder="Enter your email"
                        control={control}>
                    </Input>
                </Field>
                <Field>
                    <Label className="label" htmlFor="password">Password</Label>
                    <Input type={togglePassword ? "text" : "password"} name="password" className="password" placeholder="Enter your password"
                        control={control}>
                        {togglePassword ? <IconEyeOpen onClick={() => setTogglePassword(false)}></IconEyeOpen>
                            : <IconEyeClose onClick={() => setTogglePassword(true)}></IconEyeClose>
                        }

                    </Input>
                </Field>
                <div className="have-account">
                    You already haven't an account? <NavLink to={"/sign-up"}>Register an account</NavLink>
                </div>
                <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting} style={{
                    maxWidth: 300,
                    margin: '0 auto'
                }}>
                    Sign In
                </Button>
            </form>
        </AuthenticationPage>
    );
};

export default SignIn;