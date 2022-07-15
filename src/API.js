import { AD_URL, Delete, EmailAd, IMAGE_URL, Search } from "./config";
import axios from 'axios';

const BASE_URL = 'http://localhost:8000';
const BASE_API_URL = `${BASE_URL}/main/`;
const API_FORMAT = '?format=json'

const apiSettings = {
  getAll: async (URL) => {
    const endpoint = `${BASE_API_URL}${URL}${API_FORMAT}`
    return await axios.get(endpoint)
      .then(res => res.data);
  },
  getBy: async (URL, PK) => {
    const endpoint = `${BASE_API_URL}${URL}${PK}/${API_FORMAT}`
    return await axios.get(endpoint)
      .then(res => res.data);
  },
  postRequest: async (URL, action, bodyFormData) => {
    const endpoint = `${BASE_API_URL}${URL}${action}`;
    return await axios.post(
      endpoint,
      bodyFormData,
      { headers: { "Content-Type": "multipart/form-data" } },
    )
      .then(res => {
        return { 'data': res.data, 'status': res.status }
      })
      .catch(error => {
        return { 'data': error.response, 'status': error.response.status }
      })
  },
  editRequest: async (URL, pk, action, bodyFormData) => {
    const endpoint = `${BASE_API_URL}${URL}${pk}/${action}`;
    return await axios.put(
      endpoint,
      bodyFormData,
      { headers: { "Content-Type": "multipart/form-data" } },
    )
      .then(res => {
        return { 'data': res.data, 'status': res.status }
      })
      .catch(error => {
        return { 'data': error.response, 'status': error.response.status }
      })
  },
  deleteRequest: async (URL, pk) => {
    const endpoint = `${BASE_API_URL}${URL}${pk}/${Delete}`;
    return await axios.delete(
      endpoint,
      { headers: { "Content-Type": "multipart/form-data" } },
    )
      .catch(error => {
        return { 'data': error.response, 'status': error.response.status }
      })
  },
};

const getImageItem = (item) => {
  return {
    img: item.images,
    id: item.id,
    category: item.category,
    payment: item.payment_n,
    image_time: item.created_date
  }
}

export const getAdItem = (item) => {
  return {
    'product_id': item.product_id,
    'id': item.id,
    'img': item.ad_image.images,
    'name': item.ad_name,
    'type': item.ad_type,
    'price': item.price,
    'ad_time': item.created_date,
  }
}

export const fetchImage = async (category, active=true) => {
  let images = []
  await apiSettings.getBy(IMAGE_URL, category + '/' + active)
    .then(response => {
      images = response.map(item => {
        return getImageItem(item)
      })
    })
  return images
}

export const fetchEmailAd = async (user_id) => {
  let ads = []
  await apiSettings.getBy(EmailAd, user_id)
    .then(response => {
      ads = response.map(item => {
        return getAdItem(item)
      })
    })
    .catch(e => console.error(e))
  return ads
}

export const fetchAd = async () => {
  let ads = []
  await apiSettings.getAll(AD_URL)
    .then(response => {
      ads = response.map(item => {
        return getAdItem(item)
      })
    })
    .catch(e => console.error(e))
  return ads
}

export const fetchPageAd = async (adPageUrl) => {
  let ads = []
  await apiSettings.getAll(adPageUrl)
    .then(response => {
      ads = response.map(item => {
        return getAdItem(item.ad_id)
      })
    })
    .catch(e => console.error(e))
  return ads
}

export const fetchSearchAD = async (adPageUrl, request) => {
  let ads = []
  await apiSettings.postRequest(adPageUrl, Search, request)
    .then(response => {
      ads = response.data.map(item => {
        let result
        if(adPageUrl === AD_URL){
          result = getAdItem(item)
        } else {
          result = getAdItem(item.ad_id)
        }
        return { ...result, img: `${BASE_URL}${result.img}` }
      })
    })
    .catch(e => console.error(e))
  return ads
}

export const fetchSearchField = async (adPageUrl, request) => {
  let ads = []
  await apiSettings.postRequest(adPageUrl, Search, request)
    .then(response => {
      ads = response.data.map(item => {
        let result = getImageItem(item)
        return { ...result, img: `${BASE_URL}${result.img}` }
      })
    })
    .catch(e => console.error(e))
  return ads
}

export default apiSettings;