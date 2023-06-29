import {createSlice} from '@reduxjs/toolkit';
import {toast} from 'react-toastify';

const initialState={
    cartItems:localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")): [],
    cartQuantity:0,
    cartTotal:0,
}
const cartSlice=createSlice({
    name: "cart",
    initialState,
    reducers:{
        addTocart(state,action){
            const itemIndex = state.cartItems.findIndex(item=>item.id === action.payload.id);
            if(itemIndex>=0){
                state.cartItems[itemIndex].cartQuantity +=1;
                toast.info(`Đã thêm 1 ${action.payload.name} vào giỏ hàng`,{
                    position:"top-right",
                })
            }
            else{
                const tempProduct={...action.payload,cartQuantity:1}
                state.cartItems.push(tempProduct);
                toast.success(`${action.payload.name} đã được thêm vào giỏ hàng`,{
                    position:"top-right",
                })
            } 
            localStorage.setItem("cartItems",JSON.stringify(state.cartItems))  
        },
        removeFromCart(state, action) {
            state.cartItems.map((cartItem) => {
              if (cartItem.id === action.payload.id) {
                const nextCartItems = state.cartItems.filter(
                  (item) => item.id !== cartItem.id
                );
      
                state.cartItems = nextCartItems;
      
                toast.error("Đã xóa sản phẩm khỏi giỏ hàng", {
                  position: "top-right",
                });
              }
              localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
              return state;
            });
        },
        decreaseCart(state, action) {
            const itemIndex = state.cartItems.findIndex(
              (item) => item.id === action.payload.id
            );
      
            if (state.cartItems[itemIndex].cartQuantity > 1) {
              state.cartItems[itemIndex].cartQuantity -= 1;
      
              toast.info("Số lượng sản phẩm đã được giảm", {
                position: "top-right",
              });
            } else if (state.cartItems[itemIndex].cartQuantity === 1) {
              const nextCartItems = state.cartItems.filter(
                (item) => item.id !== action.payload.id
              );
      
              state.cartItems = nextCartItems;
      
              toast.error("Sản phẩm đã bị xóa", {
                position: "top-right",
              });
            }
      
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
          },
          getTotals(state, action) {
            let { total, quantity } = state.cartItems.reduce(
              (cartTotal, cartItem) => {
                const { price, cartQuantity } = cartItem;
                const itemTotal = price * cartQuantity;
      
                cartTotal.total += itemTotal;
                cartTotal.quantity += cartQuantity;
      
                return cartTotal;
              },
              {
                total: 0,
                quantity: 0,
              }
            );
            total = parseFloat(total.toFixed(2));
            state.cartTotalQuantity = quantity;
            state.cartTotalAmount = total;
          },
          clearCart(state, action) {
            state.cartItems = [];
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            toast.error("Xóa giỏ hàng thành công", { position: "top-right" });
          },

    }
});
export const {addTocart ,removeFromCart,decreaseCart,getTotals,clearCart,} = cartSlice.actions
export default cartSlice.reducer;