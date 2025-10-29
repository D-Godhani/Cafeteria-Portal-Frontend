// src/components/home/MenuItemCard.tsx

import React from "react";

interface MenuItemProps {
  name: string;
  description: string;
  price: string;
  imageUrl: string; // Re-enabled this prop
}

const MenuItemCard: React.FC<MenuItemProps> = ({
  name,
  description,
  price,
  imageUrl,
}) => {
  return (
    <div className="card bg-base-100 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-transparent hover:border-primary">
      <figure className="h-56">
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p className="text-base-content/80">{description}</p>
        <div className="card-actions justify-end items-center mt-4">
          {/* Using badge-accent (coral) makes the price stand out */}
          <div className="badge badge-accent text-white p-4 font-bold">
            {price}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
