import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '@src/models';
import { UsersService } from './users.service';
import { id } from '@src/@types';
import {
    UserConnection,
    UserConnectionArgs,
    UserDeleteInput,
    UserDeletePayload,
    UserInput,
} from './dto';
import { NotFoundException } from '@nestjs/common';
import { EXCEPTION_CAUSE } from '@src/constants';
import { Public } from '@src/decorators';

@Resolver(() => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {}

    @Mutation(() => User, {
        name: 'userCreate',
    })
    public async createUser(
        @Args('input', { type: () => UserInput }) input: UserInput,
    ): Promise<User> {
        return await this.usersService.create(input);
    }

    @Query(() => User)
    public async user(@Args('id', { type: () => ID }) id: id): Promise<User> {
        const user = await this.usersService.findOneById(id);

        if (!user) {
            throw new NotFoundException('User with the provided id not found.', {
                cause: EXCEPTION_CAUSE.RESOURCE_NOT_FOUND,
            });
        }

        return user;
    }

    @Public()
    @Query(() => Boolean)
    public async usernameExists(@Args('username') username: string): Promise<boolean> {
        const user = await this.usersService.findOneByEmail(username);

        if (user) {
            return true;
        }

        return false;
    }

    @Query(() => UserConnection)
    public async users(@Args() args: UserConnectionArgs): Promise<UserConnection> {
        const results = await this.usersService.getUsers(args);

        const connection = new UserConnection({
            data: results.data,
            totalCount: results.totalCount,
            cursorKey: results.cursorKey,
            args: results.options,
        });

        return connection;
    }

    @Mutation(() => UserDeletePayload, {
        name: 'userDelete',
    })
    public async deleteUser(
        @Args('input', { type: () => UserDeleteInput }) input: UserDeleteInput,
    ): Promise<UserDeletePayload> {
        return await this.usersService.delete(input);
    }
}
