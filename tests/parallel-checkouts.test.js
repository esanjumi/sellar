import { test, expect } from '@playwright/test';

// Function to generate random name and email
function generateRandomData() {
  const randomString = Math.random().toString(36).substring(2, 10);
  const name = `User_${randomString}`;
  const email = `user_${randomString}@example.com`;
  return { name, email };
}

const TOTAL_CHECKOUTS = 1000;
const PARALLEL_INSTANCES = 10;

test.describe('Automate checkouts in parallel', () => {
  for (let instance = 0; instance < PARALLEL_INSTANCES; instance++) {
    test(`Parallel Checkout Instance ${instance + 1}`, async ({ page }) => {
      const start = Math.floor((TOTAL_CHECKOUTS / PARALLEL_INSTANCES) * instance);
      const end = Math.floor((TOTAL_CHECKOUTS / PARALLEL_INSTANCES) * (instance + 1));

      for (let i = start; i < end; i++) {
        const { name, email } = generateRandomData();
        console.log(`Instance ${instance + 1} - Checkout ${i + 1} with Name: ${name}, Email: ${email}`);

        try {
          await page.goto('https://selar.co/Agric-TechVol3');
          await page.locator('button', { hasText: 'Get now' }).click();
          await page.locator('.flex-shrink-0 > .flex').click();
          await page.waitForSelector('input[placeholder="Full name"]');
          await page.locator('input[placeholder="Full name"]').fill(name);
          await page.locator('input[placeholder="example@gmail.com"]').fill(email);
          await page.locator('#checkout > div:nth-child(3) > div').first().click();
          console.log(`Instance ${instance + 1} - Checkout ${i + 1} completed.`);
          await page.waitForTimeout(2000);
        } catch (error) {
          console.error(`Error during checkout ${i + 1}: ${error.message}`);
          continue;
        }
      }
    });
  }
});
