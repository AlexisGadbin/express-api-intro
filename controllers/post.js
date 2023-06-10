import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const { post: Post } = prisma

export default {
    getAll(req, res) {
        Post.findMany()
            .then((data) => {
                res.status(200).send(data)
            })
            .catch((e) => {
                res.status(500).send({
                    message: e.message || 'Some error occurred while retrieving posts.',
                })
            })
    },
    get(req, res) {
        const { id } = req.params
        Post.findUnique({
            where: {
                id: parseInt(id),
            },
        })
            .then((data) => {
                data ? res.status(200).send(data) : res.status(404).send({ message: `Not found post with id ${id}` })
            })
            .catch((e) => {
                res.status(500).send({
                    message: e.message || `Some error occurred while retrieving post with id ${id}.`,
                })
            })
    },
    create(req, res) {
        const { userId, title, content, description } = req.body
        Post.create({
            data: {
                userId: parseInt(userId),
                title,
                content,
                description,
            },
        })
            .then((data) => {
                res.status(201).send(data)
            })
            .catch((e) => {
                res.status(500).send({
                    message: e.message || 'Some error occurred while creating the post.',
                })
            })
    },
    update(req, res) {
        const { id } = req.params
        const { title, content, description } = req.body
        Post.update({
            where: {
                id: parseInt(id),
            },
            data: {
                title,
                content,
                description,
            },
        })
            .then(() => {
                res.status(200).send({
                    message: `Post "${title}" was updated successfully.`,
                })
            })
            .catch((e) => {
                res.status(500).send({
                    message: e.message || `Some error occurred while updating post "${title}".`,
                })
            })
    },
    delete(req, res) {
        const { id } = req.params

        Post.delete({
            where: {
                userId: parseInt(id),
            },
        })
            .then(() => {
                res.status(200).send({
                    message: `Post was deleted successfully!`,
                })
            })
            .catch((e) => {
                res.status(500).send({
                    message: e.message || `Some error occurred while deleting post with id ${id}.`,
                })
            })
    },
}
