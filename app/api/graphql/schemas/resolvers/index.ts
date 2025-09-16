import { authResolvers } from "./auth.resolver";
import { cartResolvers } from "./cart.resolver";
import { productResolvers } from "./products.resolver";

export const resolvers = [ authResolvers, productResolvers, cartResolvers ];
