import { ProjectListing } from "src/project-listing/entities/project-listing.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({unique:true})
    username: string

    @Column({unique:true})
    email: string

    @Column({select: false})
    password: string

    @Column({nullable: true})
    firstName: string | null;

    @Column({nullable: true})
    lastName: string | null;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;
    
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date;

    @Column({ default: true })
    isActive: boolean;

    @OneToMany(() => ProjectListing, projectListing => projectListing.owner)
    ownedListings: ProjectListing[];

    @ManyToMany(() => ProjectListing)
    participatedListings: ProjectListing[];

}