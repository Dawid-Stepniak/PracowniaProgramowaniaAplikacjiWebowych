import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [user, setUser] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    // Fetch post data
    useEffect(() => {
        const fetchPost = async () => {
            const postResponse = await fetch(`http://localhost:3001/posts/${id}`);
            const postData = await postResponse.json();
            setPost(postData);

            const userResponse = await fetch(`http://localhost:3001/posts/${id}`);
            const userData = await userResponse.json();
            setUser(userData);
        };

        const fetchComments = async () => {
            const commentResponse = await fetch(`http://localhost:3001/posts/${id}/comments`);
            const commentData = await commentResponse.json();
            setComments(commentData);
        };

        fetchPost();
        fetchComments();
    }, [id]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (newComment) {
            await fetch(`http://localhost:3001/posts/${id}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ body: newComment }),
            });

            setNewComment('');
            const updatedComments = await fetch(`http://localhost:3001/posts/${id}/comments`);
            const commentsData = await updatedComments.json();
            setComments(commentsData);
        }
    };

    if (!post || !user) return <p>Ładowanie...</p>;

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            <hr />
            <h3>Autor: {user.name}</h3>
            <p>Email: {user.email}</p>
            <h3>Komentarze:</h3>
            <ul>
                {comments.map((comment) => (
                    <li key={comment.id}>{comment.body}</li>
                ))}
            </ul>
            <form onSubmit={handleCommentSubmit}>
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Dodaj nowy komentarz"
                />
                <button type="submit">Dodaj komentarz</button>
            </form>
            <Link to="/">← Powrót do listy</Link>
        </div>
    );
}

export default PostDetail;