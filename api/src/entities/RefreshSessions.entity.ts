import {
    Relation,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm'
import { User } from './User.entity'

@Entity({ name: 'refresh_sessions' })
export class RefreshSession {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'user_id' })
    user: User

    @Column({ nullable: false })
    refresh_token: string

    @Column({ nullable: false })
    finger_print: string

    @CreateDateColumn()
    created_at: Date
}
