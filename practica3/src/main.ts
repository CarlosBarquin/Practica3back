import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { clientSlots } from "./resolves/citas.ts";
import { removeSlot } from "./resolves/delete.ts";
import { doctorSlots } from "./resolves/doctor.ts";
import { availableSlots} from "./resolves/get.ts";
import { addSlot } from "./resolves/post.ts";
import { bookSlot } from "./resolves/put.ts";


const router = new Router();

router
  .get("/test", (context) => {
    context.response.body = "Hello world!";
})
  .post("/addSlot", addSlot)
  .delete("/removeSlot", removeSlot)
  .get("/availableSlots", availableSlots)
  .put("/bookSlot", bookSlot)
  .get("/doctorAppointments/:id_doctor", doctorSlots)
  .get("/patientAppointments/:dni", clientSlots);


const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 7000 });