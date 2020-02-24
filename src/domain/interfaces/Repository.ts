export interface Repository {
    saveState(appName: string, state: boolean): boolean;

    readState(appName: string): boolean;
}