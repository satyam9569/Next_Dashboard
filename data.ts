export interface Sale {
  month: string;
  region: string;
  product: string;
  category: string;
  sales: number;
  profit: number;
}

export const salesData: Sale[] = [
  {
    month: "Jan",
    region: "North",
    product: "Laptop",
    category: "Electronics",
    sales: 5000,
    profit: 1500,
  },
  {
    month: "Jan",
    region: "South",
    product: "Phone",
    category: "Electronics",
    sales: 7000,
    profit: 2000,
  },
  {
    month: "Feb",
    region: "North",
    product: "Tablet",
    category: "Electronics",
    sales: 6000,
    profit: 1800,
  },
  {
    month: "Feb",
    region: "South",
    product: "Laptop",
    category: "Electronics",
    sales: 9000,
    profit: 2500,
  },
  {
    month: "Mar",
    region: "East",
    product: "Chair",
    category: "Furniture",
    sales: 4000,
    profit: 1200,
  },
  {
    month: "Mar",
    region: "West",
    product: "Table",
    category: "Furniture",
    sales: 5000,
    profit: 1500,
  },
  // add more dummy data as needed
];
