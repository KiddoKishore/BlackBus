import { test, expect } from '@playwright/test';

test('Black Bus', async ({ page }) => {

  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Account' }).click();

  await page.screenshot({ path: `home.jpg`});
  await page.getByRole('link', { name: 'Sign In' }).click();
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('kishore@gmail.com');
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill('123');
  await page.getByRole('button', { name: 'Submit' }).click();

  await page.screenshot({ path: `invaildLoginData.png`});

  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill('1234');
  await page.getByRole('button', { name: 'Submit' }).click();

  await page.screenshot({ path: `homeScreen.jpg`});

  await page.getByPlaceholder('From').click();
  await page.getByPlaceholder('From').fill('Chennai');
  await page.getByPlaceholder('To').click();
  await page.getByPlaceholder('To').fill('Coimbatore');
  await page.getByPlaceholder('Date').fill('2024-03-01');
  await page.getByRole('button', { name: 'Search' }).click();

  await page.screenshot({ path: `trips.jpg`});

  await page.getByRole('button', { name: 'Search' }).click();

  await page.getByRole('button', { name: 'Book Seats' }).click();

  await page.screenshot({ path: `tripSeats.jpg`});

  await page.getByText('S7').click();
  await page.locator('div').filter({ hasText: /^S8$/ }).click();

  await page.screenshot({ path: `passengers.jpg`});

  await page.locator('form div').filter({ hasText: 'Passenger 1S7Name *Name *Age' }).getByLabel('Name *').click();
  await page.locator('form div').filter({ hasText: 'Passenger 1S7Name *Name *Age' }).getByLabel('Name *').fill('Kishore');
  await page.locator('form div').filter({ hasText: 'Passenger 1S7Name *Name *Age' }).getByLabel('Age *').click();
  await page.locator('form div').filter({ hasText: 'Passenger 1S7Name *Name *Age' }).getByLabel('Age *').fill('19');
  await page.locator('form div').filter({ hasText: 'Passenger 2S8Name *Name *Age' }).getByLabel('Name *').click();
  await page.locator('form div').filter({ hasText: 'Passenger 2S8Name *Name *Age' }).getByLabel('Name *').fill('Hari');
  await page.locator('form div').filter({ hasText: 'Passenger 2S8Name *Name *Age' }).getByLabel('Age *').click();
  await page.locator('form div').filter({ hasText: 'Passenger 2S8Name *Name *Age' }).getByLabel('Age *').fill('16');
  await page.getByRole('button', { name: 'Next' }).click();

  await page.screenshot({ path: `Payment.jpg`});

  await page.getByRole('button', { name: 'Click to Pay' }).click();
  await page.getByRole('button', { name: 'View Ticket' }).click();

  await page.screenshot({ path: `Ticket.jpg`});

  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Cancel Ticket' }).click();

  await page.screenshot({ path: `cancelTicket.jpg`});

  await page.getByRole('button', { name: 'Account' }).click();
  await page.getByRole('link', { name: 'View Tickets' }).click();

  await page.screenshot({ path: `tickets.jpg`});

  await page.getByRole('link', { name: 'logo' }).click();
  await page.getByRole('button', { name: 'Account' }).click();
  await page.getByText('Logout').click();

});
