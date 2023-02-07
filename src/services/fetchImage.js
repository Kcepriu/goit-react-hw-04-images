import axios from 'axios';

const BASE_URL = 'https://pixabay.com';
const URL = 'api/';
const KEY = '32212572-bf53323a03e0775bbc92b6acc';
const PER_PAGE = 12;

const instanceAxios = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
});

function getParamReguest(textQuery, numberPage) {
  return {
    key: KEY,
    image_type: 'photo',
    pretty: true,
    orientation: 'horizontal',
    safesearch: true,
    per_page: PER_PAGE,
    page: numberPage,
    q: textQuery,
  };
}

async function getImage(textQuery, numberPage = 1) {
  if (textQuery === '') return [];

  try {
    const response = await instanceAxios.get(URL, {
      params: getParamReguest(textQuery, numberPage),
    });

    const { hits: arrayFindElement, totalHits } = response.data;
    return arrayFindElement;
  } catch (error) {
    console.log('error fetch');

    return [];
  }
}

export default getImage;
