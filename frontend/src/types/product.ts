export type TProduct = {
  _id: string;
  title: string;
  img: string;
  cat_prefix: string;
  price: number;
  quantity?: number | undefined;
  max: number;
};
