import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connect } from 'src/entities/Connect';
import { Dmcontent } from 'src/entities/Dmcontent';
import { History } from 'src/entities/History';
import { EventsGateway } from './events.gateway';

@Module({
    imports: [
        TypeOrmModule.forFeature([Connect, History, Dmcontent]),
    ],
    providers: [EventsGateway],
    exports: [EventsGateway]
})
export class EventsModule {}
