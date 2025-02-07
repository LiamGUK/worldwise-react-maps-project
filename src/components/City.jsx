import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";
import { useCities } from "../contexts/CitiesContext";
import ButtonBack from "./BackButton";
import styles from "./City.module.css";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  // useParam hook from React Router allows to grab current param value from current URL - will return object with param name specified on Route in App.jsx (id)
  const { id } = useParams();

  const { getCity, currentCity, isLoading } = useCities();

  // useEffect hook ensures it calls the getCity function to fetch city info from API when the component mounts and re-renders
  useEffect(
    function () {
      // As getCity is wrapped in a useCallback in context file, will prevent infinite loop on http request
      getCity(id);
    },
    [id, getCity]
  );

  const { cityName, emoji, date, notes } = currentCity;

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <ButtonBack />
      </div>
    </div>
  );
}

export default City;
