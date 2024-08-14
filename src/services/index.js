const ENVIRONMENT = 'https://api-rest.metrologistica.com/api/Superveci/';
const API_KEY = 'hYscENaMVusfcRbh2Izsb8bG';

export const getList = async () => {
  const response = await fetch(`${ENVIRONMENT}get-shops?apiKey=${API_KEY}`);
  const data = await response.json();
  return data;
};

export const addShop = async shop => {
  shop = {
    ...shop,
    latitud: parseFloat(shop.latitud),
    longitud: parseFloat(shop.longitud),
    apiKey: API_KEY,
  };

  const response = await fetch(`${ENVIRONMENT}add-shop`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(shop),
  });
  const data = await response.json();

  return data;
};

export const getCategories = async () => {
  const response = await fetch(
    `${ENVIRONMENT}get-categories?apiKey=${API_KEY}`,
  );
  const data = await response.json();
  return data;
};

export const addShopImage = async (shopId, image) => {
  const filename = image.split('/').pop();
  const match = /\.(\w+)$/.exec(filename);
  const type = match ? `image/${match[1]}` : 'image';
  let imageData = new FormData();
  imageData.append('image', {
    uri: image,
    name: filename,
    type: type,
  });

  const response = await fetch(
    `${ENVIRONMENT}upload-shop-image?apiKey=${API_KEY}&shopId=${shopId}`,
    {
      method: 'POST',
      body: imageData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  const data = await response.json();
  console.log(data);
  return data;
};
