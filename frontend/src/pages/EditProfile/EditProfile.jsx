import React, { useContext, useEffect, useState } from 'react';
import './EditProfile.css';
import { storeContext } from '../../Context/StoreContext';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import { toast } from 'react-toastify'

function EditProfile() {
    const navigate = useNavigate();
    const { user, url, setUser } = useContext(storeContext);

    const [changePassword, setChangePassword] = useState(false);
    const [userImage, setUserImage] = useState(null);
    const [data, setData] = useState({
        name: '',
        currentEmail: '',
        newEmail: '',
        oldPassword: '',
        newPassword: ''
    });

    const fetchExistingData = () => {
        if (user) {
            setData({
                name: user.name || '',
                currentEmail: user.email,
                newEmail: '',
                oldPassword: '',
                newPassword: ''
            });
            setUserImage(user.userImage);
        }
    };

    const handleOnchange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleChangePassword = (state) => {
        setChangePassword(state);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Client-side validation
        if (changePassword && (!data.oldPassword || !data.newPassword)) {
            // alert('Please enter both old and new passwords.');
            toast.error('Please enter both old and new passwords.')
            return;
        }

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('currentEmail', data.currentEmail);
        formData.append('newEmail', data.newEmail);
        formData.append('userImage', userImage);

        if (changePassword) {
            formData.append('oldPassword', data.oldPassword);
            formData.append('newPassword', data.newPassword);
        }

        try {
            const response = await axios.post(`${url}/api/user/edituser`, formData);
            if (response.data.success) {
                toast.success(response.data.message)
                setUser(response.data.data)
                navigate('/profile');

            } else {
                // alert(response.data.message || 'Failed to update profile.'); // Improved error handling
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
            // alert("An error occurred while updating the profile. Please try again."); // User-friendly error message
            toast.error("An error occurred while updating the profile. Please try again.", error)
        }
    };


    useEffect(() => {
        fetchExistingData();
    }, [user]);

    return (
        <div>
            <div className='backtohome'>
                <Link to="/profile">
                    <i className="fa-solid fa-arrow-left"></i>
                    Back
                </Link>
            </div>


            <div className='main'>
                <div className="head">
                    <p>Personal Details</p>
                </div>
                <form onSubmit={handleFormSubmit} className='personal-details'>
                    <div className='data'>
                        <div className='userimage'>
                            <label htmlFor="image">
                                <img
                                    src={userImage instanceof File ? URL.createObjectURL(userImage) : `${url}/userprofile/${userImage}`}
                                    alt=""
                                />
                            </label>
                            <input
                                type="file"
                                onChange={(e) => setUserImage(e.target.files[0])}
                                id='image'
                                hidden
                            />
                        </div>

                        <div className='input1'>
                            <div>
                                <label>Name</label>
                                <input
                                    type="text"
                                    name='name'
                                    onChange={handleOnchange}
                                    value={data.name}
                                />
                            </div>
                            <div>
                                <label>Current Email</label>
                                <input
                                    type="email"
                                    name='currentEmail' // Changed variable name to match state
                                    value={data.currentEmail} // Changed variable name to match state
                                />
                            </div>
                            <div>
                                <label>New Email</label>
                                <input
                                    type="email"
                                    name='newEmail' // Changed variable name to match state
                                    onChange={handleOnchange}
                                    value={data.newEmail} // Changed variable name to match state
                                />
                            </div>
                        </div>

                        <div className='input2'>
                            <div className='changepassword'>
                                <p onClick={() => handleChangePassword(true)}>Change Password?</p>
                                {changePassword && <p onClick={() => handleChangePassword(false)}>x</p>}
                            </div>

                            {changePassword && (
                                <div>
                                    <div>
                                        <label>Old Password</label>
                                        <input
                                            type="password"
                                            name="oldPassword"
                                            value={data.oldPassword}
                                            placeholder="Enter your old password"
                                            onChange={handleOnchange}
                                        />
                                    </div>

                                    <div>
                                        <label>New Password</label>
                                        <input
                                            type="password"
                                            name="newPassword"
                                            value={data.newPassword}
                                            placeholder="Enter your new password"
                                            onChange={handleOnchange}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className='submit'>
                        <button type='submit'>Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditProfile;
