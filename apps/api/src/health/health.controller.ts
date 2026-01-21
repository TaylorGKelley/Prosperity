import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @AllowAnonymous()
  public check() {
    return this.healthService.check();
  }
}
