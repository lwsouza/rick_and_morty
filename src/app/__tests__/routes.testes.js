//importa os módulos e aqruivos necessários
const request = require('supertest');
const server = require('../../index');

//o que será executado antes de todos os testes
beforeAll(async () => {
   console.log('Iniciando TDD com jest!');
});

//o que será executado após todos os testes
afterAll(() => {
   //o server close irá encerrar nossa aplicação, evitando problemas da porta já estar em uso
server.close();
console.log('servidor fechado');
});


describe('inicio dos testes', () => {
   //descrição do caso de testes
   test('acessa a rota para verificar se precisa popular o BD ou já foi populado ', async () => {
      //qual a rota que ele deve acessar e qual requisição deve fazer
      const response = await request(server).get('/api/populated');
      
      //qual o status esperado 
      expect(response.status).toEqual(200);

   });

   test('Verifica o retorno de todos os personagens', async () => {
      const exp = [{"character":"Rick","image":"https://rickandmortyapi.com/api/character/avatar/1.jpeg"},{"character":"Morty","image":"https://rickandmortyapi.com/api/character/avatar/2.jpeg"}]
      const response = await request(server).get('/api/response');

      expect(response.status).toEqual(200);
      expect(response.body).not.toEqual(expect.arrayContaining(exp));
      
   });

   test('Verifica o retorno de um personagem especifico', async () => {
      const exp = [{"character":"Rick","image":"https://rickandmortyapi.com/api/character/avatar/1.jpeg"}]
      const response = await request(server).get('/api/response/Rick');

      expect(response.status).toEqual(200);
      expect(response.body).not.toEqual(expect.arrayContaining(exp));

   });
})