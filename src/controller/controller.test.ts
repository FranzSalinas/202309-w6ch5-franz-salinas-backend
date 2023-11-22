import { Request, Response } from 'express';
import { FootballerController } from './controller';
import { FootballersMongoRepo } from '../repo/footballers.mongo.repo';

describe('Given FootballerController class', () => {
  let controller: FootballerController;
  let mockRequest: Request;
  let mockResponse: Response;
  let mockNext: jest.Mock;

  beforeEach(() => {
    mockRequest = {
      body: {},
      params: {},
    } as Request;

    mockResponse = {
      json: jest.fn(),
    } as unknown as Response;

    mockNext = jest.fn();
  });

  describe('When we instantiate it without error', () => {
    beforeEach(() => {
      const mockRepo = {
        getAll: jest.fn().mockResolvedValue([{}]),
        getById: jest.fn().mockResolvedValue({}),
        create: jest.fn().mockResolvedValue({}),
      } as unknown as FootballersMongoRepo;

      controller = new FootballerController(mockRepo);
    });

    test('Then getAll should ...', async () => {
      await controller.getAll(mockRequest, mockResponse, mockNext);
      expect(mockResponse.json).toHaveBeenCalledWith([{}]);
    });

    test('Then getByID should return the correct data when valid ID is provided', async () => {
      await controller.getById(mockRequest, mockResponse, mockNext);

      expect(mockResponse.json).toHaveBeenCalledWith({});
    });
  });
});
