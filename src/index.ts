import express from "express";

const app = express();

app.use(express.json());

// Entradas do método (3,a), Resultado do método: ['a', 'a', 'a']
app.post("/method1", (request, response) => {
  const { repeat, value } = request.body;

  const array = [];
  let progress = 0;

  while (progress < repeat) {
    array.push(value);
    progress += 1;
  }

  return response.status(201).json(array);
});

// Entrada do método ([1,2,3,4]), Resultado do método: [4,3,2,1]
app.post("/method2", (request, response) => {
  const { arrayOld } = request.body;

  const arrayNew = [];
  let progress = arrayOld.length - 1;

  for (progress; progress >= 0; progress--) {
    arrayNew.push(arrayOld[progress]);
  }

  return response.status(201).json(arrayNew);
});

// Entrada do método ([1,2,'', undefined]), Resultado do método: [1,2]
app.post("/method3", (request, response) => {
  const { array } = request.body;

  const arrayNew = [];

  for (const value in array) {
    const type = typeof array[value];

    if (type === "number" && array[value] > 0) {
      arrayNew.push(array[value]);
    } else if (type === "string" && array[value] !== "") {
      arrayNew.push(array[value]);
    }
  }

  return response.status(201).json(arrayNew);
});

// Entrada do método ([["c",2],["d",4]]), Resultado do método: {c:2, d:4}
app.post("/method4", (request, response) => {
  const { array } = request.body;

  const objectNew = new Object();

  for (const arrayInternal of array) {
    objectNew[String(arrayInternal[0])] = arrayInternal[1];
  }

  return response.status(201).json(objectNew);
});

// Entrada do método ([5,4,3,2,5], 5,3), Resultado do método: [4,2]
app.post("/method5", (request, response) => {
  const { array, arrayRemove } = request.body;

  const arrayNew = [];

  for (const value of array) {
    let equal = false;

    for (const valueRemove of arrayRemove) {
      if (value === valueRemove) {
        equal = true;
      }
    }

    !equal && arrayNew.push(value);
  }

  return response.status(201).json(arrayNew);
});

// Entrada do método ([1,2,3,3,2,4,5,4,7,3]), Resultado do método: [1,2,3,4,5,7]
app.post("/method6", (request, response) => {
  const { array } = request.body;

  const arrayNew = [];
  arrayNew.push(array[0]);

  for (const value of array) {
    let equal = false;

    for (const valueNew of arrayNew) {
      if (value === valueNew) {
        equal = true;
      }
    }

    !equal && arrayNew.push(value);
  }

  return response.status(201).json(arrayNew);
});

// Entrada do método ([1,2,3,4],[1,2,3,4]), Resultado do método: true
app.post("/method7", (request, response) => {
  const { arrayA, arrayTwo } = request.body;

  const arrayAElement = arrayA.length;
  const arrayTwoElement = arrayTwo.length;

  if (arrayAElement !== arrayTwoElement) {
    return response.status(201).json(false);
  }

  for (let key = 0; key <= arrayAElement; key++) {
    if (arrayA[key] !== arrayTwo[key]) {
      return response.status(201).json(false);
    }
  }

  return response.status(201).json(true);
});

// Entrada do método ([1, 2, [3], [4, 5]]), Resultado do método: [1, 2, 3, 4, 5]
app.post("/method8", (request, response) => {
  const { array } = request.body;

  const arrayNew = [];

  for (const value of array) {
    const type = typeof value;

    if (type === "object") {
      for (const value2 of value) {
        arrayNew.push(value2);
      }
    } else {
      arrayNew.push(value);
    }
  }

  return response.status(201).json(arrayNew);
});

// Entrada do método ([1, 2, 3, 4, 5], 2), Resultado do método: [[1, 2], [3, 4], [5]]
app.post("/method9", (request, response) => {
  const { array, division } = request.body;

  const arrayNew = [];
  let arrayElement = array.length + 1;
  let arrayTemporary = [];
  let count = 0;

  for (const value of array) {
    arrayTemporary.push(value);
    arrayElement--;
    count++;

    if (count === division) {
      arrayNew.push(arrayTemporary);
      arrayTemporary = [];
      count = 0;
    }
  }

  arrayElement > 0 && arrayNew.push(arrayTemporary);

  return response.status(201).json(arrayNew);
});

// Entrada do método ([6, 8], [8, 9]), Resultado do método: [8]
app.post("/method10", (request, response) => {
  const { arrayA, arrayTwo } = request.body;

  const arrayNew = [];

  for (const valueA of arrayA) {
    for (const valueTwo of arrayTwo) {
      valueA === valueTwo && arrayNew.push(valueTwo);
    }
  }

  return response.status(201).json(arrayNew);
});

app.listen(3333, () => console.log("Server running on port 3333"));
