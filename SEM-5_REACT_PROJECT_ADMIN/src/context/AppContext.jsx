// import { createContext } from "react";

// export const AppContext = createContext();

// const AppContextProvider = (props) => {
//   const value = {};
//   return (
//     <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
//   );
// };

// export default AppContextProvider;
import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currency = "$";
  const calculateAge = (dob) => {
    if (!dob) return null; // safeguard for missing dob

    const birthDate = new Date(dob);
    if (isNaN(birthDate)) return null; // safeguard for invalid date

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();

    // adjust if birthday hasn't happened yet this year
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const months = [
    " ",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  // const slotDateFormat = (slotDate) => {
  //   const dateArray = slotDate.split("_");
  //   return (
  //     dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
  //   );
  // };
  const slotDateFormat = (slotDate, slotTime) => {
    const dateObj = new Date(slotDate);
    const day = dateObj.getDate().toString().padStart(2, "0");
    const month = dateObj.toLocaleString("default", { month: "short" });
    const year = dateObj.getFullYear();
    return `${day} ${month} ${year} `;
  };

  const value = {
    calculateAge,
    slotDateFormat,
    currency,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
