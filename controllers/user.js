import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const { user: User, post: Post } = prisma

export default {
    getAll(req, res) {
        User.findMany({
            include: {
                posts: true,
            },
        })
            .then((data) => {
                res.status(200).send(data)
            })
            .catch((e) => {
                res.status(500).send({
                    message: e.message || 'Some error occurred while retrieving users.',
                })
            })
    },
    get(req, res) {
        const { id } = req.params
        User.findUnique({
            where: {
                id: parseInt(id),
            },
            include: {
                posts: true,
            },
        })
            .then((data) => {
                data ? res.status(200).send(data) : res.status(404).send({ message: `Not found user with id ${id}` })
            })
            .catch((e) => {
                res.status(500).send({
                    message: e.message || `Some error occurred while retrieving user with id ${id}.`,
                })
            })
    },
    create(req, res) {
        const { name } = req.body
        User.create({
            data: {
                name,
            },
        })
            .then((data) => {
                res.status(201).send(data)
            })
            .catch((e) => {
                res.status(500).send({
                    message: e.message || 'Some error occurred while creating the user.',
                })
            })
    },
    update(req, res) {
        const { id } = req.params
        const { name } = req.body
        User.update({
            where: {
                id: parseInt(id),
            },
            data: {
                name,
            },
        })
            .then(() => {
                res.status(200).send({
                    message: `User with id ${id} was updated successfully.`,
                })
            })
            .catch((e) => {
                res.status(500).send({
                    message: e.message || `Some error occurred while updating user with id ${id}.`,
                })
            })
    },
    delete(req, res) {
        const { id } = req.params

        const deletePost = Post.deleteMany({
            where: {
                userId: parseInt(id),
            },
        })
        const deleteUser = User.delete({
            where: {
                id: parseInt(id),
            },
        })

        prisma
            .$transaction([deletePost, deleteUser])
            .then(() => {
                res.status(200).send({
                    message: `User was deleted successfully!`,
                })
            })
            .catch((e) => {
                res.status(500).send({
                    message: e.message || `Some error occurred while deleting user with id ${id}.`,
                })
            })
    },
}
