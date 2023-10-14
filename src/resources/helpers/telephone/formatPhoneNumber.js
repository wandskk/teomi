export const formatPhoneNumber = {
  format: (phoneNumber) => {
    if (phoneNumber.length === 14) return phoneNumber;
    const areaCode = phoneNumber.slice(0, 2);
    const part1 = phoneNumber.slice(2, 7);
    const part2 = phoneNumber.slice(7, 11);
    return `(${areaCode}) ${part1}-${part2}`;
  },
  clear: (phoneNumber) => phoneNumber.replace(/\D/g, ''),
};
