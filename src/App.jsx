import { Provider } from "react-redux";
import store from "./store/store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NavBar from "./features/puppies/NavBar";
import PuppyDetails from "./features/puppies/PuppyDetails";
import PuppyList from "./features/puppies/PuppyList";
import PuppyForm from "./features/puppies/PuppyForm";

import "./App.scss";
import "./index.css";

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <h1>Puppy Bowl</h1>
          <NavBar />
          <main>
            <Routes>
              <Route path="/puppy-list" element={<PuppyList />} />
              <Route path="/puppies/:id" element={<PuppyDetails />} />
              <Route path="/puppy-form" element={<PuppyForm />} />
              <Route path="/" element={<PuppyList />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
}
