import { base64EncryptCursor } from '@src/utils';
import { IsBoolean, IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { PageInfo } from './page-info.schema';
import { ApiPropertyOptional, ApiQuery } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

interface PageData<T extends object> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    [x: keyof T]: any;
    cursor: string;
}

export interface PaginationResponseOptions<
    TPageData extends object,
    TSortKeys extends Record<string, string | number>,
> {
    data: TPageData[];
    totalCount: number;
    cursorKey: string;
    query: IPaginationQueryArgs<TSortKeys>;
}

export class PaginationResponse<
    TData extends object,
    TSortKeys extends Record<string, string | number>,
> {
    public data: Array<PageData<any>> = [];
    public pageInfo: PageInfo = new PageInfo();

    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    constructor(options: PaginationResponseOptions<TData, TSortKeys>) {
        const {
            data,
            cursorKey,
            totalCount,
            query: { first, last },
        } = options;

        this.data = Array.isArray(data)
            ? data.map((item) => ({
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  cursor: base64EncryptCursor(String(item[cursorKey])),
                  ...item,
              }))
            : [];

        this.pageInfo.totalCount = totalCount;
        this.pageInfo.startCursor = this.data[this.data.length - 1].cursor;
        this.pageInfo.endCursor = this.data[this.data.length - 1].cursor;
        this.pageInfo.hasNextPage =
            first != undefined
                ? this.data.length === first && this.data.length < totalCount
                : false;
        this.pageInfo.hasPreviousPage =
            last != undefined ? this.data.length === last && this.data.length < totalCount : false;
    }
}

export interface IPaginationQueryArgs<TSortKeys extends Record<string, string | number>> {
    after?: string;
    before?: string;
    first?: number;
    last?: number;
    reverse?: boolean;
    query?: string;
    sortKey?: keyof TSortKeys;
}

export function PaginationQueryArgs<TSortKeys extends Record<string, string | number>>(
    sortKeys: TSortKeys,
) {
    const sortKeyValues = Array.isArray(sortKeys) ? Object.values(sortKeys).join(', ') : [];

    @ApiQuery({
        description: 'Query params for using a cursor to paginate the list of data',
    })
    abstract class AbstractPaginationQuery implements IPaginationQueryArgs<TSortKeys> {
        @IsOptional()
        @IsString()
        @ApiPropertyOptional({
            description: 'The elements that come after the specified cursor.',
        })
        public after?: string;

        @IsOptional()
        @IsString()
        @ApiPropertyOptional({
            description: 'The elements that come before the specified cursor.',
        })
        public before?: string;

        @IsOptional()
        @IsInt()
        @Min(1)
        @ApiPropertyOptional({
            description: 'The first n elements from the paginated list.',
        })
        @Transform(({ value }) => parseInt(value))
        public first?: number;

        @IsOptional()
        @IsInt()
        @Min(1)
        @ApiPropertyOptional({
            description: 'The last n elements from the paginated list.',
        })
        @Transform(({ value }) => parseInt(value))
        public last?: number;

        @IsOptional()
        @IsString()
        @ApiPropertyOptional({
            description:
                'A filter made up of terms, connectives, modifiers, and comparators. You can apply one or more filters to a query.',
        })
        public query?: string;

        @IsOptional()
        @IsBoolean()
        @ApiPropertyOptional({
            description: 'Reverse the order of the underlying list.',
        })
        @Transform(({ value }) => value === 'true') // Transform string to boolean
        public reverse?: boolean;

        @IsOptional()
        @IsEnum(sortKeys, {
            message: `sortKeys must be one of the following values: ${sortKeyValues}`,
        })
        @ApiPropertyOptional({
            description: 'Sort the underlying list using a key.',
            enum: sortKeys,
        })
        public sortKey?: keyof TSortKeys;
    }

    return AbstractPaginationQuery;
}
