'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export type User = {
    id?: number
    email: string
    first_name: string
    last_name: string
    avatar: string
}

const UsersTableSkeleton = () => {
    const userObject = {
        avatar: '',
        first_name: 'loading..',
        last_name: 'loading..',
        email: 'loading..'
    }
    const usersData = [userObject, userObject, userObject, userObject, userObject]

    return (
        <div className="container">
            <div className="flex flex-col gap-4">
                <h1>Dashboard</h1>

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
                        {usersData?.length &&
                            usersData.map((user: User, index: number) => {
                                return (
                                    <tr key={index}>
                                        <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                                            <div className="w-[128px] h-[128px] bg-gray-200"></div>
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
                                            <Button variant="outline">Edit Details</Button>
                                        </td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UsersTableSkeleton
