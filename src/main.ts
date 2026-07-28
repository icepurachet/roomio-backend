// // import { NestFactory } from '@nestjs/core';
// // import { AppModule } from './app.module';

// // async function bootstrap() {
// //   const app = await NestFactory.create(AppModule);
// //   app.enableCors();
// //   await app.listen(process.env.PORT ?? 3000);
// // }
// // bootstrap();


import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // เปิดใช้งาน ValidationPipe แบบ global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,              // ลบฟิลด์ที่ไม่อยู่ใน DTO ออก
    forbidNonWhitelisted: true,   // โยน error ถ้ามีฟิลด์แปลกๆ ส่งมา
    transform: true,              // แปลงประเภทข้อมูลให้ตรงกับ DTO
  }));

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   app.enableCors({
//     origin: ['http://localhost:3001', 'http://localhost:3002'], // ใส่ URL ของ frontend ทั้ง 2 ตัว
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
//     credentials: true, // ถ้าใช้ cookie / Authorization header
//   });

//   app.useGlobalPipes(new ValidationPipe({
//     whitelist: true,
//     forbidNonWhitelisted: true,
//     transform: true,
//   }));

//   await app.listen(process.env.PORT ?? 5000);
// }
// bootstrap();

// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   // --- เพิ่มโค้ดส่วนนี้ หรือตรวจสอบให้แน่ใจว่ามีแล้ว ---
//   app.enableCors({
//     origin: 'http://localhost:3000', // อนุญาตให้เฉพาะ Front-end ที่รันบน 3000 เข้าถึงได้
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // อนุญาต method ที่จำเป็น
//     credentials: true, // ถ้ามีการส่ง cookie หรือ authorization header
//   });
//   // ---------------------------------------------------

//   await app.listen(5000); // ตรวจสอบว่ายังคงเป็น 5000 นะครับ
// }
// bootstrap();