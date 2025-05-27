import { SubCategory } from "./sub_categories.model";

export const findSubCategory = async (query: any, populateOptions: any) => {
  const subCategory = await SubCategory.find(query).populate(populateOptions);
  return subCategory;
};
