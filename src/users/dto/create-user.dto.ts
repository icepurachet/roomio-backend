import { IsEmail, IsOptional, IsPhoneNumber, IsString, Length, Matches } from 'class-validator'
export class CreateUserDto { 
    @IsString()
    @Length(1, 50)
    first_name: string;

    @IsString()
    @Length(1, 50)
    last_name: string;

    @IsEmail()
    @Length(5, 100)
    email: string;

    @IsString()
    // @IsPhoneNumber('TH')
    @Matches(/^0\d{8,9}$/, { message: 'phone_number ต้องเป็นเบอร์มือถือไทยที่เริ่มด้วย 0 และมีความยาว 9-10 หลัก' })
    phone_number?: string;
    
    @IsOptional()
    @IsString()
    @Length(0, 255)
    special_request?: string;
}