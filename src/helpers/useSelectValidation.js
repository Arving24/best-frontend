import { useState, useEffect } from 'react';

function useSelectValidation(initialValue = '', required = false) {
  const [value, setValue] = useState(initialValue);
  const [hasError, setHasError] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  useEffect(() => {
    if (required && !value && isTouched ) {
      setHasError(true);
    } else {
      setHasError(false);
    }
  }, [value, required, isTouched]);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const onBlurHandler = () => {
    setIsTouched(true)
  }

  const reset = () => {
    setValue('');
    setIsTouched(false);
  }

  return {
    value,
    handleChange,
    hasError,
    isTouched,
    setHasError,
    setIsTouched,
    onBlurHandler,
    reset,
  };
}

export default useSelectValidation;