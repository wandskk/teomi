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
  const [search, setSearch] = React.useState("");
  const [filter, setFilter] = React.useState(1);

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
      <Search setSearch={setSearch} setFilter={setFilter} />

      <h1 className="professionals__title">Profissionais nesta categoria</h1>

      <ul className="professionals__list">
        {professionals &&
          professionals
            .filter((professional) => {
              if (search.length > 2) {
                const searchToLower = search.toLowerCase();
                const professionalNameToLower =
                  professional.attendantName.toLowerCase();

                return professionalNameToLower.includes(searchToLower);
              }
              return professional;
            })
            .filter((professional) => {
              if (filter === 1) return professional;
              else if (filter === 2) return professional.isAvailable === 0;
              else if (filter === 3) return professional.isAvailable === 1;
            })
            .map((professional) => (
              <li key={professional.attendant_id}>
                <ProfessionalCard data={professional} />
              </li>
            ))}
      </ul>
    </div>
  );
};

export default Page;
