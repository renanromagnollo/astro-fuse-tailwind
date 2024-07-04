import { useState } from "react";
import Fuse from "fuse.js";

const options = {
  keys: ["data.title", "data.description"],
  minMatchCharLength: 2,
  includeMatches: true,
};

export default function Search({ searchList }) {
  const [query, setQuery] = useState("");

  const fuse = new Fuse(searchList, options);

  const posts = fuse
    .search(query)
    .map((result) => result.item)
    .slice(0, 5);

  function handleOnSearch({ target = {} }) {
    const { value } = target;
    setQuery(() => value);
  }
  return (
    <>
      <input type="text" value={query} onChange={handleOnSearch} />

      {query.length > 1 && (
        <p>
          Encontrei {posts.length} {posts.length === 1 ? "artigo" : "artigos"}
        </p>
      )}

      <ul>
        {posts &&
          posts.map((post) => (
            <li>
              <a href="#">{post.data.title}</a>
              <p>{post.data.description}</p>
            </li>
          ))}
      </ul>
    </>
  );
}
