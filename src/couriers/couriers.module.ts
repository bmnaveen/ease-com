import { CourierRegistryService } from "./courier-registery.service";
import { COURIER_ADAPTERS } from "./courier.interface";
import { UrbanBoltAdapter } from "./urbanebolt/urbanbolt.adapter";
import { UrbanBoltModule } from "./urbanebolt/urbanebolt.module";
import { Module } from "@nestjs/common";

@Module({
    imports: [UrbanBoltModule],
    providers: [{
        provide : COURIER_ADAPTERS,
        useFactory: (urbanebolt: UrbanBoltAdapter) => [urbanebolt],
        inject: [UrbanBoltAdapter]
    },
CourierRegistryService],
exports: [CourierRegistryService]
})

export class CouriersModule {}