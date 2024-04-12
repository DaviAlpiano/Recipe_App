export interface User {
  id: number;
  name: string;
  email: string;
}

export interface RecipeDetailsType {
  // Defina as propriedades dos detalhes da receita conforme necessário
  idMeal?: string;
  strMeal?: string;
  strInstructions?: string;
  strMealThumb?: string;
  idDrink?: string;
  strDrink?: string;
  strDrinkThumb?: string;
  strAlcoholic?: string;
  strCategory?: string;
  strIngredient?: RecipeDetailsIngredientsType;
  strMeasure?: RecipeDetailsMeasureType;
  strYoutube?: string;
}

export type RecipeDetailsIngredientsType = {
  strIngredient1?: string;
  strIngredient2?: string;
  strIngredient3?: string;
  strIngredient4?: string;
  strIngredient5?: string;
  strIngredient6?: string;
  strIngredient7?: string;
  strIngredient8?: string;
  strIngredient9?: string;
  strIngredient10?: string;
  strIngredient11?: string;
  strIngredient12?: string;
  strIngredient13?: string;
  strIngredient14?: string;
  strIngredient15?: string;
  strIngredient16?: string;
  strIngredient17?: string;
  strIngredient18?: string;
  strIngredient19?: string;
  strIngredient20?: string;
};

export type RecipeDetailsMeasureType = {
  strMeasure1?: string;
  strMeasure2?: string;
  strMeasure3?: string;
  strMeasure4?: string;
  strMeasure5?: string;
  strMeasure6?: string;
  strMeasure7?: string;
  strMeasure8?: string;
  strMeasure9?: string;
  strMeasure10?: string;
  strMeasure11?: string;
  strMeasure12?: string;
  strMeasure13?: string;
  strMeasure14?: string;
  strMeasure15?: string;
  strMeasure16?: string;
  strMeasure17?: string;
  strMeasure18?: string;
  strMeasure19?: string;
  strMeasure20?: string;
};

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

export type FavoriteRecipe = {
  id: string;
  type: string; // 'meal' ou 'drink'
  nationality: string;
  category: string;
  alcoholicOrNot: string;
  name: string;
  image: string;
  doneDate: string;
  tags: string[];
};
