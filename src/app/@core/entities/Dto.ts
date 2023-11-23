type Constructable<T> = ClassT<T>;

export default function Dto<T extends Constructable<any>>() {
	return (constructor: T): T => {
		return class extends constructor {
			constructor(...args: any[]) {
				super(args[0]);
				if (args[0]) {
					Object.assign(this, args[0]);
				}
			}
		};
	};
}
