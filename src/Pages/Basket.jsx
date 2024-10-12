

import React from "react";
import { useSelector } from "react-redux";
import { basketState } from "../Redux/BasketSlice";

export default function Basket() {
  const { items } = useSelector(basketState);

  return (
    <div className="px-4 py-4">
      <h1 className="text-xl pr-14  font-bold">سبد خرید</h1>
      {items.length === 0 ? (
        <p className="text-xl pr-5 pt-8 font-semibold">سبد خرید شما خالی است.</p>
      ) : (
        <div className="flex flex-col gap-4 pt-10">
          {items.map((item) => (
            <div
              key={item.id}
              className="w-full bg-white shadow-md rounded-lg flex flex-col md:flex-row md:flex-nowrap flex-wrap"
            >
              <img
                src={item.imageUrl}
                className="w-full md:w-44 max-h-56 object-fill md:object-cover rounded-t-lg md:rounded-r-lg md:rounded-t-none"
                alt={item.name}
              />
              <div className="flex flex-col justify-between p-3 w-full">
                <div>
                  <p className="text-lg font-semibold text-gray-700">
                    {item.name}
                  </p>

                  <p className="text-sm text-gray-500 mb-2 overflow-hidden text-ellipsis whitespace-normal">
                    {item.ingredients}
                  </p>
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-600">تعداد:</p>
                    <p className="font-bold text-gray-800">
                      {item.quantity} عدد
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-gray-600">قیمت واحد:</p>
                    <p className="font-bold text-gray-800">
                      {item.price} تومان
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-1 border-t border-gray-200 pt-2">
                    <p className="text-gray-600">قیمت کل:</p>
                    <p className="font-bold text-indigo-600">
                      {item.quantity * item.price} تومان
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
