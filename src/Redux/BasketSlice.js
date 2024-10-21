/* 
    import { createSlice } from "@reduxjs/toolkit";

// بازیابی آیتم‌های ذخیره‌شده در localStorage یا استفاده از مقادیر پیش‌فرض
const initialState = {
  items: [], 
  changeHistory: [], // افزودن تاریخچه تغییرات
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addItem(state, action) {
      const item = action.payload;
      const alreadyExist = state.items.some((_item) => _item.id === item.id);

      if (alreadyExist) {
        state.items = state.items.map((_item) =>
          _item.id === item.id
            ? { ..._item, quantity: _item.quantity + 1 }
            : _item
        );
      } else {
        state.items.push({ ...item, quantity: 1 });
      }

      // ذخیره تغییر در تاریخچه به همراه تصویر
      state.changeHistory.push({
        name: item.name,
        action: "اضافه شد",
        timestamp: new Date().toLocaleString(),
        image: item.imageUrl, // فرض بر این است که imageUrl یک ویژگی در item است
      });
    },
    removeItem(state, action) {
      const item = action.payload;
      state.items = state.items.reduce((acc, _item) => {
        if (_item.id === item.id) {
          if (_item.quantity > 1) {
            acc.push({ ..._item, quantity: _item.quantity - 1 });
          }
          // ذخیره تغییر در تاریخچه به همراه تصویر
          state.changeHistory.push({
            name: item.name,
            action: "حذف شد",
            timestamp: new Date().toLocaleString(),
            image: item.imageUrl, // فرض بر این است که imageUrl یک ویژگی در item است
          });
        } else {
          acc.push(_item);
        }
        return acc; // آرایه‌ای است که برای جمع‌آوری آیتم‌ها
      }, []);
    },
    clearBasket(state) {
      state.items = [];// پاک کردن تمام آیتم‌های سبد خرید
      state.changeHistory = []; // پاک کردن تاریخچه
    },
  },
});

// اضافه کردن export برای basketState
export const basketState = (state) => state.basket;

export const { addItem, removeItem, clearBasket } = basketSlice.actions;

export default basketSlice.reducer;
 */

/////////////////////////////////////////////////////
import { createSlice } from "@reduxjs/toolkit";

// بازیابی آیتم‌های ذخیره‌شده در localStorage یا استفاده از مقادیر پیش‌فرض
const initialState = {
  items: [],
  changeHistory: [], // افزودن تاریخچه تغییرات
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addItem(state, action) {
      const item = action.payload;
      const existingItem = state.items.find((_item) => _item.id === item.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }

      // ذخیره تغییر در تاریخچه به همراه تصویر
      state.changeHistory.push({
        name: item.name,
        action: "اضافه شد",
        timestamp: new Date().toLocaleString(),
        image: item.imageUrl, // فرض بر این است که imageUrl یک ویژگی در item است
      });
    },
    removeItem(state, action) {
      const item = action.payload;
      state.items = state.items.reduce((acc, _item) => {
        if (_item.id === item.id) {
          if (_item.quantity > 1) {
            acc.push({ ..._item, quantity: _item.quantity - 1 });
          }
          // ذخیره تغییر در تاریخچه به همراه تصویر
          state.changeHistory.push({
            name: item.name,
            action: "حذف شد",
            timestamp: new Date().toLocaleString(),
            image: item.imageUrl, // فرض بر این است که imageUrl یک ویژگی در item است
          });
        } else {
          acc.push(_item);
        }
        return acc; // آرایه‌ای است که برای جمع‌آوری آیتم‌ها
      }, []);
    },
    clearBasket(state) {
      state.items = []; // پاک کردن تمام آیتم‌های سبد خرید
      state.changeHistory = []; // پاک کردن تاریخچه
    },
  },
});

// اضافه کردن export برای basketState
export const basketState = (state) => state.basket;

export const { addItem, removeItem, clearBasket } = basketSlice.actions;

export default basketSlice.reducer;
