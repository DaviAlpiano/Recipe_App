// types.ts

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export interface Drink {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

// Define um tipo que pode ser tanto uma Meal quanto uma Drink
export type MealOrDrink = Meal | Drink;

export interface InfoSearchBar {
  pesquisa: string;
  text: string;
  url: string;
}
