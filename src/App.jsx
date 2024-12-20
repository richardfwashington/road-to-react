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
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: { stories: initialStories } }), 2000)
  );
};

const storiesReducer = (state, action) => {
  switch (action.type) {
    case "STORIES_FETCH_INIT":
      return { ...state, isLoading: true, isError: false };
    case "STORIES_FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case "STORIES_FETCH_FAILURE":
      return { ...state, isLoading: false, isError: true };
    case "REMOVE_STORY":
      return {
        ...state,
        data: state.data.filter((story) => action.payload !== story.objectID),
      };
    default:
      throw new Error();
  }
};

const App = () => {
  const [searchTerm, setSearchTerm] = useStorageState("search", "React");
  const [stories, dispatchStories] = React.useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  React.useEffect(() => {
    dispatchStories({ type: "STORIES_FETCH_INIT" });

    getAsyncStories()
      .then(
        (result) => {
          dispatchStories({
            type: "STORIES_FETCH_SUCCESS",
            payload: result.data.stories,
          });
        },
        () => console.error("Error")
      )
      .catch(() => dispatchStories({ type: "STORIES_FETCH_FAILURE" }));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.data.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRemoveStory = (id) => {
    dispatchStories({ type: "REMOVE_STORY", payload: id });
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
      {stories.isError && <p>Something went wrong ...</p>}
      {stories.isLoading ? (
        <p>Loading...</p>
      ) : (
        <List list={searchedStories} onDelete={handleRemoveStory} />
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
