import { test } from 'node:test';
import assert from 'node:assert';
import { extractExports, extractImports } from '../src/graph/indexer.ts';
import { findExistingAbstractions, calculateBlastRadius, calculateSystemComplexity, detectOrphanAbstractions } from '../src/graph/query.ts';
import type { ProjectGraph } from '../src/graph/types.ts';

test('extractExports accurately parses function, class, and interface declarations', () => {
  const code = `
    export class AuthService {}
    export function verifyToken() {}
    export const DEFAULT_TIMEOUT = 5000;
    export interface UserCredentials {}
    export type JwtPayload = { sub: string };
  `;
  const symbols = extractExports(code);
  assert.deepStrictEqual(symbols, [
    'AuthService',
    'verifyToken',
    'DEFAULT_TIMEOUT',
    'UserCredentials',
    'JwtPayload'
  ]);
});

test('extractImports extracts module import paths', () => {
  const code = `
    import { AuthService } from './auth.service.ts';
    import type { User } from '../models/user.ts';
    import express from 'express';
  `;
  const imports = extractImports(code);
  assert.deepStrictEqual(imports, [
    './auth.service.ts',
    '../models/user.ts',
    'express'
  ]);
});

test('findExistingAbstractions searches module exports', () => {
  const mockGraph: ProjectGraph = {
    version: '1.0.0',
    name: 'test',
    rootPath: '.',
    allFiles: ['src/auth/auth.ts'],
    dependencies: {},
    modules: [
      {
        name: 'auth',
        path: 'src/auth',
        files: ['src/auth/auth.ts'],
        exports: ['AuthService', 'hashPassword'],
        imports: [],
        tests: []
      }
    ]
  };

  const matches = findExistingAbstractions(mockGraph, 'Auth');
  assert.strictEqual(matches.length, 1);
  assert.strictEqual(matches[0].symbol, 'AuthService');
  assert.strictEqual(matches[0].module, 'auth');
});

test('calculateSystemComplexity calculates afferent/efferent coupling and instability', () => {
  const mockGraph: ProjectGraph = {
    version: '1.0.0',
    name: 'test',
    rootPath: '.',
    allFiles: ['src/a/a.ts', 'src/b/b.ts'],
    dependencies: {},
    modules: [
      {
        name: 'moduleA',
        path: 'src/a',
        files: ['src/a/a.ts'],
        exports: ['ServiceA'],
        imports: ['src/b/b.ts'],
        tests: []
      },
      {
        name: 'moduleB',
        path: 'src/b',
        files: ['src/b/b.ts'],
        exports: ['ServiceB'],
        imports: [],
        tests: []
      }
    ]
  };

  const metrics = calculateSystemComplexity(mockGraph);
  assert.strictEqual(metrics.totalModules, 2);
  assert.strictEqual(metrics.afferentCoupling.moduleB, 1);
  assert.strictEqual(metrics.efferentCoupling.moduleA, 1);
  assert.strictEqual(metrics.instability.moduleA, 1); // 1 / (0 + 1)
  assert.strictEqual(metrics.instability.moduleB, 0); // 0 / (1 + 0)
});

test('detectOrphanAbstractions detects unreferenced exports', () => {
  const mockGraph: ProjectGraph = {
    version: '1.0.0',
    name: 'test',
    rootPath: '.',
    allFiles: ['src/a/a.ts'],
    dependencies: {},
    modules: [
      {
        name: 'moduleA',
        path: 'src/a',
        files: ['src/a/a.ts'],
        exports: ['UnusedSymbol', 'UsedSymbol'],
        imports: ['import { UsedSymbol } from "./somewhere"'],
        tests: []
      }
    ]
  };

  const orphans = detectOrphanAbstractions(mockGraph);
  assert.strictEqual(orphans.length, 1);
  assert.strictEqual(orphans[0].symbol, 'UnusedSymbol');
});

