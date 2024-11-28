import { describe, it, test, expect } from 'vitest';
import { MyClient } from '../src/client/MyClient.ts';
describe('add function', () => {
    test('adds 1 + 2 to equal 3', () => {
        console.log(WebSocket)
        const client = MyClient.Instance
        client.baseUrl = 'ws://localhost:5000'
        client.connect()
        expect(1 + 2).toBe(3)
    })
});
