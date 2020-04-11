
let ko: any = {

    observableArray<T>(val: T[] = new Array<T>()): (t?: T[]) => T[] {

	let subscribers: any[] = [];

	let subscribableSpiable = {
	    subscribe: (fn: (subsNewVal: T[]) => void) => subscribers.push(fn),
	    indexOf: (it: T) => val.indexOf(it),
	    push: (it: T) => val.push(it),
	    removeAll: () => val = new Array<T>()
	};

	let f = (newVal: any) => {
	    if (newVal === undefined) {
		return val;
	    }
	    val = newVal;
	    for (let fn of subscribers) {
		fn(newVal);
	    }
	};

	let newF = Object.assign(f, subscribableSpiable);

	return newF;
    },

    observable<T>(val: T): (t?: T) => T {
	let subscribers: any[] = [];

	let subscribableSpiable = {
	    subscribe: (fn: (subsNewVal: T) => void) => subscribers.push(fn)
	};

	let f = (newVal: T | undefined) => {
	    if (newVal === undefined) {
		return val;
	    }
	    val = newVal;
	    for (let fn of subscribers) {
		fn(newVal);
	    }
	};

	let newF = Object.assign(f, subscribableSpiable);

	return newF;
    },

    pureComputed<T>(fn: () => T): () => T {
	let subscribableSpiable = {
	    calculate: () => fn(),
	    subscribe: (f: (subsNewVal: T) => void) => f(fn())
	};

	let newF = Object.assign(fn, subscribableSpiable);
	return newF;
    },

    utils: {
	arrayMap<I, O>(source: I[], fn: (it: I) => O): O[] {
	    let result: Array<O> = new Array<O>();
	    for (let x of source) {
		result.push(fn(x));
	    }
	    return result;
	},

	arrayFilter<T>(source: T[], fn: (it: T) => boolean): T[] {
	    let result: Array<T> = new Array<T>();
	    for (let x of source) {
		if (fn(x)) {
		    result.push(x);
		}
	    }
	    return result;
	}
    }
}

export default ko;
