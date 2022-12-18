import { category } from "./Enums";

export interface ISelect {
  label: string;
  id: string;
}
export interface IFood {
  foodId: number;
  name: string;
  imgUrl: string;
  foodDescription: string;
  category: category;
  rating: number;
  personsRated: number;
}