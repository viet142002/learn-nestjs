import { SetMetadata } from '@nestjs/common';
import { Role } from '~/types';

export const Roles = (...role: Array<Role>) => SetMetadata('roles', role);
