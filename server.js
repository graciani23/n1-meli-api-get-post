const app = require('./src/app')
const port = 3000

app.listen(port, (err) => {
    if (err) {
        console.log(`Erro ao chamar o servidor!`)
    } else {
        console.log(`Servidor rodando na porta ${port}`)
    }
})