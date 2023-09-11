import React, { useState } from 'react'
import './AddBlog.css'
import { createBlog } from '../../axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const AddBlog = () => {
    const [data, setData] = useState({ title: "", links: "", content: " " });
    const navigate = useNavigate();
    const user = useSelector((state) => state.authReducer.authData.user);
    const handleSubmit = (e) => {
        e.preventDefault();
        createBlog({ ...data, ...user });
        navigate('/')
    }
    const handleChange = (e) => {
        var { name, value } = e.target;
        setData({ ...data, [name]: value })
    }

    return (
        <div className="addblog">
            <h1>Create Blog</h1>
            <form action="" onSubmit={handleSubmit}>
                <div className='formRow'>
                    <label className="" for="title">Blog Title</label>
                    <input type="text" id="title" className="" name="title" placeholder='Title' value={data.title} onChange={handleChange} />
                </div>
                {/* ////////////////links */}
                <div className='formRow'>
                    <label className="" for="">Images Links</label>
                    <input type="text" id="imglink" className="" name="links" placeholder="Link" value={data.links} onChange={handleChange} />

                </div>
                <div className='formRow'>
                    <label className="" for="">Blog Information</label>
                    <textarea className="" id="txt" name="content" value={data.content} onChange={handleChange} placeholder='Description' style={{ borderColor: "#fffdfd", borderRadius: "10px" }}></textarea>
                </div>
                <button type="submit" className="button inputbtn">Create Blog</button>
            </form>
        </div>
    )
}

export default AddBlog