import { MenuItem } from "./menu_items.model";

export const findMenuItems = async (
  query: any,
  populateOptions?: any,
  sortOptions?: any,
  page?: number,
  limit?: number,
) => {
  const skip = (Number(page) - 1) * Number(limit) || 0;
  const menuItems = await MenuItem.find(
    query,
    {},
    { sort: sortOptions, skip, limit },
  ).populate(populateOptions);
  return menuItems;
};
