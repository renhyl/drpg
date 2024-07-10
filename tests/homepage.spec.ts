import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' }) // waitUntil: 'networkidle' for WS to iniutialize
})

test('has heading', async ({ page }) => {
    // Expects page to have a heading
    await expect(page.getByRole('heading', { name: 'DRPG' })).toBeVisible()
})
