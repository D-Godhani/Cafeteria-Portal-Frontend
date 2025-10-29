// src/components/home/MenuSection.tsx

import React from "react";
import MenuItemCard from "./MenuItemCard";

// Mock data now includes image URLs
const menuItems = [
  {
    name: "Veg Thali",
    description:
      "A balanced meal with dal, rice, roti, and two vegetable curries.",
    price: "₹120",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1695299496991-65340343a033?q=80&w=2070&auto=format&fit=crop",
  },
  {
    name: "Masala Dosa",
    description: "Crispy rice crepe filled with a savory spiced potato mix.",
    price: "₹70",
    imageUrl:
      "https://images.unsplash.com/photo-1668279373928-80e210c3b843?q=80&w=2070&auto=format&fit=crop",
  },
  {
    name: "Chole Bhature",
    description: "Spicy chickpea curry served with fluffy deep-fried bread.",
    price: "₹90",
    imageUrl:
      "https://images.unsplash.com/photo-1606694247426-b333a9ead449?q=80&w=1935&auto=format&fit=crop",
  },
];

const MenuSection: React.FC = () => {
  return (
    // A clean white background for this section
    <section id="menu" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">
            Today's <span className="text-primary">Mess Menu</span>
          </h2>
          <p className="text-base-content/70 mt-2">
            Freshly prepared meals for breakfast, lunch, and dinner.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item, index) => (
            <MenuItemCard
              key={index}
              name={item.name}
              description={item.description}
              price={item.price}
              imageUrl={item.imageUrl} // Pass the image URL
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
