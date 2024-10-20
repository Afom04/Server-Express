const express = require("express");
const router = express.Router(); //Define router desde express

const data = [
  {
    id: 1,
    nombre: "Zapatos A",
    valor: 19.3,
    enStock: true,
    createdOn: new Date(),
  },
  {
    id: 2,
    nombre: "Zapatos B",
    valor: 206.3,
    enStock: false,
    createdOn: new Date(),
  },
  {
    id: 3,
    nombre: "Zapatos C",
    valor: 56.0,
    enStock: true,
    createdOn: new Date(),
  },
  {
    id: 4,
    nombre: "Zapatos D",
    valor: 63.8,
    enStock: true,
    createdOn: new Date(),
  },
  {
    id: 5,
    nombre: "Zapatos E",
    valor: 39.4,
    enStock: false,
    createdOn: new Date(),
  },
];

//El verbo "GET" en el contexto de las apis rest se utiliza para brindar informacion desde el servidor al cliente
//Ruta para acceso a esta api sería: http://localhost:3000/productos/
router.get("/", function (req, res) {
  //Define un endpoint para el acceso basico al servidor desde el router
  // Devuelve el estatus 200(ok) y la data por medio de formato JSON
  res.status(200).json(data);
});

//Ruta para acceso a esta api sería(siendo numeral un numero entero): http://localhost:3000/productos/#

router.get("/:id", function (req, res) {
  //Define un endpoint para el acceso de la ruta /productos/# con un parametro al servidor desde el router
  let found = data.find(function (item) {
    return item.id === parseInt(req.params.id);
  });

  if (found) {
    res.status(200).json(found); // Devuelve el estatus 200(ok) y la data por medio de formato JSON
  } else {
    res.sendStatus(404); // Devuelve el estatus 404(Nor Found)
  }
});

//El verbo "POST" en el contexto de las apis rest se utiliza para crear nuevos recursos en el servidor
//Ruta para acceso a esta api sería: http://localhost:3000/productos/ por medio de POST
router.post("/", function (req, res) {
  let itemIds = data.map((item) => item.id);

  let newId = itemIds.length > 0 ? Math.max.apply(Math, itemIds) + 1 : 1;

  let newItem = {
    id: newId,
    nombre: req.body.nombre,
    valor: req.body.valor,
    enStock: false,
    createdOn: new Date(),
  };
  data.push(newItem);

  res.status(201).json(newItem); // Devuelve el estatus 201(created) y la data por medio de formato JSON
});

//El verbo "PUT" en el contexto de las apis rest se utiliza para actualizar recursos en el servidor
//Aunque tambien se puede usar "PATCH" (PUT para recursos completos, PATCH para un valor de un recurso)
//Ruta para acceso a esta api sería: http://localhost:3000/productos/# por medio de PUT
router.put("/:id", function (req, res) {
  //Define un endpoint para el acceso de la ruta /productos/# con un parametro al servidor desde el router
  let found = data.find(function (item) {
    return item.id === parseInt(req.params.id);
  });

  if (found) {
    let updated = {
      id: found.id,
      nombre: req.body.nombre,
      valor: req.body.valor,
      enStock: req.body.enStock,
    };
    console.log(updated);
    let targetIndex = data.indexOf(found);

    data.splice(targetIndex, 1, updated);

    res.sendStatus(204); // Devuelve el estatus 204(No content)
  } else {
    res.sendStatus(500); // Devuelve el estatus 500(Internal Server Error)
  }
});

//El verbo "DELETE" en el contexto de las apis rest se utiliza para eliminar recursos en el servidor
//Ruta para acceso a esta api sería: http://localhost:3000/productos/# por medio de DELETE
router.delete("/:id", function (req, res) {
  //Define un endpoint para el acceso de la ruta /productos/# con un parametro al servidor desde el router
  let found = data.find(function (item) {
    return item.id === parseInt(req.params.id);
  });

  if (found) {
    let targetIndex = data.indexOf(found);

    data.splice(targetIndex, 1);
  }
  console.log(data);
  res.sendStatus(204); // Devuelve el estatus 204(No content)
});

module.exports = router;
