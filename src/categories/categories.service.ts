import { Category } from "./categories.model";

export const findCategories = async (filter: any, populateOptions: any) => {
  const categories = await Category.find(filter).populate(populateOptions);

  return categories;
};
