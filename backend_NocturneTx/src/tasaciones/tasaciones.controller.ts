import { Controller } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { ROLE_ADMIN } from '../auth/constants';

@ApiTags('tasaciones')
@ApiBearerAuth('JWT-auth')
@Roles(ROLE_ADMIN)
@Controller('tasaciones')
export class TasacionesController {}
