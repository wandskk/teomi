import React from "react";
import profileMan from "@/assets/images/man.svg";
import profileWoman from "@/assets/images/woman.svg";
import Image from "next/image";
import { AiFillCamera } from "react-icons/ai";
import { UserContext } from "@/context/UserContext";
import "@/styles/CreateAttendant/CreateAttendantSteps.scss";
import { ImageBBServices } from "@/services/modules/imagebb";

const CreateAttendantStepFour = ({ gender, stepValues, setStepValues }) => {
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
    selectedImage && handleUploadToImgur(selectedImage);
  }, [selectedImage]);

  return (
    <div className="createAttendantSteps">
      <div className="createAttendantSteps__profile">
        <div className="createAttendantSteps__profile__container">
          <label htmlFor="profilePhoto">
            {selectedImage ? (
              <div
                className="createAttendantSteps__profile__image"
                style={{
                  backgroundImage: `url(${selectedImage})`,
                }}
              />
            ) : (
              <div
                className="createAttendantSteps__profile__image"
                style={{
                  backgroundImage: `url(${
                    gender === "2" ? profileWoman.src : profileMan.src
                  })`,
                }}
              />
            )}
            <input
              type="file"
              name="profilePhoto"
              id="profilePhoto"
              accept="image/*"
              onChange={(e) => handleImageChange(e.target.files[0])}
            />
            <span className="createAttendantSteps__profile__change">
              <AiFillCamera />
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default CreateAttendantStepFour;
