import { Module } from "@nestjs/common";
import { BlueDartAdapter } from "./bluedart.adapter";
import { BlueDartAuthService } from "./bluedart.auth";

@Module({
    providers: [BlueDartAdapter, BlueDartAuthService],
    exports: [BlueDartAdapter]
})
export class BlueDartModule {}