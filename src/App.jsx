import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Habit } from "./models/index.js";
import { DataStore } from "aws-amplify/datastore";
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

function App() {

  const handleClick = async () => {
    const newHabit = await DataStore.save(new Habit({name: "V1", count: 1})); // Step 1
    const habitJustSaved = await DataStore.query(Habit, newHabit.id); // Step 2
    console.log({habitJustSaved});

    const modified = Habit.copyOf(habitJustSaved, updated => { // Step 3
      updated.name = "V2";
    });
    console.log({modified});
    await DataStore.save(modified);
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={handleClick}>
          Custom Button
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default withAuthenticator(App);
