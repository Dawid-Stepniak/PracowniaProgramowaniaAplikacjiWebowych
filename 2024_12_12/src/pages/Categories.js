import React from "react";
import "../styles/_categories.scss";

const Categories = () => {
    return (
        <div className="categories container">
            <h2>Kategorie</h2>
            <ul>
                <li>Sztuka</li>
                <li>Informayka</li>
                <li>Biznes</li>
                <li>Sport</li>
            </ul>
        </div>
    );
};

export default Categories;