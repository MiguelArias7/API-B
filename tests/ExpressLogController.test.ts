import request from 'supertest';
import app from '../src/index';
import { ServiceContainer } from '../src/infrastructure/container/ServiceContainer';
import { Log } from '../src/domain/models/Log';
import { Metadata } from '../src/domain/models/Metadata';
import { LOG_STATUS } from '../src/const';

// Mock the ServiceContainer
jest.mock('../src/infrastructure/container/ServiceContainer');

describe('Log Controller', () => {
  const mockServiceContainer = ServiceContainer as jest.Mocked<typeof ServiceContainer>;
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/log', () => {
    it('should create a new log successfully', async () => {
      const logData = {
        version: '1.0',
        franchise: 'Pokemon',
        metadata: { id: '1', name: 'test-metadata' }
      };

      const mockLog = new Log(
        '123',
        logData.franchise,
        logData.version,
        Metadata.fromObject(logData.metadata),
        new Date(),
        LOG_STATUS.SUCCESS
      );

      mockServiceContainer.log.create.execute = jest.fn().mockResolvedValue(mockLog);

      const response = await request(app)
        .post('/api/log')
        .send(logData)
        .expect(201);

      expect(response.body).toHaveProperty('id', '123');
      expect(response.body.franchise).toBe(logData.franchise);
      expect(response.body.version).toBe(logData.version);
      expect(mockServiceContainer.log.create.execute).toHaveBeenCalledWith(
        logData.franchise,
        logData.version,
        logData.metadata
      );
    });

    it('should handle errors when creating a log', async () => {
      const logData = {
        version: '1.0',
        franchise: 'Pokemon',
        metadata: { id: '1', name: 'test-metadata' }
      };

      mockServiceContainer.log.create.execute = jest.fn().mockRejectedValue(
        new Error('Database error')
      );

      const response = await request(app)
        .post('/api/log')
        .send(logData)
        .expect(500);

      expect(response.body).toHaveProperty('error', 'Internal Server Error');
      expect(response.body).toHaveProperty('message', 'Database error');
    });
  });

  describe('GET /api/log', () => {
    it('should fetch all logs successfully', async () => {
      const mockLogs = [
        new Log('1', 'Pokemon', '1.0', Metadata.fromObject({ id: '1', name: 'metadata1' })),
        new Log('2', 'Digimon', '1.0', Metadata.fromObject({ id: '2', name: 'metadata2' }))
      ];

      mockServiceContainer.log.getAll.execute = jest.fn().mockResolvedValue(mockLogs);

      const response = await request(app)
        .get('/api/log')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toHaveProperty('id', '1');
      expect(response.body[1]).toHaveProperty('id', '2');
    });

    it('should handle errors when fetching all logs', async () => {
      mockServiceContainer.log.getAll.execute = jest.fn().mockRejectedValue(
        new Error('Database connection failed')
      );

      const response = await request(app)
        .get('/api/log')
        .expect(500);

      expect(response.body).toHaveProperty('error', 'Internal Server Error');
      expect(response.body).toHaveProperty('message', 'Database connection failed');
    });
  });

  describe('GET /api/log/:id', () => {
    it('should fetch a log by ID successfully', async () => {
      const mockLog = new Log(
        '123',
        'Pokemon',
        '1.0',
        Metadata.fromObject({ id: '123', name: 'test-metadata' })
      );

      mockServiceContainer.log.getById.execute = jest.fn().mockResolvedValue(mockLog);

      const response = await request(app)
        .get('/api/log/123')
        .expect(200);

      expect(response.body).toHaveProperty('id', '123');
      expect(response.body.franchise).toBe('Pokemon');
      expect(mockServiceContainer.log.getById.execute).toHaveBeenCalledWith('123');
    });

    it('should return 404 when log is not found', async () => {
      mockServiceContainer.log.getById.execute = jest.fn().mockResolvedValue(null);

      const response = await request(app)
        .get('/api/log/999')
        .expect(404);

      expect(response.body).toHaveProperty('error', 'Log not found');
    });

    it('should handle errors when fetching log by ID', async () => {
      mockServiceContainer.log.getById.execute = jest.fn().mockRejectedValue(
        new Error('Database error')
      );

      const response = await request(app)
        .get('/api/log/123')
        .expect(500);

      expect(response.body).toHaveProperty('error', 'Internal Server Error');
      expect(response.body).toHaveProperty('message', 'Database error');
    });
  });
});
