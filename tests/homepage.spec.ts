import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' }) // waitUntil: 'networkidle' for WS to iniutialize
})

test('has heading', async ({ page }) => {
    // Expects page to have a heading
    await expect(page.getByRole('heading', { name: 'DRPG' })).toBeVisible()
})

test('users table displays 6 users', async ({ page }) => {
    await expect(page.getByRole('row')).toHaveCount(7) // heading + 6 user rows
    await expect(page.getByRole('cell', { name: 'george.bluth@reqres.in' })).toBeVisible()
    await expect(page.getByRole('cell', { name: 'tracey.ramos@reqres.in' })).toBeVisible()
})

test.describe('User Table Search', () => {
    test('typing in search field filters users', async ({ page }) => {
        const searchInput = page.getByPlaceholder('type in to search by last')
        await expect(searchInput).toBeVisible()

        searchInput.fill('tracey.ramos')

        await expect(page.getByRole('cell', { name: 'george.bluth@reqres.in' })).not.toBeVisible()
        await expect(page.getByRole('cell', { name: 'tracey.ramos@reqres.in' })).toBeVisible()
        await expect(page.getByRole('row')).toHaveCount(2) // heading + 1 user
    })
})

test.describe('User Pagination', () => {
    test('clicking next button displays different page with users', async ({ page }) => {
        await expect(page.getByRole('cell', { name: 'george.bluth@reqres.in' })).toBeVisible()
        await expect(page.getByRole('cell', { name: 'michael.lawson@reqres.in' })).not.toBeVisible()

        page.getByLabel('Go to next page').click()

        await expect(page.getByRole('cell', { name: 'george.bluth@reqres.in' })).not.toBeVisible()
        await expect(page.getByRole('cell', { name: 'michael.lawson@reqres.in' })).toBeVisible()
    })

    test('clicking `Go to previous page` button navigates to previews page', async ({ page }) => {
        page.getByLabel('Go to next page').click()
        await expect(page.getByRole('cell', { name: 'george.bluth@reqres.in' })).not.toBeVisible()
        await expect(page.getByRole('cell', { name: 'michael.lawson@reqres.in' })).toBeVisible()

        page.getByLabel('Go to previous page').click()

        await expect(page.getByRole('cell', { name: 'george.bluth@reqres.in' })).toBeVisible()
        await expect(page.getByRole('cell', { name: 'michael.lawson@reqres.in' })).not.toBeVisible()
    })

    test('clicking on pagination page number `2` displays different page with users', async ({
        page
    }) => {
        await expect(page.getByRole('cell', { name: 'george.bluth@reqres.in' })).toBeVisible()
        await expect(page.getByRole('cell', { name: 'michael.lawson@reqres.in' })).not.toBeVisible()

        page.getByRole('link', { name: '2' }).click()

        await expect(page.getByRole('cell', { name: 'george.bluth@reqres.in' })).not.toBeVisible()
        await expect(page.getByRole('cell', { name: 'michael.lawson@reqres.in' })).toBeVisible()
    })

    test('clicking `Go to previous page` when on page 1 of pagination is not allowed and has no effect', async ({
        page
    }) => {
        await expect(page.getByRole('cell', { name: 'george.bluth@reqres.in' })).toBeVisible()
        await expect(page.getByLabel('Go to previous page')).toHaveAttribute(
            'aria-disabled',
            'true'
        )
    })

    test('clicking `Go to last page` button makes button disabled', async ({ page }) => {
        page.getByLabel('Go to last page').click()
        await expect(page.getByLabel('Go to last page')).toHaveAttribute('aria-disabled', 'true', {
            timeout: 2000
        })
        await expect(page.getByRole('cell', { name: 'george.bluth@reqres.in' })).not.toBeVisible()
        await expect(page.getByRole('cell', { name: 'michael.lawson@reqres.in' })).toBeVisible()
    })

    test('clicking `Go to first page` from last page makes button disabled', async ({ page }) => {
        page.getByLabel('Go to last page').click()
        await expect(page.getByLabel('Go to last page')).toHaveAttribute('aria-disabled', 'true', {
            timeout: 2000
        })
        await expect(page.getByRole('cell', { name: 'george.bluth@reqres.in' })).not.toBeVisible()
        await expect(page.getByRole('cell', { name: 'michael.lawson@reqres.in' })).toBeVisible()

        page.getByLabel('Go to first page').click()

        await expect(page.getByLabel('Go to first page')).toHaveAttribute('aria-disabled', 'true', {
            timeout: 2000
        })
        await expect(page.getByLabel('Go to last page')).toBeEnabled()
        await expect(page.getByRole('cell', { name: 'george.bluth@reqres.in' })).toBeVisible()
        await expect(page.getByRole('cell', { name: 'michael.lawson@reqres.in' })).not.toBeVisible()
    })
})
