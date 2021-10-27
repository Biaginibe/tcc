import React, { createContext, useState, useContext } from "react";

const FilterContext = createContext();

export default function FilterProvider({ children }) {
  const [filters, setFilters] = useState({
    abordagem: "",
    tipoAtendimento: "",
    genero: "",
    faixaEtaria: "",
    tempoSessao: "",
  });

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);
  const { filters, setFilters } = context;
  return { filters, setFilters };
}
