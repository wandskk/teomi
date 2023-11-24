export function cpfValidator(cpf) {
  cpf = cpf.replace(/[^\d]/g, ""); // Remove non-numeric characters
  if (cpf.length !== 11 || /^(.)\1{10}$/.test(cpf)) {
    return false;
  }

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }

  let remainder = sum % 11;
  if (remainder < 2) {
    if (parseInt(cpf.charAt(9)) !== 0) {
      return false;
    }
  } else {
    if (parseInt(cpf.charAt(9)) !== 11 - remainder) {
      return false;
    }
  }

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }

  remainder = sum % 11;
  if (remainder < 2) {
    if (parseInt(cpf.charAt(10)) !== 0) {
      return false;
    }
  } else {
    if (parseInt(cpf.charAt(10)) !== 11 - remainder) {
      return false;
    }
  }

  return true;
}
