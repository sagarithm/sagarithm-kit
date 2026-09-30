import { test } from 'node:test';
import assert from 'node:assert';
import { extractExports, extractImports } from '../src/graph/indexer.ts';
import { findExistingAbstractions, calculateBlastRadius } from '../src/graph/query.ts';
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
