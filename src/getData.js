import Axios from 'axios';

const cheerio = require('cheerio');
const { regiones } = require('./regiones');



export const getData = async(reg, fecha) => {

    const fechaArreglo = fecha.split('-')
    

    if (reg) {
        
        
        const {comunas, region} = regiones.find(r => r.region === reg)
        
        const anno = fechaArreglo[0]
        const mes = fechaArreglo[1]
        const dia = fechaArreglo[2]
    
        const fecha = anno + mes + dia
    
        const result = await Axios.get(`/events/listados/${anno}/${mes}/${fecha}.html`).then((response) => response.data);
        

        const $ = cheerio.load(result);
        
    
        const scrapedData = [];
    
        

        $("#main > table > tbody > tr").each((index, element) => {
            
            if (index === 0) return true;
    
            const tds = $(element).find("td");
            
            const fechaLocal = $(tds[0]).text();
            const latitud = $(tds[2]).text();
            const longitud = $(tds[3]).text();
            const profundidad = $(tds[4]).text();
            const magnitud = $(tds[5]).text();
            const lugar = $(tds[6]).text();
            
            

            comunas.forEach( l => {
                if(lugar.includes(l) & reg === region) {
                    const tableRow = { fechaLocal, latitud, longitud, profundidad, magnitud, lugar };
                    scrapedData.push(tableRow)
                    
                }
            })
            
        })
        
        
        return scrapedData
    }
    
    //export default scrapedData
  }
      
