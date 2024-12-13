import "./App.css";
import * as React from "react";

const welcome = {
  greeting: "Hey",
  title: "React",
};

const App = () => {
  const [searchTerm, setSearchTerm] = React.useState("React");

  const stories = [
    {
      title: "React",
      url: "https://reactjs.org/",
      author: "Jordan Walke",
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: "Redux",
      url: "https://redux.js.org/",
      author: "Dan Abramov, Andrew Clark",
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div>
        <h1>
          {welcome.greeting} {welcome.title}
        </h1>
        <p>Filter: {searchTerm}</p>
        <Search onSearch={handleSearch} search={searchTerm} />
        <hr />
        <List list={searchedStories} />
      </div>
    </>
  );
};

const List = ({ list }) => (
  <ul>
    {list.map((item) => (
      <Item key={item.objectID} item={item} />
    ))}
  </ul>
);

const Search = ({ search, onSearch }) => {
  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" value={search} onChange={onSearch} />
    </div>
  );
};

const Item = ({
  item: { objectID, title, url, author, num_comments, points },
}) => (
  <li key={objectID}>
    <span>
      <a href={url}>{title}</a>{" "}
    </span>
    <span>{author} </span>
    <span>{num_comments} </span>
    <span>{points} </span>
  </li>
);

export default App;
