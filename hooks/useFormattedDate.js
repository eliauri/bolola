import { useState, useEffect } from "react";

const useFormattedDate = (date) => {
  const [formattedDate, setFormattedDate] = useState();

  useEffect( () => setFormattedDate(new Date(date).toLocaleDateString("ru-RU")),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return formattedDate;
};

export default useFormattedDate;