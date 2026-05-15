import { Module } from "@nestjs/common";
import { UrbanBoltAdapter } from "./urbanbolt.adapter";
import { UrbanBoltAuthService } from "./urbanebolt.auth";

@Module({
    providers: [UrbanBoltAdapter, UrbanBoltAuthService],
    exports: [UrbanBoltAdapter]
})
export class UrbanBoltModule {}