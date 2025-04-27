import { Module } from '@nestjs/common';
import { EventModule } from './event/event.module';
import { UserModule } from './user/user.module';
import { TicketModule } from './ticket/ticket.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    EventModule,
    UserModule,
    TicketModule,
    AuthModule,
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get('MONGO_URI'),
        };
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
