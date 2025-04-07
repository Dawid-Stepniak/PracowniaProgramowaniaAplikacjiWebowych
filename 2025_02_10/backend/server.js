const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

let posts = [
    { id: 1, title: 'Post 1', body: 'Treść posta 1', userId: 1 },
    { id: 2, title: 'Post 2', body: 'Treść posta 2', userId: 2 },
    { id: 3, title: 'Post 3', body: 'Treść posta 3', userId: 1 },
];

let comments = {
    1: [{ id: 1, body: 'Komentarz do posta 1' }],
    2: [{ id: 2, body: 'Komentarz do posta 2' }],
    3: [{ id: 3, body: 'Komentarz do posta 3' }],
};

app.get('/posts', (req, res) => {
    res.json(posts);
});

app.get('/posts/:id', (req, res) => {
    const post = posts.find(p => p.id === +req.params.id);
    if (post) {
        res.json(post);
    } else {
        res.status(404).json({ message: 'Post nie został znaleziony' });
    }
});

app.get('/posts/:id/comments', (req, res) => {
    const postComments = comments[req.params.id] || [];
    res.json(postComments);
});

app.post('/posts/:id/comments', (req, res) => {
    const { body } = req.body;
    const postId = req.params.id;

    if (!comments[postId]) {
        comments[postId] = [];
    }

    comments[postId].push({ id: comments[postId].length + 1, body });
    res.status(201).json({ message: 'Komentarz dodany pomyślnie' });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Backend działa na http://localhost:${PORT}`);
});