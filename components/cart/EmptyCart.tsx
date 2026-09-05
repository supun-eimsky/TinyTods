import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function EmptyCart() {
  return (
    <div className="text-center py-20">
      <div className="mx-auto w-20 h-20 rounded-full bg-mint-light flex items-center justify-center">
        <ShoppingBag size={32} className="text-teal-700" />
      </div>
      <h2 className="mt-6 font-display text-2xl text-teal-800">Your cart is empty</h2>
      <p className="mt-2 text-teal-700/60 max-w-sm mx-auto">
        {"Looks like you haven't added any little favorites yet — let's fix that."}
      </p>
      <div className="mt-8 flex justify-center">
        <Button href="/categories">Start Shopping</Button>
      </div>
    </div>
  );
}
