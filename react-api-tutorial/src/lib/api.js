import axios from 'axios';
export function getAPOD(date = '') {
  return axios.get(
    `https://api.nasa.gov/planetary/apod?api_key=59R4sCmlQNKFh9I1mD75XfK624cJvUIao1Qc806J&date=${date}`
  );
}
