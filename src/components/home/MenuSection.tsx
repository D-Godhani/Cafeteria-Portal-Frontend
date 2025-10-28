// src/components/home/MenuSection.tsx

import React from "react";
import MenuItemCard from "./MenuItemCard";

// Mock data - in a real app, this would come from an API
const menuItems = [
  {
    name: "Masala Dosa",
    description: "Crispy rice crepe with a savory potato filling.",
    price: "₹70",
  },
  {
    name: "Veg Thali",
    description:
      "A complete meal with dal, rice, roti, and two vegetable curries.",
    price: "₹120",
  },
  {
    name: "Chole Bhature",
    description: "Spicy chickpea curry served with fluffy fried bread.",
    price: "₹90",
  },
];

const MenuSection: React.FC = () => {
  return (
    <section id="menu" className="py-12 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-black text-center mb-8">
          Today's Mess Menu
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item, index) => (
            <MenuItemCard
              key={index}
              name={item.name}
              description={item.description}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
