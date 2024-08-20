import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as Components from './UserComponents';

const UserLogin = () => {
    const [signIn, toggle] = React.useState(true);
    const navigate = useNavigate(); // Initialize useNavigate hook

    const [input, setInput] = React.useState({
        name: "",
        email: "",
        password: "",
        cpswd: "" // Confirm password
    });

    const inputHandler = (event) => {
        setInput({ ...input, [event.target.name]: event.target.value });
    };

    const handleSignIn = (event) => {
        event.preventDefault(); // Prevent default form submission
        axios.post("http://localhost:3030/signin", { email: input.email, password: input.password })
            .then(response => {
                console.log(response.data);
                if (response.data.status === "incorrect password") {
                    alert("Incorrect Password!!!");
                } else if (response.data.status === "invalid email id") {
                    alert("Invalid Email ID!!!");
                } else {
                    let token = response.data.token;
                    let userId = response.data.userId;
                    sessionStorage.setItem("userId", userId);
                    sessionStorage.setItem("token", token);
                    navigate("/alert"); // Redirect to /alert
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleSignUp = (event) => {
        event.preventDefault(); // Prevent default form submission
        if (input.password === input.cpswd) {
            let newInput = {
                name: input.name,
                phone: input.phone,
                email: input.email,
                password: input.password
            };
            axios.post("http://localhost:3030/signup", newInput)
                .then(response => {
                    console.log(response.data);
                    if (response.data.status === "success") {
                        alert("Registered successfully!");
                        setInput({
                            name: "",
                            email: "",
                            password: "",
                            cpswd: ""
                        });
                        toggle(true); // Switch to Sign In after successful registration
                    } else {
                        alert("Email ID already exists!!!");
                        setInput({
                            name: "",
                            email: "",
                            password: "",
                            cpswd: ""
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            alert("Password and Confirm Password don't match!!!");
        }
    };

    return (
        <Components.Container>
            <Components.SignUpContainer signinIn={signIn}>
                <Components.Form>
                    <Components.Title>Create Account</Components.Title>
                    <Components.Input
                        type='text'
                        name='name'
                        value={input.name}
                        onChange={inputHandler}
                        placeholder='Name'
                    />
                    <Components.Input
                        type='email'
                        name='email'
                        value={input.email}
                        onChange={inputHandler}
                        placeholder='Email'
                    />
                    <Components.Input
                        type='password'
                        name='password'
                        value={input.password}
                        onChange={inputHandler}
                        placeholder='Password'
                    />
                    <Components.Input
                        type='password'
                        name='cpswd'
                        value={input.cpswd}
                        onChange={inputHandler}
                        placeholder='Confirm Password'
                    />
                    <Components.Button onClick={handleSignUp}>Sign Up</Components.Button>
                </Components.Form>
            </Components.SignUpContainer>

            <Components.SignInContainer signinIn={signIn}>
                <Components.Form>
                    <Components.Title>Sign In</Components.Title>
                    <Components.Input
                        type='email'
                        name='email'
                        value={input.email}
                        onChange={inputHandler}
                        placeholder='Email'
                    />
                    <Components.Input
                        type='password'
                        name='password'
                        value={input.password}
                        onChange={inputHandler}
                        placeholder='Password'
                    />
                    <Components.Button onClick={handleSignIn}>Sign In</Components.Button>
                </Components.Form>
            </Components.SignInContainer>

            <Components.OverlayContainer signinIn={signIn}>
                <Components.Overlay signinIn={signIn}>
                    <Components.LeftOverlayPanel signinIn={signIn}>
                        <Components.Title>Welcome Back!</Components.Title>
                        <Components.Paragraph>
                            To keep connected with us, please login with your personal info
                        </Components.Paragraph>
                        <Components.GhostButton onClick={() => toggle(true)}>
                            Sign In
                        </Components.GhostButton>
                    </Components.LeftOverlayPanel>

                    <Components.RightOverlayPanel signinIn={signIn}>
                        <Components.Title>Hello, Citizen!</Components.Title>
                        <Components.Paragraph>
                            Enter your personal details and start your journey with us
                        </Components.Paragraph>
                        <Components.GhostButton onClick={() => toggle(false)}>
                            Sign Up
                        </Components.GhostButton>
                    </Components.RightOverlayPanel>
                </Components.Overlay>
            </Components.OverlayContainer>
        </Components.Container>
    );
};

export default UserLogin;