import React, { useState, useEffect } from 'react';

function SubredditForm({ addFavourite }) {
  const [subreddit, setSubreddit] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (subreddit) {
      fetch(`https://www.reddit.com/r/${subreddit}/hot.json?limit=10`)
        .then(response => response.json())
        .then(data => setPosts(data.data.children.map(child => child.data)))
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [subreddit]);

  return (
    <div>
      <input
        type="text"
        placeholder="Enter subreddit name"
        value={subreddit}
        onChange={(e) => setSubreddit(e.target.value)}
      />
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            {post.title} - Score: {post.score}
            <a href={`https://www.reddit.com${post.permalink}`} target="_blank" rel="noopener noreferrer">Comments</a>
            <button onClick={() => addFavourite(post.id)}>Add to Favourites</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SubredditForm;
