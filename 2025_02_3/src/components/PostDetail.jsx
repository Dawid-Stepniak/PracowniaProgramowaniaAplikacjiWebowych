import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

function PostDetail() {
    const { id } = useParams();

    const { data: post, isLoading: loadingPost } = useQuery({
        queryKey: ['post', id],
        queryFn: () =>
            fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then(res => res.json()),
    });

    const userId = post?.userId;

    const { data: user, isLoading: loadingUser } = useQuery({
        enabled: !!userId,
        queryKey: ['user', userId],
        queryFn: () =>
            fetch(`https://jsonplaceholder.typicode.com/users/${userId}`).then(res => res.json()),
    });

    if (loadingPost || loadingUser) return <p>Ładowanie...</p>;

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            <hr />
            <h3>Autor: {user?.name}</h3>
            <p>Email: {user?.email}</p>
            <Link to="/">← Powrót do listy</Link>
        </div>
    );
}

export default PostDetail;