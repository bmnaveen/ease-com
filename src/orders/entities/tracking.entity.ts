import {
Column,
CreateDateColumn,
Entity,
Index,
JoinColumn,
ManyToOne,
PrimaryGeneratedColumn,
UpdateDateColumn,
} from 'typeorm';
import { ShipmentStatus } from 'src/common/enums/ShimentStatus.enum';
import { Order } from './order.entity';

@Entity('tracking_events')
export class TrackingEvent {
    @PrimaryGeneratedColumn('increment', {type: 'bigint'})
    id: string;

    @Column({name: 'order_id', type: 'uuid'})
    orderId: string;

    @Column({name: 'courier_status', type: 'varchar'})
    status: ShipmentStatus;

    @Column({name: 'courier_status_raw', type: 'varchar', length: 128, nullable: true})
    courierStatusRaw: string | null;

    @Column({name: 'occured_at', type: 'timestamptz'})
    occuredAt: Date;

    @Column({name: 'raw_payload', type: 'jsonb', nullable: true})
    rawPayload: unknown;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}