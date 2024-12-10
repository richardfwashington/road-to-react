import './App.css'

const welcome = {
  greeting: 'Hey',
  title: 'React'
};

function description(title) {
  return `This is a simple ${title} app that uses JSX.`;
}

function App() {
  return (
    <>
      <div>
        <h1>{welcome.greeting} {welcome.title}</h1>
        <label htmlFor="search">Search: </label>
        <input id="search" type="text" />
        <p>{description(welcome.title)}</p>
      </div>
    </>
  )
}

export default App
