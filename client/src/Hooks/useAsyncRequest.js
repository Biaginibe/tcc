import { useState, useEffect } from "react";

const useAsyncRequest = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const axios = require('axios');
  
}
export default useAsyncRequest;