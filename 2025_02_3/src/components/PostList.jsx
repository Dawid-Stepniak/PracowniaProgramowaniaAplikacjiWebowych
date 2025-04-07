import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

function PostList() {
    const { data: posts, isLoading, error } = useQuery({
        queryKey: ['posts'],
        queryFn: () =>
            fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json()),
    });

    if (isLoading) return <p>Ładowanie postów...</p>;
    if (error) return <p>Błąd podczas ładowania postów.</p>;

    return (
        <div>
            <h1>Lista postów</h1>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <Link to={`/post/${post.id}`}>
                            {post.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PostList;