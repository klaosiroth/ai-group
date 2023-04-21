import { useState, useEffect } from "react";
import { Routes, Route, Outlet, Link, Navigate } from "react-router-dom";
import axios from "axios";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="hero" element={<HeroPage />} />
        <Route path="posts" element={<PostPage />} />
        <Route path="*" element={<Navigate to="/hero" replace />} />
      </Route>
    </Routes>
  );
}

function Layout() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/hero">01. Hero</Link>
          </li>
          <li>
            <Link to="/posts">02. Posts</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}

function HeroPage() {
  const [selectedHero, setSelectedHero] = useState("");

  const heroes = [
    { id: 1, name: "Superman" },
    { id: 2, name: "Wonder Woman" },
    { id: 3, name: "Spider-Man" },
    { id: 4, name: "Batman" },
  ];

  const handleHeroClick = (heroName) => {
    setSelectedHero(heroName);
  };

  return (
    <div>
      <h1>My Heroes</h1>
      <ul>
        {heroes.map((hero) => (
          <li key={hero.id} onClick={() => handleHeroClick(hero.name)}>
            {hero.id}. {hero.name}
          </li>
        ))}
      </ul>
      <h2>
        My hero is{" "}
        <span
          style={{ textDecoration: "underline", textUnderlineOffset: "8px" }}
        >
          {selectedHero}
        </span>
      </h2>
    </div>
  );
}

const PostPage = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setIsLoading(false);
    };

    fetchPosts();
  }, []);

  if (isLoading) return <span>Loading...</span>;

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>User ID</th>
          <th>Title</th>
          <th>Body</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post) => (
          <tr key={post.id}>
            <td>{post.id}</td>
            <td>{post.userId}</td>
            <td>{post.title}</td>
            <td>{post.body}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default App;
