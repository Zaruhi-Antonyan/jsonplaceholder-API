import { test, expect, request } from '@playwright/test';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

test.describe('POSTS API Testing', () => {


  test('GET	/posts', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/posts`);

    expect(response.ok()).toBe(true);
    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(100);

    for (let obj of data) {
      expect(obj.userId).toBeDefined();
      expect(obj.id).toBeDefined();
      expect(obj.title).toBeDefined();
      expect(obj.body).toBeDefined();

      expect(typeof obj.userId).toBe('number');
      expect(typeof obj.id).toBe('number');
      expect(typeof obj.title).toBe('string');
      expect(typeof obj.body).toBe('string');

      expect(obj.userId).toBeGreaterThan(0);
      expect(obj.id).toBeGreaterThan(0);
      expect(obj.title.length).toBeGreaterThan(0);
      expect(obj.body.length).toBeGreaterThan(0);
    }

  });


  test('GET	/posts/1', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/posts/1`);

    expect(response.ok()).toBe(true);
    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(typeof data).toBe('object');

    expect(data.userId).toBeDefined();
    expect(data.id).toBeDefined();
    expect(data.title).toBeDefined();
    expect(data.body).toBeDefined();

    expect(typeof data.userId).toBe('number');
    expect(typeof data.id).toBe('number');
    expect(typeof data.title).toBe('string');
    expect(typeof data.body).toBe('string');


    expect(data.id).toBe(1);
    expect(data.userId).toBeGreaterThan(0);
    expect(data.title.length).toBeGreaterThan(0);
    expect(data.body.length).toBeGreaterThan(0);

    // expect(data.title).toMatch(/sunt aut facere repellat provident/);
    expect(data.title).toContain('sunt aut facere repellat provident');

  });

  test('GET	/posts/1/comments', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/posts/1/comments`);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toEqual(200);

    const data = await response.json();
    expect(Array.isArray(data)).toBeTruthy();
    expect(data.length).toBeGreaterThan(0);


    for (let obj of data) {
      expect(obj.postId).toBeDefined();
      expect(obj.id).toBeDefined();
      expect(obj.name).toBeDefined();
      expect(obj.email).toBeDefined();
      expect(obj.body).toBeDefined();

      expect(typeof obj.postId).toBe('number');
      expect(typeof obj.id).toBe('number');
      expect(typeof obj.name).toBe('string');
      expect(typeof obj.email).toBe('string');
      expect(typeof obj.body).toBe('string');

      expect(obj.postId).toBe(1);
      expect(obj.id).toBeGreaterThan(0);
      expect(obj.name.length).toBeGreaterThan(0);
      expect(obj.email.length).toBeGreaterThan(0);
      expect(obj.body.length).toBeGreaterThan(0);
      expect(obj.email).toContain('@');

    }

  });


  test('GET	/comments?postId=1', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/comments?postId=1`);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toEqual(200);

    const data = await response.json();
    expect(Array.isArray(data)).toBeTruthy();
    expect(data.length).toBeGreaterThan(0);

    for (let obj of data) {
      expect(obj.postId).toBeDefined();
      expect(obj.id).toBeDefined();
      expect(obj.name).toBeDefined();
      expect(obj.email).toBeDefined();
      expect(obj.body).toBeDefined();

      expect(typeof obj.postId).toBe('number');
      expect(typeof obj.id).toBe('number');
      expect(typeof obj.name).toBe('string');
      expect(typeof obj.email).toBe('string');
      expect(typeof obj.body).toBe('string');

      expect(obj.postId).toBe(1);
      expect(obj.id).toBeGreaterThan(0);
      expect(obj.name.length).toBeGreaterThan(0);
      expect(obj.email.length).toBeGreaterThan(0);
      expect(obj.body.length).toBeGreaterThan(0);
      expect(obj.email).toContain('@');

    }

  });

});