import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connect } from 'src/entities/Connect';
import { EventsGateway } from './events.gateway';

@Module({
    imports: [
        TypeOrmModule.forFeature([Connect]),
    ],
    providers: [EventsGateway],
    exports: [EventsGateway]
})
export class EventsModule {}
