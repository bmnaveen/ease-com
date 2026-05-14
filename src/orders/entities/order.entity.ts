import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ShipmentStatus } from 'src/common/enums/ShimentStatus.enum';
import { TrackingEvent } from './tracking.entity';

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'external_order_id', type: 'varchar', length: 128})
    externalOrderId: string;

    @Column({name: 'courier_partner', type: 'varchar', length: 64})
    courierPartner: string;

    @Column({name: 'courier_order_id', type: 'varchar', length: 128, nullable: true})
    courierOrderId: string | null;

    @Column({name: 'awb_number', type: 'varchar', length: 128, nullable: true})
    awbNumber: string | null;

    @Column({type: 'enum', enum: ShipmentStatus, default: ShipmentStatus.PENDING})
    status: ShipmentStatus;

    @Column({name: 'request_payload', type: 'jsonb', nullable: true})
    requestPayload: unknown;

    @Column({name: 'response_payload', type: 'jsonb', nullable: true})
    responsePayload: unknown;

    @Column({name: 'batch_id', type: 'uuid', nullable: true})
    batchId: string;

    @Column({name: 'last_error', type: 'jsonb', nullable: true})
    lastError: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @OneToMany(() => TrackingEvent, (event) => event.order)
    trackingEvents: TrackingEvent[];
}

