const mongoose = require("mongoose");
const request = require("supertest");
const app=require("../app/index");

require("dotenv").config();

beforeEach(async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/gest-projet");
});

afterEach(async () => {
    await mongoose.connection.close();
});


describe("GET /users/login" ,()=>{
    it('devrait retourner un message de connexion réussie avec un code d\'état 200 si les informations de connexion sont valides', async () => {
        const userData = {
          email: 'taha.belhaj@gmail.com',
          password: '123456'
        };
    
        const response = await request(app)
          .post('/users/login')
          .send(userData);
    
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Connexion réussie' });
    });

    it('devrait retourner un message d\'erreur avec un code d\'état 404 si l\'utilisateur n\'est pas trouvé', async () => {
        const userData = {
          email: 'undifined@example.com',
          password: 'motdepasse'
        };
    
        const response = await request(app)
          .post('/users/login')
          .send(userData);
    
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ message: 'Utilisateur non trouvé' });
    });
    
    it('devrait retourner un message d\'erreur avec un code d\'état 401 si le mot de passe est incorrect', async () => {
        const userData = {
          email: 'taha.belhaj@gmail.com',
          password: 'mauvaismotdepasse'
        };
    
        const response = await request(app)
          .post('/users/login')
          .send(userData);
    
        expect(response.status).toBe(401);
        expect(response.body).toEqual({ message: 'Mot de passe incorrect' });
    });
})  