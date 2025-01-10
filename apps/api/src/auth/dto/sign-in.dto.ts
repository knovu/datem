import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class SignInDto {
    @Field({
        description: 'The email address of the user.',
    })
    @ApiProperty({
        description: 'The email address of the user.',
    })
    @IsEmail(
        {},
        {
            message: 'username is required',
        },
    )
    @MaxLength(256)
    public username: string;

    @Field({
        description: 'The password of the user.',
    })
    @ApiProperty({
        description: 'The password of the user.',
    })
    @IsString({
        message: 'password is required',
    })
    @MinLength(8)
    @MaxLength(256)
    public password: string;
}

@ObjectType()
export class AuthPayload {
    @Field({
        description:
            'A token that is sent to the resource server to access the protected resources of the user.',
    })
    @ApiProperty({
        description:
            'A token that is sent to the resource server to access the protected resources of the user..',
    })
    public accessToken: string;

    @Field({
        description:
            'A token that is sent to the resource server to access the protected resources of the user.',
    })
    @ApiProperty({
        description:
            'A token that is sent to the resource server to access the protected resources of the user..',
        default: 'Bearer',
    })
    public tokenType: string = 'Bearer';

    @Field({
        description:
            'A token that can be used to obtain new access tokens. This token has an unlimited lifetime until it is revoked by the end-user.',
    })
    @ApiProperty({
        description:
            'A token that can be used to obtain new access tokens. This token has an unlimited lifetime until it is revoked by the end-user.',
    })
    public refreshToken: string;

    @Field({
        description: 'Expiration time in milliseconds of the access token',
    })
    @ApiProperty({
        description: 'Expiration time in milliseconds of the access token',
    })
    public expiresIn: number;
}
