import { useEffect, useState } from "react";
import "./App.css";
import { fetchPosts } from "./services/api";
import PostCard from "./components/PostCard";
import Loader from "./components/Loader";
import Error from "./components/Error";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);
        const data = await fetchPosts();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, []);

  if (loading) return <Loader message="Loading posts..." />;
  if (error) return <Error message={error} />;

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Posts</h1>

     
      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

     
      <div className="posts">
        {filteredPosts.slice(0, visibleCount).map((post) => (
          <PostCard key={post.id} title={post.title} body={post.body} />
        ))}
      </div>

      
      {visibleCount < filteredPosts.length && (
        <button
          className="load-more"
          onClick={() => setVisibleCount((prev) => prev + 10)}
        >
          Load More
        </button>
      )}
    </div>
  );
}

export default App;
