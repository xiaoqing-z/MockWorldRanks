import Layout from "../components/Layout/Layout.js";
import SearchInput from "../components/SearchInput/SearchInput";
import CountriesTable from "../components/CountriesTable/CountriesTable";
import styles from "../styles/Home.module.css";
import { useState } from "react";

export default function Home({ countries }) {
  console.log(countries);
  const [keywords, setKeywords] = useState("");

  const filteredCountires = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(keywords) ||
      country.region.toLowerCase().includes(keywords) ||
      country.subregion.toLowerCase().includes(keywords)
  );

  const onInputChange = (e) => {
    e.preventDefault();

    setKeywords(e.target.value.toLowerCase());
  };

  return (
    <Layout>
      <div className={styles.counts}>Found {countries.length} countries</div>
      <SearchInput
        placeholder=" Filter by Name, Region or SubRegion"
        onChange={onInputChange}
      />

      <CountriesTable countries={filteredCountires}></CountriesTable>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const res = await fetch("https://restcountries.eu/rest/v2/all");
  const countries = await res.json();
  return {
    props: {
      countries,
    },
  };
};
