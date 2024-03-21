const mongoose = require("mongoose");
const request = require("supertest");
const app=require("../app/index");
const jwt = require('jsonwebtoken');
const User = require("../app/model/User");

require("dotenv").config();

let createdUserId;
let globalToken;

beforeAll(async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/gest-projet");
});

afterAll(async () => {
  if (createdUserId) {
    await User.findByIdAndDelete(createdUserId);
  }
  await mongoose.connection.close();
    
});


describe('POST /users/register', () => {
  it('devrait créer un nouvel utilisateur avec succès et renvoyer un code d\'état 201', async () => {
    const userData = {
        name: 'eger',
        email: 'eger@gmail.com',
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


describe("GET /users/login" ,()=>{
    it('devrait retourner un message de connexion réussie avec un code d\'état 200 si les informations de connexion sont valides', async () => {
        const userData = {
            email: 'eger@gmail.com',
            password: 'motdepasse123'
        };
      
        const response = await request(app)
            .post('/users/login')
            .send(userData);
      
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Connexion réussie' });
        globalToken = response.header["set-cookie"][0].split(';')[0];
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



describe('User Routes', ()=>{
    it('devrait obtenir un utilisateur existant avec succès lorsque l\'utilisateur est authentifié', async () => {
      console.log(createdUserId);
        const response = await request(app)
          .get(`/users/${createdUserId}`)
          .set('Cookie', [`${globalToken}`]);
          
    
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('_id');
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('email');
    });
})

describe("Group Routes",()=>{
  describe("POST /groups",()=>{
    it("devrait retourner un code d'état 201 avec un message de succès en cas de création de groupe réussie",async ()=>{
      const groupName="Test Group"

      const response=await request(app).post("/groups").set('Cookie', [`${globalToken}`])
        .send({name:groupName});

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("message","Groupe créé avec succès.");
      expect(response.body.group).toHaveProperty("name", groupName);

    })
  })
})