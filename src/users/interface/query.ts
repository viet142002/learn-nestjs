import { Prisma } from '@prisma/client';

export interface ListQuery {
    skip?: number;
    take?: number;
    include?: string;
    cursor?: Prisma.UserWhereUniqueInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
}

export interface QueryAllUsers extends ListQuery {
    fullname?: string;
    email?: string;
}
