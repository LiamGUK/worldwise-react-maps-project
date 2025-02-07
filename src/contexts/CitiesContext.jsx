/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

const BASE_URL = "http://localhost:8000";

// 1st part of creating context is to call createContext hook and store to a variable
const CitiesContext = createContext();

// useReducer - first declare initial state in an object
const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

// Next create reducer function to validate state updating type using new payload object.
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    // For case names should model naming conventions like events & not setters to give overview of what each case does - use / to include process name in case
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}

// Create component function which accepts children prop so can be used on any external components in App.jsx sheet
function CitiesProvider({ children }) {
  // Call useReducer hook and destructure initial state variables and dispatch method to call reducer function.
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // use useEffect hook to load data on component mount (page load)
  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (err) {
        console.error(err);
        dispatch({
          type: "rejected",
          payload: "There was an error loading cities...",
        });
      }
    }
    fetchCities();
  }, []);

  // Need to make function stable as updates the state through dispatch event and when calling in external useEffect hook will result in an infinite loop.
  // As is a function need to implement useCallback
  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return;
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        dispatch({ type: "city/loaded", payload: data });
      } catch (err) {
        console.error(err);
        dispatch({
          type: "rejected",
          payload: "There was an error loading city...",
        });
      }
    },
    [currentCity.id]
  );

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      // For small apps ok to sync state variables with new refreshed external data by updating with state update method and creating new array copy - use React query for bigger projects
      // setCities((cities) => [...cities, data]);
      dispatch({ type: "city/created", payload: data });
    } catch (err) {
      console.error(err);
      dispatch({
        type: "rejected",
        payload: "There was an error creating city...",
      });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      // For small apps ok to sync state variables with new refreshed external data by updating with state update method and creating new array copy - use React query for bigger projects
      // setCities((cities) => cities.filter((city) => city.id !== id));
      dispatch({ type: "city/deleted", payload: id });
    } catch (err) {
      console.error(err);
      dispatch({
        type: "rejected",
        payload: "There was an error deleting city...",
      });
    }
  }

  // Return the createContext variable and attach Provider which initiates global context. Add value prop and pass in object of any state/functions wanting to share in app.
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

// Custom hook to read context value object and use in components
function useCities() {
  // Use useContext hook from react and pass in created context stored to variable
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("Cities context was used outside of CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };

/*********************
  Creating context steps:

  1. Create main context to use for Provider:
    const Context = createContext() - variable starts with uppercase letter as is a component

  2. Return context as JSX component and attach Provider to it. Use value prop to pass in object with any state/functions wanting to share throughout app as global variables
  return (
    <Context.Provider value={{globalProp1, globalProp2}}>
      {children}
          or
      {JSX elements}
    </Context.Provider>
  )

  3. Either create custom hook to consume context in other components or use useContext hook directly in components to grab global variables

  -- Custom hook:
  function useCustomContext(){
    const context = useContext(Context);
    if(context === undefined) throw new Error()
    return context
  }

  const { globalProp1, globalProp2 } = useCustomContext();


  -- useContext hook directly
  const { globalProp1, globalProp2 } = useContext(Context);

  When using useContext hook directly in Components need to pass in main context each time used to ensure it grabs correct context variables.
*/
