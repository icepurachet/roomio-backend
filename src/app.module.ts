import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
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
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',         // ใส่ให้ตรงกับเครื่องคุณ
      password: 'ณแำุึภตภค',             // ใส่รหัสผ่าน (หรือเว้นว่างถ้าไม่มี)
      database: 'roomio',     // ชื่อฐานข้อมูลที่คุณสร้าง
      autoLoadEntities: true,
      synchronize: false,
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
    HotelFullModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
