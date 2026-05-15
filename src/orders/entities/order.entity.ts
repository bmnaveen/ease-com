import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ShipmentStatus } from 'src/common/enums/ShimentStatus.enum';

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'external_order_id', type: 'varchar', length: 128})
    externalOrderId: string;

    @Column({name: "status", type: 'varchar', default: ShipmentStatus.PENDING})
    status: ShipmentStatus;

    @Column({name: 'request_payload', type: 'jsonb', nullable: true})
    requestPayload: unknown;

    @Column({name: 'response_payload', type: 'jsonb', nullable: true})
    responsePayload: unknown;

    @Column({name: 'batch_id', type: 'varchar', nullable: true})
    batchId: string;

    @Column({name: 'last_error', type: 'jsonb', nullable: true})
    lastError: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}

