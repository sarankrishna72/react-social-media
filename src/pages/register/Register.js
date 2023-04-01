import React, {useState, useContext} from 'react'
import './Register.scss'
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

const Register = () => {
    const [isLoading, setLoading] = useState('');
    const navigate = useNavigate();
    const toast = useToast()
    const dispatch = useDispatch();
    const {socket} = useContext(SocketContext);
    const [formData, setFormData] = useState({
        email: '',
        fName: '',
        lName: '',
        password: ''
    });

    const inputs = [
        [
            {
                id: 1,
                name: 'fName',
                type: 'text',
                placeholder: 'First Name',
                label: 'First Name',
                required: true,
                errorMessages: {
                    valueMissing: 'This field is required',
                },
            },
            {
                id: 2,
                name: 'lName',
                type: 'text',
                placeholder: 'Last Name',
                label: 'Last Name',
                required: true,
                errorMessages: {
                    valueMissing: 'This field is required',
                }
            }
        ],
        [{
            id: 3,
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
            id: 4, 
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
        coreAPIs.registerUserApi().post(formData)
        .then(res => {
            toast({
                toastType: 'success',
                title: 'Account Created',
                description: 'Successfully Created your Account...',
                configuration: {
                    toast_postion: 'top-right'
                }
            })
            dispatch(setLoggedInUser(res.data));
            socket.emit("LOGGED_IN", res.data._id);
            setLoading(false);
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
        <div className='register display-flex align-items-center justify-content-center height-100-vh overflow-auto'>
            <div className='width-70-percentage height-70-percentage display-flex'>
                <div className='flex-1 display-flex flex-direction-column justify-content-center'>
                <h3 className='font-size-50-px font-weight-800 margin-bottom-10-px logo'>Socialbook</h3>
                <span className='font-size-24-px'>
                    Connect with friends and the world around you on Lamasocial.
                </span>
                </div>
                <div className='flex-1 display-flex flex-direction-column justify-content-center'>
                    <Card>
                        {/* <form  onSubmit={onSubmit} autoComplete="off" > */}
                            <div className='min-height-450-px height-auto padding-20-px bg-ffffff display-flex flex-direction-column justify-content-space-between border-radius-10-px'>
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
                                    {isLoading ? <ThreeDotLoader/> : 'Sign Up' }  
                                </Button>
                                <Link to="/Login" className='display-contents'>
                                    <Button  type="button" btnType={'secondary'}  classes={'border-radius-10-px margin-0-auto font-weight-500 width-50-percentage  font-size-20-px'} size={'medium'}>
                                        Log into Account
                                    </Button> 
                                </Link>               
                                
                            </div>
                        {/* </form> */}
                    </Card>
                </div>
            </div>
        </div>
    </>
  )
}

export default Register;