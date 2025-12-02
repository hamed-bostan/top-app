import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type CartItem } from "@/domain/entities/schemas";

type CartState = {
  items: CartItem[];
};

// initial state
const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.qty += 1;
      } else {
        state.items.push(action.payload);
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    decrease: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        if (item.qty > 1) item.qty -= 1;
        else state.items = state.items.filter((i) => i.id !== action.payload);
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    setItems: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
  },
});

export const { addToCart, decrease, setItems } = cartSlice.actions;
export default cartSlice.reducer;
