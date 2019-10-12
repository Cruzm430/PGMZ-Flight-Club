const { expect } = require('chai');
const db = require('./db/index');
const { User, Shoe, Category } = db.models;
const app = require('supertest')(require('./app'));

describe('Data Layer', () => {
  beforeEach(() => db.syncAndSeed());
  describe('is our stuff running', () => {
    it('true is true', () => {
      expect(true).to.equal(true);
    })
  })
  describe('User model', () => {
    it('Creates at least one user', async () => {
      expect((await User.findAll()).length).to.be.above(0);
    })
    it('All users have name and email', async () => {
      const users = await User.findAll();
      expect(users.filter(user => user.email).length).to.equal(users.length);
      expect(users.filter(user => user.name).length).to.equal(users.length);
    })
    it('Admin functionality works correctly', async () => {
      const users = await User.findAll();
      expect(users.find(user => user.name === 'Zach').admin).to.equal(true);
      expect(users.find(user => user.name === 'Mark').admin).to.equal(false);
    })
  })
  describe('Shoe model', () => {
    it('Creates at least one shoe', async () => {
      expect((await Shoe.findAll()).length).to.be.above(0);
    });
    it('Shoes have size, price, image', async () => {
      const shoes = await Shoe.findAll();
      expect(shoes.filter(shoe => shoe.size).length).to.equal(shoes.length);
      expect(shoes.filter(shoe => shoe.price).length).to.equal(shoes.length);
      expect(shoes.filter(shoe => shoe.imageURL).length).to.equal(shoes.length);
    })
    it('Shoes have proper categories', async () => {
      const conc11 = await Shoe.findOne({
        where: {
          name: 'Concord 11'
        }
      });
      const jordan = await Category.findOne({
        where: {
          name: 'Jordan'
        }
      })
      expect(conc11.categoryId).to.equal(jordan.id);
    })
  })
})

describe('Routes', async () => {

  const response = await app.get('/shoes')

  describe('Get /shoes ', ()=>{
    it('Returns 200 status',()=>{
      expect(response.status).to.equal(200)
    })
    it('Gets all shoes', ()=>{
      expect((response.body.length).to.be.above(0))
    })
  })

  describe('Get /shoes/:id', async ()=>{

    const conc11 = await Shoe.findOne({
      where:{
        name: 'Concord 11'
      }
    })

    const filteredResponse = await app.get(`/shoes/${conc11.id}`)

    describe('Get /shoes/:id ', ()=>{
      it('Returns 200 status',()=>{
        expect(filteredResponse.status).to.equal(200)
      })
      it('Gets shoes with id', ()=>{
        expect(filteredResponse.body.length).to.be.above(0)
      })
    })
  })
})