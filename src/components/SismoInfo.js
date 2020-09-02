import React from 'react'
import './SismoInfo.css'

export const SismoInfo = ({fechaLocal, magnitud, lugar, profundidad}) => {
    return (
        <div className="unit-sismo">
            <h4>Magnitud: {magnitud}</h4>
            <h5>Lugar: {lugar}    </h5>
            

            <hr />

            <p>Hora: {fechaLocal.slice(-8)}  --  Profundidad: {profundidad}</p>




        </div>
    )
}
