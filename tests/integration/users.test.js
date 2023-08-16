const request =require('supertest');

let server;

describe('api/v1/users',()=>{
    beforeEach(()=>{
        server=require('../../index');
    });

    afterEach(()=>{
        server.close();
    });

    describe('GET /', ()=>{
        it('should return all users',async ()=>{

            const res=await request(server).get('/api/v1/users');
            expect(res.status).toBe(200);

        })

        // etc
    })

    describe('POST /', ()=>{
        it('should insert data and response 200',async ()=>{

            const res=await request(server).post('/api/v1/users').send({userId: '102@taspen.co.id', userName:'User 102'}).set('Accept', 'application/json');
            expect(res.status).toBe(200);

        })

        // etc
    })



})