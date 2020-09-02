import React, { useState, useEffect } from 'react';

import './App.css';
import { useForm } from './hooks/useForm';
import { regionesForm } from './getData';

import { useFetchData } from './useFetchData'
import { SismoInfo } from './components/SismoInfo';

const request = require('request-promise');
const cheerio = require('cheerio');
const { regiones } = require('./regiones');
    


function App() {

  const [ formValues, handleInputChange] = useForm({
    fecha: '',
    region: ''
  })

  const { fecha, region } = formValues;

  const [submitFlag, setsubmitFlag] = useState(false)
  
  const submitFecha = async(e) => {
    e.preventDefault()
    console.log(sismo)
    setsubmitFlag(true) 
    
    
    
  }

  const {data: sismo, loading} = useFetchData(region, fecha);
 
  

  return (
    <div>
      
      <form
        className="formulario"
        onSubmit={submitFecha}
      >
      <label>Fecha: </label>
      <input
        className="input" 
        type="date"
        name="fecha"
        value={fecha}
        onChange={handleInputChange}
      />

      <label >Region: </label>

      <select className="input" value={region} onChange={handleInputChange} name="region" id="region" placeholder="see">
        
        <option value="nn">Selecciona una region</option>
        <option value="Arica y Parinacota">Arica y Parinacota</option>
        <option value="Tarapacá">Tarapacá</option>
        <option value="Antofagasta">Antofagasta</option>
        <option value="Atacama">Atacama</option>
        <option value="Coquimbo">Coquimbo</option>
        <option value="Valparaíso">Valparaíso</option>
        <option value="Metropolitana de Santiago">Metropolitana de Santiago</option>
        <option value="Libertador Gral. Bernardo O’Higgins">Libertador Gral. Bernardo O’Higgins</option>
        <option value="Maule">Maule</option>
        <option value="Ñuble">Ñuble</option>
        <option value="Biobío">Biobío</option>
        <option value="Araucanía">Araucanía</option>
        <option value="Los Ríos">Los Ríos</option>
        <option value="Los Lagos">Los Lagos</option>
        <option value="Aisén del Gral. Carlos Ibáñez del Campo">Aisén del Gral. Carlos Ibáñez del Campo</option>
        <option value="Magallanes y de la Antártica Chilena">Magallanes y de la Antártica Chilena</option>
            
      </select>

      <button
        className="boton"
        type="submit"
      >
        Buscar sismos
      
      </button>


      </form>

      {loading && <h1>Cargando</h1>}


    <hr />
    {
      submitFlag &&
      <h3>Cantidad de sismos: {sismo.length}</h3>
    }

    <ol className="tarjeta">

      { submitFlag &&
        sismo.map( sis => 
          <SismoInfo 
            key={ sis.fechaLocal}
            {...sis}
          />
        ) 
      }


    </ol>


    </div>
  );
}

export default App;
