/* L import { Request, Response } from 'express';
import { FootballerController } from './controller';
import { FootballersFileRepo } from '../repo/footballers.file.repo';

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
      } as unknown as FootballersFileRepo;

      controller = new FootballerController(mockRepo);

      test('Then getAll should ...', async () => {
        await controller.getAll(mockRequest, mockResponse);
        expect(mockResponse.json).toHaveBeenCalledWith([{}]);
      });

      test('Then getByID should return the correct data when valid ID is provided', async () => {
        controller = new FootballerController(mockRepo);

        await controller.getById(mockRequest, mockResponse, mockNext);

        expect(mockResponse.json).toHaveBeenCalledWith({});
      });

      describe('When we instantiated it ', () => {});

      describe('When we instantiated it', () => {
        test('Then create method should create a new footballer and return 201 status with correct data', async () => {
          const mockRequestBody = { name: 'New Footballer', age: 25 };
          const mockCreatedResult = {
            id: '123',
            name: 'New Footballer',
            age: 25,
          };
          FootballersFileRepo.prototype.create = jest
            .fn()
            .mockResolvedValue(mockCreatedResult);

          const controller = new FootballerController();

          const mockRequest: Request = {
            body: mockRequestBody,
          } as Request;

          const mockResponse: Response = {
            status: jest.fn().mockReturnThis(),
            statusMessage: '',
            json: jest.fn(),
          } as unknown as Response;

          await controller.create(mockRequest, mockResponse);

          expect(mockResponse.status).toHaveBeenCalledWith(201);
          expect(mockResponse.statusMessage).toBe('Created');
          expect(mockResponse.json).toHaveBeenCalledWith(mockCreatedResult);
        });
      });

      describe('When we instantiated it', () => {
        test('The update method should update a footballer and return the updated data', async () => {
          const mockId = '123';
          const mockRequestBody = { name: 'Updated Footballer', age: 26 };
          const mockUpdatedResult = {
            id: '123',
            name: 'Updated Footballer',
            age: 26,
          };
          FootballersFileRepo.prototype.update = jest
            .fn()
            .mockResolvedValue(mockUpdatedResult);

          const controller = new FootballerController();

          const mockRequest: Request = {
            params: { id: mockId },
            body: mockRequestBody,
          } as unknown as Request;

          const mockResponse: Response = {
            json: jest.fn(),
          } as unknown as Response;

          await controller.update(mockRequest, mockResponse);

          expect(mockResponse.json).toHaveBeenCalledWith(mockUpdatedResult);

          expect(FootballersFileRepo.prototype.update).toHaveBeenCalledWith(
            mockId,
            mockRequestBody
          );
        });
      });

      describe('When we instantiated it', () => {
        test('The method should delete a footballer and return 204 status with no content', async () => {
          const mockId = '123';
          FootballersFileRepo.prototype.delete = jest
            .fn()
            .mockResolvedValue(undefined);

          const controller = new FootballerController();

          const mockRequest: Request = {
            params: { id: mockId },
          } as unknown as Request;

          const mockResponse: Response = {
            status: jest.fn().mockReturnThis(),
            statusMessage: '',
            json: jest.fn(),
          } as unknown as Response;

          await controller.delete(mockRequest, mockResponse);

          expect(mockResponse.status).toHaveBeenCalledWith(204);
          expect(mockResponse.statusMessage).toBe('No Content');
          expect(mockResponse.json).toHaveBeenCalledWith({});
        });

        test('The method should handle errors when deleting a footballer', async () => {
          const mockId = '123';
          const mockError = new Error('Deletion failed');
          FootballersFileRepo.prototype.delete = jest
            .fn()
            .mockRejectedValue(mockError);

          const controller = new FootballerController();

          const mockRequest: Request = {
            params: { id: mockId },
          } as unknown as Request;

          const mockResponse: Response = {
            status: jest.fn().mockReturnThis(),
            statusMessage: '',
            json: jest.fn(),
          } as unknown as Response;

          await controller.delete(mockRequest, mockResponse);

          expect(mockResponse.json).toHaveBeenCalledWith({});
        });
      });
    });
  });
});
 */
