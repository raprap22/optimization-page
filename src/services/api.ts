import axios from 'axios';

export const BASE_URL = 'https://dummyjson.com/products';

export const fetchProductList = async (cat?: string, search?: string) => {
  const url = cat
    ? `${BASE_URL}/category/${cat}`
    : search
    ? `${BASE_URL}/search?q=${search}`
    : BASE_URL;
  const { data } = await axios.get(url);
  return data.products;
};

export const fetchProductById = async (id: number) => {
  const { data } = await axios.get(`${BASE_URL}/${id}`);
  return data;
};

export const fetchCategory = async () => {
  const { data } = await axios.get(`${BASE_URL}/category-list`);
  return data;
};

export const fetchProductByCategory = async (cat: string) => {
  const { data } = await axios.get(`${BASE_URL}/category/${cat}`);
  return data;
};
