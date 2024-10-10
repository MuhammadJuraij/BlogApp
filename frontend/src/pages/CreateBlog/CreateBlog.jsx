import React, { useContext, useState } from 'react'
import './CreateBlog.css'
import { storeContext } from '../../Context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


function CreateBlog() {

    const { user, url } = useContext(storeContext)
    const [data, setData] = useState({
        title: '',
        description: '',
        category: 'Technology',
    })

    const [blogImage, setBlogImage] = useState(false)

    const navigate = useNavigate()

    const handleInputData = (e) => {
        const { name, value } = e.target;
        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleinputImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBlogImage(file)
        }
    }

    const handleForm = async (e) => {
        e.preventDefault();

        const formdata = new FormData();
        formdata.append('title', data.title)
        formdata.append('description', data.description)
        formdata.append('category', data.category)
        formdata.append('author', user.id)
        formdata.append('blogImage', blogImage)

        try{
            const response = await axios.post(`${url}/api/blog/add`, formdata)

            if (response.data.success) {
                toast.success(response.data.message)
                setData({
                    title: '',
                    description: '',
                    category: '',
                })
                setBlogImage(false)
                navigate('/profile')
            }
            else{
                toast.error(response.data.message)
            }
        }
        catch(error){
            console.log(error)
            toast.error('An error occurred while adding the blog post.')
        }

        

    }





    return (
        <div className='container-main'>
            <div className='backtohome'>
                <a href="/profile" >
                    <i class="fa-solid fa-arrow-left" ></i>
                    Back
                </a>
            </div>
            <div className="head">
                <h3>Create your Blog </h3>
            </div>

            <div className='form-container'>

                <form onSubmit={handleForm}>
                    <div className='input'>
                        <label htmlFor="">Title</label>
                        <input type="text" onChange={handleInputData} name='title' value={data.title} required />
                    </div>
                    <div input>
                        <label htmlFor="">Description</label>
                        <textarea onChange={handleInputData} name="description" value={data.description} required></textarea>
                    </div>
                    <div className='photos'>
                        <label htmlFor="">Photos</label>
                        <input type="file" onChange={handleinputImage} name="blogImage" required />
                        {blogImage && (
                            <img
                                src={URL.createObjectURL(blogImage)}
                                alt="Preview"
                                style={{ width: '200px', height: 'auto' }} // Optional styling for the image
                            />
                        )}
                    </div>
                    <div className='category'>
                        <label htmlFor="">Category</label>
                        <select name="category" onChange={handleInputData} value={data.category} required>
                            <option value="Technology">Technology</option>
                            <option value="Lifestyle">Lifestyle</option>
                            <option value="Health & Fitness">Health & Fitness</option>
                            <option value="Education">Education</option>
                            <option value="Food & Recipes">Food & Recipes</option>
                            <option value="Finance">Finance</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Career & Development">Career & Development</option>
                            <option value="Travel">Travel</option>
                            <option value="Parenting">Parenting</option>
                        </select>
                    </div>
                    <div>
                        <button type='submit'>Create Blog</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default CreateBlog
