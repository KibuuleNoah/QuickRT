const ValidateIdentifier = (input) => {
  const cleanInput = input.trim();
  const digitsOnly = cleanInput.replace(/[\s\-\(\)\+]/g, "");

  // If the cleaned string contains ANY non-digit, treat it as an email.
  // (e.g., "user@test.com" has letters/symbols, "123456" is all digits)
  const isEmail = /\D/.test(digitsOnly);

  if (isEmail) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(cleanInput);
  } else {
    // Ensure it's not empty and follows a standard digit length (7-15 digits)
    return digitsOnly.length >= 7 && digitsOnly.length <= 15;
  }
};

console.log(ValidateIdentifier("257777777776705796435"));
