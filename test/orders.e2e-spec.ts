import { expect, test } from '@playwright/test'

test('list orders', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await expect(
    page.getByRole('cell', { name: 'customer-1', exact: true }),
  ).toBeVisible()
  await expect(page.getByRole('cell', { name: 'customer-10' })).toBeVisible()
})

test('paginate orders', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'Próxima Página' }).click()

  await expect(
    page.getByRole('cell', { name: 'customer-11', exact: true }),
  ).toBeVisible()
  await expect(page.getByRole('cell', { name: 'customer-20' })).toBeVisible()

  await page.getByRole('button', { name: 'Última Página' }).click()

  await expect(
    page.getByRole('cell', { name: 'customer-51', exact: true }),
  ).toBeVisible()
  await expect(page.getByRole('cell', { name: 'customer-60' })).toBeVisible()

  await page.getByRole('button', { name: 'Página anterior' }).click()

  await expect(
    page.getByRole('cell', { name: 'customer-41', exact: true }),
  ).toBeVisible()
  await expect(page.getByRole('cell', { name: 'customer-50' })).toBeVisible()

  await page.getByRole('button', { name: 'Primeira Página' }).click()

  await expect(
    page.getByRole('cell', { name: 'customer-1', exact: true }),
  ).toBeVisible()
  await expect(page.getByRole('cell', { name: 'customer-10' })).toBeVisible()
})

test('filter by order id', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByPlaceholder('ID do pedido').fill('order-11')
  await page.getByRole('button', { name: 'Filtrar resultados' }).click()

  await expect(page.getByRole('cell', { name: 'order-11' })).toBeVisible()
})

test('filter by customer name', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByPlaceholder('Nome do cliente').fill('customer-11')
  await page.getByRole('button', { name: 'Filtrar resultados' }).click()

  await expect(page.getByRole('cell', { name: 'customer-11' })).toBeVisible()
})

test('filter by status', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByRole('combobox').click()
  await page.getByLabel('Pendente').click()

  await page.getByRole('button', { name: 'Filtrar resultados' }).click()

  await expect(page.getByRole('cell', { name: 'Pendente' })).toHaveCount(10)
})
