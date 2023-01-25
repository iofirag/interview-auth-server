import { injectable } from 'inversify';
import "reflect-metadata";

@injectable()
export default class ArchiveService {
    private _db: { [username: string]: { password: string; role: number } };

    constructor() {
        this._db = {};
    }

    add(key, val) {
        this._db[key] = val;
    }

    get(key: string) {
        return this._db[key];
    }

    getAllData() {
        return this._db;
    }
}
