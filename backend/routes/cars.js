import exppress from "express";

const router = exppress.Router();
import { promises as fs } from "fs";


// npx nodemon index.js

const { readFile, writeFile } = fs;

router.post("/", async(req, res, next) => {
    try {
        let account = req.body;

        if( !account.name || account.balance == null  ){
            throw new Error(" Name e Balance são obrigatórios. ")
        }

        const data = JSON.parse (await readFile(global.fileName))

        //account.id = data.nextId
        //data.nextId++
        //account = { id: data.nextId++, ...account }
        account = {
            id: data.nextId++,
            name: account.name,
            balance: account.balance
        }
        data.accounts.push(account)

        await writeFile(global.fileName, JSON.stringify(data, null, 2))

        res.send(account)
        logger.info(`POST /account - ${JSON.stringify(account)}`)
    } catch (err) {
        next(err)
    }
});

router.get("/", async(req, res, next) => {
    try {
        const data = JSON.parse (await readFile(global.fileName))
        
        const brandModelCounts = {};

        //Itera sobre os objetos no array de dados
        for (const item of data) {
            const brand = item.brand;
            const models = item.models;

            // Verifica se a marca já existe no objeto brandModelCounts
            if (brandModelCounts[brand]) {
                // Se existe, incrementa a contagem de modelos
                brandModelCounts[brand] += models.length;
            } else {
                // Se não existe, cria a entrada para a marca
                brandModelCounts[brand] = models.length;
            }
        }
        const jsonString = JSON.stringify(brandModelCounts, null, 2);
        res.send(jsonString)
        //logger.info("GET/cars")
        logger.info(`GEt Count Cars - ${jsonString}`)
    } catch (err) {
        next(err)
    }
});

// Get Cars by Id
router.get("/max/:id", async(req, res, next) => {
    try {
        const data = JSON.parse (await readFile(global.fileName))
        //logger.info(data)
        const brandModelCounts = {};
        
        for (const item of data) {
            const brand = item.brand;
            const models = item.models;
            
            // Verifica se a marca já existe no objeto brandModelCounts
            if (brandModelCounts[brand]) {
              // Se existe, incrementa a contagem de modelos
              brandModelCounts[brand] += models.length;
            } else {
              // Se não existe, cria a entrada para a marca
              brandModelCounts[brand] = models.length;
            }
          }

        // Converte o objeto em uma matriz de pares (marca, quantidade de modelos)
        const brandModelCountsArray = Object.entries(brandModelCounts);

        // Classifica a matriz em ordem decrescente com base na quantidade de modelos
        brandModelCountsArray.sort((a, b) => b[1] - a[1]);

        // Pega as 5 primeiras marcas da matriz classificada
        const top5Brands = brandModelCountsArray.slice(0, parseInt(req.params.id) );

        // Cria um objeto JSON com as 5 marcas principais e suas contagens
        const result = {};
        for (const [brand, count] of top5Brands) {
        result[brand] = count;
        }

        // Converte o resultado em uma string JSON
        const jsonResult = JSON.stringify(result, null, 2);

        // Imprime o resultado em formato JSON
        console.log(jsonResult);

        res.send(jsonResult)
        logger.info(`GEt Count Cars Max- ${jsonResult}`)
    } catch (err) {
        next(err)
    }
});

// Min Cars
router.get("/min/:id", async (req, res, next) => {
    try {
      const data = JSON.parse(await readFile(global.fileName));
  
      const brandModelCounts = {};
  
      for (const item of data) {
        const brand = item.brand;
        const models = item.models;
  
        // Verifica se a marca já existe no objeto brandModelCounts
        if (brandModelCounts[brand]) {
          // Se existe, incrementa a contagem de modelos
          brandModelCounts[brand] += models.length;
        } else {
          // Se não existe, cria a entrada para a marca
          brandModelCounts[brand] = models.length;
        }
      }
  
      // Converte o objeto em uma matriz de pares (marca, quantidade de modelos)
      const brandModelCountsArray = Object.entries(brandModelCounts);
  
      // Classifica a matriz em ordem crescente com base na quantidade de modelos
      brandModelCountsArray.sort((a, b) => a[1] - b[1]);
  
      // Pega as 5 primeiras marcas da matriz classificada
      const bottom5Brands = brandModelCountsArray.slice(0, parseInt(req.params.id));
  
      // Cria um objeto JSON com as 5 marcas que possuem menos modelos e suas contagens
      const result = {};
      for (const [brand, count] of bottom5Brands) {
        result[brand] = count;
      }
  
      // Converte o resultado em uma string JSON
      const jsonResult = JSON.stringify(result, null, 2);
  
      // Imprime o resultado em formato JSON
      console.log(jsonResult);
  
      res.send(jsonResult);
      logger.info(`Get Count Cars Min- ${jsonResult}`);
    } catch (err) {
      next(err);
    }
  });
  
  // Get List for Brand
  router.get("/models/:brand", async (req, res, next) => {
    try {
      const data = JSON.parse(await readFile(global.fileName));
      const brandName = req.params.brand;
  
      // Encontra o objeto da marca com base no parâmetro "brand"
      const brandData = data.find((item) => item.brand === brandName);
  
      if (!brandData) {
        // Se a marca não for encontrada, retorna uma resposta com status 404
        return res.status(404).json({ message: "Marca não encontrada" });
      }
  
      const models = brandData.models;
  
      // Retorna os modelos da marca como resposta
      res.json(models);
      logger.info(`Get Count Cars Min- ${JSON.stringify(models)}`);
    } catch (err) {
      next(err);
    }
  });
  

// Delete user by Id
router.delete("/:id", async(req, res, next) => {
    try {
        const data = JSON.parse (await readFile(global.fileName))     
        
        if( !req.params.id ){
            throw new Error(" Id é obrigatório. ")
        }

        data.accounts = data.accounts.filter(
            account => account.id !== parseInt(req.params.id))
        
        await writeFile( global.fileName, JSON.stringify(data, null, 2))
        
        res.send("Deletado com sucesso!")
        logger.info(`DELETE/account/:id - ${req.params.id}`)
    } catch (err) {
        next(err)
    }
});

//put atualizar os dados de toda conta
// patch atualizar somente alguns dados

// Update user 
router.put("/", async(req, res, next) => {
    try {
        let account = req.body;

        if( !account.name || account.balance == null  ){
            throw new Error(" Name e Balance são obrigatórios. ")
        }

        const data = JSON.parse (await readFile(global.fileName))

        const index = data.accounts.findIndex(a => a.id === account.id)

        if( index === -1 ) {
            throw new Error(" Registro não encontrado. ")
        }

        data.accounts[index].name = account.name
        data.accounts[index].balance = account.balance

        await writeFile(global.fileName, JSON.stringify(data, null, 2))

        res.send(account)
        logger.info(`PUT /account - ${JSON.stringify(account)}`)
    } catch (err) {
        next(err)
    }

});

// Update a Balance Account by id 
router.patch("/updateBalance", async(req, res, next) => {
    try {
        let account = req.body;

        if( !account.id || !account.name || account.balance == null  ){
            throw new Error(" Id, Namee Balance são obrigatórios. ")
        }

        const data = JSON.parse (await readFile(global.fileName))

        const index = data.accounts.findIndex(a => a.id === account.id)

        if( index === -1 ) {
            throw new Error(" Registro não encontrado. ")
        }

        data.accounts[index].balance = account.balance

        await writeFile(global.fileName, JSON.stringify(data, null, 2))

        res.send(data.accounts[index])
        logger.info(`PATCH /updateBalance - ${JSON.stringify(account)}`)
    } catch (err) {
        next(err)
    }
});

router.use((err, req, res, next) => {
    logger.error(`${err.message}`)
    //console.log(err)
    res.status(400).send( {error: err.message })
})


export default router;
