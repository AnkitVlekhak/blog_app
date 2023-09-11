import React, { useState, useEffect } from "react";
import './ShowBlog.css'
import { myBlog, showAllBlog } from "../../axios";
import BlogCard from "../BlogCard/BlogCard";
import { useSelector } from "react-redux";
const ShowBlog = ({ page }) => {
    const [blogs, setBlogs] = useState([]);
    const email = useSelector((state) => state.authReducer.authData.user.email)
    useEffect(() => {

        const getAllBlogs = async () => {
            try {
                const { data } = await showAllBlog();
                if (data === blogs) {
                    return;
                } else {
                    setBlogs(data.data);
                }

            } catch (error) {
                console.log(error);
            }
        };
        const myBlogs = async () => {
            try {
                const { data } = await myBlog(email);
                if (data === blogs) {
                    return;
                } else {
                    setBlogs(data.data);
                }

            } catch (error) {
                console.log(error);
            }
        };
        if (page) {
            myBlogs();
        } else {
            getAllBlogs();
        }
    }, []);


    return (
        <>
            {
                blogs && <div className="showblog">
                    {
                        blogs.map((e) => {
                            return <BlogCard
                                key={e._id}
                                id={e._id}
                                image={e.photo[0]}
                                title={e.title}
                                username={e.name}
                                text={e.text}
                            />
                        })
                    }
                </div>
            }
        </>
    )
}

export default ShowBlog;