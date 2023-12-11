import { useEffect, useState } from 'react';

const useBarapidoEmail = (initial) => {
  const [email, setEmail] = useState(initial);
  const [isValid, setIsValid] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [hasError, setHasError] = useState(false);

  const validateEmail = (email) => {
    // Regular expression for a basic email validation
    const emailRegex = /^[A-Za-z0-9._%+-]+@[barapido]+\.[com]{3,}$/;

    return emailRegex.test(email);
  };

  useEffect(() => {
    if (!isValid && isTouched) {
      setHasError(true)
    } else if (isValid && isTouched) {
      setHasError(false)
    }
  }, [isTouched, isValid])

  const handleChange = (newEmail) => {
      setEmail(newEmail);
      setIsValid(validateEmail(newEmail));
  };

  const onBlurHandler = () => {
    setIsTouched(true);
  }

  const reset = () => {
    setEmail('');
    setIsTouched(false);
  }

  return {
    email,
    isValid,
    handleChange,
    isTouched,
    onBlurHandler,
    hasError,
    setIsTouched,
    reset,
  };
};

export default useBarapidoEmail;
