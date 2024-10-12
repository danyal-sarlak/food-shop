import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import FoodSkeleton from "../Components/FoodSkeleton";
import useDebouncedSearch from "../hooks/useDebouncedSearch";
import { addItem, basketState, removeItem } from "../Redux/BasketSlice";
import PopularFoods from "../Components/PopularFoods";
import { FiPlus } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";

export default function Home() {

  const [selectedCategoryId, setSelectedCategoryId] = useState(0);

  // state برای پیگیری اینکه آیا ورودی فیلد جستجو فوکوس شده است یا نه
  const [isInputFocused, setIsInputFocused] = useState(false);

  // state برای ذخیره کوئری جستجو
  const [searchQuery, setSearchQuery] = useState("");

  // state برای نمایش پیام در صورت نبودن نتایج جستجو
  const [noResultsMessage, setNoResultsMessage] = useState("");

  // استفاده از useRef برای دستیابی به فیلد ورودی جستجو برای پیگیری کلیک بیرون از آن
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const { items } = useSelector(basketState);
  // استفاده از هوک سفارشی برای جستجوی دیبونسی
  const { results: searchResults,loading: searchLoading,isTyping,} = useDebouncedSearch(searchQuery, 1000);

  // دریافت داده‌های دسته‌بندی از API
  const {
    data: categories,
    isLoading: loadingCategories,
    isError: errorCategories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetch("/api/FoodCategory/categories");
      const data = await response.json();
      return [{ id: 0, name: "همه محصولات" }, ...data];
    },
  });

  // دریافت لیست غذاها بر اساس دسته‌بندی انتخابی API
  const { data: foods = [], isLoading: loadingFoods } = useQuery({
    queryKey: ["foods", selectedCategoryId],
    queryFn: async () => {
      const response = await fetch(
        selectedCategoryId === 0
          ? `/api/FastFood/list`
          : `/api/FastFood/list?categoryId=${selectedCategoryId}`
      );
      return await response.json();
    },
  });

  // اگر کوئری جستجو وارد شده باشد، لیست فیلتر شده غذاها نمایش داده می‌شود
  const filteredFoods = searchQuery ? searchResults : foods;

  // هندل کردن کلیک بیرون از فیلد جستجو برای بستن پنل جستجو
  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setIsInputFocused(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // ریست کردن شناسه دسته‌بندی و پیام نتایج زمانی که جستجو انجام می‌شود
  useEffect(() => {
    if (searchQuery) {
      setSelectedCategoryId(0);
      setNoResultsMessage("");
    }
  }, [searchQuery]);

  // بررسی وجود یا عدم وجود نتایج جستجو و نمایش پیام مناسب
  useEffect(() => {
    if (searchQuery && !isTyping) {
      if (filteredFoods.length === 0 && searchQuery !== "") {
        setNoResultsMessage("نتیجه‌ای یافت نشد");
      } else {
        setNoResultsMessage("");
      }
    }
  }, [searchQuery, filteredFoods, isTyping]);

  const handleAddItem = (food) => dispatch(addItem(food));

  const handleRemoveItem = (food) => dispatch(removeItem(food));

  // پیدا کردن تعداد آیتم‌های هر غذا در سبد خرید
  const getItemQuantity = (foodId) => {
    const item = items.find((item) => item.id === foodId);
    return item ? item.quantity : 0;
  };

  if (loadingCategories)
    return (
      <div className="flex justify-center mt-96">
        <FoodSkeleton />
      </div>
    );

  if (errorCategories) return <p>خطایی در دریافت داده‌ها رخ داد.</p>;

  return (
    <div>
      {/* فیلد ورودی جستجو */}
      <div
        className="relative w-full max-w-64 md:max-w-[400px] lg:max-w-md mt-3 md:mt-4 mr-16 md:mr-10 lg:mr-8"
        ref={inputRef}
      >
        <input
          className="p-2 pr-10 w-full rounded-lg"
          type="text"
          placeholder="چی میخوای بخوری"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsInputFocused(true)}
        />
        <IoSearch className="absolute right-3 top-[55%] transform -translate-y-1/2 text-yellow-600" />
        {isInputFocused && (
          <div className="absolute left-0 right-0 mt-1 bg-white border h-72 rounded-lg shadow-md p-4 overflow-auto">
            {isTyping ? (
              <p></p>
            ) : searchLoading ? (
              <p>در حال جستجو...</p>
            ) : searchQuery === "" ? (
              <p>جست و جو کنید</p>
            ) : filteredFoods.length > 0 ? (
              filteredFoods.map((food) => (
                <div key={food.id} className="py-2 flex items-center border-b">
                  <img
                    src={food.imageUrl}
                    alt={food.name}
                    className="w-12 h-12 rounded-md mr-2"
                  />
                  <p className="pr-2">{food.name}</p>
                  <p className="pr-2">{food.price} تومان</p>
                  <button
                    className="w-4 p-1 h-4 md:w-6 md:h-6 flex items-center mr-2 justify-center bg-green-500 text-white rounded-md"
                    onClick={() => handleAddItem(food)}
                  >
                    <FiPlus />
                  </button>
                </div>
              ))
            ) : (
              <p>{noResultsMessage}</p>
            )}
          </div>
        )}
      </div>

      {/* نمایش دسته‌بندی‌ها */}
      <div className="px-7 pt-28">
        <h1 className="text-xl font-bold">دسته بندی محصولات</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mt-4 justify-center lg:justify-start">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`w-full h-28 flex justify-center items-center bg-white shadow-md rounded-lg cursor-pointer ${
                selectedCategoryId === category.id
                  ? " border border-yellow-600 bg-yellow-500 "
                  : ""
              }`}
              onClick={() => setSelectedCategoryId(category.id)}
            >
              <p
                className={`text-gray-500 ${
                  selectedCategoryId === category.id ? "text-white" : ""
                }`}
              >
                {category.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* نمایش غذاهای محبوب */}
      <PopularFoods
        foods={filteredFoods}
        loadingFoods={loadingFoods}
        handleAddItem={handleAddItem}
        handleRemoveItem={handleRemoveItem}
        getItemQuantity={getItemQuantity}
      />
    </div>
  );
}
