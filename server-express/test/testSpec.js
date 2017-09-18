//importing required dependencies
let express=require('express');
let supertest=require('supertest');
let chai=require('chai');
const should=chai.should();
const expect=require('chai').expect;
let app=require('../app');
let user=require('../routes/users');
let t = supertest(app);
let sinon=require('sinon');
let url = supertest("localhost:1337");
let model = require('../model/Schema');
//stubbing the required mongoDB function
let modelStub=sinon.stub(model,'find');
let postStub=sinon.stub(model,'insertMany');
let putStub=sinon.stub(model,'update');
let delStub=sinon.stub(model,'remove');
//Test for checking data fetching
describe('GET', () => {	
	beforeEach(()=>{		
		modelStub.yields(null,[{name: 'Shivam', age: 25, mobile: 9988789098}]);
	})
	it('Fetching data', (done) => {
    url.get('/')        
	  .expect('Content-Type', /json/)
    .end((err, res) => {
    	if (err) {return done(err)}
    	else{
       	expect(res.body.data[0].name).to.be.equal("Shivam");
      	expect(res.body.data[0].age).to.be.equal(25);
      	expect(res.body.data[0].mobile).to.be.equal(9988789098);
       	done();
      }
    });
	});
});
//Test for checking data insertion
describe('POST', ()=>{
	let user = {name: 'Ankur', age: 26, mobile: 8899776655};
	beforeEach(()=>{		
			postStub.yields(null,[user]);
	})
	it('inserting data', (done)=>{
		url.post('/users')
		.expect('Content-Type', /json/)
		.send(user)
		.end((err, res) =>{
			if (err) {
				return done(err);
			}
      else{
        expect(res.body.data[0].name).to.be.equal("Ankur");
        done();
      }
		});
	});
});
//Test for checking data updation
describe('PUT', ()=>{
	let update = {age:25};
	beforeEach(()=>{		
		putStub.yields(null,[{ok:1, nModified: 1, n:1 }])
	})
	it('updating data', (done)=>{
		url.put('/updates/Shivam')
		.expect('Content-Type', /json/)
		.send(update)
		.end((err, res)=>{
			if (err) {
				return done(err);
			}
      else{
        expect(res.body.data[0].ok).to.be.equal(1);
        expect(res.body.data[0].nModified).to.be.equal(1);
        expect(res.body.data[0].n).to.be.equal(1);
        done();
      }
		})
	})
});
//Test for checking data deletion
describe('Delete',()=>{
	let del = {name: 'Shivam'};
	beforeEach(()=>{		
		delStub.yields(null,[{ok:1, n:1}]);
	})
	it('deleting data', (done)=>{
		url.delete('/deletes')
		.expect('Content-Type', /json/)
		.send(del)
		.end((err, res)=>{
			if (err) {
				return done(err);
			}
      else{
       	expect(res.body[0].ok).to.be.equal(1);
       	expect(res.body[0].n).to.be.equal(1);
       	done();
      }
		})
	})
});
