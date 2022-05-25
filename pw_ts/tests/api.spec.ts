// eslint-disable-next-line no-unused-vars
import { APIRequestContext } from "@playwright/test";
import { test, expect } from '@playwright/test';
import { Chance } from "chance";

let apiContext: APIRequestContext;
test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
      baseURL: "https://reqres.in"
    });
  });
test.afterAll(async ({ }) => {
    await apiContext.dispose();
});

test.describe("API test suite",() => {
    test('Create user', async () => {
        let name = Chance().name();
        let job = Chance().word();
        let payload = {
            "name": name,
            "job": job
        };
    
        let response = await apiContext.post('/api/users',{
            data:{
                ...payload
            }
        });
    
        expect(response.ok()).toBeTruthy();
        expect(await response.json()).toHaveProperty("name",payload.name);
    });
    test('Get created user', async () => {
        let response = await apiContext.get(`/api/users/12`);
        expect(await response.json()).toHaveProperty("data.email","rachel.howell@reqres.in");
    });
    test('Update created user', async () => {
        let response = await apiContext.patch(`/api/users/2`);
        expect(response.status()).toBe(200);
        expect(await response.json()).toHaveProperty("updatedAt");
    });
    test("Delete user",async () => {
        let response = await apiContext.delete('/api/users/2');
        expect(response.status()).toBe(204);
    });
});