/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { describe, expect, test } from 'vitest';
import { Nirax } from '@/lib/nirax.js';
import { ROUTE_DEF } from '@/router.definition.js';

describe('router definition', () => {
	test('resolves /new route', () => {
		const router = new Nirax(ROUTE_DEF, '/new', true, {} as any);
		const resolved = router.resolve('/new');

		expect(resolved).toBeTruthy();
		expect(resolved?.route.path).toBe('/new');
	});
});
