// @ts-nocheck
import React from 'react';

import { mount } from 'test/helpers';
import generator from 'test/data-generator';
import ShortcutWatcher, { createCustomEvent, getNormalizedKeys } from './shortcut-watcher';
import { Keys } from 'common/constants';

describe('ShortcutWatcher', () => {
	let map = {};

	beforeEach(() => {
		window.addEventListener = jest.fn((event, cb) => {
			map[event] = cb;
		});

		document.dispatchEvent = jest.fn((event) => {
			if (map[event.type]) {
				map[event.type]();
			}
		});
	});

	afterEach(() => {
		jest.clearAllMocks;
		map = {};
	});

	it('normalizes array of keys correctly', () => {
		expect(getNormalizedKeys([])).toBe('');
		expect(getNormalizedKeys('')).toBe('');

		expect(getNormalizedKeys(Keys.ALT)).toBe('alt');
		expect(getNormalizedKeys([Keys.ALT])).toBe('alt');

		expect(getNormalizedKeys([Keys.SHIFT, Keys.CONTROL, Keys.A])).toBe('a&control&shift');
	});

	describe('CustomEvent', () => {
		it('creates custom event correctly', () => {
			const shortcut = generator.word();

			const event = createCustomEvent(shortcut);

			expect(event).not.toBeNull();
			expect(event.type).toBe(shortcut);
		});

		it('creates custom event through document correctly', () => {
			const shortcut = generator.word();

			const event = createCustomEvent(shortcut, true);

			expect(event).not.toBeNull();
			expect(event.type).toBe(shortcut);
		});
	});

	it('dispatches custom event succesfully', () => {
		const letters = generator.shuffle(['a', 'b', 'c', 'd', 'e', 'f']);

		const shortcuts = generator.array(
			({ index }) => ({
				keys: [Keys.CONTROL, generator.pick([Keys.SHIFT, Keys.ALT]), letters[index]],
				event: `onEvent${index}`,
			}),
			3
		);

		const props = {
			shortcuts,
			children: (
				<div>
					<input type="text" />
				</div>
			),
		};

		const { instance } = mount(<ShortcutWatcher {...props} />);

		const listeners = shortcuts.map((shortcut) => ({
			event: shortcut.event,
			handler: jest.fn(),
		}));

		listeners.forEach((listener) => {
			window.addEventListener(listener.event, listener.handler);
		});

		for (let i = 0; i < shortcuts.length; i++) {
			instance.handleKeyPress({
				ctrlKey: true,
				altKey: shortcuts[i].keys.includes(Keys.ALT),
				shiftKey: shortcuts[i].keys.includes(Keys.SHIFT),
				key: shortcuts[i].keys[2],
			});

			expect(listeners[i].handler).toHaveBeenCalled();
		}
	});
});
