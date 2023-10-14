export const blobHelper = {
  decode: async (imageUrl) => {
    try {
      // Faz uma requisição para obter a imagem como um array de bytes
      const response = await fetch(url);

      // Converte a resposta para um array de bytes
      const arrayBuffer = await response.arrayBuffer();

      // Obtém o tipo da imagem a partir da resposta
      const contentType = response.headers.get('content-type');

      // Cria um objeto Blob com o array de bytes e o tipo da imagem
      const blob = new Blob([arrayBuffer], { type: contentType });

      return blob;
    } catch (error) {
      console.error('Erro ao carregar a imagem:', error);
    }
  },
  clear: async (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = reader.result;
      };
      reader.readAsDataURL(blob);
    });
  },
};
