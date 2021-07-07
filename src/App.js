import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [search, setSearch] = useState("Mumbai");
  const [city, setCity] = useState(null);

  useEffect(() => {
    async function loadData() {
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=2f2b0a970f019dd9f4457804020e0529`
      );
      const resJson = await data.json();
      const response = await resJson.main;
      if (response) {
        response.atmo = await resJson.weather[0].main;
      }

      setCity(response);
    }

    loadData();
  }, [search]);

  return (
    <div className="Apps">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="weather-card one">
              <div className="top">
                <div className="wrapper">
                  <div className="mynav px-4 mx-4 my-3">
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                      }}
                      placeholder="Type Here.."
                      className="form-control"
                    />
                  </div>
                  {!city ? (
                    <h5 className="my-4 py-4 text-light">No Data Found</h5>
                  ) : (
                    <div>
                      <h1 className="heading mt-4 pt-4">{search}</h1>
                      <h3 className="location">{city.atmo}</h3>
                      <p className="temp">
                        <span className="temp-value">{city.temp}</span>
                        <span className="deg">0</span>
                        <a>
                          <span className="temp-type">C</span>
                        </a>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
