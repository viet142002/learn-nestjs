import { SetMetadata } from '@nestjs/common';
import { Permission } from '~/types';

export const Permissions = (...permissions: Array<Permission>) => SetMetadata('Permissions', permissions);
