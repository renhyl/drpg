import type { User } from '@/lib/components/UsersTable/UsersTable'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import React, { useRef } from 'react'

interface IUserEditDialog {
    user: User
    handleEditDetails: (user: User) => void
    [rest: string]: any
}

const UserEditDialog: React.FC<IUserEditDialog> = ({ user, handleEditDetails, ...rest }) => {
    const avatarRef = useRef<HTMLInputElement>(null)
    const firstNameRef = useRef<HTMLInputElement>(null)
    const lastNameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)

    const handleEdit = (user: User) => {
        const userData: User = {
            id: user.id,
            avatar: avatarRef?.current?.value || user.avatar,
            first_name: firstNameRef?.current?.value || user.first_name,
            last_name: lastNameRef?.current?.value || user.last_name,
            email: emailRef?.current?.value || user.email
        }

        handleEditDetails(userData)
    }

    return (
        <Dialog {...rest}>
            <DialogTrigger asChild>
                <Button variant="outline">Edit Details</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>Edit user details</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="user-avatar" className="text-right">
                            Avatar
                        </Label>
                        <Input
                            id="user-avatar"
                            ref={avatarRef}
                            defaultValue={user.avatar}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="user-first-name" className="text-right">
                            First name
                        </Label>
                        <Input
                            id="user-first-name"
                            ref={firstNameRef}
                            defaultValue={user.first_name}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="user-last-name" className="text-right">
                            Last name
                        </Label>
                        <Input
                            id="user-last-name"
                            ref={lastNameRef}
                            defaultValue={user.last_name}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="user-email" className="text-right">
                            Email
                        </Label>
                        <Input
                            id="user-email"
                            ref={emailRef}
                            defaultValue={user.email}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="submit" onClick={() => handleEdit(user)}>
                            Save changes
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default UserEditDialog
