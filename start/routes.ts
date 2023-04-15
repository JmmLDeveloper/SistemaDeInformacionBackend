import Route from "@ioc:Adonis/Core/Route";
import Orden from "App/Models/Orden";

import QRCode from "qrcode";

Route.get("/ordenes/:qrId", async (ctx) => {
  return await Orden.query()
    .where("identificador_qr", ctx.params["qrId"])
    .preload("articulos", (q) => q.preload("articulo"))
    .preload("funcion", (q) => q.preload("sala").preload("pelicula"))
    .preload("asientos", (q) => q.preload("asiento"))
    .first();
});

Route.post("/ordenes/:qrId/invalidar/comida", async (ctx) => {
  const orden =await  Orden.query()
    .where("identificador_qr", ctx.params["qrId"])
    .first();

  if (orden) {
    console.log(' buenas')
    orden.comidaEsValido = false
    await orden.save()
  }
});

Route.post("/ordenes/:qrId/invalidar/boletos", async (ctx) => {
  const orden = await Orden.query()
    .where("identificador_qr", ctx.params["qrId"])
    .first();

  if (orden) {
    orden.boletosEsValido  = false
    await orden.save()
  }
});

async function dataToUrl(data): Promise<string> {
  return new Promise((resolve, reject) => {
    QRCode.toDataURL(data, function (err, url: string) {
      if (err) {
        reject(err);
      }

      resolve(url);
    });
  });
}

Route.get("/sas/test", async (ctx) => {
  const url = await dataToUrl(
    "HW9c6PGsz2ku0f6nFD0Be2aM2YsaIfu9qotDTOcd15yd6aZGu44mLe-EhpbTx68T0MF_PI93SLgV1RFfAXFdOilt68f6UojqyuLcZebkukLmtXLJ7u6HUI1G8kqRw-X0hNE8-FCayTLALHUXcdTi0O1h_gJ1KImOZDC7hLnVJPo"
  );

  const fs = require("fs");

  const base64Data = url.replace(/^data:image\/png;base64,/, "");
  fs.writeFileSync("./tmp/qr.png", base64Data, "base64");
});
