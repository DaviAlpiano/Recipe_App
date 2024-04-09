export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Ingredient {
  name: string;
  quantity: string;
}

export interface RecipeInProgress {
  id: string;
  type: 'meal' | 'drink';
  title: string;
  category?: string;
  alcoholicOrNot?: string;
  image: string;
  ingredients: Ingredient[];
  instructions: string;
}

export interface MealType {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export interface DrinkType {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

export interface MealCategory {
  strCategory: string;
}

export interface Drink {
  type: 'drink';
  idDrink: string;
  strDrink: string;
  strAlcoholic: string;
  strDrinkThumb: string;
  strInstructions: string;
}

export interface Meal {
  type: 'meal';
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strMealThumb: string;
  strInstructions: string;
}

export type APIContextType = {
  foods: MealType[] | DrinkType[],
  text: string,
  optionAPI: string,
  searchOption: (param:InfoSearchBar) => void,
};

export interface InfoSearchBar {
  pesquisa: string;
  text: string;
  url: string;
}

export type MealOrDrink = RecipeInProgress | MealType | DrinkType;

export interface Recipe {
  image: string;
  category: string;
  name: string;
  doneDate: string;
  tags: string[];
  nationality?: string;
}

export interface RecipeDataType {
  type: RecipeFetchOptionsType;
  id: string;
  name: string;
  drinkAlternate: string | null;
  category: string;
  instructions: string;
  thumb: string;
  tags: string[] | null;
  video: string | null;
  ingredients: string[];
  measures: string[];
  dateModified: string | null;
  creativeCommonsConfirmed: string | null;
  imageSource: string | null;
}

export interface MealRecipeDetType extends RecipeDataType {
  type: 'meals';
  area: string;
  source: string;
}

export interface DrinkRecipeDetType extends RecipeDataType {
  type: 'drinks';
  iba: string | null;
  alcoholic: string;
  glass: string;
  imageAttribution: string | null;
}

export type RecipeFetchOptionsType = 'drinks' | 'meals';
