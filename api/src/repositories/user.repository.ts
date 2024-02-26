import { CreateUserDto } from '@/dto/user.dto'
import { User } from '@/entities/User.entity'
import { AppDataSource } from 'config/data.source'
import { Repository } from 'typeorm'

export const userRepository: Repository<User> =
    AppDataSource.getRepository(User)

class UserRepository {
    static async getUserByEmail(email: string): Promise<User | null> {
        const user = await userRepository.findOne({
            where: {
                email,
            },
        })

        return user
    }

    static async createUser(createUserDto: CreateUserDto): Promise<User> {
        return userRepository.save(createUserDto)
    }
}

export default UserRepository
