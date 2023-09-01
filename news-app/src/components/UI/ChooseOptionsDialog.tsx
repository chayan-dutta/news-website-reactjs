import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ThemeProvider, createTheme } from "@mui/material";
import ChooseOptions from "./ChooseOptions";
import { CountryAndCode } from "../../utils/StaticData";
import NewsContext from "../../Contexts/NewsDataContext";
import { useNavigate } from "react-router-dom";

const darkTheme = createTheme({
  palette: {
    mode: "dark", // Set the theme mode to dark
  },
});

const ChooseOptionsDialog = () => {
  const [open, setOpen] = React.useState(false);
  const [categories, setCategories] = React.useState<string[]>([]);
  const [countries, setCountries] = React.useState<string[]>([]);
  const navigate = useNavigate();

  const newsCtx = React.useContext(NewsContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const receiveCountryNames = (countries: string[]) => {
    setCountries(countries);
  };

  const receiveCategories = (categories: string[]) => {
    setCategories(categories);
  };

  const handleSubmit = () => {
    let correspondingValues = countries.map((countryToFind) => {
      const countryData = CountryAndCode.find(
        (country) => country.label === countryToFind
      );
      return countryData ? countryData.value : null;
    });
    let countryValueString = correspondingValues.filter(Boolean).join(",");
    let categoryValueString = categories.filter(Boolean).join(",");
    localStorage.setItem("countries", countries.join(" "));
    localStorage.setItem("categories", categories.join(" "));
    localStorage.setItem("selectedCountries", countryValueString);
    localStorage.setItem("selectedCategory", categoryValueString);
    newsCtx.getNewsData(countryValueString, categoryValueString);
    handleClose();
    navigate("/");
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Customize Your Feed
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Choose From Below Options</DialogTitle>
          <DialogContent
            sx={{
              minWidth: "600px",
              minHeight: "30vh",
              overflowY: "auto",
            }}
          >
            <DialogContentText>
              Select your desired countries and categories to get latest news on
              these. Upto five(5) selections are allowed.
            </DialogContentText>{" "}
            <br />
            <ChooseOptions
              getCountry={receiveCountryNames}
              getCategories={receiveCategories}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Apply</Button>
          </DialogActions>
        </Dialog>
      </div>
    </ThemeProvider>
  );
};

export default ChooseOptionsDialog;
