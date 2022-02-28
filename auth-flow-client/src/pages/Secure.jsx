import { useEffect, useState } from "react";

export default function SecurePage() {
  const [posts, setPosts] = useState([]);

  // const userAsJSON = localStorage.getItem("user");

  // const user = JSON.parse(userAsJSON);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token:", token);

    const fetchOptions = {
      method: "GET",
      headers: {
        authorisation: token,
      },
    };

    fetch(`http://localhost:3030/posts`, fetchOptions)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.userPosts);
      })
      .catch((error) => console.log({ error: error.message })); // ??
  }, []);

  console.log("user posts: ", posts);

  return (
    <section>
      <h2>Secure enviroment</h2>
      <ul>
        {posts.map((post, index) => {
          const { title, desciption } = post;
          return (
            <li key={index}>
              <h3>{title}</h3>
              <p>{desciption}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
