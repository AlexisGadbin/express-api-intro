import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const { user: User } = prisma

async function main() {
    await User.create({
        data: {
            name: 'Alexis',
            posts: {
                create: [
                    { title: 'Hello World', content: 'This is my first post' },
                    { title: 'Second post', content: 'This is my second post' },
                ],
            },
        },
    })
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
