'use client'
export const setItem = (key, data) => {
    localStorage.setItem(key, data);
  };
  
  export const getItem = (key) => {
    return localStorage.getItem(key);
  };
  
  export const RemoveItem = (key) => {
    localStorage.removeItem(key);
  };