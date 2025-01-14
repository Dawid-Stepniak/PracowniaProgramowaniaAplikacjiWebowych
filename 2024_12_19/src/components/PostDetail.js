import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PostDetail = () => {
    const { id } = useParams();  // id z URL
    const [post, setPost] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(response => {
                setPost(response.data);

                axios.get(`https://jsonplaceholder.typicode.com/users/${response.data.userId}`)
                    .then(userResponse => {
                        setUser(userResponse.data);
                    })
                    .catch(error => console.log(error));
            })
            .catch(error => console.log(error));
    }, [id]);

    if (!post || !user) return <div>Ładowanie...</div>;

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            <h2>Autor:</h2>
            <p>{user.name}</p>
            <p>Email: {user.email}</p>
        </div>
    );
};

export default PostDetail;