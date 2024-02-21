import React, { useEffect, useState } from 'react';

function FavouritesList({ favourites, removeFavourite }) {
  const [favouritePosts, setFavouritePosts] = useState([]);

  useEffect(() => {
    const fetchFavourites = async () => {
      const posts = await Promise.all(favourites.map(id =>
        fetch(`https://www.reddit.com/by_id/t3_${id}.json`)
          .then(response => response.json())
          .then(data => data.data.children[0].data)
      ));
      setFavouritePosts(posts);
    };

    fetchFavourites();
  }, [favourites]);

  return (
    <div>
      <h2>Favourite Posts</h2>
      <ul>
        {favouritePosts.map(post => (
          <li key={post.id}>
            {post.title} - Score: {post.score}
            <a href={`https://www.reddit.com${post.permalink}`} target="_blank" rel="noopener noreferrer">Comments</a>
            <button onClick={() => removeFavourite(post.id)}>Remove from Favourites</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FavouritesList;
