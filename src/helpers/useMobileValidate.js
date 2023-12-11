import { useState, useEffect } from 'react';

const useMobileValidate = (initial) => {
  const [mobileNumber, setMobileNumber] = useState(initial);
  const [isValid, setIsValid] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const validateMobileNumber = (number) => {
    // Define your mobile number validation logic here
    // For example, you can use regular expressions to check for a valid format
    const mobileNumberPattern = /^9\d{9}$/; // Assumes a 10-digit mobile number
    
    return mobileNumberPattern.test(number)
  };

  useEffect(() => {
    if(!isValid && isTouched) {
        setHasError(true)
    } else if (isValid && isTouched) {
        setHasError(false)
    } 
  }, [isValid, isTouched])
  

  const handleChange = (number) => {
    setMobileNumber(number);
    setIsValid(validateMobileNumber(number));
  };

  const onBlurHandler = () => {
    setIsTouched(true);
  }
 
  const reset = () => {
    setMobileNumber('');
    setIsTouched(false);
  }

  return {
    mobileNumber,
    isValid,
    handleChange,
    onBlurHandler,
    setIsTouched,
    hasError,
    isTouched,
    reset,
  };
};

export default useMobileValidate;