import * as React from "react"
import "../components/App.css"
import { useState, useEffect } from "react";
import jsonData from '../components/CityData/city.json';


function App() {
  const key = `oZIlTLaNHtMut974VoNGqzMkluXSlPoH7NtRal99pplGMPgsCsJuvhb6oWu5`;

  const [county, setCounty] = useState(false);

  const city = jsonData



  const [countyCity, setValue] = useState();

  const [countyLast, setCountyValue] = useState();

  const countySelectUrl = `https://www.nosyapi.com/apiv2/pharmacy/city?city=${countyCity}&apikey=oZIlTLaNHtMut974VoNGqzMkluXSlPoH7NtRal99pplGMPgsCsJuvhb6oWu5`;

  useEffect(() => {
    fetch(countySelectUrl)
      .then((resp) => {
        if (resp.ok && resp.status === 200) {
          return resp.json();
        }
      })
      .then((data) => setCounty(data))
      .catch((err) => console.log(err));
  },[countySelectUrl]);

  const url = `https://www.nosyapi.com/apiv2/pharmacyLink?city=${countyCity}&county=${countyLast}&apikey=${key}`;

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (res.ok && res.status === 200) {
          return res.json();
        }
      })
      .then((data) => setEczane(data))
      .catch((err) => console.log(err));
  }, [url]);

  const [eczane, setEczane] = useState(false);


  
  console.log(eczane)
  return (
    <div className="App">
      <div className="container">
        <div className="split left-container">
          <h1>NÖBETÇİ ECZANE</h1>
          <div className="select-container">
            <select
              id="cities"
              value={countyCity}
              onChange={(e) => setValue(e.target.value)}
            >
              {city &&
                city.data.map((sehir, i) => (
                  <option value={sehir.SehirSlug} key={i}>
                    {sehir.SehirAd}
                  </option>
                ))}
            </select>
            <select
              name="counties"
              id="counties"
              value={countyLast}
              onChange={(c) => setCountyValue(c.target.value)}
            >
              {county &&
                county.data.map((ilce, i) => (
                  <option value={ilce.Slug} key={i}>
                    {ilce.ilceAd}
                  </option>
                ))}
            </select>
          </div>
        </div>  
      </div>
      <div className="container">
        <div className="split right-container">
          {eczane && 
            eczane.data.map((eczaneler, j) => (
              <div className="eczane-info" key={j}>
                {eczane.data ? <h1> {eczaneler.EczaneAdi} </h1> : null}
                {eczane.data ? <p>Adres: {eczaneler.Adresi} </p> : null}
                {eczane.data ? <p>Telefon: {eczaneler.Telefon} </p> : null}
                {eczane.data ? <p>Yol Tarifi: {eczaneler.YolTarifi} </p> : null}
                {eczane.data ?<p> <a href={`https://www.google.com/maps/@${eczaneler.latitude},${eczaneler.longitude},18.4z`} target ="_blank" rel="noreferrer" >Konum</a></p> : null}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
