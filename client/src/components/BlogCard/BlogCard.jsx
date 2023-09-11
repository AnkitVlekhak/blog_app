import React from 'react'
import './BlogCard.css'
import { Link } from 'react-router-dom';
function BlogCard({ id, title, image, username, time, text }) {
    return (
        <div className="blogcard">
            <span className='username'>Uploader Name :   {username}</span>
            <Link style={{ textDecoration: "none" }} to={``}>
                <img src={image} alt="product photo " className="blog_image" />
            </Link>
            <span>Title:</span>
            <div className="blog__info">
                <span className="product_title">{title}</span>
            </div>
            <span>Description:</span>
            <div className="blog__info">
                <span className="product_title">{text}</span>
            </div>
        </div>
    )
}

export default BlogCard;