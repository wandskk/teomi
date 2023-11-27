import React from "react";
import profileMan from "@/assets/images/man.svg";
import profileWoman from "@/assets/images/woman.svg";
import Image from "next/image";
import { ImageBBServices } from "@/services/modules/imagebb";
import { AiFillCamera } from "react-icons/ai";
import { UserContext } from "@/context/UserContext";
import "@/styles/CreateAccount/CreateAccountSteps.scss";

const CreateAccountStepThree = ({ gender, stepValues, setStepValues }) => {
  const { userData, setLoading } = React.useContext(UserContext);
  const [selectedImage, setSelectedImage] = React.useState(userData?.userphoto);

  const handleImageChange = async (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setSelectedImage(e.target.result);
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        const blob = new Blob([reader.result], { type: file.type });
        // setStepValues(blob);
      };
      // setStepValues(file);
    } else {
      setStepValues(null);
      setSelectedImage(null);
    }
  };

  async function handleUploadToImgur(file) {
    const formData = new FormData();
    formData.append("image", file.split(",").pop());
    setLoading(true);
    try {
      const uploadPhotoResponse = await ImageBBServices.uploadImage(formData);
      setStepValues(uploadPhotoResponse.data.display_url);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  React.useState(() => {
    stepValues && handleImageChange(stepValues);
  }, [stepValues]);

  React.useEffect(() => {
    selectedImage && setStepValues(selectedImage);
  }, [selectedImage, setStepValues]);

  React.useEffect(() => {
    selectedImage && handleUploadToImgur(selectedImage);
  }, [selectedImage]);

  return (
    <div className="createAccountSteps">
      <div className="createAccountSteps__profile">
        <div className="createAccountSteps__profile__container">
          <label htmlFor="profilePhoto">
            {selectedImage ? (
              <Image
                className="createAccountSteps__profile__image"
                src={selectedImage}
                width={128}
                height={128}
                alt="Imagem de perfil"
              />
            ) : (
              <Image
                className="createAccountSteps__profile__image"
                src={gender === "2" ? profileWoman : profileMan}
                width={128}
                height={128}
                alt="Imagem de perfil"
              />
            )}
            <input
              type="file"
              name="profilePhoto"
              id="profilePhoto"
              accept="image/*"
              onChange={(e) => handleImageChange(e.target.files[0])}
            />
            <span className="createAccountSteps__profile__change">
              <AiFillCamera />
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountStepThree;
