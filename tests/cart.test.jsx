import { describe, expect, it } from 'vitest';
import reducer, { addItem, removeItem, updateQuantity, selectCartCount, selectCartTotal } from '../src/CartSlice.jsx';
const plant = { id:'one', name:'One', price:25 };
describe('cart reducer', () => {
 it('adds a plant with quantity one', () => { const s=reducer(undefined,addItem(plant)); expect(s.items).toEqual([{...plant,quantity:1}]); });
 it('increments a duplicate instead of adding a row', () => { let s=reducer(undefined,addItem(plant));s=reducer(s,addItem(plant)); expect(s.items).toHaveLength(1);expect(s.items[0].quantity).toBe(2); });
 it('updates quantities and derives totals across different plants', () => { let s=reducer(undefined,addItem(plant));s=reducer(s,addItem({id:'two',price:18}));s=reducer(s,updateQuantity({id:'one',quantity:3}));expect(selectCartCount({cart:s})).toBe(4);expect(selectCartTotal({cart:s})).toBe(93); });
 it('removes only the selected plant', () => { let s=reducer(undefined,addItem(plant));s=reducer(s,addItem({id:'two',price:18}));s=reducer(s,removeItem('one'));expect(s.items.map(x=>x.id)).toEqual(['two']); });
 it('removes an item when quantity reaches zero', () => {let s=reducer(undefined,addItem(plant));s=reducer(s,updateQuantity({id:'one',quantity:0}));expect(s.items).toEqual([]);});
 it.each([-1,1.5,NaN,Infinity,'2'])('rejects invalid quantity %s', quantity => {const s=reducer(undefined,addItem(plant));expect(reducer(s,updateQuantity({id:'one',quantity}))).toEqual(s);});
 it('ignores unknown IDs',()=>{const s=reducer(undefined,addItem(plant));expect(reducer(s,updateQuantity({id:'absent',quantity:2}))).toEqual(s);expect(reducer(s,removeItem('absent'))).toEqual(s);});
});
