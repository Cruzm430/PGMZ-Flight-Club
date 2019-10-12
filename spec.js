const { expect } = require('chai');
const db = require('./db/index');
const { User, Shoe, Category } = db.models;

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

describe('Routes', () => {

});