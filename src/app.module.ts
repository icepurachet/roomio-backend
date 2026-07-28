import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config'; // เพิ่มเข้ามาอ่าน env
import { HotelsModule } from './hotels/hotels.module';
import { UsersModule } from './users/users.module';
import { RoomsModule } from './rooms/rooms.module';
import { BookingRoomsModule } from './booking_rooms/booking_rooms.module';
import { PaymentsModule } from './payments/payments.module';
import { ToursModule } from './tours/tours.module';
import { BookingToursModule } from './booking_tours/booking_tours.module';
import { RoomFeaturesModule } from './room_features/room_features.module';
import { HotelFacilitiesModule } from './hotel_facilities/hotel_facilities.module';
import { NearbyPlacesModule } from './nearby_places/nearby_places.module';
import { HotelImagesModule } from './hotel_images/hotel_images.module';
import { OwnersModule } from './owners/owners.module';
import { AuthModule } from './auth/auth.module';
import { protectedModule } from './protected/protected.module';
import { HotelFullModule } from './hotel_full/hotel_full.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || 'ณแำุึภตภค',
      database: process.env.DB_DATABASE || 'roomio',
      autoLoadEntities: true,
      synchronize: false,
      ssl: process.env.DB_HOST ? { rejectUnauthorized: false } : false, // ใช้ SSL เฉพาะตอนขึ้น Cloud (Aiven)
    }),
    HotelsModule,
    UsersModule,
    RoomsModule,
    BookingRoomsModule,
    PaymentsModule,
    ToursModule,
    BookingToursModule,
    RoomFeaturesModule,
    HotelFacilitiesModule,
    NearbyPlacesModule,
    HotelImagesModule,
    OwnersModule,
    AuthModule,
    protectedModule,
    HotelFullModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}