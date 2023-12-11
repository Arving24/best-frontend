import { useState, useEffect } from "react";

const useInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);
    const [isTouched, setIsTouched] = useState(false);
    const [hasError, setHasError] = useState(false);
  
    const onChangeHandler = (event) => {
        const updatedValue = event.target.value;
        setValue(updatedValue);
        if (updatedValue.length > 0) {
          setHasError(false);
        } else if (updatedValue.length === 0 && isTouched) {
          setHasError(true)
        }
    }
  
    const onBlurHandler = () => {
      setValue(value.trim())
      setIsTouched(true);
    }
  
    //update the value of hasError
    useEffect(() => {
      if (value.trim() === '' && isTouched) {
        setHasError(true);
      } else if (value.trim() !== '' && isTouched) {
        setHasError(false);
      } else {
        setHasError(false);
      }
    }, [value, isTouched]);

    const reset = () => {
        setValue('');
        setIsTouched(false);
      }

    return {
      value,
      isTouched,
      hasError,
      onChangeHandler,
      onBlurHandler,
      setIsTouched,
      reset,
    }
};

export default useInput;