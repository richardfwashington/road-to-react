import "./App.css";

const welcome = {
  greeting: "Hey",
  title: "React",
};

function description(title) {
  return `This is a simple ${title} app that uses JSX.`;
}

const App = () => {
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

  return (
    <>
      <div>
        <h1>
          {welcome.greeting} {welcome.title}
        </h1>
        <Search />
        <hr />
        <List list={stories} />
      </div>
    </>
  );
};

const List = (props) => {
  return (
    <ul>
      {props.list.map((item) => {
        return (
          <li key={item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>{" "}
            </span>
            <span>{item.author} </span>
            <span>{item.num_comments} </span>
            <span>{item.points} </span>
          </li>
        );
      })}
    </ul>
  );
};

const Search = () => {
  const handleChange = (event) => {
    console.log(event);
    console.log(event.target.value);
  };

  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={handleChange} />
      <p>{description(welcome.title)}</p>
    </div>
  );
};

export default App;
