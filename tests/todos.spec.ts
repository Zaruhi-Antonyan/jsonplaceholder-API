import { test, expect } from '@playwright/test';

const BASE_URL = 'https://jsonplaceholder.typicode.com';
const todoId = 1;

test.describe('TODOS API Testing', () => {
    
    test(`GET /todos`, async ({ request }) => {
        
        const response = await request.get(`${BASE_URL}/todos`);
        
        expect(response.ok()).toBe(true);
        expect(response.status()).toBe(200);
        
        const data = await response.json();

        expect(Array.isArray(data)).toBe(true);
        expect(data.length).toBe(200);
        
        for (let obj of data) {
            expect(obj.userId).toBeDefined();
            expect(obj.id).toBeDefined();
            expect(obj.title).toBeDefined();
            expect(obj.completed).toBeDefined();
            
            expect(typeof obj.userId).toBe('number');
            expect(typeof obj.id).toBe('number');
            expect(typeof obj.title).toBe('string');
            expect(typeof obj.completed).toBe('boolean');
            
            expect(obj.userId).toBeGreaterThan(0);
            expect(obj.id).toBeGreaterThan(0);
            expect(obj.title.length).toBeGreaterThan(0);

            // obj id
            let count = 0;
            for(let obj2 of data){
                if(obj.id === obj2.id){
                    count++;
                }
            }
            expect(count, `The count should be 1 for id ${obj.id}, but now it is ${count}`).toBe(1);
        }
    });

    test(`GET /todos/${todoId}`, async ({ request }) => {
        
        const response = await request.get(`${BASE_URL}/todos/${todoId}`);
        
        expect(response.ok()).toBe(true);
        expect(response.status()).toBe(200);
        
        const data = await response.json();

        expect(typeof data).toBe('object');
        
        expect(data.userId).toBeDefined();
        expect(data.id).toBeDefined();
        expect(data.title).toBeDefined();
        expect(data.completed).toBeDefined();
        
        expect(typeof data.userId).toBe('number');
        expect(typeof data.id).toBe('number');
        expect(typeof data.title).toBe('string');
        expect(typeof data.completed).toBe('boolean');
        
        expect(data.userId).toBeGreaterThan(0);
        expect(data.id).toBe(todoId);
        expect(data.title.length).toBeGreaterThan(0);
    });

    test(`POST /todos`, async ({ request }) => {
        
        let userId: number;

        await test.step('Get userId from users list', async() => {
            const response_users = await request.get('https://jsonplaceholder.typicode.com/users');
            expect(response_users.ok()).toBeTruthy();
            expect(response_users.status()).toBe(200);
            const data_users = await response_users.json();
            expect(Array.isArray(data_users)).toBeTruthy();
            expect(data_users.length).toBeGreaterThan(0);
            userId = data_users[0].id;
        })

        await test.step('Create new todo', async() => {

            const new_todo = {
                userId: userId,
                title: "New Todo 1",
                completed: true
            }

            const response = await request.post(`${BASE_URL}/todos`, {
                data: new_todo
            })

            expect(response.ok()).toBeTruthy();
            expect(response.status()).toEqual(201);

            const data = await response.json();

            expect(data.userId).toBe(new_todo.userId);
            expect(data.id).toBeDefined();
            expect(data.title).toBe(new_todo.title);
            expect(data.completed).toBe(new_todo.completed);
        });
    });
        

    test(`PUT /todos/${todoId}`, async ({ request }) => {
        
        let userId: number;
        
        await test.step('Put userId from users list', async() => {
            const response_users = await request.get('https://jsonplaceholder.typicode.com/users');
            expect(response_users.ok()).toBeTruthy();
            expect(response_users.status()).toBe(200);
            const data_users = await response_users.json();
            expect(Array.isArray(data_users)).toBeTruthy();
            expect(data_users.length).toBeGreaterThan(0);
            userId = data_users[0].id;
        });

        await test.step('Create new todo', async() => {

            const updated_todo = {
                userId: userId,
                title: "New Todo 1",
                completed: true
            }

            const response = await request.put(`${BASE_URL}/todos/${todoId}`, {
                data: updated_todo
            });

        expect(response.ok()).toBeTruthy();
        expect(response.status()).toEqual(200);

        const data = await response.json();
        expect(data.userId).toBe(updated_todo.userId);
        expect(data.id).toBe(todoId);
        expect(data.title).toBe(updated_todo.title);
        expect(data.completed).toBe(updated_todo.completed);

        });
    });
    

    test(`PATCH /todos/${todoId}`, async ({ request }) => {
        
        const partially_updated_todo = {
            title: "PARTIAL UPDATE TODO TITLE"
        }

        const response = await request.patch(`${BASE_URL}/todos/${todoId}`, {
            data: partially_updated_todo
        });

        expect(response.ok()).toBeTruthy();
        expect(response.status()).toEqual(200);

        const data = await response.json();
        expect(data.userId).toBe(1);
        expect(data.id).toBe(todoId);
        expect(data.title).toBe(partially_updated_todo.title);
        expect(data.completed).toBeDefined();
    });

    test(`DELETE /todos/${todoId}`, async ({ request }) => {
       
        const response = await request.delete(`${BASE_URL}/todos/${todoId}`);

        expect(response.ok()).toBeTruthy();
        expect(response.status()).toEqual(200);
        
        const data = await response.json();
        expect(typeof data).toBe('object');
        expect(data.userId).not.toBeDefined();
        expect(data.id).not.toBeDefined();
        expect(data.title).not.toBeDefined();
        expect(data.completed).not.toBeDefined();
    });
});