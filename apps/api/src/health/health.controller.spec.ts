import { Test } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

describe('Application Routes', () => {
  let healthController: HealthController;
  let healthService: HealthService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [HealthService],
    }).compile();

    healthService = moduleRef.get(HealthService);
    healthController = moduleRef.get(HealthController);
  });

  it('should be defined', () => {
    expect(healthService).toBeDefined();
    expect(healthController).toBeDefined();
  });

  describe('health', () => {
    it('should return { "service": "connected" }', () => {
      const result = { status: 'connected' };
      jest.spyOn(healthService, 'check').mockImplementation(() => result);

      expect(healthController.check()).toBe(result);
    });
  });
});
