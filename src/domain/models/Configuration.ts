export class Configuration {
    baseUrl: string;
    headers: Record<string, string>;
    APIKey: string;

    constructor(baseUrl: string, headers: Record<string, string>, APIKey: string) {
        this.baseUrl = baseUrl;
        this.headers = headers;
        this.APIKey = APIKey;
    }

    static fromObject(obj: any): Configuration {
        return new Configuration(
            obj.baseUrl || "",
            obj.headers || {},
            obj.APIKey || ""
        );
    }
}