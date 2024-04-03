import { Technology } from "src/technology/entities/technology.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'project_listing'})
export class ProjectListing {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column('text')
    description: string;

    @Column({
        type: "enum",
        enum: ['Backend', 'Frontend', 'Full-stack'],
        default: 'Full-stack'
    })
    category: string;

    @ManyToMany(() => Technology)
    @JoinTable()
    techStack: Technology[]

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date;

    @ManyToOne(() => User, user => user.ownedListings)
    owner: User;

    @ManyToMany(() => User)
    @JoinTable()
    participants: User[];


}