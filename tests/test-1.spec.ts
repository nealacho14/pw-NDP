import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.mercadolibre.com.co/');

  await page.getByPlaceholder('Buscar productos, marcas y má').click();
  await page.getByPlaceholder('Buscar productos, marcas y má').fill('Vibradores femeninos');
  await page.getByPlaceholder('Buscar productos, marcas y má').press('Enter');
  await page.getByRole('link', { name: 'Masajeador De Cuello Para' }).click();
  await page.getByRole('button', { name: 'Comprar ahora' }).click();
  await page.getByRole('link', { name: 'Ingresar' }).click();
});

test('getByRole', async ({ page }) => {
  await page.goto('https://www.mercadolibre.com.co/');

  await page.getByRole('combobox',{name: "ngresa lo que quieras encontrar"}).click();
  await page.getByRole('combobox',{name: "ngresa lo que quieras encontrar"}).fill("Juguetes sexuales")
});