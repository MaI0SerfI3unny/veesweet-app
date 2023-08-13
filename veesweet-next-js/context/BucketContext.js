import { createContext, useContext, useState, useEffect } from 'react';

const MyContext = createContext();

export const BucketProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  const [bucket, setBucket] = useState([]);

  useEffect(() => {
    const store = JSON.parse(localStorage.getItem("VeeSweetS"))
    setCount(store.length)
    setBucket(store)
  },[])

  const increment = (id) => {
    const store = JSON.parse(localStorage.getItem("VeeSweetS"))
    localStorage.setItem("VeeSweetS", JSON.stringify([...store, id]))
    setCount(count + 1);
    setBucket([...store, id])
  };

  const clearBucket = (id) => {
    const store = JSON.parse(localStorage.getItem("VeeSweetS"))
    const filterData = store.filter((el) => el != id)
    localStorage.setItem("VeeSweetS", JSON.stringify(filterData))
    setBucket(filterData)
    setCount(filterData.length)
  }

  const removeProduct = (id) => {
    const store = JSON.parse(localStorage.getItem("VeeSweetS"))
    const indexToRemove = store.indexOf(id.toString());
    store.splice(indexToRemove, 1);
    localStorage.setItem("VeeSweetS", JSON.stringify(store))
    setBucket(store)
    setCount(store.length)
  }

  const clearAllBucket = () => {
    localStorage.setItem("VeeSweetS", JSON.stringify([]))
    setBucket([])
    setCount(0)
  }

  return (
    <MyContext.Provider value={{ 
      count, increment, 
      bucket, clearBucket, 
      removeProduct, clearAllBucket }}>
      {children}
    </MyContext.Provider>
  );
};

export const useBucketContext = () => {
  return useContext(MyContext);
};