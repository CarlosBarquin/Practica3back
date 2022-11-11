import { RouterContext } from "https://deno.land/x/oak@v11.1.0/router.ts";
import { slotsCollection } from "../db/mongo.ts";
import { getQuery } from "https://deno.land/x/oak@v11.1.0/helpers.ts";
import { SlotSchema } from "../db/schemas.ts";

type GetAvailabeSlotsContext = RouterContext<
  "/availableSlots",
  Record<string | number, string | undefined>,
  Record<string, any>
>;

export const availableSlots = async (context: GetAvailabeSlotsContext) => {
  try {
    const params = getQuery(context, { mergeParams: true });
    if (!params.year || !params.month) {
      context.response.status = 403;
      return;
    }

    const { year, month, day, id_doctor} = params;
    if (!id_doctor) {
      const slots = await slotsCollection
        .find({
          year: parseInt(year),
          month: parseInt(month),
          day: parseInt(day),
          available: true,
        })
        .toArray();
      context.response.body = context.response.body = slots.map((slot) => {
        const { _id, ...rest } = slot;
        return rest;
      });
    } else {
      const slots = await slotsCollection
        .find({
          year: parseInt(year),
          month: parseInt(month),
          day: parseInt(day),
          id_doctor: id_doctor,
          available: true,
        })
        .toArray();
      context.response.body = slots.map((slot) => {
        const { _id, ...rest } = slot;
        return rest;
      });
    }
  } catch (e) {
    console.error(e);
    context.response.status = 500;
  }
};
