import { queryOptions, keepPreviousData } from '@tanstack/react-query'

export const usersOptions = (page: string = '1') => {
    return queryOptions({
        placeholderData: keepPreviousData,
        queryKey: ['users', page],
        queryFn: async () =>
            await fetch(process.env.NEXT_PUBLIC_API_URL + '/users/' + '?page=' + page || '').then(
                (res) => res.json()
            )
    })
}
