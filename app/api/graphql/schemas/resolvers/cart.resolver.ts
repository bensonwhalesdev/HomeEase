import cartModel from "@/app/api/models/cart.model";
import orderModel from "@/app/api/models/order.model";
import productModel from "@/app/api/models/product.model";
import { connectDB } from "@/app/utils/connectdb";


export const cartResolvers = {
  Query: {
    cart: async (_: any, __: any, { user }: { user: any }) => {
      if (!user) throw new Error("Not authenticated");

      try {
        await connectDB();
        const cart = await cartModel.findOne({ user: user.id }).populate("products");
        return cart ? [cart] : [];
      } catch (error) {
        console.log(error);
        throw new Error("Error fetching cart");
      }
    },

    orders: async (_: any, __: any, { user }: { user: any }) => {
       if (!user) throw new Error("Not authenticated");
      
       try {
        await connectDB();
        return await orderModel.find({ user: user.id }).populate("products");
       } catch (error) {
        console.log(error);
        throw new Error("Error fetching orders")
       }
    }
  },

  Mutation: {
    addToCart: async (_: any, { productId }: { productId: string }, { user }: { user: any }) => {
      if (!user) throw new Error("Not authenticated");

      try {
        await connectDB();

        const product = await productModel.findById(productId);
        if (!product) throw new Error("Product not found");

        let cart = await cartModel.findOne({ user: user.id });

        if (!cart) {
          cart = new cartModel({
            user: user.id,
            products: [productId],
            total: product.price,
          });
        } else {
          cart.products.push(productId);
          cart.total += product.price;
        }

        await cart.save();
        return await cart.populate("products");
      } catch (error) {
        console.log(error);
        throw new Error("Error adding to cart");
      }
    },

    removeFromCart: async (_: any, { productId }: { productId: string }, { user }: { user: any }) => {
      if (!user) throw new Error("Not authenticated");

      try {
        await connectDB();

        const product = await productModel.findById(productId);
        if (!product) throw new Error("Product not found");

        const cart = await cartModel.findOne({ user: user.id });
        if (!cart) throw new Error("Cart not found");

        // Remove one instance of productId from products array
        const productIndex = cart.products.findIndex(
          (p: any) => p.toString() === productId
        );

        if (productIndex === -1) {
          throw new Error("Product not in cart");
        }

        cart.products.splice(productIndex, 1);
        cart.total -= product.price;

        await cart.save();
        return await cart.populate("products");
      } catch (error) {
        console.log(error);
        throw new Error("Error removing product from cart");
      }
    },

    checkout: async (_: any, __: any, { user }: { user: any }) => {
      if (!user) throw new Error("Not authenticated");

      try {
        await connectDB();

        // Find user's cart
        const cart = await cartModel.findOne({ user: user.id }).populate("products");
        if (!cart || cart.products.length === 0) {
          throw new Error("Cart is empty");
        }

        // Create new order
        const order = new orderModel({
          user: user.id,
          products: cart.products.map((p: any) => p._id),
          total: cart.total,
        });
        await order.save();

        // Clear the cart after checkout
        cart.products = [];
        cart.total = 0;
        await cart.save();

        return await order.populate("products");
      } catch (error) {
        console.log(error);
        throw new Error("Error processing checkout");
      }
    },
  },
};
