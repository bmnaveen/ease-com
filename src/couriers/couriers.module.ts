import { BlueDartAdapter } from "./bluedart/bluedart.adapter";
import { BlueDartModule } from "./bluedart/bluedart.module";
import { CourierRegistryService } from "./courier-registery.service";
import { COURIER_ADAPTERS } from "./courier.interface";
import { UrbanBoltAdapter } from "./urbanebolt/urbanbolt.adapter";
import { UrbanBoltModule } from "./urbanebolt/urbanebolt.module";
import { Module } from "@nestjs/common";

@Module({
    imports: [UrbanBoltModule, BlueDartModule],
    providers: [{
        provide : COURIER_ADAPTERS,
        useFactory: (urbanebolt: UrbanBoltAdapter, bluedart: BlueDartAdapter) => [urbanebolt, bluedart],
        inject: [UrbanBoltAdapter, BlueDartAdapter]
    },
CourierRegistryService],
exports: [CourierRegistryService]
})

export class CouriersModule {}