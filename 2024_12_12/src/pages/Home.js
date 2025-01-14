import React from "react";
import { Link } from "react-router-dom";
import "../styles/_home.scss";

const Home = () => {
    return (
        <div className="home container">
            <h2>Najnowsze posty</h2>
            <div className="post-list">
                <div className="post-item">
                    <h3><Link to="/post/1">Pierwszy post</Link></h3>
                    <p>Pierwszy post</p>
                </div>
                <div className="post-item">
                    <h3><Link to="/post/2">Drugi post</Link></h3>
                    <p>Drugi post</p>
                </div>
            </div>
            <div className="categories-link">
                <p><Link to="/categories">Zobacz kategorie</Link></p>
            </div>
        </div>
    );
};

export default Home;