import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@store/store";

// same like useMemo()
const getTotalCartQuantitiesSelector = createSelector(
  (state: RootState) => state.cart.items,
  (items) => {
    const totalCartItems = Object.values(items).reduce(
      (total, current) => total + current,
      0
    );
    return totalCartItems;
  }
);

export { getTotalCartQuantitiesSelector };
