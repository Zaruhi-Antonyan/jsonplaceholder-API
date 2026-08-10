import { test, expect, request } from '@playwright/test';

const BASE_URL = 'https://jsonplaceholder.typicode.com';
const postId = 1;


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


  test(`GET	/posts/${postId}`, async ({ request }) => {
    const response = await request.get(`${BASE_URL}/posts/${postId}`);

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
    const response = await request.get(`${BASE_URL}/posts/${postId}/comments`);

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


  test(`GET	/comments?postId=${postId}`, async ({ request }) => {
    const response = await request.get(`${BASE_URL}/comments?postId=${postId}`);

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
    
    let emails_unique: string[] = [];
    let flag = true;
    let repeat_email = '';
    
    for(let obj of data){
      let email = obj.email;
      
      for(let elem of emails_unique){
        if(email === elem){
          flag = false;
          repeat_email = email;
        }else{
          emails_unique.push(email);
        }
      }
    }
    
    expect(flag, `There are repeating emails: ${repeat_email}`).toBe(true);
    
  });

  test (`POST	/posts`, async ({ request }) => {
    
    const new_post = {
      userId: 1,
      title: "New Post 1",
      body: "New Post Body"
    }

    const response = await request.post(`${BASE_URL}/posts`, {
      data: new_post
    });

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toEqual(201);

    const data = await response.json();
    expect(data.id).toBeDefined();
    expect(data.userId).toBe(new_post.userId);
    expect(data.title).toBe(new_post.title);
    expect(data.body).toBe(new_post.body);
  });

  test (`PUT	/posts/${postId}`, async ({ request }) => {
    
    const updated_post = {
      userId:1,
      title:"UPDATE POST TITLE",
      body:"UPDATE POST BODY"
    };

    const response = await request.put(`${BASE_URL}/posts/${postId}`, {
      data: updated_post
    });

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data.id).toBe(postId);
    expect(data.userId).toBe(updated_post.userId);
    expect(data.title).toBe(updated_post.title);
    expect(data.body).toBe(updated_post.body);
  });

  test(`PATCH	/posts/${postId}`, async ({ request }) => {
    
    const partial_update = {
      title: 'PARTIAL UPDATE TITLE'
    };

    const response = await request.patch(`${BASE_URL}/posts/${postId}`, {
      data: partial_update
    });

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data.id).toBe(postId);
    expect(data.title).toBe(partial_update.title);
    expect(data.userId).toBeDefined();
    expect(data.body).toBeDefined();
  });

  test(`DELETE	/posts/${postId}`, async ({ request }) => {
    
    const response = await request.delete(`${BASE_URL}/posts/${postId}`);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(typeof data).toBe('object');
    expect(data.id).not.toBeDefined();
    expect(data.userId).not.toBeDefined();
    expect(data.title).not.toBeDefined();
    expect(data.body).not.toBeDefined();
  });
});