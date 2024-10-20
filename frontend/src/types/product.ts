export type TProduct = {
  id: string;
  _id?: string;
  title: string;
  img: string;
  cat_prefix: string;
  price: string;
  quantity?: number | undefined;
  max: number;
};
