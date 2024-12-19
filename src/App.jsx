import "./App.css";
import * as React from "react";

const welcome = {
  greeting: "Hey",
  title: "React",
};

const initialStories = [
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

const getAsyncStories = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: { stories: initialStories } });
    }, 2000);
  });
};

const App = () => {
  const [searchTerm, setSearchTerm] = useStorageState("search", "React");
  const [stories, setStories] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    getAsyncStories()
      .then((result) => {
        // eslint-disable-next-line no-constant-condition
        if (1 === 1) {
          throw new Error("Error");
        }
        setStories(result.data.stories);
        setIsLoading(false);
      })
      .catch(() => setIsError(true));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteStory = (id) => {
    setStories(stories.filter((story) => story.objectID !== id));
  };

  return (
    <>
      <h1>
        {welcome.greeting} {welcome.title}
      </h1>
      <p>Filter: {searchTerm}</p>
      <InputWithLabel
        id="search"
        label="Search"
        value={searchTerm}
        onInputChange={handleSearch}
        search={searchTerm}
        isFocussed
      >
        <strong>Search:</strong>
      </InputWithLabel>
      <hr />
      {isError && <p>Something went wrong ...</p>}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <List list={searchedStories} onDelete={deleteStory} />
      )}
    </>
  );
};

const List = ({ list, onDelete }) => (
  <ul>
    {list.map((item) => (
      <Item key={item.objectID} item={item} onDelete={onDelete} />
    ))}
  </ul>
);

const InputWithLabel = ({
  id,
  value,
  onInputChange,
  type = "text",
  isFocussed,
  children,
}) => {
  const inputRef = React.useRef();

  React.useEffect(() => {
    if (isFocussed && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocussed]);

  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        onChange={onInputChange}
      />
    </>
  );
};

const Item = ({ item, onDelete }) => {
  return (
    <li>
      <span>
        <a href={item.url}>{item.title}</a>{" "}
      </span>
      <span>{item.author} </span>
      <span>{item.num_comments} </span>
      <span>{item.points} </span>
      <button type="button" onClick={() => onDelete(item.objectID)}>
        Delete
      </button>
    </li>
  );
};

const useStorageState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

export default App;
