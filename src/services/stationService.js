// src/services/stationService.js
import axios from 'axios';


const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  
  headers: {
    'Content-Type': 'application/json'
  }
});

export const   getConnectorStatus = (stationId, chargerId, connectorId) => {
    // console.log(stationId);
    // console.log(chargerId);
    // console.log(connectorId);
    
  return API.get(`/chrgStation/gtConnectorStatusBySCC/${stationId}/${chargerId}/${connectorId}`);

};
