import logo from "./logo.svg";
import "./App.css";
import "./index.scss";
import { useEffect, useState } from "react";

function App() {
  const [employees, setEmployees] = useState([]);
  const [direction, setDirection] = useState("asc");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    fetch("https://randomuser.me/api/?results=100")
      .then((j) => j.json())
      .then((result) => {
        setEmployees(result.results);
        setFilteredEmployees(result.results);
      });
  }, []);
  const sortByName = () => {
    const sortedEmployees = filteredEmployees.sort((a, b) => {
      if (direction === "asc") {
        return a.name.last < b.name.last ? -1 : 1;
      } else {
        return b.name.last < a.name.last ? -1 : 1;
      }
    });
    setDirection(direction === "asc" ? "desc" : "asc");
    setEmployees([...sortedEmployees]);
  };
  const filterByName = (ev) => {
    const filteredArray = employees.filter((employee) =>
      employee.name.last.toLowerCase().includes(ev.target.value.toLowerCase())
    );
    setFilteredEmployees([...filteredArray]);
    setFilter(ev.target.value);
  };
  const renderEmployee = (employee) => (
    <section
      className="grid-1-2-3-2-2-2"
      key={employee.location.coordinates.latitude}
    >
      <p>{employee.gender}</p>
      <p>
        {employee.name.first} {employee.name.last}
      </p>
      <p>{employee.email}</p>
      <p>{employee.cell}</p>
      <div className="place-x-center">
        <img src={employee.picture.thumbnail} alt="profile" />
      </div>
    </section>
  );
  return (
    <div className="App">
      <header className="container">
        <input
          className="b-rounded b-primary p-2 m-y-2"
          placeholder="search by name"
          value={filter}
          onChange={filterByName}
        />
        <section className="grid-1-2-3-2-2-2">
          <p> Gender</p>
          <p
            className="cursor-pointer text-primary"
            onClick={() => sortByName()}
          >
            Name
          </p>
          <p>Email</p>
          <p>Cell</p>
          <p>Image</p>
        </section>
        {filteredEmployees.map((employee) => renderEmployee(employee))}
      </header>
    </div>
  );
}

export default App;
