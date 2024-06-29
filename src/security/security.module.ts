import { Module } from '@nestjs/common';
import { JwtAuthGuard } from './jwt.guard';
import { RolesGuard } from './roles.guard';
import { PermissionGuard } from './permission.guard';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule],
    providers: [JwtStrategy, JwtAuthGuard, RolesGuard, PermissionGuard],
    exports: [JwtAuthGuard, RolesGuard, PermissionGuard],
})
export class SecurityModule {}
