/* 
    import { createSlice } from "@reduxjs/toolkit";

    // بازیابی آیتم‌های ذخیره‌شده در localStorage یا استفاده از مقادیر پیش‌فرض
    const initialState = {
      items: JSON.parse(localStorage.getItem("basketItems")) || [],
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
          localStorage.setItem("basketItems", JSON.stringify(state.items));
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
            return acc;
          }, []);
    
          localStorage.setItem("basketItems", JSON.stringify(state.items));
        },
        clearBasket(state) {
          state.items = [];
          state.changeHistory = []; // پاک کردن تاریخچه
          localStorage.removeItem("basketItems");
        },
      },
    });
    
    // اضافه کردن export برای basketState
    export const basketState = (state) => state.basket;
    
    export const { addItem, removeItem, clearBasket } = basketSlice.actions;
    
    export default basketSlice.reducer;
     */
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
        return acc;
      }, []);
    },
    clearBasket(state) {
      state.items = [];
      state.changeHistory = []; // پاک کردن تاریخچه
    },
  },
});

// اضافه کردن export برای basketState
export const basketState = (state) => state.basket;

export const { addItem, removeItem, clearBasket } = basketSlice.actions;

export default basketSlice.reducer;
