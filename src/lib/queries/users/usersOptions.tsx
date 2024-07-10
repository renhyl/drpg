import { queryOptions } from '@tanstack/react-query'

export const usersOptions = (page: string = '1') => {
    return queryOptions({
        queryKey: ['users'],
        queryFn: async () =>
            await fetch(process.env.NEXT_PUBLIC_API_URL + '?page=' + page || '').then((res) =>
                res.json()
            )
    })
}
