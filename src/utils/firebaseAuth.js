const checkAuthTokenValidity = () => {
  const token = localStorage.getItem('authToken');
  try {
    // Split the token into its parts
    const [, payloadBase64] = token.split('.');

    // Decode the payload
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);

    // Check if the exp field exists
    if (!payload.exp) {
      console.log('Token does not contain expiration');
      return false;
    }

    // Compare the expiration time with the current time
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    if (payload.exp < currentTime) {
      console.log('Token has expired');
      console.log('Expiration time:', new Date(payload.exp * 1000).toLocaleString());
      console.log('Current time:', new Date().toLocaleString());
      return false;
    }

    console.log('Token is valid and not expired');
    return true;
  } catch (error) {
    console.error('Error checking token validity:', error);
    return false;
  }
};


export { checkAuthTokenValidity };