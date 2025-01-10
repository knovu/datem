import { Field, Int, ObjectType } from '@nestjs/graphql';

export interface IPageInfo {
    totalCount: number;
    startCursor?: string;
    endCursor?: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

@ObjectType()
export class PageInfo implements IPageInfo {
    @Field(() => Int)
    public totalCount: number;

    @Field({ nullable: true })
    public startCursor?: string;

    @Field({ nullable: true })
    public endCursor?: string;

    @Field()
    public hasNextPage: boolean;

    @Field()
    public hasPreviousPage: boolean;

    constructor(info?: IPageInfo) {
        if (info) {
            this.totalCount = info.totalCount;
            this.startCursor = info.startCursor;
            this.endCursor = info.endCursor;
            this.hasNextPage = info.hasNextPage;
            this.hasPreviousPage = info.hasPreviousPage;
        }
    }
}
