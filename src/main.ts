import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { addSlot } from "./resolvers/post.ts";
import { availableSlots, doctorApp, patientApp } from "./resolvers/get.ts";
import { deleteSlot } from "./resolvers/delete.ts";
import { bookSlot } from "./resolvers/put.ts";



const router = new Router();

router
.post("/addSlot", addSlot)
.get("/availableSlots", availableSlots)
.delete("/removeSlot", deleteSlot)
.put("/bookSlot", bookSlot)
.get("/doctorAppointments/:id_doctor", doctorApp)
.get("/patientAppointments/:id_patient", patientApp)


const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 7777 });
