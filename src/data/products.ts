import productSofa1 from "@/assets/product-sofa-1.jpg";
import productSofa2 from "@/assets/product-sofa-2.jpg";
import productSofa3 from "@/assets/product-sofa-3.jpg";
import productSofa4 from "@/assets/product-sofa-4.jpg";
import productOffice from "@/assets/product-office.jpg";
import productBed from "@/assets/product-bed.jpg";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
  materials: string;
  sizes: string;
  description: string;
  colors: string[];
}

export const categories = [
  "All",
  "Living Room",
  "Luxury",
  "Corner Sofas",
  "Beds",
  "Office",
];

export const products: Product[] = [
  {
    id: "1",
    name: "Solina Modern Sectional",
    category: "Living Room",
    price: "85,000 ETB",
    image: productSofa1,
    materials: "Premium Italian Fabric, Solid Wood Frame",
    sizes: "320cm × 220cm × 85cm",
    description: "A spacious modern sectional sofa perfect for large living rooms. Features deep seating and plush cushions for ultimate comfort.",
    colors: ["Gray", "Beige", "Navy"],
  },
  {
    id: "2",
    name: "Classic Chesterfield",
    category: "Luxury",
    price: "120,000 ETB",
    image: productSofa2,
    materials: "Genuine Leather, Hardwood Frame",
    sizes: "230cm × 95cm × 80cm",
    description: "Timeless Chesterfield design with hand-tufted genuine leather. A statement piece for discerning tastes.",
    colors: ["Brown", "Black", "Burgundy"],
  },
  {
    id: "3",
    name: "Solina Corner Sofa",
    category: "Corner Sofas",
    price: "65,000 ETB",
    image: productSofa3,
    materials: "Linen Blend Fabric, Pine Wood Frame",
    sizes: "280cm × 200cm × 80cm",
    description: "Elegant L-shaped corner sofa with clean lines. Perfect for modern apartments and cozy corners.",
    colors: ["Beige", "Light Gray", "Sage"],
  },
  {
    id: "4",
    name: "Emerald Velvet Sofa",
    category: "Luxury",
    price: "95,000 ETB",
    image: productSofa4,
    materials: "Velvet Upholstery, Carved Wood Legs",
    sizes: "240cm × 90cm × 82cm",
    description: "A luxurious velvet sofa with classic rolled arms and deep button tufting. Adds glamour to any room.",
    colors: ["Emerald Green", "Royal Blue", "Burgundy"],
  },
  {
    id: "5",
    name: "Executive Desk Set",
    category: "Office",
    price: "45,000 ETB",
    image: productOffice,
    materials: "Engineered Wood, Ergonomic Leather Chair",
    sizes: "150cm × 75cm × 75cm",
    description: "Complete executive desk and chair set for the modern office. Combines style with ergonomic comfort.",
    colors: ["Natural Oak", "Walnut", "White"],
  },
  {
    id: "6",
    name: "Royal Upholstered Bed",
    category: "Beds",
    price: "75,000 ETB",
    image: productBed,
    materials: "Tufted Linen, Solid Wood Frame",
    sizes: "King Size: 200cm × 180cm",
    description: "A stunning upholstered bed with a tall tufted headboard. Transforms your bedroom into a luxury retreat.",
    colors: ["Taupe", "Ivory", "Charcoal"],
  },
];
