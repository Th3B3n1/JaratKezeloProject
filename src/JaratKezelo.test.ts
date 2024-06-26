import { describe, it, expect } from 'vitest';
import JaratKezelo from '../src/JaratKezelo';

describe('JaratKezelo - Intended cases', () => {
  it('should create a new flight', () => {
    const jk = new JaratKezelo();
    jk.ujJarat('AB123', 'BUD', 'JFK', new Date('2023-05-29T10:00:00Z'));
    expect(jk.mikorIndul('AB123')).toEqual(new Date('2023-05-29T10:00:00Z'));
  });

  it('should add delay to a flight', () => {
    const jk = new JaratKezelo();
    jk.ujJarat('AB123', 'BUD', 'JFK', new Date('2023-05-29T10:00:00Z'));
    jk.keses('AB123', 30);
    expect(jk.mikorIndul('AB123')).toEqual(new Date('2023-05-29T10:30:00Z'));
  });

  it('should not allow negative total delay', () => {
    const jk = new JaratKezelo();
    jk.ujJarat('AB123', 'BUD', 'JFK', new Date('2023-05-29T10:00:00Z'));
    jk.keses('AB123', 30);
    expect(() => jk.keses('AB123', -40)).toThrow('A késés nem lehet negatív!');
  });

  it('should list flights from an airport', () => {
    const jk = new JaratKezelo();
    jk.ujJarat('AB123', 'BUD', 'JFK', new Date('2023-05-29T10:00:00Z'));
    jk.ujJarat('CD456', 'BUD', 'LAX', new Date('2023-05-29T12:00:00Z'));
    jk.ujJarat('EF789', 'JFK', 'BUD', new Date('2023-05-29T14:00:00Z'));
    expect(jk.jaratokRepuloterrol('BUD')).toEqual(['AB123', 'CD456']);
  });
});

describe('JaratKezelo - Error cases', () => {
  it('should throw an error when adding a flight with duplicate flight number', () => {
    const jk = new JaratKezelo();
    jk.ujJarat('AB123', 'BUD', 'JFK', new Date('2023-05-29T10:00:00Z'));
    expect(() => {
      jk.ujJarat('AB123', 'BUD', 'JFK', new Date('2023-05-30T10:00:00Z'));
    }).toThrow('Duplikált járatszám!');
  });

  it('should throw an error when adding delay to a non-existent flight', () => {
    const jk = new JaratKezelo();
    expect(() => {
      jk.keses('NONEXISTENT', 30);
    }).toThrow('Nem létező járat!');
  });

  it('should throw an error when delay causes negative total delay', () => {
    const jk = new JaratKezelo();
    jk.ujJarat('AB123', 'BUD', 'JFK', new Date('2023-05-29T10:00:00Z'));
    jk.keses('AB123', 30);
    expect(() => {
      jk.keses('AB123', -40);
    }).toThrow('A késés nem lehet negatív!');
  });

  it('should throw an error when querying departure time of a non-existent flight', () => {
    const jk = new JaratKezelo();
    expect(() => {
      jk.mikorIndul('NONEXISTENT');
    }).toThrow('Nem létező járat!');
  });
});