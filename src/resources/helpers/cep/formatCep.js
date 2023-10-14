export const formatCep = {
  format: (cep) => {
    cep = cep.replace(/\D/g, '');
    cep = cep.replace(/^(\d{5})(\d{3})$/, '$1-$2');
    return cep;
  },
  clear: (cep) => cep.replace(/\D/g, ''),
};
