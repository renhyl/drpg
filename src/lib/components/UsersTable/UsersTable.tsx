'use client'

import React, { useState } from 'react'
import { useSuspenseQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { usersOptions } from '@/lib/queries/users/usersOptions'
import Image from 'next/image'

import UserEditDialog from '@/lib/components/UserEditDialog/UserEditDialog'
import Paginator from '@/lib/components/Paginator/Paginator'
import { Input } from '@/components/ui/input'

export type User = {
    id?: number
    email: string
    first_name: string
    last_name: string
    avatar: string
}

interface IUsersTable {
    currentPage: number
}

const UsersTable: React.FC<IUsersTable> = ({ currentPage: page = 1 }) => {
    const { data, error, isFetching } = useSuspenseQuery(usersOptions(page.toString()))

    if (!isFetching && error) throw error

    const { data: usersData, total: totalCount, per_page: perPage } = data
    const [searchTerm, setSearchTerm] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    let tableData = usersData

    if (searchTerm !== '') {
        tableData = usersData.filter((user: User) => {
            return user.email.includes(searchTerm) || user.last_name.includes(searchTerm)
        })
    }

    const queryClient = useQueryClient()

    const updateUserMutation = useMutation({
        mutationFn: async (user: User) => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}`, {
                method: 'PATCH',
                body: JSON.stringify(user),
                headers: { 'Content-Type': 'application/json' }
            })
            return await response.json()
        },
        onMutate: async (user: User) => {
            await queryClient.cancelQueries({ queryKey: ['users'] })

            const previousUsers: { data: User[] } | undefined = queryClient.getQueryData([
                'users',
                page
            ])

            if (previousUsers) {
                for (let index = 0; index < previousUsers.data.length; index++) {
                    const element = previousUsers.data[index]
                    if (element.id === user.id) {
                        previousUsers.data.splice(index, 1, user)
                        break
                    }
                }

                queryClient.setQueryData(['users', page], {
                    ...previousUsers
                })
            }

            return { previousUsers }
        },
        onError: (err, variables, context) => {
            if (context?.previousUsers) {
                queryClient.setQueryData(['users'], context.previousUsers)
            }
        },
        /**
         * Refetch, because of API not changing the data, re-fetch wipes the editied data
         */
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['users', page] })
    })

    const handleEditDetails = (user: User) => {
        /** TODO save/submit new user data */
        console.log('save new user data:', user)

        updateUserMutation.mutate(user)
    }

    const handleCurrentPage = (page: number) => {
        window.location.href = `/?page=${page}`
    }

    return (
        <div className="container">
            <div className="flex flex-col gap-4">
                <h1>Dashboard</h1>

                <hr />
                <Input
                    type="text"
                    defaultValue={searchTerm || ''}
                    className="col-span-3"
                    onChange={handleChange}
                    placeholder="type in to search by last name or email"
                />
                <hr />

                <table className="border-separate border-spacing-2 w-full border border-slate-400 dark:border-slate-500 bg-white dark:bg-slate-800 text-sm shadow-sm">
                    <thead className="bg-slate-50 dark:bg-slate-700">
                        <tr>
                            <th className="border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">
                                Avatar
                            </th>
                            <th className="border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">
                                First name
                            </th>
                            <th className="border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">
                                Last name
                            </th>
                            <th className="border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">
                                Email
                            </th>
                            <th className="border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((user: User, index: number) => {
                            return (
                                <tr key={index}>
                                    <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                                        <Image
                                            loader={({ src, width }) => `${src}?w=${width}`}
                                            priority
                                            key={user.avatar}
                                            src={user.avatar}
                                            width={128}
                                            height={128}
                                            alt={`user-${user.first_name}-${user.last_name}`}
                                            className="w-[128px] h-[128px] bg-gray-200"
                                        />
                                    </td>
                                    <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                                        {user.first_name}
                                    </td>
                                    <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                                        {user.last_name}
                                    </td>
                                    <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                                        {user.email}
                                    </td>
                                    <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                                        <UserEditDialog
                                            user={user}
                                            handleEditDetails={handleEditDetails}
                                        />
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                <Paginator
                    perPage={perPage}
                    currentPage={page}
                    totalCount={totalCount}
                    setCurrentPage={handleCurrentPage}
                />
            </div>
        </div>
    )
}

export default UsersTable
