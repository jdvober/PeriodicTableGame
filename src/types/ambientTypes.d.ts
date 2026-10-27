/*
Use

type TypeName = {
	...etc
}

to have these types be available everywhere in your file.

You can also import the "Type" of a component!
Example:

declare import type FormatA from '/src/components/Formulas/FormatA.svelte'
 *
*/

type ElementLocation = 'LEFT' | 'MIDDLE' | 'RIGHT' | 'RARE_EARTH';
type ElementSet = 'FIRST_10' | 'FIRST_18' | 'FIRST_36' | 'FIRST_54' | 'COMMON' | 'ALL';

type PeriodicElement = {
	name: string;
	symbol: string;
	atomicNumber: number;
	period: number;
	group: number;
	location: ElementLocation;
	color: string;
}
