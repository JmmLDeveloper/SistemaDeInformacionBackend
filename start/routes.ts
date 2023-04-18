import Route from "@ioc:Adonis/Core/Route";
import Orden from "App/Models/Orden";

import QRCode from "qrcode";

import fs from "node:fs";

import tar from "tar";

import path from "node:path";

import Application from "@ioc:Adonis/Core/Application";
Route.get("/ordenes/:qrId", async (ctx) => {
  return await Orden.query()
    .where("identificador_qr", ctx.params["qrId"])
    .preload("articulos", (q) => q.preload("articulo"))
    .preload("funcion", (q) => q.preload("sala").preload("pelicula"))
    .preload("asientos", (q) => q.preload("asiento"))
    .first();
});

Route.post("/ordenes/:qrId/invalidar/comida", async (ctx) => {
  const orden = await Orden.query()
    .where("identificador_qr", ctx.params["qrId"])
    .first();

  if (orden) {
    console.log(" buenas");
    orden.comidaEsValido = false;
    await orden.save();
  }
});

Route.post("/ordenes/:qrId/invalidar/boletos", async (ctx) => {
  const orden = await Orden.query()
    .where("identificador_qr", ctx.params["qrId"])
    .first();

  if (orden) {
    orden.boletosEsValido = false;
    await orden.save();
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

Route.get("/generate-images", async (ctx) => {
  const ordenes = await Orden.query();

  for (let i = 0; i < ordenes.length; i++) {
    const url = await dataToUrl(ordenes[i].identificadorQr);
    const base64Data = url.replace(/^data:image\/png;base64,/, "");

    fs.writeFileSync(
      path.join(Application.tmpPath(), `qr_${i}.png`),
      base64Data,
      "base64"
    );
  }

  const files = fs.readdirSync(Application.tmpPath());
  const filteredFiles = files
    .filter((file) => file.startsWith("qr_"))
    .map((f) => path.join(Application.tmpPath(), f));

  await tar.c(
    {
      gzip: true,
      file: path.join(Application.tmpPath(), "qr-images.tgz"),
    },
    filteredFiles
  );

  ctx.response.download(path.join(Application.tmpPath(), "qr-images.tgz"));
});
