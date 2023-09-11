import axios from "axios";
const instance = axios.create({
    baseURL: "http://localhost:3000/"
})
export const createBlog = (data) => instance.post(`/add-blog`, data)
export const showAllBlog = () => instance.get(`/show-blogs`)
export const myBlog = (email) => instance.get(`/my-blog/${email}`)
export default instance;