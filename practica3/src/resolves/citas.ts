
import { RouterContext } from "https://deno.land/x/oak@v11.1.0/router.ts";
import { slotsCollection } from "../db/mongo.ts";
import { getQuery } from "https://deno.land/x/oak@v11.1.0/helpers.ts";
type GetClientSlotsContext = RouterContext<
"/patientAppointments/:dni", & {
  dni: string;
} &
Record<string | number, string | undefined>,
Record<string, any>
>;

export const clientSlots = async (context: GetClientSlotsContext) => {
  try {
      const params = getQuery(context, { mergeParams: true });
      if (!params.year || !params.month || !params.day) {
        context.response.status = 403;
        return;
      }
      const dni = context.params.dni;

      if (!dni) {
        context.response.status = 403;
        return;
      }
  
      const { year, month, day} = params;
      const slots = await slotsCollection.find({ DNI: dni}).toArray();
      slots.map((slot) => {
          if(slot.day >= parseInt(day)  && slot.month >= parseInt(month) && slot.year >= parseInt(year)){
              const { ...rest } = slot;
              return rest;
          }

          }
      );

      context.response.body = slots.map((slot) => {
          const { _id, ...rest } = slot;
          return rest;
        });


    } catch (e) {
      console.error(e);
      context.response.status = 500;
    }
}

