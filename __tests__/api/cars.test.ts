import { GET, POST } from '@/app/api/cars/route';
import { prisma } from '@/prisma/seed';
import { NextResponse, NextRequest } from 'next/server';
import { getServerSession } from 'next-auth/next';

jest.mock('@/app/auth/authOptions', () => ({
    authOptions: {}
}));

jest.mock('next-auth/next', () => ({
    getServerSession: jest.fn()
}));

// Mock prisma client
jest.mock('@/prisma/seed', () => ({
  prisma: {
    car: {
      findMany: jest.fn(),
      create: jest.fn()
    }
  }
}));

describe('Cars API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/cars', () => {
    it('should return all cars', async () => {
      // Mock data
      const mockCars = [
        {
          id: 1,
          make: 'Toyota',
          model: 'Camry',
          year: 2020,
          userId: '123',
        },
        {
          id: 2,
          make: 'Honda',
          model: 'Civic',
          year: 2021,
          userId: '456',
        }
      ];

      // Setup mock return value
      (prisma.car.findMany as jest.Mock).mockResolvedValue(mockCars);

      // Execute the request
      const response = await GET({} as any);
      const data = await response.json();

      // Assertions
      expect(prisma.car.findMany).toHaveBeenCalled();
      expect(data).toEqual(mockCars);
    });

    it('should handle errors gracefully', async () => {
      // Setup mock to throw error
      (prisma.car.findMany as jest.Mock).mockRejectedValue(new Error('Database error'));

      // Execute the request and expect it to throw
      await expect(GET({} as any)).rejects.toThrow('Database error');
    });
  });

  describe('POST /api/cars', () => {
    it('should create a new car', async () => {
        const requestData = {
          make: 'Toyota',
          model: 'Corolla',
          year: 2020,
          userId: '123'
        };
      
        const mockCar = {
          id: 1,
          ...requestData
        };
      
        const mockReq = {
          json: () => Promise.resolve(requestData)
        } as unknown as NextRequest;
      
        (getServerSession as jest.Mock).mockResolvedValue({
          user: { id: '123' }
        });
      
        (prisma.car.create as jest.Mock).mockResolvedValue(mockCar);
      
        const response = await POST(mockReq);
        const data = await response.json();
      
        expect(prisma.car.create).toHaveBeenCalledWith({ data: requestData });
        expect(data).toEqual(mockCar);
      });
      

    it('should handle errors gracefully', async () => {
      // Setup mock request
      const mockReq = {
        json: () => Promise.resolve({})
      } as NextRequest;

      // Setup mock to throw error
      (prisma.car.create as jest.Mock).mockRejectedValue(new Error('Database error'));


        (getServerSession as jest.Mock).mockResolvedValue({
            user: { id: '123', name: 'Test User' }
        });

      // Execute the request and expect it to throw
      await expect(POST(mockReq)).rejects.toThrow('Database error');
    });
  });
}); 