import request from 'supertest';
import app from '../src/index';
import { ServiceContainer } from '../src/infrastructure/container/ServiceContainer';
import { Pokemon } from '../src/domain/models/Pokemon';
import { Digimon } from '../src/domain/models/Digimon';
import { PokemonMove } from '../src/domain/models/PokemonMove';
import { DigimonSkill } from '../src/domain/models/DigimonSkill';
import { DigimonEvolution } from '../src/domain/models/DigimonEvolution';

jest.mock('../src/infrastructure/container/ServiceContainer');

describe('Data Controller', () => {
  const mockServiceContainer = ServiceContainer as jest.Mocked<typeof ServiceContainer>;

  describe('GET /api/:franchise/v1', () => {
    it('should fetch Pokemon data by ID', async () => {
      const mockPokemon = new Pokemon(
        'Pikachu', 
        [new PokemonMove({ name: 'Thunder Shock', url: 'test' }, [])], 
        6.0
      );
      mockPokemon.evolutions = [{ id: '1', name: 'Raichu' }];

      mockServiceContainer.data.getPokemonByPokemon.execute = jest
        .fn()
        .mockResolvedValue(mockPokemon);

      const response = await request(app)
        .get('/api/pokemon/v1')
        .query({ metadata: JSON.stringify({ id: '1' }), config: JSON.stringify({}) })
        .expect(200);

      expect(response.body).toHaveProperty('name', 'Pikachu');
      expect(response.body.powers).toContain('Thunder Shock');
    });

    it('should fetch Digimon data by ID', async () => {
      const mockDigimon = new Digimon(
        'Agumon',
        [new DigimonSkill('1', 'Pepper Breath', 'Fire', 30)],
        [new DigimonEvolution('1', 'Greymon', 'Champion')]
      );

      mockServiceContainer.data.getDigimonById.execute = jest
        .fn()
        .mockResolvedValue(mockDigimon);

      const response = await request(app)
        .get('/api/digimon/v1')
        .query({ metadata: JSON.stringify({ id: '1' }), config: JSON.stringify({}) })
        .expect(200);

      expect(response.body).toHaveProperty('name', 'Agumon');
      expect(response.body.powers).toContain('Pepper Breath');
    });

    it('should handle invalid franchise error', async () => {
      const response = await request(app)
        .get('/api/unknown/v1')
        .query({ metadata: JSON.stringify({ id: '1' }), config: JSON.stringify({}) })
        .expect(500);

      expect(response.body).toHaveProperty('error', 'Internal Server Error');
      expect(response.body).toHaveProperty('message', 'Invalid franchise');
    });
  });
});

