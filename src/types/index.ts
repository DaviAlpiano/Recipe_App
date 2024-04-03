export type APIContextType = {
  searchOption: (param:InfoSearchBar) => void,
};

export type InfoSearchBar = {
  pesquisa: string,
  text: string,
};

export type FoodType = {
  idMeal: string,
  strMeal: string,
  strMealThumb: string,
};
