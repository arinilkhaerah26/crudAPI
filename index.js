// CommonJs
const fastify = require('fastify')({
  logger: true
})

const db = require ('./db')

// -- params
// -- querystring
// -- payload

fastify.get('/buku', async (request, reply) => {
  const buku = await db.query ("select id, sku, judul from buku where judul like $1", [
    `%${request.query.search}%`
  ]); 
  return buku;
})

fastify.get('/buku/detail', async (request, reply) => {
  const buku = await db.query ("select * from buku where judul like $1", [
    `%${request.query.search}%`
  ]); 
  return buku;
})

fastify.post('/buku/save', async (request, response) => {
  
  const buku = await db.query ("insert into buku (sku, judul, harga, stok)  values ($1, $2, $3, $4)", 
  [request.body.sku, request.body.judul, request.body.harga, request.body.stok]); 
  response.send({
    message : "Berhasil menambahkan data"
  })
})

fastify.put('/buku/update/:id', async (request, response) => {
  try {
  await db.query ("update buku set sku = COALESCE($1, sku), judul = COALESCE($2, judul), harga = COALESCE($3, harga), stok = COALESCE($4,stok) where id = $5", 
  [request.body.sku, request.body.judul, request.body.harga, request.body.stok, request.params.id]); 
  response.send({
    message : "Data berhasil diubah"
  })
  } catch (error) {
    response.code(400).send({
      message : "Gagal"
    })
  }
})

fastify.delete('/buku/delete/:id', async (request, response) => {
  const buku = await db.query ("delete from buku where id = $1", 
  [request.params.id]); 
  response.send({
    message : "Data berhasil dihapus"
  })  
})


/**
 * Run the server!
 */
const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()