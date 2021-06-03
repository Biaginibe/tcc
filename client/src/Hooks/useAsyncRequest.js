import { useState, useEffect } from "react";

const useAsyncRequest = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() =>  {
    async function fetchData(){
       await fetch('http://localhost:3333/findUsers')
       .then(setLoading(true))
       .then(response => {
          setLoading(false);
          console.log("teste"+response);
          setData(response.data);
       })
       .catch(err => {
          setLoading(false)
          console.log(err)
       })
    }
    
    fetchData();
 }, []);

  return [data, loading];
};

export default useAsyncRequest;