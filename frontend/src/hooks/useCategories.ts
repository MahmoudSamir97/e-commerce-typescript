import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import actGetCategories from "@store/features/categories/actions/actGetCategories";
import { cleanUpCategoriesRecords } from "@store/features/categories/categoriesSlice";

const useCategories = () => {
  const dispatch = useAppDispatch();

  const { loading, error, records } = useAppSelector(
    (state) => state.categories
  );

  useEffect(() => {
    const promise = dispatch(actGetCategories());
    return () => {
      dispatch(cleanUpCategoriesRecords());
      promise.abort();
    };
  }, [dispatch]);

  return { loading, error, records };
};

export default useCategories;
