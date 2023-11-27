import { Auth } from './auth';
import { compare, hash } from 'bcrypt';

jest.mock('bcrypt');
describe('Given Auth abstract class', () => {
  describe('When we use its methods', () => {
    test('Then the hash method should', () => {
      // Arrange
      (hash as jest.Mock).mockReturnValue('test');
      const mockValue = '';
      // Act
      const result = Auth.hash(mockValue);
      // Assert
      expect(result).toBe('test');
      expect(hash).toHaveBeenCalled();
    });

    test('Then the compare method should', () => {
      // Arrange
      (compare as jest.Mock).mockReturnValue(true);
      const mockValue = '';
      // Act
      const result = Auth.compare(mockValue, mockValue);
      // Assert
      expect(result).toBe(true);
      expect(hash).toHaveBeenCalled();
    });

    test('Then the compare method should', () => {
      // Arrange
      (compare as jest.Mock).mockReturnValue(true);
      const mockValue = '';
      // Act
      const result = Auth.compare(mockValue, mockValue);
      // Assert
      expect(result).toBe(true);
      expect(hash).toHaveBeenCalled();
    });
  });
});
