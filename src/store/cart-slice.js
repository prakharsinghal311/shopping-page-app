import { createSlice } from "@reduxjs/toolkit";

const initialCartState = { items: [], totalQuantity: 0, changed: false };

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.changed = true;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemfromCart(state, action) {
      const id = action.payload;

      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.changed = true;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

// export const getCartData = async () => {
//   return async (dispatch) => {
//     dispatch(
//       dispatch(
//         uiActions.showNotification({
//           status: "pending",
//           title: "Sending...",
//           message: "Sending Cart data!",
//         })
//       )
//     );

//     const sendRequest = async () => {
//       const response = await fetch(
//         "https://shopping-page-f7590-default-rtdb.firebaseio.com/cart.json",
//         {
//           method: "GET",
//           body: JSON.stringify(),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Sending Cart data failed!");
//       }
//     };

//     try {
//       await sendRequest();

//       dispatch(
//         uiActions.showNotification({
//           status: "success",
//           title: "Success!",
//           message: "Sent cart data successfully!",
//         })
//       );
//     } catch (error) {
//       dispatch(
//         uiActions.showNotification({
//           status: "error",
//           title: "Error!",
//           message: "Sending cart data failed!",
//         })
//       );
//     }
//   };
// };

export const cartActions = cartSlice.actions;

export default cartSlice;
