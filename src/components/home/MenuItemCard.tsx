// src/components/home/MenuItemCard.tsx

import React from "react";

interface MenuItemProps {
  name: string;
  description: string;
  price: string;
  // imageUrl: string;
}

const MenuItemCard: React.FC<MenuItemProps> = ({
  name,
  description,
  price,
  // imageUrl,
}) => {
  return (
    <div className="card bg-base-100 shadow-xl transition-transform duration-300 hover:scale-105">
      {/* <figure className="h-48">
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
      </figure> */}
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
        <div className="card-actions justify-between items-center mt-4">
          <div className="badge badge-secondary p-4 font-bold">{price}</div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
