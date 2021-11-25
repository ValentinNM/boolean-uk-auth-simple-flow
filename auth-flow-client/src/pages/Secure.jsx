import { useEffect, useState } from "react";

export default function SecurePage() {
  const [posts, setPosts] = useState([]);

  const userAsJSON = localStorage.getItem("user");

  const user = JSON.parse(userAsJSON);

  console.log("auth user id: ", user.id);
  console.log("user posts: ", posts);

  useEffect(() => {
    const fetchOptions = {
      method: "GET",
      headers: {
        authorisation: user.id,
      },
    };

    fetch(`http://localhost:3030/posts`, fetchOptions)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        console.log("fetch data: ", data);
      })
      .catch(error => console.log({error: error.message}))  // ?? 
  }, []);

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
