import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Label } from '../components/label';
import { useForm } from 'react-hook-form';
import { Input } from '../components/input';
import { IconEyeClose, IconEyeOpen } from '../components/icon';
import Field from '../components/field/Field';
import { Button } from '../components/button';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from '../firebase-app/firebase-config';
import { update } from 'lodash';
import { NavLink, useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import AuthenticationPage from './AuthenticationPage';

const schema = yup.object({
    fullname: yup.string().required("Please enter your fullname"),
    email: yup.string().email("Please enter a valid email").required("Please enter your email"),
    password: yup.string().min(8, "Your password must be at least 8 characters").required("Please enter your password")
})

const SignUp = () => {
    const navigate = useNavigate();

    const [togglePassword, setTogglePassword] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors, isValid, isSubmitting },
        watch,
        reset
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema)
    });

    const handleSignUp = async (values) => {
        if (!isValid) return;
        const user = await createUserWithEmailAndPassword(auth, values.email, values.password);
        await updateProfile(auth.currentUser, {
            displayName: values.fullname
        })

        const colRef = collection(db, "users");
        await addDoc(colRef, {
            fullname: values.fullname,
            email: values.email,
            password: values.password
        })

        toast.success("Register successfully!");
        navigate("/");
    }

    useEffect(() => {
        const arrErrors = Object.values(errors)
        if (arrErrors.length > 0) {
            toast.error(arrErrors[0]?.message)
        }
    }, [errors])

    return (
        <AuthenticationPage>
            <form onSubmit={handleSubmit(handleSignUp)}>
                <Field>
                    <Label className="label" htmlFor="fullname">Fullname</Label>
                    <Input type="text" name="fullname" className="fullname" placeholder="Enter your fullname"
                        control={control}>
                    </Input>
                </Field>
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
                    You already have an account? <NavLink to={"/sign-in"}>Login</NavLink>
                </div>
                <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting} style={{
                    maxWidth: 300,
                    margin: '0 auto'
                }}>
                    Sign Up
                </Button>
            </form>
        </AuthenticationPage>


    );
};

export default SignUp;