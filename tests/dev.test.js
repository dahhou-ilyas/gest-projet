const mongoose = require("mongoose");
const request = require("supertest");
const app=require("../app/index");
const jwt = require('jsonwebtoken');
const User = require("../app/model/User");

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

describe('POST /users/register', () => {
    let createdUserId;
    it('devrait créer un nouvel utilisateur avec succès et renvoyer un code d\'état 201', async () => {
      const userData = {
        name: 'test',
        email: 'te11st@gmail.com',
        password: 'motdepasse123'
      };
  
      const response = await request(app)
        .post('/users/register')
        .send(userData);
  
      expect(response.status).toBe(201);
      expect(response.body.name).toBe(userData.name);
      expect(response.body.email).toBe(userData.email);
      createdUserId = response.body._id;
    });

    afterEach(async () => {
        if (createdUserId) {
          await User.findByIdAndDelete(createdUserId);
        }
      });
  
    it('devrait renvoyer un code d\'état 500 en cas d\'erreur lors de la création de l\'utilisateur', async () => {
      const invalidUserData = {
        name: 'Jane Doe'
      };
  
      const response = await request(app)
        .post('/users/register')
        .send(invalidUserData);
  
      expect(response.status).toBe(500);
      expect(response.body.message).toBeTruthy();
    });
});

describe('User Routes', ()=>{
    let token;

    beforeAll(() => {
        token = jwt.sign({ userId: '65d7c186b6f889a5f5450895' }, process.env.TOKEN_SECRET);
    });

    it('devrait obtenir un utilisateur existant avec succès lorsque l\'utilisateur est authentifié', async () => {
        const response = await request(app)
          .get('/users/65d7c186b6f889a5f5450895')
          .set('Cookie', [`jwt=${token}`]);
    
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('_id');
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('email');
    });
})