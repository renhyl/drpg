import { Suspense } from 'react'
import ErrorBoundary from '@/lib/components/ErrorBoundary/ErrorBoundary'

import UsersTable from '@/lib/components/UsersTable/UsersTable'

export default async function Home() {
    return (
        <div className="container">
            <h1>DRPG</h1>
            <ErrorBoundary>
                <Suspense fallback={<>Loading..</>}>
                    <UsersTable />
                </Suspense>
            </ErrorBoundary>
        </div>
    )
}
