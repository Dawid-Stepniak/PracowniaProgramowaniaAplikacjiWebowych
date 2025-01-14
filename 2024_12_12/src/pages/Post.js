import React from "react";
import { useParams } from "react-router-dom";
import "../styles/_post.scss";

const Post = () => {
    const { id } = useParams();

    return (
        <div className="post container">
            <h2>Post {id}</h2>
            <p>To post z numerem ID: {id}.</p>
        </div>
    );
};

export default Post;