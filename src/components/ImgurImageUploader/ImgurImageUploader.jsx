import React, { useState } from "react";
import axios from "axios";

const ImgurImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      alert("Selecione uma imagem para fazer o upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const response = await axios.post(
        "https://api.imgur.com/3/image",
        formData,
        {
          headers: {
            Authorization: "Client-ID YOUR_CLIENT_ID",
          },
        }
      );

      // A resposta deve conter a URL da imagem recém-carregada
      const imageUrl = response.data.data.link;
      alert(`Upload bem-sucedido! URL da imagem: ${imageUrl}`);
    } catch (error) {
      console.error("Erro ao fazer upload da imagem:", error);
    }
  };

  return (
    <div>
      <h2>Fazer Upload de Imagem para o Imgur</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleUpload}>Fazer Upload</button>
    </div>
  );
};

export default ImgurImageUploader;
