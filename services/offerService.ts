import { offers } from "@/data/offers";

export const OfferService = {
  async list() {
    return offers;
  },
};
