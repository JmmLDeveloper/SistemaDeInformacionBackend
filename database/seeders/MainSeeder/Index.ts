import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Articulo from "App/Models/Articulo";
import ArticuloEstado from "App/Models/ArticuloEstado";
import ArticuloOrden from "App/Models/ArticuloOrden";
import Asiento from "App/Models/Asiento";
import AsientoOrden from "App/Models/AsientoOrden";
import Funcion from "App/Models/Funcion";
import Orden from "App/Models/Orden";
import Pelicula from "App/Models/Pelicula";
import Sala from "App/Models/Sala";
import { DateTime } from "luxon";

import crypto from "node:crypto";

export default class extends BaseSeeder {
  public async run() {
    const peliculas = await Pelicula.createMany([
      { nombre: "Avatar" },
      { nombre: "Avengers" },
      { nombre: "Rapido y Furioso" },
      { nombre: "Titanic" },
      { nombre: "Chucky" },
      { nombre: "Star Wars" },
      { nombre: "La sirenitca" },
    ]);

    const salas = await Sala.createMany([
      { codigo: "1" },
      { codigo: "2" },
      { codigo: "3" },
      { codigo: "4" },
      { codigo: "5" },
    ]);

    for (const sala of salas) {
      const asientosData: any = [];
      for (const letter of "ABCDEFGHIJKML".split("")) {
        for (const n of [1, 2, 3, 4, 5, 6, 7, 8, 9]) {
          asientosData.push({ codigo: `${letter}${n}`, salaId: sala.id });
        }
      }
      await Asiento.createMany(asientosData);
    }

    const funcion1 = await Funcion.create({
      peliculaId: peliculas[0].id,
      salaId: salas[0].id,
      comienzo: DateTime.now(),
      final: DateTime.now(),
    });

    const funcion2 = await Funcion.create({
      peliculaId: peliculas[1].id,
      salaId: salas[2].id,
      comienzo: DateTime.now(),
      final: DateTime.now(),
    });

    const funcion3 = await Funcion.create({
      peliculaId: peliculas[2].id,
      salaId: salas[3].id,
      comienzo: DateTime.now(),
      final: DateTime.now(),
    });

    const articulos = await Articulo.createMany([
      {
        precio: 1000,
        nombre: "hamburgesa",
        descripcion: "descripcion de hamburgesa",
        imagen: "img3.webp",
      },
      {
        precio: 900,
        nombre: "perro caliente",
        descripcion: "descripcion de perro caliente",
        imagen: "img2.webp",
      },
      {
        precio: 400,
        nombre: "refresco",
        descripcion: "descripcion de refresco",
        imagen: "img1.webp",
      },
      {
        precio: 400,
        nombre: "chocolate",
        descripcion: "descripcion de chocolate",
        imagen: "img4.webp",
      },
      {
        precio: 600,
        nombre: "Palomitas",
        descripcion: "Descripcion de palomitas",
        imagen: "img5.webp",
      },
    ]);

    const orden1 = await Orden.create({
      identificadorQr: crypto.randomBytes(128).toString("base64url"),
      funcionId: funcion1.id,
    });

    const orden2 = await Orden.create({
      identificadorQr: crypto.randomBytes(128).toString("base64url"),
      funcionId: funcion1.id,
    });

    const orden3 = await Orden.create({
      identificadorQr: crypto.randomBytes(128).toString("base64url"),
      funcionId: funcion2.id,
    });

    const orden4 = await Orden.create({
      identificadorQr: crypto.randomBytes(128).toString("base64url"),
      funcionId: funcion3.id,
    });

    const estadoListo = await ArticuloEstado.create({ nombre: "Listo" });
    const estadoPendiente = await ArticuloEstado.create({
      nombre: "Pendiente",
    });

    // para orden 1
    await ArticuloOrden.create({
      articuloId: articulos[0].id,
      cantidad: 1,
      estadoId: estadoListo.id,
      ordenId: orden1.id,
    });
    await ArticuloOrden.create({
      articuloId: articulos[2].id,
      cantidad: 3,
      estadoId: estadoPendiente.id,
      ordenId: orden1.id,
    });

    // para orden 2
    await ArticuloOrden.create({
      articuloId: articulos[4].id,
      cantidad: 1,
      estadoId: estadoListo.id,
      ordenId: orden2.id,
    });
    await ArticuloOrden.create({
      articuloId: articulos[3].id,
      cantidad: 3,
      estadoId: estadoPendiente.id,
      ordenId: orden2.id,
    });

    // para orden 4
    await ArticuloOrden.create({
      articuloId: articulos[0].id,
      cantidad: 1,
      estadoId: estadoListo.id,
      ordenId: orden4.id,
    });
    await ArticuloOrden.create({
      articuloId: articulos[1].id,
      cantidad: 1,
      estadoId: estadoListo.id,
      ordenId: orden4.id,
    });

    await ArticuloOrden.create({
      articuloId: articulos[2].id,
      cantidad: 3,
      estadoId: estadoListo.id,
      ordenId: orden4.id,
    });

    await ArticuloOrden.create({
      articuloId: articulos[4].id,
      cantidad: 1,
      estadoId: estadoListo.id,
      ordenId: orden4.id,
    });

    const asientosSala1 = await Asiento.query().where("sala_id", salas[0].id);
    const asientosSala2 = await Asiento.query().where("sala_id", salas[2].id);
    const asientosSala3 = await Asiento.query().where("sala_id", salas[3].id);

    await AsientoOrden.createMany([
      { asientoId: asientosSala1[0].id, ordenId: orden1.id },
      { asientoId: asientosSala1[1].id, ordenId: orden1.id },
      { asientoId: asientosSala1[2].id, ordenId: orden1.id },
    ]);

    await AsientoOrden.createMany([
      { asientoId: asientosSala1[5].id, ordenId: orden2.id },
    ]);

    await AsientoOrden.createMany([
      { asientoId: asientosSala2[0].id, ordenId: orden3.id },
    ]);

    await AsientoOrden.createMany([
      { asientoId: asientosSala3[4].id, ordenId: orden3.id },
      { asientoId: asientosSala3[5].id, ordenId: orden3.id },
      { asientoId: asientosSala3[6].id, ordenId: orden3.id },
      { asientoId: asientosSala3[7].id, ordenId: orden3.id },
    ]);
  }
}
