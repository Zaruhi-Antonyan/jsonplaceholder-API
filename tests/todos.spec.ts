import { test, expect, request } from '@playwright/test';

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
        }
    });

    test(`POST /todos`, async ({ request }) => {
        
        const new_todo = {
            userId: 1,
            title: "New Todo 1",
            completed: true
        }

        const response = await request.post(`${BASE_URL}/todos`, {
            data: new_todo
        });

        expect(response.ok()).toBeTruthy();
        expect(response.status()).toEqual(201);

        const data = await response.json();
        expect(data.userId).toBe(new_todo.userId);
        expect(data.id).toBeDefined();
        expect(data.title).toBe(new_todo.title);
        expect(data.completed).toBe(new_todo.completed);
    });

    test(`PUT /todos/${todoId}`, async ({ request }) => {
        
        const updated_todo = {
            userId: 1,
            title: "UPDATE TODO TITLE",
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
        expect(data.completed).toBe(false);
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