import React, { createContext, useState, useEffect } from 'react';

const LoadingContext = createContext({
  isLoading: false,
  setIsLoading: () => {}
});

export const LoadingContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    console.log('isLoading in context:', isLoading);
  }, [isLoading])
 

  return (
    <LoadingContext.Provider value={{isLoading, setIsLoading}}>
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingContext;