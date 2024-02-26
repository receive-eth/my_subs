import {
    Relation,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm'
import { UserRoles } from 'lib/enums/UserRoles'
import { RefreshSession } from './RefreshSessions.entity'

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ nullable: false, default: 'Anonimous' })
    first_name: string

    @Column({ nullable: false })
    email: string

    @Column({ nullable: false })
    password: string

    @Column({ type: 'enum', enum: UserRoles, default: UserRoles.USER })
    role: UserRoles

    @OneToMany(() => RefreshSession, refreshSession => refreshSession.user, {
        onDelete: 'CASCADE',
    })
    refresh_sessions: RefreshSession[]

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}
