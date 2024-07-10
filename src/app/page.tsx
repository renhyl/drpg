import { Suspense } from 'react'
import ErrorBoundary from '@/lib/components/ErrorBoundary/ErrorBoundary'

import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { getQueryClient } from '@/lib/get-query-client'
import { usersOptions } from '@/lib/queries/users/usersOptions'

import UsersTable from '@/lib/components/UsersTable/UsersTable'
import UsersTableSkeleton from '@/lib/components/UsersTableSkeleton/UsersTableSkeleton'

export default async function Home({
    params,
    searchParams
}: {
    params: { slug: string }
    searchParams: { page: string }
}) {
    const queryClient = getQueryClient()

    const { page } = searchParams

    queryClient.prefetchQuery(usersOptions(page))

    return (
        <div className="container">
            <h1>DRPG</h1>
            <ErrorBoundary>
                <Suspense fallback={<UsersTableSkeleton />}>
                    <HydrationBoundary state={dehydrate(queryClient)}>
                        <UsersTable />
                    </HydrationBoundary>
                </Suspense>
            </ErrorBoundary>
        </div>
    )
}
