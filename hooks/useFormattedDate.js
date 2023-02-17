import { useState, useEffect } from "react";

const useFormattedDate = (date) => {
  const [formattedDate, setFormattedDate] = useState();

  useEffect(() =>
    setFormattedDate(new Date(date).toLocaleDateString("ru-RU")),
    []);

  return formattedDate;
};

export default useFormattedDate;