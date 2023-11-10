"use client";

import React from "react";
import Search from "@/components/Search/Search";
import ProfessionalCard from "@/components/ProfessionalCard/ProfessionalCard";
import { UserContext } from "@/context/UserContext";
import { ChatServices } from "@/services/modules/chat";
import "./page.scss";

const Page = ({ params }) => {
  const { connectID, setLoading } = React.useContext(UserContext);
  const [professionals, setProfessionals] = React.useState(null);

  const getProfessionals = React.useCallback(async (token) => {
    setLoading(true);
    try {
      const professionals = await ChatServices.getAttendant(token);
      setProfessionals(professionals);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    if (connectID) getProfessionals(connectID);
  }, [getProfessionals]);

  return (
    <div className="professionals">
      <Search />

      <h1 className="professionals__title">Profissionais nesta categoria</h1>

      <ul className="professionals__list">
        {professionals &&
          professionals.map((professional) => (
            <li key={professional.attendant_id}>
              <ProfessionalCard data={professional} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Page;
