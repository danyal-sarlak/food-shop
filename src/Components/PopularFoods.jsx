import React from "react";
import FoodSkeleton from "../Components/FoodSkeleton";

const PopularFoods = ({ foods, loadingFoods, handleAddItem, handleRemoveItem, getItemQuantity }) => {
  return (
    <div className="  pr-14 md:pr-12 lg:pr-10 pb-4 pt-8">
      <h1 className="text-xl font-bold">غذاهای محبوب</h1>
      <div className="flex flex-wrap gap-4 mt-4">
        {loadingFoods ? (
          <FoodSkeleton />
        ) : (
          foods.map((food) => (
            <div
              key={food.id}
              className="w-64 h-[360px] flex flex-col bg-white shadow-md rounded-lg"
            >
              <img
                src={food.imageUrl}
                className="object-cover rounded-t-md"
                alt={food.name}
              />
              <p className="pr-1">{food.name}</p>
              <p className="pr-1">{food.price} تومان</p>
              <p className="h-20 pr-1">{food.ingredients}</p>
              <div className="flex gap-x-3 p-2 items-center">
                <button
                  className="w-10 h-10 p-2 bg-green-500 text-white rounded-md"
                  onClick={() => handleAddItem(food)}
                >
                  +
                </button>
                <p>{getItemQuantity(food.id)}</p> {/* نمایش تعداد آیتم‌ها */}
                <button
                  className="w-10 h-10 p-2 bg-red-500 text-white rounded-md"
                  onClick={() => handleRemoveItem(food)}
                >
                  -
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PopularFoods;
