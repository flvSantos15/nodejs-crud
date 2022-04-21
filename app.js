const express = require('express')
const { randomUUID } = require("crypto")
const fs = require('fs')


// parei no 1:05:21
const app = express()

// midleware
app.use(express.json())

let products = []

fs.readFile("products.json", 'utf-8', (err, data) => {
  if(err){
    console.log(err)
  }else{
    products = JSON.parse(data)
  }
})

app.post('/products', (req, res) => {
  // Nome e Preço
  const { name, price } = req.body

  const product = {
    name,
    price,
    id: randomUUID()
  }

  products.push(product)
  productFile()

  return res.json(products)
})

app.get('/products', (req, res) => {
  return res.json(products)
})

app.get('/products/:id', (req, res) => {
  const { id } = req.params
  const product = products.find(product => product.id === id)
  return res.json(product)
})

app.put('/products/:id', (req, res) => {
  // recebo o id do params
  const { id } = req.params
  // recebo o name e price do body
  const { name, price } = req.body

  // retorno product q tem o msm id do q vem do params
  const productIndex = products.findIndex(product => product.id === id)
  // no product com esse index
  products[productIndex] = {
    // pego os dados originais
    // mantendo o id original
    ...products[productIndex],
    // add outro name e price
    name,
    price
  }

  productFile()

  return res.json({message: 'Produto alterado com sucesso!'})
})

app.delete('/products/:id', (req, res) => {
  const { id } = req.params
  const productIndex = products.findIndex(product => product.id !== id)
  products.splice(productIndex, 1)

  productFile()

  return res.json({message: 'Produto removido com sucesso!'})
})

function productFile(){
  fs.writeFile("products.json", JSON.stringify(products), (err) => {
    if(err){
      console.log(err)
    }else{
      console.log('produto inserído')
    }
  })
}

app.listen(4002, () => {
  console.log('Server rodando na porta 4002')
})