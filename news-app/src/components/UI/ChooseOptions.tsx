import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { Categories, CountryAndCode } from "../../utils/StaticData";

const darkTheme = createTheme({
  palette: {
    mode: "dark", // Set the theme mode to dark
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MAX_SELECTED = 5; // Maximum number of selected countries

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 5 + ITEM_PADDING_TOP,
      width: 550,
    },
  },
};

export default function ChooseOptions({ getCountry, getCategories }: any) {
  const [countryName, setCountryName] = React.useState<string[]>([]);
  const [category, setCategory] = React.useState<string[]>([]);

  React.useEffect(() => {
    let countries = localStorage.getItem("countries");
    let categories = localStorage.getItem("categories");
    if (countries && categories) {
      setCountryName(countries.split(" "));
      setCategory(categories.split(" "));
    }
  }, []);

  const handleChange = (event: SelectChangeEvent<typeof countryName>) => {
    const {
      target: { value },
    } = event;

    if (value.length <= MAX_SELECTED) {
      setCountryName(value as string[]);
      getCountry(value as string[]);
    }
  };

  const handleChangeCategory = (event: SelectChangeEvent<typeof category>) => {
    const {
      target: { value },
    } = event;

    if (value.length <= MAX_SELECTED) {
      setCategory(value as string[]);
      getCategories(value as string[]);
    }
  };

  const isCountrySelected = (countryValue: string) =>
    countryName.indexOf(countryValue) !== -1;

  const isCategorySelected = (categoryValue: string) =>
    category.indexOf(categoryValue) !== -1;

  return (
    <ThemeProvider theme={darkTheme}>
      <div>
        <FormControl sx={{ m: 1, width: 550 }}>
          <InputLabel id="demo-multiple-checkbox-label">
            Select Countries
          </InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={countryName}
            onChange={handleChange}
            input={<OutlinedInput label="Select Country" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {CountryAndCode.map((name) => (
              <MenuItem
                key={name.value}
                value={name.label}
                disabled={
                  countryName.length >= MAX_SELECTED &&
                  !isCountrySelected(name.label)
                }
              >
                <Checkbox checked={isCountrySelected(name.label)} />
                <ListItemText primary={name.label} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, width: 550 }}>
          <InputLabel id="demo-multiple-checkbox">Select Categories</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={category}
            onChange={handleChangeCategory}
            input={<OutlinedInput label="Select Categories" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {Categories.map((categories) => (
              <MenuItem
                key={categories}
                value={categories}
                disabled={
                  category.length >= MAX_SELECTED &&
                  !isCategorySelected(categories)
                }
              >
                <Checkbox checked={isCategorySelected(categories)} />
                <ListItemText primary={categories} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </ThemeProvider>
  );
}
