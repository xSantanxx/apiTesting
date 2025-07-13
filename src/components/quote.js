import React from 'react';

function Quote({text, author}) {
    return (
        <div className="quote">
            <blockquote>"{text}"</blockquote>
            <p className="author">- {author} said this ^</p>
        </div>
    )
}

export default Quote;