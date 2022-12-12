export declare const _storeData: (key: string, value: string) => Promise<void>;
export declare const _storeJsonData: (key: string, jsonValue: object) => Promise<void>;
export declare const _retrieveData: (key: string) => Promise<string | null>;
export declare const _retrieveJsonData: (key: string) => Promise<any>;
export declare const _removeData: (key: string) => Promise<void | null>;
