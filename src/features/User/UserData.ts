import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../../containerTypes';

@injectable()
export default class UserData {
    @inject(TYPES.ArchiveService) private _archiveService: any;

    addUser(username: string, password: string, role: number) {
        try {
            this._archiveService.add(username, {password, role});
        } catch (error) {
            throw error;
        }
    }

    getUser(username: string) {
        try {
            return this._archiveService.get(username);
        } catch (error) {
            throw error;
        }
    }

    getPublicData() {
        try {
            return { data: 'public' };
        } catch (error) {
            throw error;
        }
    }

    getPrivateData() {
        try {
            return { data: 'private' };
        } catch (error) {
            throw error;
        }
    }

    getPrivateRoledData() {
        try {
            return { data: 'private & Roled' };
        } catch (error) {
            throw error;
        }
    }
}
