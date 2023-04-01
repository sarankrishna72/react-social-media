import React, { useState, useContext } from 'react'
import './Login.scss'
import Button from '../../components/button/Button';
import Card from '../../components/card/Card';
import Input from '../../components/form-inputs/Input';
import coreAPIs from '../../core/api/CoreApi';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useToast from '../../hooks/useToast';
import { ThreeDotLoader } from '../../components/three-dot-loader/ThreeDotLoader';
import { useDispatch } from 'react-redux';
import { setLoggedInUser } from '../../redux/userSlice';
import {SocketContext} from '../../context/socket';


const Login = () => {
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState('');
    const navigate = useNavigate();
    const toast = useToast();
    const {socket} = useContext(SocketContext);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });


    const inputs = [
        [{
            id: 1,
            name: 'email',
            type: 'email',
            placeholder: 'Email',
            label: 'Email',
            required: true,
            pattern: "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$",
            errorMessages: {
                patternMismatch: 'Invalid email',
                valueMissing: 'This field is required',
                typeMismatch: 'Invalid email'
            }
        }],
        [{
            id: 2, 
            name: 'password',
            type: 'password',
            placeholder: 'Password',
            label: 'Password',
            required: true
        }],
    ]


    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]:  event.target.value,
        });
    }

    const onSubmit = (event) => {
        setLoading(true)
        event.preventDefault();
        coreAPIs.signInUserApi().post(formData)
        .then(res => {
            toast({
                toastType: 'success',
                title: 'Logged in',
                description: 'Successfully logged in...',
                configuration: {
                    toast_postion: 'top-right'
                }
            })
            setLoading(false);
            socket.emit("LOGGED_IN", res.data._id);
            dispatch(setLoggedInUser(res.data));
            navigate("/", {replace: true})
        }).catch(err =>{
            toast({
                toastType: 'error',
                title: err.code,
                description: err.message,
                configuration: {
                    toast_postion: 'top-right'
                }
            })
            setLoading(false)
        })
    }

  return (
    <>
        <div className='login display-flex align-items-center justify-content-center  height-100-vh'>
            <div className='width-70-percentage height-70-percentage display-flex'>
                <div className='flex-1 display-flex flex-direction-column justify-content-center'>
                <h3 className='font-size-50-px font-weight-800 margin-bottom-10-px logo'>Socialbook</h3>
                <span className='font-size-24-px'>
                    Connect with friends and the world around you on Lamasocial.
                </span>
                </div>
                <div className='flex-1 display-flex flex-direction-column justify-content-center'>
                    <Card>
                    <div className='loginBox  min-height-300-px padding-20-px bg-ffffff display-flex flex-direction-column justify-content-space-between border-radius-10-px'>
                        {   inputs.map((inputItem, index) => (
                                <div className='padding-bottom-1p4-em display-flex gap-15-px' key={index}>
                                    {   inputItem.map((input) =>

                                            (<div className='flex-1' key={input.id}>
                                                <Input  {...input} theme="material"   value={formData[input.name]} onChange={handleChange} />
                                            </div>)
                                        )
                                    }
                                </div>
                            ))
                        }
                        <Button  onClick={onSubmit} type="submit"  btnType={'primary'} classes={'border-radius-10-px margin-bottom-15-px font-weight-500 width-100-percentage min-width-150-px font-size-20-px'} size={'medium'}>
                            {isLoading ? <ThreeDotLoader/> : 'Log in' }  
                        </Button>
                        <span className='loginForgot margin-top-5-px margin-bottom-10-px'>Forgot Password?</span>
                        <Link to="/Register" className='display-inline-flex'>
                            <Button  type="button" btnType={'secondary'} classes={'border-radius-10-px margin-0-auto font-weight-500 width-50-percentage  font-size-20-px'} size={'medium'}>
                                Create a New Account
                            </Button> 
                        </Link>
                        
                        {/* <button className='loginRegisterButton'>
                        
                        </button> */}
                    </div>
                    </Card>
                
                </div>
            </div>
        </div>
    </>
  )
}

export default Login